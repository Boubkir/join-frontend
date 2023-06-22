import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  todos: any = [];
  open: any = [];
  inProgress: any = [];
  awaitingFeedback: any = [];
  done: any = [];
  urgent: any = [];
  public hideLayout = false;
  h1 = 'Summary';
  motto = 'Everything in a nutshell!';

  constructor(private http: HttpClient,private data:DataService) {}

  async ngOnInit() {
    this.todos = await this.data.loadTodos();
    this.filterTodos();
    this.hideLayout = false;
    console.log(this.todos);
  }

  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url));
  }

  filterTodos(){
       this.open = this.todos.filter((t: any) => t['status'] == 'open');
       this.inProgress = this.todos.filter(
         (t: any) => t['status'] == 'inprogress'
       );
       this.awaitingFeedback = this.todos.filter(
         (t: any) => t['status'] == 'awaitingfeedback'
       );
       this.done = this.todos.filter((t: any) => t['status'] == 'done');
       this.urgent = this.todos.filter((t: any) => t['priority'] == 'urgent');
  }

  // upcoming = this.todos.sort(function (a: any, b: any) {
  //   let x: any = new Date(a['due_date']);
  //   let y: any = new Date(b['due_date']);
  //   return x - y;
  // });
  // deadline = new Date(this.upcoming[0]['due_date']).toString().slice(0, 16);
}
