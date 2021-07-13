import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { B2bComponent } from './b2b/b2b.component';
// import { DoctorDetailsComponent } from '../doctor-details/doctor-details.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { HomeCollectionComponent } from './home-collection/home-collection.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { PaymentComponent } from './payment/payment.component';
import { QualityComponent } from './quality/quality.component';
import { RateListComponent } from './rate-list/rate-list.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'doctor-list',
    pathMatch: 'full'
  },
  {
    path: 'doctor-list',
    component: DoctorListComponent
  },
  {
    path: 'doctor-detail/:data',
    component: DoctorDetailComponent
  },
  {
    path: 'quality',
    component: QualityComponent
  },
  {
    path: 'b2b',
    component: B2bComponent
  },
  {
    path: 'packages',
    component: PackagesListComponent
  },
  {
    path: 'packages-details',
    component: PackageDetailsComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'home-collection',
    component: HomeCollectionComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'enquiry',
    component: EnquiryComponent
  },
  {
    path: 'rate-chart',
    component: RateListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
