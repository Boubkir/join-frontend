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
  groupedUsers: any = {};
  contacts: any = [];
  sortedContacts: any = [];
  h1 = 'Contacts';
  motto = 'Better with a team';
  selectedContact: any;

  constructor(private data: DataService) {}

  async ngOnInit() {
    this.contacts = await this.data.loadContacts();
    this.sortContacts();
     if (this.contacts.length > 0) {
       this.selectedContact = this.contacts[0];
     }
  }

  sortContacts() {
    this.contacts.sort((a: any, b: any) => {
      const nameA = a.first_name.toUpperCase();
      const nameB = b.first_name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  showLetter(currentLetter: string, previousLetter: string): boolean {
    return currentLetter !== previousLetter;
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
  }
}
