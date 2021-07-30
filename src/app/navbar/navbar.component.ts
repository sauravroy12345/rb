import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RbService } from '../rb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  nameOfUser: string;
  subscription: Subscription;
  constructor(private breakpointObserver: BreakpointObserver, private rbservice: RbService, private router: Router) {
    this.subscription = this.rbservice.getMessage().subscribe(message => {
      if (message) {
        this.nameOfUser = message;
      } else {
        // clear messages when empty message received
        this.nameOfUser = undefined;
      }
    });
  }
  ngOnInit(): void {
    // // throw new Error('Method not implemented.');
    if (localStorage.getItem('patientData') !== null) {
      this.nameOfUser = JSON.parse(localStorage.getItem('patientData')).PFirstName + ' ' +
        JSON.parse(localStorage.getItem('patientData')).PLastName;
    }

  }
  logout(): any {
    localStorage.removeItem('id');
    localStorage.removeItem('patientData');
    this.rbservice.sendMessage(undefined);
    this.router.navigateByUrl('users/login');

  }

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  @HostListener('window:scroll', ['$event'])
  dotheJob(event): any {
    const header = document.getElementsByClassName('header');
    if (window.pageYOffset > 112){
      header[0].classList.add('fixed');
      (document.querySelector('.fixed-logo') as HTMLElement).style.display = 'block';
    }
    else {
          header[0].classList.remove('fixed');
          (document.querySelector('.fixed-logo') as HTMLElement).style.display = 'none';
        }
    }
}
