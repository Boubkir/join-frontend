import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: any;
  password: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private data: DataService
  ) {}

  async login() {
    try {
      let resp: any = await this.authService.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      this.authService.setCurrentUser(resp['user']);
      localStorage.setItem('token', resp['token']);
      localStorage.setItem('expire', resp['expiry']);
      this.router.navigate(['/summary']);
    } catch (e) {
      console.error('Fehler bei der Anmeldung', e);
      console.log(Response);
    }
  }

  setCurrentUser(user: any) {
    localStorage.setItem('currenUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  async guestLogin() {
    try {
      let resp: any = await this.authService.loginWithUsernameAndPassword(
        'Guest',
        'guesttest123'
      );
      this.authService.setCurrentUser(resp['user']);
      localStorage.setItem('token', resp['token']);
      localStorage.setItem('expire', resp['expiry']);
      this.router.navigate(['/summary']);
    } catch (e) {
      console.error('Fehler bei der Anmeldung', e);
      console.log(Response);
    }
  }
}
