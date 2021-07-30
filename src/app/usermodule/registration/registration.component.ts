import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RbService } from 'src/app/rb.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  otp: '';
  maxDate: any = this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd');
  constructor(private fb: FormBuilder, private rbservice: RbService, private modalService: NgbModal,
              private router: Router, private toaster: ToastrService, private datePipe: DatePipe) { }
  public userForm = this.fb.group({
    RBAuthKey: ['RBDWAh!Q1s74e'],
    channel: ['A'],
    PatType: ['P'],
    OTP: [''],
    PTitle: ['Mr.'],
    FName: ['', [Validators.required, Validators.maxLength(50)]],
    LName: ['', [Validators.required, Validators.maxLength(50)]],
    Mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    Alt_mobile_no: ['', [Validators.pattern('^[0-9]{10}$')]],
    Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    Dateofbirth: ['', [Validators.required]],
    Gender: ['M', [Validators.required]],
    Address: ['', [Validators.required, Validators.maxLength(50)]],
    Landmark: ['', Validators.maxLength(50)],
    ZipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    City: [''],
    State: [''],
    Reg_status: ['0'],
    Pat_status: ['0'],
    IsMobileregister: [''],
    Registerdate: [this.rbservice.getToday()]
  });

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get getControl(): any {
    return this.userForm.controls;
  }

  async onSubmit(content): Promise<any> {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    // console.log('>>>>>>>', this.userForm, 'aaaaaaa', this.userForm.get('Dateofbirth'));
    // console.log(JSON.stringify(this.userForm));
    const otpData = { RBAuthKey: 'RBDWAh!Q1s74e', mobile_no: (this.userForm.controls.Mobile_no.value).toString() };
    console.log(JSON.stringify(otpData));
    await this.rbservice.postService('Patient/GenerateOTP', otpData)
      .toPromise().then(async (res: any) => {
        console.log('>>>>>>>>>>>>', res);
        if (res.status === 'success') {
          this.otp = res.OTP;
          this.toaster.success(res.OTP, 'OTP :');
          this.modalService.open(content, { centered: true });
        } else if (res.status === 'failure') {
          this.userForm.reset();
        }
      });
  }
  async procced(): Promise<any> {
    const regData = {
      RBAuthKey: this.userForm.controls.RBAuthKey.value,
      channel: this.userForm.controls.channel.value,
      PatType: this.userForm.controls.PatType.value,
      OTP: this.otp,
      PTitle: this.userForm.controls.PTitle.value,
      FName: this.userForm.controls.FName.value,
      LName: this.userForm.controls.LName.value,
      Mobile_no: (this.userForm.controls.Mobile_no.value).toString(),
      Alt_mobile_no: this.userForm.controls.Alt_mobile_no.value,
      Email: this.userForm.controls.Email.value,
      Dateofbirth: this.datePipe.transform(this.userForm.controls.Dateofbirth.value, 'dd-MM-yyyy'),
      Gender: this.userForm.controls.Gender.value,
      Address: this.userForm.controls.Address.value,
      Landmark: this.userForm.controls.Landmark.value,
      ZipCode: (this.userForm.controls.ZipCode.value).toString(),
      City: this.userForm.controls.City.value,
      State: this.userForm.controls.State.value,
      Reg_status: this.userForm.controls.Reg_status.value,
      Pat_status: this.userForm.controls.Pat_status.value,
      IsMobileregister: this.userForm.controls.IsMobileregister.value,
      Registerdate: this.userForm.controls.Registerdate.value
    };
    console.log(JSON.stringify(regData));
    await this.rbservice.postService('Patient/Registration', regData).toPromise().then(
      (resp: any) => {
        console.log(resp);
        this.toaster.success(resp.message);
        const validOTP = { RBAuthKey: 'RBDWAh!Q1s74e', user_id: resp.user_id, OTP: this.otp, Reg_status: '1' };
        console.log('<<<<<<<<<<<', JSON.stringify(validOTP));
        this.rbservice.postService('Patient/ValidateOTP', validOTP)
          .subscribe((respo: any) => {
            console.log(respo);
            this.userForm.reset();
            this.submitted = false;
            this.toaster.success(respo.message);
            this.router.navigateByUrl('change-password');
          });
      }
    );
  }

}
