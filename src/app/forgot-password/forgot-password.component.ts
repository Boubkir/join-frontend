import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  emailForm: FormGroup;
  emailSended: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSumbmit() {
    const url = environment.baseUrl + '/reset-password/';
    if (this.emailForm.valid) {
      const email = {
        email: this.emailForm.get('email')?.value,
      };

      this.http.post(url, email).subscribe(
        () => {
          this.emailSended = true;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
