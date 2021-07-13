import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdAppointmentListComponent } from './opd-appointment-list.component';

describe('OpdAppointmentListComponent', () => {
  let component: OpdAppointmentListComponent;
  let fixture: ComponentFixture<OpdAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
