import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { P404Component } from './p404/p404.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceImagingComponent } from './service-imaging/service-imaging.component';
import { ServiceCardiologyComponent } from './service-cardiology/service-cardiology.component';
import { ServiceNeurologyComponent } from './service-neurology/service-neurology.component';
import { ServicePathologyComponent } from './service-pathology/service-pathology.component';
import { ServiceComponent } from './service/service.component';
import { AboutWhyRbComponent } from './about-why-rb/about-why-rb.component';
import { AboutOverviewsComponent } from './about-overviews/about-overviews.component';
import { AboutManagementTeamComponent } from './about-management-team/about-management-team.component';
import { AboutInhouseDoctorComponent } from './about-inhouse-doctor/about-inhouse-doctor.component';
import { CentersComponent } from './centers/centers.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ChangePasswordComponent } from './usermodule/change-password/change-password.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'services/:title',
        component: ServiceImagingComponent
      },
      {
        path: 'service-cardiology',
        component: ServiceCardiologyComponent
      },
      {
        path: 'service-neurology',
        component: ServiceNeurologyComponent
      },
      {
        path: 'service-pathology',
        component: ServicePathologyComponent
      },
      {
        path: 'services',
        component: ServiceComponent
      },
      {
        path: 'about-why-rb',
        component: AboutWhyRbComponent
      },
      {
        path: 'about-overview',
        component: AboutOverviewsComponent
      },
      {
        path: 'about-management-team',
        component: AboutManagementTeamComponent
      },
      {
        path: 'about-inhouse-doctor',
        component: AboutInhouseDoctorComponent
      },
      {
        path: 'centers',
        component: CentersComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'appointment',
        component: AppointmentComponent
      },
      {
        path: 'change-password/:id',
        component: ChangePasswordComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./usermodule/usermodule.module').then(u => u.UsermoduleModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(page => page.PagesModule)
      }
    ]
  },
  {
    path: '**',
    component: P404Component
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {






}

