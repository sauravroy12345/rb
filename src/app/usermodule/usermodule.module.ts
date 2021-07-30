import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UsermoduleRoutingModule } from './usermodule-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PagesModule } from '../pages/pages.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OpdAppointmentListComponent } from './opd-appointment-list/opd-appointment-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MembersComponent } from './members/members.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { GraphReportComponent } from './graph-report/graph-report.component';
import { PatientReportListComponent } from './patient-report-list/patient-report-list.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, UserDashboardComponent,
     SideNavComponent,
    ChangePasswordComponent,
    OpdAppointmentListComponent,
    MembersComponent,
    AddMembersComponent,
    GraphReportComponent,
    PatientReportListComponent],
  imports: [
    CommonModule,
    UsermoduleRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    PagesModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [DatePipe],
  exports: [ChangePasswordComponent]
})
export class UsermoduleModule { }
