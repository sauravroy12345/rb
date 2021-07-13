import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  sidenav: any = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout(): any {
    localStorage.removeItem('id');
    localStorage.removeItem('patientData');
    this.router.navigateByUrl('users/login');
  }
  // openNav(): any {
  //   this.sidenav = true;
  // }
}
