import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registrationSuccessSubject = new BehaviorSubject<boolean>(false);
  registrationSuccess$ = this.registrationSuccessSubject.asObservable();
  private passwordResetedSuccessSubject = new BehaviorSubject<boolean>(false);
  passwordReseted$ = this.passwordResetedSuccessSubject.asObservable();
  currentUser: any;

  constructor(private http: HttpClient) {}

  public async loginWitEmailAndPassword(body: any) {
    const url = environment.baseUrl + '/login/';
    return lastValueFrom(this.http.post(url, body));
  }

  async logout() {
    const url = environment.baseUrl + '/logout/';
    const headers = new HttpHeaders({
      Authorization: 'Token ' + localStorage.getItem('token'),
    });
    await this.http.post(url, null, { headers }).toPromise();
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    this.removeCurrentUser();
  }

  register(body: any): Observable<any> {
    const url = environment.baseUrl + '/register/';
    return this.http.post(url, body);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const expire = localStorage.getItem('expire');

    if (token && expire) {
      const expiryDate = new Date(expire);

      if (expiryDate > new Date()) {
        return true;
      }
    }

    return false;
  }

  setCurrentUser(resp: any) {
    localStorage.setItem('currentUser', JSON.stringify(resp['user']));
    localStorage.setItem('token', resp['token']);
    localStorage.setItem('expire', resp['expiry']);
  }

  getCurrentUser(): any {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  removeCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  setRegistrationSuccess(success: boolean) {
    this.registrationSuccessSubject.next(success);
  }

  setResetedPasswordSuccess(success: boolean) {
    this.passwordResetedSuccessSubject.next(success);
  }
}
