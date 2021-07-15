import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RbService } from '../rb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nameOfUser: string;
  constructor(private breakpointObserver: BreakpointObserver, private rbservice: RbService, private router: Router) { }
  ngOnInit(): void {
    console.log(this.nameOfUser);

    // throw new Error('Method not implemented.');
    if (localStorage.getItem('patientData') !== null) {
      this.nameOfUser = JSON.parse(localStorage.getItem('patientData')).PFirstName + ' ' +
        JSON.parse(localStorage.getItem('patientData')).PLastName;
      console.log(this.nameOfUser);
    }
  }
  logout(): any {
    localStorage.removeItem('id');
    localStorage.removeItem('patientData');
    this.router.navigateByUrl('users/login');
  }

}
