import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskSlideComponent } from './add-task-slide.component';

describe('AddTaskSlideComponent', () => {
  let component: AddTaskSlideComponent;
  let fixture: ComponentFixture<AddTaskSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskSlideComponent]
    });
    fixture = TestBed.createComponent(AddTaskSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
