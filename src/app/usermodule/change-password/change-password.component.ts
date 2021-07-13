import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private rbservice: RbService, private toaster: ToastrService) { }
  public confirm = this.fb.group({
    Password: ['', [Validators.required]],
    Conpassword: ['', [Validators.required]]
  });
  ngOnInit(): void {
  }
  // convenience getter for easy access to form fields
  get getControl(): any {
    return this.confirm.controls;
  }
  confirmPass(): any {
    const passData =
    {
      RBAuthKey: 'RBDWAh!Q1s74e',
      user_id: atob(localStorage.getItem('id')),
      Pat_status: '0',
      Password: this.confirm.controls.Password.value
    };
    this.rbservice.postService('Patient/ChangePwd', passData)
      .subscribe((res: any) => {
        console.log(res);
        this.toaster.success(res.message);
        this.confirm.reset();
      });
  }
}
