import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctorList: any = [];
  routeSearchData: any;
  doctorDetailsData: any;
  DepartmentSpecialityList = [];
  branchist = [];
  areaList = [];
  doctorName = '';
  centerId = '';
  areaId = '';
  specializationId = '';
  constructor(private rbservice: RbService, private router: Router, private aroute: ActivatedRoute, private modalservice: NgbModal) { }

  ngOnInit(): void {
    this.specialityOfDoctor();
    this.areaLIst();
    this.allBranchList();
    // search data
    this.aroute.params.subscribe(
      (res: any) => {
        if (Object.keys(res).length !== 0) {
          console.log(JSON.parse(atob(res.data)));
          this.routeSearchData = JSON.parse(atob(res.data));
          this.areaId = this.routeSearchData.area_id;
          this.specializationId = this.routeSearchData.specialization_id;
          this.centerId = this.routeSearchData.center_id;
          this.doctorName = this.routeSearchData.search_key;
          this.byDefaultdoctorSearch(this.routeSearchData);
        } else {
          this.getAllDoctors();
        }
      }
    );
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
          if (res.data[i].DocPicture === 'null') {
          } else {
            const image = new Image();
            const img = res.data[i].DocPicture.replaceAll(' ', '+');
            image.src = 'data:image/png;base64,' + img;
            res.data[i].DocPicture = image.src;
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
        if (res.status === 'Succesful') {
          if (res.data !== '') {
            this.rbservice.removeClass();
            this.doctorList = res.data;
          } else {
            this.doctorList = [];
          }
        }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].DocPicture === 'null' || res.data[i].DocPicture === null) {
          } else {
            const image = new Image();
            const img = res.data[i].DocPicture.replaceAll(' ', '+');
            image.src = 'data:image/png;base64,' + img;
            res.data[i].DocPicture = image.src;
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
  byDefaultdoctorSearch(data): any {
    this.rbservice.addClass();
    // console.log(JSON.stringify(searchData));
    this.rbservice.postService('Doctor/Search', data).subscribe(
      (res: any) => {
        if (res.status === 'Succesful') {
          if (res.data !== '') {
            this.rbservice.removeClass();
            this.doctorList = res.data;
          } else {
            this.doctorList = [];
          }
        }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].DocPicture === 'null' || res.data[i].DocPicture === null) {
          } else {
            const image = new Image();
            const img = res.data[i].DocPicture.replaceAll(' ', '+');
            image.src = 'data:image/png;base64,' + img;
            res.data[i].DocPicture = image.src;
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
  open(content, item: any): any {
    console.log(item);
    this.doctorDetailsData = item;
    this.modalservice.open(content, { centered: true });
  }
}
