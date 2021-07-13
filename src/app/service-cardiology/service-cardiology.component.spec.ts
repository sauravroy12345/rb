import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCardiologyComponent } from './service-cardiology.component';

describe('ServiceCardiologyComponent', () => {
  let component: ServiceCardiologyComponent;
  let fixture: ComponentFixture<ServiceCardiologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCardiologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCardiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
