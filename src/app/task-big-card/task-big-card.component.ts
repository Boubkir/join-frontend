import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-task-big-card',
  templateUrl: './task-big-card.component.html',
  styleUrls: ['./task-big-card.component.scss'],
})
export class TaskBigCardComponent {
  @Output() onShowSlider: EventEmitter<void> = new EventEmitter<void>();
  @Input() task!: Task;
  users: User[] = [];
  assignedUsers: User[] = [];
  taskForm: FormGroup;
  editMode: boolean = false;
  isDropDownOpen: boolean = false;
  isUserDropDownOpen: boolean = false;
  priority!: string;
  currentUser: User = this.auth.getCurrentUser();

  constructor(
    private formBuilder: FormBuilder,
    private data: SharedDataService,
    private auth: AuthService
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      dueDate: [null, Validators.required],
      assignedTo: this.formBuilder.array([]),
      subtasks: this.formBuilder.array([]),
    });
  }

  async ngOnInit() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
      this.priority = this.task.priority;
      const dueDate = new Date(this.task.due_date);
      const formattedDueDate = dueDate.toISOString().split('T')[0];
      this.taskForm.patchValue({ dueDate: formattedDueDate });
    }
    await this.loadUser();
    this.updateAssignedUsers();
  }

  openCloseDropdown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  openCloseUserDropdown() {
    this.isUserDropDownOpen = !this.isUserDropDownOpen;
  }

  setPriority(prio: string) {
    this.priority = prio;
  }

  setCategory(input: string) {
    this.taskForm.get('category')?.setValue(input);
    this.openCloseDropdown();
  }

  triggerShowSlider() {
    this.onShowSlider.emit();
  }

  isUserSelected(user: User): boolean {
    return this.assignedUsers.some(
      (assignedUser) => assignedUser.id === user.id
    );
  }

  updateAssignedTo(user: User): void {
    const assignedUsers = this.assignedUsers;
    const userId = user.id;

    if (!assignedUsers.some((assignedUser) => assignedUser.id === userId)) {
      assignedUsers.push(user);
    } else {
      const index = assignedUsers.findIndex(
        (assignedUser) => assignedUser.id === userId
      );
      assignedUsers.splice(index, 1);
    }
  }

  editTaskView() {
    this.editMode = !this.editMode;
  }

  deleteTask(id: any) {
    this.data.deleteTask(id).subscribe(
      () => {
        console.log('geschafft');
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
    this.triggerShowSlider();
  }

  editTask() {
    if (this.taskForm.valid) {
      const editedTask: Task = {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        category: this.taskForm.get('category')?.value,
        category_color: this.task.category_color,
        due_date: this.taskForm.get('due_date')?.value || this.task.due_date,
        assigned_to: this.assignedUsers.map((user) => user.id),
        user: this.task.user,
        sub_tasks: this.task.sub_tasks,
        priority: this.priority,
        id: this.task.id,
      };
      console.log(editedTask);
      this.data.editTask(editedTask, editedTask.id).subscribe(
        () => {
          console.log('geschafft');
          this.triggerShowSlider();
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  async loadUser(): Promise<void> {
    try {
      const loadedUsers = (await this.data.loadUsers()) as User[];
      const currentUserIndex = loadedUsers.findIndex(
        (user) => user.id === this.currentUser.id
      );
      if (currentUserIndex !== -1) {
        loadedUsers.splice(currentUserIndex, 1);
      }
      this.users = loadedUsers;
    } catch (error) {
      console.error('Fehler beim Laden der Benutzer:', error);
    }
  }

  updateAssignedUsers() {
    this.assignedUsers = this.task.assigned_to.map((userId) => {
      return this.users.find((user) => user.id === userId);
    });
  }
}
