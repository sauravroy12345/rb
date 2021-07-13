import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutWhyRbComponent } from './about-why-rb.component';

describe('AboutWhyRbComponent', () => {
  let component: AboutWhyRbComponent;
  let fixture: ComponentFixture<AboutWhyRbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutWhyRbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutWhyRbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
