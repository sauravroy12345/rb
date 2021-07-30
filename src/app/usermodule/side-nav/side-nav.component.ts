import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from 'src/app/class/common';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {


  // sidenav: any = false;
  isOpen = true;
  activeValue = 0;
  constructor(private router: Router, private rbservice: RbService , private common: Common) {
    common.loggedOut();
  }

  ngOnInit(): void {
  }
  logout(): any {
    localStorage.removeItem('id');
    localStorage.removeItem('patientData');
    this.rbservice.sendMessage(undefined);
    this.router.navigateByUrl('users/login');
  }

  tab(): any {
    const $sidebar = document.getElementsByClassName('sidebar');
    const $sidebarItemTitles = document.getElementsByClassName('sidebar-item-title');
    if (this.isOpen) {
      $sidebarItemTitles[0].classList.add('hide');
      $sidebar[0].classList.remove('expanded');
      // (document.querySelector('.page-content') as HTMLElement).style.marginLeft = '3%';
    } else {
      $sidebarItemTitles[0].classList.remove('hide');
      $sidebar[0].classList.add('expanded');
      // (document.querySelector('.page-content') as HTMLElement).style.marginLeft = '18%';
    }
    this.isOpen = !this.isOpen;
  }
  activeClass(val): any {
    this.activeValue = val;
  }
  @HostListener('window:scroll', ['$event'])
  dotheJob(event): any {
    const sidebar  = document.getElementsByClassName('sidebar');
    if (window.pageYOffset > 112){
      sidebar [0].classList.add('fixed');
      (document.querySelector('.page-content') as HTMLElement).style.marginLeft = '18%';
      (document.querySelector('.sidebar') as HTMLElement).style.height = '100%';

    }
    else {
      sidebar[0].classList.remove('fixed');
      (document.querySelector('.page-content') as HTMLElement).style.marginLeft = '0%';
      (document.querySelector('.sidebar') as HTMLElement).style.height = '100vh';
      }
  }
}
