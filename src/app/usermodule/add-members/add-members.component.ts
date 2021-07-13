import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  maxDate: any = this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd');
  patientData: any;
  constructor(private fb: FormBuilder, private rbservice: RbService, private modalService: NgbModal,
              private router: Router, private toaster: ToastrService, private datePipe: DatePipe, private aroute: ActivatedRoute) { }
  public userForm = this.fb.group({
    RBAuthKey: ['RBDWAh!Q1s74e'],
    PTitle: [''],
    FName: ['', [Validators.required, Validators.maxLength(50)]],
    LName: ['', [Validators.required, Validators.maxLength(50)]],
    Mobile_no: [this.rbservice.patientData.mobile_no, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    Alt_mobile_no: ['', [Validators.pattern('^[0-9]{10}$')]],
    Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    Dateofbirth: ['', [Validators.required]],
    Gender: ['', [Validators.required]],
    Address: ['', [Validators.required, Validators.maxLength(50)]],
    Landmark: ['', Validators.maxLength(50)],
    ZipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    City: [''],
    State: [''],
    Reg_status: ['0'],
    Pat_status: ['0'],
    IsMobileregister: ['Y'],
    Registerdate: [this.rbservice.getToday()]
  });
  ngOnInit(): void {
    this.aroute.params.subscribe(
      (res: any) => {
        console.log('>>>>>>>>' , res);
        if (Object.keys(res).length !== 0) {
          console.log(JSON.parse(atob(res.data)));
          this.patientData = JSON.parse(atob(res.data));
        }
      }
    );
  }
  get getControl(): any {
    return this.userForm.controls;
  }
  onSubmit(): any {
    if (this.userForm.controls.Gender.value === 'M') {
      this.userForm.controls.PTitle.setValue('Mr');
    } else {
      this.userForm.controls.PTitle.setValue('Mrs');
    }
    this.userForm.controls.Dateofbirth.setValue(this.datePipe.transform(this.userForm.controls.Dateofbirth.value, 'dd-MM-yyyy'));
    this.rbservice.addClass();
    // console.log(this.userForm.value);
    this.rbservice.postService('Patient/Registration', this.userForm.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.rbservice.removeClass();
          this.toaster.warning(res.message);
          this.userForm.reset();
        }
      }
    );
  }
}
