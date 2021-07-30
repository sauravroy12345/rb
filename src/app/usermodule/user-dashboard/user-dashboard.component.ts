import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RbService } from 'src/app/rb.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userIid: any;
  patientData: any;
  constructor(private aroute: ActivatedRoute, private rbservice: RbService, private router: Router) {   }

  ngOnInit(): void {
    this.aroute.params.subscribe(
      (res: any) => {
        this.userIid = atob(res.id);
      }
    );
    if (atob(localStorage.getItem('id')) === this.userIid) {
      this.profileData();
    } else {
      this.router.navigateByUrl('users/login');
    }
  }
  profileData(): any {
    this.rbservice.addClass();
    const UserData = { RBAuthKey: 'RBDWAh!Q1s74e', user_id: this.userIid, mobile_no: '' };
    this.rbservice.postService('Patient/Profile', UserData)
      .subscribe((res: any) => {
        this.rbservice.removeClass();
        console.log(res);
        if (res.data !== null) {
          this.patientData = res.data[0];
          localStorage.setItem('patientData', JSON.stringify(res.data[0]));
          this.rbservice.sendMessage(res.data[0].PFirstName + ' ' + res.data[0].PLastName);
        }
      },
        (err: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 5000);
        });
  }
}
