import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { B2bComponent } from './b2b/b2b.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { QualityComponent } from './quality/quality.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeCollectionComponent } from './home-collection/home-collection.component';
import { ReportComponent } from './report/report.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RateListComponent } from './rate-list/rate-list.component';



@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorDetailComponent,
    B2bComponent,
    PackageDetailsComponent,
    PackagesListComponent,
    QualityComponent,
    PaymentComponent,
    HomeCollectionComponent,
    ReportComponent,
    EnquiryComponent,
    RateListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    Ng2SearchPipeModule
  ],
  exports: [DoctorListComponent, ReportComponent],
  providers: [DatePipe]
})
export class PagesModule { }
