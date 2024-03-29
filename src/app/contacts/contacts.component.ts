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
  showContact: boolean = false;

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
    this.showContact = true;
  }

  async addContactSlider() {
    this.addContactSlide = !this.addContactSlide;
    if(this.addContactSlide){
      document.body.classList.add('fixed')
    }else{
      document.body.classList.remove('fixed')
    }
    await this.loadContacts();
  }

  async editContactSlider() {
    this.editContactSlide = !this.editContactSlide;
        if (this.editContactSlide) {
          document.body.classList.add('fixed');
        } else {
          document.body.classList.remove('fixed');
        }
    await this.loadContacts();
  }

  onCurrentContactUpdated(contact: Contact) {
    this.selectedContact = contact;
  }

  isShowContact() {
    this.showContact = false;
  }
}
