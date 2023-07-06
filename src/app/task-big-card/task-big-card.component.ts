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
  taskForm: FormGroup;
  editMode: boolean = false;
  isDropDownOpen: boolean = false;
  isUserDropDownOpen: boolean = false;
  priority!: string;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private data: SharedDataService
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
    if (this.task) {
      this.taskForm.patchValue(this.task);
      this.priority = this.task.priority;
      const dueDate = new Date(this.task.due_date);
      const formattedDueDate = dueDate.toISOString().split('T')[0];
      this.taskForm.patchValue({ dueDate: formattedDueDate });
    }
    console.log(this.task);
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

  editTask(taskid: number) {
    if (this.taskForm.valid) {
      const editedTask: Task = {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        category: this.taskForm.get('category')?.value,
        category_color: this.task.category_color,
        due_date: this.taskForm.get('due_date')?.value || this.task.due_date,
        assigned_to: this.task.assigned_to,
        user: this.task.user,
        sub_tasks: this.task.sub_tasks,
        priority: this.priority,
        id: this.task.id,
      };
      console.log(editedTask)
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
}
