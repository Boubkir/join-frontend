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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSumbmit() {
    const url = environment.baseUrl + '/reset-password/';
    if (this.emailForm.valid) {
      const newContact = {
        email: this.emailForm.get('email')?.value,
      };

      console.log(newContact);

      this.http.post(url,newContact).subscribe(
        () => {
          console.log('geschafft');
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
