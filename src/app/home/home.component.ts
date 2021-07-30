import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RbService } from '../rb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notification: any = [];
  bannerInfo: any;
  testData: any = [];
  dataSet: any = [{newData: []}];
  DepartmentSpecialityList = [];
  branchist = [];
  areaList = [];
  constructor(private config: NgbCarouselConfig, private rbservice: RbService, private router: Router, private fb: FormBuilder) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
  public searchDoctor = this.fb.group({
    center_id: [''],
    specialization_id: [''],
    area_id: [''],
    search_key: ['']
  });
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoWidth: false,
    autoHeight: false,
    navSpeed: 700,
    navText: ['<i class="fa-chevron-left"></i>',
    '<i class="fa-chevron-right></i>"'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };
  ngOnInit(): void {
    this.bannerData();
    this.specialityOfDoctor();
    this.areaLIst();
    this.allBranchList();
    this.testList();
    this.notificationData();
  }
  bannerData(): any {
    this.rbservice.postService('getBanner', '')
      .subscribe((res: any) => {
        console.log(res.user);
        this.bannerInfo = res.user;
      });
  }
  testList(): any {
    this.rbservice.addClass();
    const ServiceData = { RBAuthKey: 'RBDWAh!Q1s74e', Center_ID: '', search_key: '' };
    this.rbservice.postService('RBD/Service', ServiceData)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.rbservice.removeClass();
          this.testData = res.data.filter(e => e.Package === 'Y');
          console.log('>>>>>' , this.dataSet);
          console.log('fdddddddddddddd', this.testData);
        }
      },
        (err: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 4000);
        });
  }
  // for viewing details
  packageDetails(data: any): any {
    console.log(data);
    this.router.navigateByUrl('pages/packages-details/' + data.service_id);
  }
  book(data: any): any {
    this.router.navigate(['/pages/home-collection/' + btoa(JSON.stringify(data))]);
  }
    // for center list
    allBranchList(): any {
      const CentrelistData = { RBAuthKey: 'RBDWAh!Q1s74e' };
      this.rbservice.postService('Doctor/Centre', CentrelistData).subscribe(
        (res: any) => {
          // console.log(res);
          this.branchist = res.data;
        }
      );
    }
    // area list
    areaLIst(): any {
      const arealistData = { RBAuthKey: 'RBDWAh!Q1s74e' };
      this.rbservice.postService('Doctor/Area', arealistData).subscribe(
        (res: any) => {
          // console.log(res);
          this.areaList = res.data;
        }
      );
    }
    // department list
    specialityOfDoctor(): any {
      const specialitylistData = { RBAuthKey: 'RBDWAh!Q1s74e' };
      this.rbservice.postService('Doctor/Speciality', specialitylistData).subscribe(
        (res: any) => {
          // console.log(res);
          this.DepartmentSpecialityList = res.data;
        }
      );
    }
      // for search of doctor
  doctorSearch(): any {
    const searchData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      center_id: this.searchDoctor.controls.center_id.value,
      specialization_id: this.searchDoctor.controls.specialization_id.value,
      area_id: this.searchDoctor.controls.area_id.value,
      search_key: this.searchDoctor.controls.search_key.value
    };
    this.router.navigate(['/pages/doctor-list/' + btoa(JSON.stringify(searchData))]);
  }
  notificationData(): any {
    this.rbservice.postService('getNotification' , '')
      .subscribe((res: any) => {
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh', res.userdata);
        this.notification = res.userdata;
      });
  }
}
