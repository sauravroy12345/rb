import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-patient-report-list',
  templateUrl: './patient-report-list.component.html',
  styleUrls: ['./patient-report-list.component.css']
})
export class PatientReportListComponent implements OnInit {
  familyMemberList: any = [];
  patientPastReportArr: any = [];
  // finacialYear: any = [];
  maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  minDate = this.datePipe.transform(new Date().setFullYear(new Date().getFullYear() - 1), 'yyyy-MM-dd');
  // for formdate
  maxDate1 = this.datePipe.transform(new Date().setFullYear(new Date().getFullYear() + 5), 'yyyy-MM-dd');
  minDate1 = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private rbservice: RbService, private router: Router, private datePipe: DatePipe, private fb: FormBuilder) { }
  // form validation
  public pastReport = this.fb.group({
    RBAuthKey: ['RBDWAh!Q1s74e'],
    user_id: [''],
    From_date: [this.datePipe.transform(new Date().setMonth(new Date().getMonth(), 1), 'yyyy-MM-dd')],
    To_date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
  });
  ngOnInit(): void {
    this.getAllProfile();
    this.defaultPastReport();
    this.finalcialDate();
  }
  // to create finalcial date
  finalcialDate(): any {
    const finacialYear = [];
    const year = new Date().getFullYear();
    for (let i = 2015; i <= year; i++) {
      finacialYear.push(i.toString() + '-' + (i + 1).toString().substr(-2));
    }
    return console.log(finacialYear);
  }
  // to create finalcial date

  // to create dropdown of family member
  getAllProfile(): any {
    this.rbservice.addClass();
    const UserData = { RBAuthKey: 'RBDWAh!Q1s74e', user_id: '', mobile_no: JSON.parse(localStorage.getItem('patientData')).mobile_no };
    this.rbservice.postService('Patient/Profile', UserData)
      .subscribe((res: any) => {
        this.rbservice.removeClass();
        // console.log(res);
        // for pushing data to dropdown
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < res.data.length; i++) {
          this.familyMemberList.push({ user_id: res.data[i].user_id, name: res.data[i].PFirstName + ' ' + res.data[i].PLastName });
        }
      },
        (err: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 5000);
        });
  }
  // for default patient
  defaultPastReport(): any {
    const pastReportData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      user_id: 'PRB0140236',
      // From_date: this.datePipe.transform(this.pastReport.controls.From_date.value , 'dd-MM-yyyy'),
      // To_date: this.datePipe.transform(this.pastReport.controls.To_date.value , 'dd-MM-yyyy'),
      From_date: '01-04-2021',
      To_date: '31-05-2021'
    };
    this.rbservice.postService('Patient/ReportList', pastReportData)
      .subscribe((res: any) => {
        console.log(res);
        this.patientPastReportArr = res.data;
      });
  }
  // for default patient

  memberChange(id): any {
    const pastReportData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      user_id: id,
      From_date: this.datePipe.transform(this.pastReport.controls.From_date.value, 'dd-MM-yyyy'),
      To_date: this.datePipe.transform(this.pastReport.controls.To_date.value, 'dd-MM-yyyy'),
    };
    console.log('>>>>>>>>>>>>>>>>', pastReportData);

  }
}
