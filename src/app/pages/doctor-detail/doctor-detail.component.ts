import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {
doctorData: any;
  constructor(private aroute: ActivatedRoute, private rbservice: RbService) { }

  ngOnInit(): void {
    this.doctorProfile();
  }
  // this is for viewing doctor profile
  doctorProfile(): any {
    this.aroute.params.subscribe(
      (res: any) => {
        console.log('>>>>>>>>>>>>', JSON.parse(atob(res.data)));
        this.doctorData = JSON.parse(atob(res.data));
      }
    );
  }
}
