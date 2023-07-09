import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isGuestLogin: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.checkLocalStorageExpiration();
  }

  async login(isGuestLogin: boolean = false) {
    let user: any;

    if (isGuestLogin) {
      user = {
        email: 'max@mustermann.de',
        password: 'guesttest123',
      };
    } else {
      user = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
    }

    try {
      let resp: any = await this.authService.loginWitEmailAndPassword(user);
      this.authService.setCurrentUser(resp);
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

  checkLocalStorageExpiration() {
    const expireDate = localStorage.getItem('expire');
    const currentTimestamp = new Date().getTime();
    const expireTimestamp = new Date(expireDate).getTime();

    if (currentTimestamp - expireTimestamp > 2 * 60 * 60 * 1000) {
      localStorage.removeItem('token');
      localStorage.removeItem('expire');
      localStorage.removeItem('currentUser');
    }
  }
}
