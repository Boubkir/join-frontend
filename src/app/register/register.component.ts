import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  firstName!: string;
  lastName!: string;
  userName!: string;
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register(this.userName, this.email, this.password)
      .subscribe(
        (resp) => {
          localStorage.setItem('token', resp['token']);
          this.router.navigate(['/login/']);
        },
        (error) => {
          console.error('Fehler bei der Registrierung', error);
        }
      );
  }
}
