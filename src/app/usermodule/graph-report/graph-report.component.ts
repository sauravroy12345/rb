import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-graph-report',
  templateUrl: './graph-report.component.html',
  styleUrls: ['./graph-report.component.css']
})
export class GraphReportComponent implements OnInit {
  userId = atob(localStorage.getItem('id'));
  graphReportData: any = [];
  familyMemberList: any = [];
  constructor(private rbservice: RbService, private router: Router) { }

  ngOnInit(): void {
    this.allGraphReport();
    this.getAllProfile();
  }
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
  // report
  allGraphReport(): any {
    this.rbservice.addClass();
    const graphData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      user_id: 'PRB0140236'
    };
    this.rbservice.postService('Patient/Graph', graphData)
      .subscribe((res: any) => {
        console.log(res);
        this.rbservice.removeClass();
        this.graphReportData = res.data;
      });
  }
  memberChange(id): any {
    this.rbservice.addClass();
    const graphData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      user_id: id
    };
    this.rbservice.postService('Patient/Graph', graphData)
      .subscribe((res: any) => {
        console.log(res);
        this.rbservice.removeClass();
        this.graphReportData = res.data;
      },
        (err: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 5000);
        });
  }
}
