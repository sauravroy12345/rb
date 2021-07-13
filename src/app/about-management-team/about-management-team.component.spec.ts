import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutManagementTeamComponent } from './about-management-team.component';

describe('AboutManagementTeamComponent', () => {
  let component: AboutManagementTeamComponent;
  let fixture: ComponentFixture<AboutManagementTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutManagementTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutManagementTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
