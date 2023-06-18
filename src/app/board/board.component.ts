import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  public hideLayout = false;

  ngOnInit() {
    this.hideLayout = false;
  }
}
