import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RbService } from 'src/app/rb.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-opd-appointment-list',
  templateUrl: './opd-appointment-list.component.html',
  styleUrls: ['./opd-appointment-list.component.css']
})
export class OpdAppointmentListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  fromDate: any = this.datePipe.transform( new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd');
  toDate: any = this.datePipe.transform( new Date(), 'yyyy-MM-dd');
  constructor(private rbservice: RbService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.patientOpdAppointmentList();
    console.log('>>>>>>>>>>>>', this.toDate);
    console.log('>>>>>>>>>>>><<<<<<<<<<<<<<<', this.fromDate);
  }
  patientOpdAppointmentList(): any {
    const opdData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      user_id: atob(localStorage.getItem('id')),
      from_date: '01-02-2021',
      to_date: '2021-02-07'
    };
    this.rbservice.postService('OPD/OPDBookingHistory', opdData)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
