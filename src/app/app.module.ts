import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { P404Component } from './p404/p404.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ServiceImagingComponent } from './service-imaging/service-imaging.component';
import {MatExpansionModule} from '@angular/material/expansion';
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
import { ToastrModule } from 'ngx-toastr';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { UsermoduleModule } from './usermodule/usermodule.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    P404Component,
    NavbarComponent,
    ServiceImagingComponent,
    ServiceCardiologyComponent,
    ServiceNeurologyComponent,
    ServicePathologyComponent,
    ServiceComponent,
    AboutWhyRbComponent,
    AboutOverviewsComponent,
    AboutManagementTeamComponent,
    AboutInhouseDoctorComponent,
    CentersComponent,
    FaqComponent,
    ContactComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    // UsermoduleModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    ToastrModule.forRoot({
      // timeOut: 5000,
      disableTimeOut: true,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
