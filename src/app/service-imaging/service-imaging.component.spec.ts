import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceImagingComponent } from './service-imaging.component';

describe('ServiceImagingComponent', () => {
  let component: ServiceImagingComponent;
  let fixture: ComponentFixture<ServiceImagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceImagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceImagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
