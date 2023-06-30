import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { SharedDataService } from '../services/shared-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-contact-slide',
  templateUrl: './edit-contact-slide.component.html',
  styleUrls: ['./edit-contact-slide.component.scss'],
})
export class EditContactSlideComponent {
  @Output() onShowSlider: EventEmitter<void> = new EventEmitter<void>();
  @Input() currentContact?: Contact | null;
  currentUser: any;
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private data: SharedDataService,
    private auth: AuthService
  ) {
    this.contactForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: [''],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    console.log(this.currentContact);
    if (this.currentContact) {
      this.contactForm.patchValue(this.currentContact);
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const newContact: Contact = {
        first_name: this.contactForm.get('first_name')?.value,
        last_name: this.contactForm.get('last_name')?.value,
        email: this.contactForm.get('email')?.value,
        phone: this.contactForm.get('phone')?.value,
        color: this.contactForm.get('color')?.value,
        user: this.currentUser['id'],
      };

      console.log(newContact);

      this.data.createContact(newContact).subscribe(
        () => {
          console.log('geschafft');
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  triggerShowSlider() {
    this.onShowSlider.emit();
  }

  editContact(id: any) {
    if (this.contactForm.valid) {
      const newContact: Contact = {
        first_name: this.contactForm.get('first_name')?.value,
        last_name: this.contactForm.get('last_name')?.value,
        email: this.contactForm.get('email')?.value,
        phone: this.contactForm.get('phone')?.value,
        color: this.contactForm.get('color')?.value,
        user: this.currentUser['id'],
      };
      this.data.editContact(newContact, id).subscribe(
        () => {
          console.log('geschafft');
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );;
    }
  }
}
