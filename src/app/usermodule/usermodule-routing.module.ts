import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorListComponent } from '../pages/doctor-list/doctor-list.component';
import { ReportComponent } from '../pages/report/report.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GraphReportComponent } from './graph-report/graph-report.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { OpdAppointmentListComponent } from './opd-appointment-list/opd-appointment-list.component';
import { PatientReportListComponent } from './patient-report-list/patient-report-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sidenav',
    component: SideNavComponent,
    children: [
      {
        path: 'user-dashboard/:id',
        component: UserDashboardComponent,
      },
      {
        path: 'doctor-list',
        component: DoctorListComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'reportList',
        component: ReportComponent
      },
      {
        path: 'opd-appoint-list',
        component: OpdAppointmentListComponent
      },
      {
        path: 'view-members',
        component: MembersComponent
      },
      {
        path: 'add-member',
        component: AddMembersComponent
      },
      {
        path: 'add-member/:data',
        component: AddMembersComponent
      },
      {
        path: 'graph-report',
        component: GraphReportComponent
      },
      {
        path: 'past-report-list',
        component: PatientReportListComponent
      }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermoduleRoutingModule { }
