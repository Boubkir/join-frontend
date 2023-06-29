import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactSlideComponent } from './edit-contact-slide.component';

describe('EditContactSlideComponent', () => {
  let component: EditContactSlideComponent;
  let fixture: ComponentFixture<EditContactSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContactSlideComponent]
    });
    fixture = TestBed.createComponent(EditContactSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
