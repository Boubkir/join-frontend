import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  users: any;
  priority!: string;
  isDropDownOpen = false;
  isUserDropDownOpen = false;
  userID!: any;
  currentUser: any;
  isTaskCreated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
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

  ngOnInit(): void {
    this.loadUser();
    this.currentUser = this.auth.getCurrentUser();
  }

  async loadUser() {
    this.users = await this.data.loadUsers();
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

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        category: this.taskForm.get('category')?.value,
        due_date: this.taskForm.get('dueDate')?.value,
        assigned_to: this.taskForm.get('assignedTo')?.value,
        sub_tasks: this.taskForm.get('subtasks')?.value,
        priority: this.priority,
        user: this.currentUser['id'],
        status: 'open',
      };

      console.log(newTask);

      this.data.createTask(newTask).subscribe(
        () => {
          this.isTaskCreated = true;
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  isUserSelected(user: any): boolean {
    const assignedTo = this.taskForm.get('assignedTo')?.value as any[];
    return assignedTo.includes(user['id']);
  }

  updateAssignedTo(user: any) {
    const assignedTo = this.taskForm.get('assignedTo') as FormArray;
    if (!assignedTo.value.includes(user['id'])) {
      assignedTo.push(this.formBuilder.control(user['id']));
    } else {
      const index = assignedTo.value.indexOf(user['id']);
      assignedTo.removeAt(index);
    }
  }

  addSubtask() {
    const subtasks = this.taskForm.get('subtasks') as FormArray;
    subtasks.push(this.formBuilder.control(''));
  }

  removeSubtask(index: number) {
    const subtasks = this.taskForm.get('subtasks') as FormArray;
    subtasks.removeAt(index);
  }
}
