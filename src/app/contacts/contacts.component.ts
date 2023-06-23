import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  contacts: any = [];
  public hideLayout = false;
  constructor(private data:DataService){}

 async ngOnInit() {
    this.contacts = await this.data.loadContacts()
    this.hideLayout = false;
  }
}
