import { Component } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  groupedUsers: any = {};
  contacts: any = [];
  sortedContacts: any = [];
  selectedContact: Contact;
  addContactSlide: boolean = false;
  editContactSlide: boolean = false;
  h1 = 'Contacts';
  motto = 'Better with a team';

  constructor(private data: SharedDataService) {}

  async ngOnInit() {
    this.loadContacts();
  }

  async loadContacts() {
    this.contacts = await this.data.loadContacts();
    this.sortContacts();
    if (!this.selectedContact) {
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

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    console.log(this.selectedContact);
  }

  async addContactSlider() {
    this.addContactSlide = !this.addContactSlide;
    await this.loadContacts();
    console.log('yeah');
  }

  async editContactSlider() {
    this.editContactSlide = !this.editContactSlide;
    await this.loadContacts();
  }

  onCurrentContactUpdated(contact: Contact) {
    this.selectedContact = contact;
    console.log('Wasgeht');
  }
}
