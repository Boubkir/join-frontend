import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  todos: any = [];
  public hideLayout = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.todos = await this.loadTodos();
    this.hideLayout = false;
    console.log(this.todos);
  }

  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url));
  }
}
