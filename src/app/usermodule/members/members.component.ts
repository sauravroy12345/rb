import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  familyMemberList: any = [];
  patientData: any;
  constructor(private rbservice: RbService, private router: Router) {
    rbservice.patientData;
  }

  ngOnInit(): void {
    this.DefaultProfile();
    this.getAllProfile();
  }
  // for default profile
  DefaultProfile(): any {
    this.rbservice.addClass();
    const UserData = {
      RBAuthKey: 'RBDWAh!Q1s74e', user_id: JSON.parse(localStorage.getItem('patientData')).user_id,
      mobile_no: JSON.parse(localStorage.getItem('patientData')).mobile_no
    };
    this.rbservice.postService('Patient/DefaultProfile', UserData)
      .subscribe((res: any) => {
        this.rbservice.removeClass();
        this.memberChange(res.user_id);

      },
        (err: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 5000);
        });
  }
  // to create dropdown of family member
  getAllProfile(): any {
    this.rbservice.addClass();
    const UserData = { RBAuthKey: 'RBDWAh!Q1s74e', user_id: '', mobile_no: JSON.parse(localStorage.getItem('patientData')).mobile_no };
    this.rbservice.postService('Patient/Profile', UserData)
      .subscribe((res: any) => {
        this.rbservice.removeClass();
        // console.log(res);
        // for pushing data to dropdown
        for (let i = 0; i < res.data.length; i++) {
          this.familyMemberList.push({ user_id: res.data[i].user_id, name: res.data[i].PFirstName + ' ' + res.data[i].PLastName });
        }
      },
        (err: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 5000);
        });
  }
  // to show family member
  memberChange(id): any {
    this.rbservice.addClass();
    const UserData = { RBAuthKey: 'RBDWAh!Q1s74e', user_id: id, mobile_no: '' };
    this.rbservice.postService('Patient/Profile', UserData)
      .subscribe((res: any) => {
        this.rbservice.removeClass();
        // console.log('event', res);
        if (res.data !== null) {
          this.patientData = res.data[0];
        }
      },
        (err: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 5000);
        });
  }
  editAddress(): any {
    this.router.navigateByUrl('/users/sidenav/add-member/' + btoa(JSON.stringify(this.patientData)));
  }
}
