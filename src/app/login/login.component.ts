import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: any;
  password: any;
  public hideLayout = true;

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    try {
      let resp: any = await this.authService.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      console.log(resp)
      localStorage.setItem('token', resp['token']);
      localStorage.setItem('expire', resp['expiry']);
      this.router.navigate(['/summary']);
    } catch (e) {
      console.error('Fehler bei der Anmeldung', e);
      console.log(Response)
    }
  }

  async guestLogin() {}
}
