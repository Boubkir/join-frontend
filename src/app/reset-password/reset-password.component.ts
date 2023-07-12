import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  token!: string;
  url = environment.baseUrl + '/reset-password/confirm/';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const newPassword = {
        token: this.token,
        password: this.resetForm.get('password')?.value,
      };
      this.http.post(this.url, newPassword).subscribe(
        () => {
          this.authService.setResetedPasswordSuccess(true);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
