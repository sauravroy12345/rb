import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { MatTableDataSource } from '@angular/material/table';
import { RbService } from 'src/app/rb.service';

// const ELEMENT_DATA: any = [
// ];

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataReport: any = [];
  finacialYear: any = [];
  constructor(private fb: FormBuilder, private rbservice: RbService) { }
  public reportForm = this.fb.group({
    first: ['', [Validators.required, Validators.pattern('[A-Z]{2}')]],
    secondDigit: ['', [Validators.required, Validators.pattern('^(3[01]|[12][0-9]|[1-9])$')]],
    thirdDigit: ['', [Validators.required]],
    FYear: ['']
  });
  ngOnInit(): void {
    this.finalCialYear();
  }
  get getControl(): any {
    return this.reportForm.controls;
  }

  reportShow(): any {
    // console.log(this.reportForm.value);
    const data = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      Bill_id: (this.reportForm.controls.first.value).toUpperCase() + this.reportForm.controls.secondDigit.value + '-' +
        this.reportForm.controls.thirdDigit.value,
        FYear: this.reportForm.controls.FYear.value
    };
    this.rbservice.addClass();
    console.log(data);
    this.rbservice.postService('Patient/ReportDataByID', data)
      .subscribe((res: any) => {
        console.log(res);
        // ELEMENT_DATA = res.data;
        this.rbservice.removeClass();
        this.dataReport = res.data;
        // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      });
  }
    // to get finalcial date
    finalCialYear(): any {
      const authdata = { RBAuthKey: 'RBDWAh!Q1s74e' };
      this.rbservice.postService('RBD/FinancialYears', authdata)
        .subscribe((res: any) => {
          // console.log(res);
          this.finacialYear = res.data;
        });
    }
}
