import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private rbservice: RbService, private toaster: ToastrService) {
    if (rbservice.loggedIn) {
      this.router.navigateByUrl('users/sidenav/user-dashboard/' + localStorage.getItem('id') );
    }
   }
  public loginForm = this.fb.group({
    LoginType: ['', [Validators.required]],
    mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    password: ['', [Validators.required]]
  });
  ngOnInit(): void {
  }
  // convenience getter for easy access to form fields
  get getControl(): any {
    return this.loginForm.controls;
  }
  onLogin(): any {
    const loginData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      LoginType: this.loginForm.controls.LoginType.value,
      mobile_no: this.loginForm.controls.mobile_no.value,
      password: this.loginForm.controls.password.value,
      deviceid: ''
    };
    console.log(this.loginForm);
    this.rbservice.postService('UserLogin', loginData)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 'success') {
          localStorage.setItem('id' , btoa(res.user_id));
          this.router.navigateByUrl('users/sidenav/user-dashboard/' + btoa(res.user_id) );
        } else {
          this.toaster.success(res.message);
        }
      },
      (err: any) => {
        console.log(err);
      });
  }
}
