import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceNeurologyComponent } from './service-neurology.component';

describe('ServiceNeurologyComponent', () => {
  let component: ServiceNeurologyComponent;
  let fixture: ComponentFixture<ServiceNeurologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceNeurologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceNeurologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
