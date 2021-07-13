import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutInhouseDoctorComponent } from './about-inhouse-doctor.component';

describe('AboutInhouseDoctorComponent', () => {
  let component: AboutInhouseDoctorComponent;
  let fixture: ComponentFixture<AboutInhouseDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutInhouseDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutInhouseDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
