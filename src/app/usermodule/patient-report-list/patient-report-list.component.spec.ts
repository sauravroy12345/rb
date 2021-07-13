import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReportListComponent } from './patient-report-list.component';

describe('PatientReportListComponent', () => {
  let component: PatientReportListComponent;
  let fixture: ComponentFixture<PatientReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
