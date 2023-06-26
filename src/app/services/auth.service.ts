import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser:any;
  
  constructor(private http: HttpClient) {}

  public async loginWithUsernameAndPassword(
    username: string,
    password: string
  ) {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: username,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  async logout() {
    const url = environment.baseUrl + '/logout/';
    const headers = new HttpHeaders({
      Authorization: 'Token ' + localStorage.getItem('token'),
    });
    await this.http.post(url, null, { headers }).toPromise();
    localStorage.removeItem('token');
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = environment.baseUrl + '/register/';
    const body = { username, email, password };
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
}
