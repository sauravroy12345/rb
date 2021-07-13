import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePathologyComponent } from './service-pathology.component';

describe('ServicePathologyComponent', () => {
  let component: ServicePathologyComponent;
  let fixture: ComponentFixture<ServicePathologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicePathologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePathologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
