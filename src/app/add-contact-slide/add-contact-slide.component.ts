import { Component } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from '../models/contact.model';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-contact-slide',
  templateUrl: './add-contact-slide.component.html',
  styleUrls: ['./add-contact-slide.component.scss'],
})
export class AddContactSlideComponent {
  currentUser: any;
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private auth: AuthService
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const newContact: Contact = {
        first_name: this.contactForm.get('firstName')?.value,
        last_name: this.contactForm.get('lastName')?.value,
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
}
