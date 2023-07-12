import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmed_password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const newUser: User = {
        username: this.registerForm.get('username')?.value,
        first_name: this.registerForm.get('first_name')?.value,
        last_name: this.registerForm.get('last_name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this.authService.register(newUser).subscribe(
        (resp) => {
          this.authService.setRegistrationSuccess(true);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Fehler bei der Registrierung', error.error);
        }
      );
    }
  }
}
