import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: Task[] = [];
  open: any[] = [];
  inProgress: any[] = [];
  awaitingFeedback: any[] = [];
  done: any[] = [];
  searchText!: string;
  openAddTaskSlide: boolean = false;
  openBigCard: boolean = false;
  selectedTask!: Task;

  constructor(private data: SharedDataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    try {
      const loadedTasks = (await this.data.loadTasks()) as Task[];
      this.tasks = loadedTasks;
      this.filterTasks();
    } catch (error) {
      console.error('Fehler beim Laden der Tasks:', error);
    }
  }

  filterTasks(): void {
    this.open = this.filterUniqueTasks('open');
    this.inProgress = this.filterUniqueTasks('inprogress');
    this.awaitingFeedback = this.filterUniqueTasks('awaitingfeedback');
    this.done = this.filterUniqueTasks('done');
  }

  filterUniqueTasks(status: string): Task[] {
    const filteredTasks: Task[] = [];
    const addedIds: Set<number> = new Set<number>();

    for (const task of this.tasks) {
      if (task.status === status && !addedIds.has(task['id'])) {
        filteredTasks.push(task);
        addedIds.add(task['id']);
      }
    }
    return filteredTasks;
  }

  filterMatches(): void {
    this.open = this.filteredTasks.filter((t: any) => t['status'] == 'open');
    this.inProgress = this.filteredTasks.filter(
      (t: any) => t['status'] == 'inprogress'
    );
    this.awaitingFeedback = this.filteredTasks.filter(
      (t: any) => t['status'] == 'awaitingfeedback'
    );
    this.done = this.filteredTasks.filter((t: any) => t['status'] == 'done');
  }

  onDragStarted(task: any): void {
    task.isDragging = true;
  }

  onDragEnded(task: any): void {
    task.isDragging = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(event.container.data);
    this.changeAllStatus();
    this.updateToBackend();
  }

  changeAllStatus() {
    this.changeStatus(this.open, 'open');
    this.changeStatus(this.inProgress, 'inprogress');
    this.changeStatus(this.awaitingFeedback, 'awaitingfeedback');
    this.changeStatus(this.done, 'done');
  }

  changeStatus(array: any, status: string) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      element.status = status.toLowerCase();
    }
  }

  updateToBackend() {
    this.updateTasks(this.open);
    this.updateTasks(this.inProgress);
    this.updateTasks(this.awaitingFeedback);
    this.updateTasks(this.done);
  }

  updateTasks(array: any) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const url = `${environment.baseUrl}/tasks/${element.id}/`;

      this.http.put(url, element).subscribe({
        error: (error) => {
          console.error(
            `Fehler beim Aktualisieren des Elements mit ID ${element['id']}:`,
            error
          );
        },
      });
    }
  }

  searchMatches() {
    const addedTaskIds: { [id: string]: boolean } = {}; 
    this.filteredTasks = this.tasks.filter((task: any) => {
      const lowerCaseSearchText = this.searchText.toLowerCase();
      const isMatch =
        task.title.toLowerCase().includes(lowerCaseSearchText) ||
        task.description.toLowerCase().includes(lowerCaseSearchText);
      if (isMatch && !addedTaskIds[task.id]) {
        addedTaskIds[task.id] = true; 
        return true; 
      }
      return false;
    });
    this.filterMatches();
  }

  addTaskSlide() {
    this.openAddTaskSlide = !this.openAddTaskSlide;
    this.loadTasks();
  }

  showBigCard() {
    this.openBigCard = !this.openBigCard;
    this.loadTasks();
  }

  onTaskSelected(task: Task) {
    this.selectedTask = task;
  }

  onTaskClick(task: Task) {
    this.showBigCard();
    this.onTaskSelected(task);
  }
}
