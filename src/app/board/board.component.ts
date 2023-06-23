import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  todos: any = [];
  open: any = [];
  inProgress: any = [];
  awaitingFeedback: any = [];
  done: any = [];
  filteredTasks = [];
  searchText!: string;

  public hideLayout = false;

  constructor(private data: DataService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    this.todos = await this.data.loadTodos();
    this.filterTodos();
    this.hideLayout = false;
  }

  filterTodos(): void {
    this.open = this.todos.filter((t: any) => t['status'] == 'open');
    this.inProgress = this.todos.filter(
      (t: any) => t['status'] == 'inprogress'
    );
    this.awaitingFeedback = this.todos.filter(
      (t: any) => t['status'] == 'awaitingfeedback'
    );
    this.done = this.todos.filter((t: any) => t['status'] == 'done');
  }

  filterTaskss(): void {
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
    this.updateTodos(this.open);
    this.updateTodos(this.inProgress);
    this.updateTodos(this.awaitingFeedback);
    this.updateTodos(this.done);
  }

  updateTodos(array: any) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const url = `${environment.baseUrl}/todos/${element.id}/`;

      this.http.patch(url, element).subscribe({
        error: (error) => {
          console.error(
            `Fehler beim Aktualisieren des Elements mit ID ${element.id}:`,
            error
          );
        },
      });
    }
  }

  filterTasks() {
    if (this.searchText.trim() === '') {
      // Wenn der Suchtext leer ist, zeige alle Cards
      this.filteredTasks = this.todos;
    } else {
      // Filtere die Cards basierend auf dem Suchtext
      this.filteredTasks = this.todos.filter((task: any) => {
        return (
          task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          task.description.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    }
    this.filterTaskss();
  }
}
