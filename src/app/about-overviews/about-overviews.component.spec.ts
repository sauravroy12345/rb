import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOverviewsComponent } from './about-overviews.component';

describe('AboutOverviewsComponent', () => {
  let component: AboutOverviewsComponent;
  let fixture: ComponentFixture<AboutOverviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutOverviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutOverviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
