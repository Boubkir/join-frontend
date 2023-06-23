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

  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit() {
    this.hideLayout = true;
  }

  async login() {
    try {
      let resp:any = await this.authService.loginWithUsernameAndPassword(this.username,this.password)
      localStorage.setItem('token',resp['token'])
      this.router.navigate(['/summary']);
    } catch (e) {
      console.error(e);
    }
  }
}
