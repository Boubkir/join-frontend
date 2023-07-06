import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBigCardComponent } from './task-big-card.component';

describe('TaskBigCardComponent', () => {
  let component: TaskBigCardComponent;
  let fixture: ComponentFixture<TaskBigCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBigCardComponent]
    });
    fixture = TestBed.createComponent(TaskBigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
