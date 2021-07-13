import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctorList: any = [];
  DepartmentSpecialityList = [];
  branchist = [];
  areaList = [];
  doctorName = '';
  centerId = '';
  areaId = '';
  specializationId = '';
  constructor(private rbservice: RbService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDoctors();
    this.specialityOfDoctor();
    this.areaLIst();
    this.allBranchList();
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
  // for all doctor list
  getAllDoctors(): any {
    this.rbservice.addClass();
    const listData = { RBAuthKey: 'RBDWAh!Q1s74e' };
    this.rbservice.postService('Doctor/List', listData).subscribe(
      (res: any) => {
        console.log(res.data);
        if (res.status === 'Succesful') {
          this.rbservice.removeClass();
          this.doctorList = res.data;
        }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < res.data.length; i++) {
          // res.data[i].DocPicture = res.data[i].DocPicture;
          if (res.data[i].DocPicture !== null) {
            const img = res.data[i].DocPicture.replaceAll(' ', '+');
            const image = new Image();
            image.src = 'data:image/png;base64,' + img;
            res.data[i].DocPicture = image.src;
            // console.log(image.src);
          }
        }
      },
      (err: any) => {
        setTimeout(() => {
          this.rbservice.removeClass();
        }, 5000);
      }
    );
  }
  // for search of doctor
  doctorSearch(): any {
    this.rbservice.addClass();
    const searchData = {
      RBAuthKey: 'RBDWAh!Q1s74e', center_id: this.centerId, specialization_id: this.specializationId, area_id: this.areaId,
      search_key: this.doctorName
    };
    // console.log(JSON.stringify(searchData));
    this.rbservice.postService('Doctor/Search', searchData).subscribe(
      (res: any) => {
        // console.log(res);
        // if (res.status === 'Succesful') {
        this.rbservice.removeClass();
        this.doctorList = res.data;
        // }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < res.data.length; i++) {
          // res.data[i].DocPicture = res.data[i].DocPicture;
          if (res.data[i].DocPicture !== null) {
            const img = res.data[i].DocPicture.replaceAll(' ', '+');
            const image = new Image();
            image.src = 'data:image/png;base64,' + img;
            res.data[i].DocPicture = image.src;
            // console.log(image.src);
          }
        }
      },
      (err: any) => {
        setTimeout(() => {
          this.rbservice.removeClass();
        }, 5000);
      }
    );
  }
  reset(): any {
    this.centerId = '';
    this.specializationId = '';
    this.areaId = '';
    this.doctorName = '';
    this.getAllDoctors();
  }
  // for viewing Profile
  viewProfile(data: any): any {
    this.router.navigate(['/pages/doctor-detail' + '/' + btoa(JSON.stringify(data))]);
  }
}
