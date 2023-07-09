import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { SharedDataService } from '../services/shared-data.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;
  assignedUsers: User[] = [];
  users: User[] = [];
  currentUser: User = this.auth.getCurrentUser();

  constructor(private data: SharedDataService,private auth:AuthService) {}

  async ngOnInit() {
    await this.loadUser();
    await this.updateAssignedUsers();
    console.log(this.assignedUsers);
  }

  async loadUser() {
    try {
      const loadedUsers = (await this.data.loadUsers()) as User[];
      this.users = loadedUsers;
    } catch (error) {
      console.error('Fehler beim Laden der Benutzer:', error);
    }
  }

  async updateAssignedUsers() {
    this.assignedUsers = this.task.assigned_to.map((userId) => {
      return this.users.find((user) => user.id === userId);
    });
  }
}
