import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('char_input') digit0: ElementRef;
  @ViewChild('dig_1_input') digi1: ElementRef;
  @ViewChild('dig_2_input') digi2: ElementRef;
  @ViewChild('dig_3_input') digi3: ElementRef;
  dataReport: any = [];
  finacialYear: any = [];
  isReadMore = true;
  selectedName = '';
  constructor(private fb: FormBuilder, private rbservice: RbService) { }
  public reportForm = this.fb.group({
    first: ['', [Validators.required]],
    secondDigit: ['', [Validators.required, Validators.pattern('^(3[01]|[12][0-9]|[1-9])$')]],
    thirdDigit: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
    sur_name: ['', Validators.required],
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
      FYear: this.reportForm.controls.FYear.value,
      sur_name: this.reportForm.controls.sur_name.value
    };
    this.rbservice.addClass();
    console.log(data);
    this.rbservice.postService('Patient/ReportData', data)
      .subscribe((res: any) => {
        console.log(res);
        // ELEMENT_DATA = res.data;
        this.rbservice.removeClass();
        this.dataReport = res.data;
        for (let i = 0; i < res.data.length; i++) {
          // tslint:disable-next-line:radix
          this.dataReport[i].DueAmt = parseInt(res.data[i].DueAmt);
        }
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
  // toggle read more
  // showText(): any {
  //   // console.log(name);
  //   // this.selectedName = name;
  //   this.isReadMore = !this.isReadMore;
  // }
  keyup1(val): any {
    if (val.length === 2) {
      this.digi1.nativeElement.focus();
    }
  }
  keyup2(val): any {
    if (val.length === 2) {
      this.digi2.nativeElement.focus();
    }
    // else if (val.length === 0) {
    //   this.digit0.nativeElement.focus();
    // }
  }
  keyup3(val): any{
    if (val.length === 4) {
      this.digi3.nativeElement.focus();
    }
  }
  downloadURI(uri, name): any {
    const link = document.createElement('a');
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    // link.remove();
  }
}
