import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-task-slide',
  templateUrl: './add-task-slide.component.html',
  styleUrls: ['./add-task-slide.component.scss'],
})
export class AddTaskSlideComponent {
  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;
  @Output() onShowSlider: EventEmitter<void> = new EventEmitter<void>();
  taskForm: FormGroup;
  users: User[] = [];
  priority!: string;
  isDropDownOpen = false;
  isUserDropDownOpen = false;
  currentUser!: User;
  isTaskCreated: boolean = false;
  isNewCategory: boolean = false;
  assignedUsers: User[] = [];
  selectedColor: string | null = null;
  subtasks: { name: string; done: boolean }[] = [];
  newSubtask: string = '';
  newSubtaskName: string;
  colors: string[] = [
    'var(--label-1)',
    'var(--label-2)',
    'var(--label-3)',
    'var(--label-4)',
    'var(--label-5)',
    'var(--label-6)',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private data: SharedDataService,
    private auth: AuthService
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [''],
      category_color: [''],
      dueDate: [null, Validators.required],
      priority: [''],
      assignedTo: this.formBuilder.array([]),
      subtasks: [''],
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.currentUser = this.auth.getCurrentUser();
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

  openCloseDropdown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  openCloseUserDropdown() {
    this.isUserDropDownOpen = !this.isUserDropDownOpen;
  }

  setPriority(prio: string) {
    this.priority = prio;
  }

  setCategory(input: string, color: string) {
    this.taskForm.get('category')?.setValue(input);
    this.setCategoryColor(color);
    this.openCloseDropdown();
  }

  setCreatedCategory() {
    const categoryName = this.taskForm.get('category').value;
    this.taskForm.get('category')?.setValue(categoryName);
    this.setCategoryColor(this.selectedColor);
    this.isDropDownOpen = false;
    this.isNewCategory = false;
    this.categoryInput.nativeElement.readOnly = true;
  }

  setCategoryColor(color: string) {
    this.selectedColor = color;
    this.taskForm.get('category_color')?.setValue(color);
  }

  onSubmit() {
    console.log(this.taskForm);
    if (this.taskForm.valid) {
      const newTask: Task = {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        category: this.taskForm.get('category')?.value,
        category_color: this.taskForm.get('category_color')?.value,
        due_date: this.taskForm.get('dueDate')?.value,
        assigned_to: this.taskForm.get('assignedTo')?.value,
        sub_tasks: this.subtasks,
        priority: this.priority,
        user: this.currentUser.id,
        status: 'open',
      };

      console.log(newTask);

      this.data.createTask(newTask).subscribe(
        () => {
          this.isTaskCreated = true;
          this.triggerShowSlider()
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  isUserSelected(user: User): boolean {
    const assignedTo = this.taskForm.get('assignedTo')?.value as any[];
    return assignedTo.includes(user.id);
  }

  updateAssignedTo(user: any) {
    const assignedTo = this.taskForm.get('assignedTo') as FormArray;
    const assignedUsers = this.assignedUsers;

    if (!assignedTo.value.includes(user.id)) {
      assignedTo.push(this.formBuilder.control(user.id));
      assignedUsers.push(user);
    } else {
      const index = assignedTo.value.indexOf(user.id);
      assignedTo.removeAt(index);

      const userIndex = assignedUsers.findIndex(
        (assignedUser) => assignedUser.id === user.id
      );
      assignedUsers.splice(userIndex, 1);
    }
  }

  addSubtask() {
    const subtask = this.taskForm.get('subtasks').value;
    if (subtask.length > 3) {
      const newSubtask = {
        name: subtask,
        done: false,
      };
      this.subtasks.push(newSubtask);
      this.taskForm.get('subtasks').setValue('');
    }
  }

  deleteSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }

  newCategory() {
    this.isNewCategory = !this.isNewCategory;
    this.categoryInput.nativeElement.focus();
    this.categoryInput.nativeElement.readOnly = false;
    this.categoryInput.nativeElement.placeholder = 'Enter new Categoryname';
  }

  closeNewCategory() {
    this.isNewCategory = false;
    this.categoryInput.nativeElement.placeholder = 'Select task category';
    this.selectedColor = 'nothing';
    this.categoryInput.nativeElement.readOnly = true;
    this.categoryInput.nativeElement.value = null;
  }

  triggerShowSlider() {
    const background = document.querySelector('.background') as HTMLElement;
    background.classList.add('closing');
     setTimeout(() => {
       this.onShowSlider.emit();
     }, 600); 
  }
}
