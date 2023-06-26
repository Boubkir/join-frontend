import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatcyComponent } from './privatcy.component';

describe('PrivatcyComponent', () => {
  let component: PrivatcyComponent;
  let fixture: ComponentFixture<PrivatcyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivatcyComponent]
    });
    fixture = TestBed.createComponent(PrivatcyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
