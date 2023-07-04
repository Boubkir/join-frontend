import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Task } from '../models/task.model';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor(private http: HttpClient) {}

  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url));
  }

  loadContacts() {
    const url = environment.baseUrl + '/contacts/';
    return lastValueFrom(this.http.get(url));
  }

  loadUsers() {
    const url = environment.baseUrl + '/users/';
    return lastValueFrom(this.http.get(url));
  }

  createTask(task: Task) {
    const url = environment.baseUrl + '/todos/';
    return this.http.post(url, task);
  }

  createContact(contact: Contact) {
    const url = environment.baseUrl + '/contacts/';
    return this.http.post(url, contact);
  }

  editContact(contact: Contact, id: string) {
    const url = environment.baseUrl + '/contacts/' + id + '/';
    return this.http.put(url, contact);
  }

  deleteContact( id: string) {
    const url = environment.baseUrl + '/contacts/' + id + '/';
    return this.http.delete(url);
  }
}
