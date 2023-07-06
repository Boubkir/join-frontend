import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';
import { SharedDataService } from '../services/shared-data.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  tasks: any = [];
  open: any = [];
  inProgress: any = [];
  awaitingFeedback: any = [];
  done: any = [];
  urgent: any = [];
  currentUser: any;
  firstName!: any;
  lastName!: any;
  upComing!: any;
  h1 = 'Summary';
  motto = 'Everything in a nutshell!';
  greetingMessage!: string;

  constructor(private data: SharedDataService, private auth: AuthService) {}

  async ngOnInit() {
    this.tasks = await this.data.loadTasks();
    this.tasks = this.removeDuplicateTasks(this.tasks);
    this.filterTodos();
    this.currentUser = this.auth.getCurrentUser();
    this.firstName = this.currentUser?.first_name ?? 'Sunshine';
    this.lastName = this.currentUser?.last_name ?? '';
    this.setGreetingMessage();
     this.upComing = this.calculateUpcomingDeadline();
  }

  async loadTodos() {
    this.tasks = await this.data.loadTasks();
    this.filterTodos();
  }

  filterTodos() {
    this.open = this.tasks.filter((t: any) => t['status'] == 'open');
    this.inProgress = this.tasks.filter(
      (t: any) => t['status'] == 'inprogress'
    );
    this.awaitingFeedback = this.tasks.filter(
      (t: any) => t['status'] == 'awaitingfeedback'
    );
    this.done = this.tasks.filter((t: any) => t['status'] == 'done');
    this.urgent = this.tasks.filter((t: any) => t['priority'] == 'urgent');
  }

  calculateUpcomingDeadline(): string {
    let upcoming = this.tasks.sort(function (a: any, b: any) {
      let x: any = new Date(a.due_date);
      let y: any = new Date(b.due_date);
      return x - y;
    });

    let formattedDate = moment(upcoming[0].due_date).format('MMMM DD, YYYY');
    return formattedDate;
  }

  setGreetingMessage() {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      this.greetingMessage = 'Good morning,';
    } else if (currentTime < 18) {
      this.greetingMessage = 'Good afternoon,';
    } else {
      this.greetingMessage = 'Good evening,';
    }
  }

  removeDuplicateTasks(tasks: Task[]): Task[] {
    const uniqueTasks: Task[] = [];
    const taskIds: Set<number> = new Set();

    for (const task of tasks) {
      if (!taskIds.has(task.id)) {
        uniqueTasks.push(task);
        taskIds.add(task.id);
      }
    }

    return uniqueTasks;
  }
}
