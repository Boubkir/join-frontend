import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactSlideComponent } from './add-contact-slide.component';

describe('AddContactSlideComponent', () => {
  let component: AddContactSlideComponent;
  let fixture: ComponentFixture<AddContactSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContactSlideComponent]
    });
    fixture = TestBed.createComponent(AddContactSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
