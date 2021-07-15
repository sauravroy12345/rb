import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-home-collection',
  templateUrl: './home-collection.component.html',
  styleUrls: ['./home-collection.component.css']
})
export class HomeCollectionComponent implements OnInit {
  familyMemberList: any = [];
  timeArr = [];
  testData: any = [];
  data: string;
  patientData: any;
  serviceArr: any = [];
  price = 0;
  serviceNameArr: any = [];
  packageReqDAta: any = [];
  // fetching data into modal
  appointmentId: string;
  patientName: string;
  appointmentDate: string;
  locationofPatioent: string;
  appointmentTime: string;
  // fetching data into modal

  dobMax: any = this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd');
  maxDate: any = this.datePipe.transform(new Date().setDate(new Date().getDate() + 15), 'yyyy-MM-dd');
  minDate: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private rbservice: RbService, private toaster: ToastrService, private router: Router, private fb: FormBuilder,
              private datePipe: DatePipe, private modalService: NgbModal, config: NgbModalConfig, private aroute: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  public homeColform = this.fb.group({
    RBAuthKey: ['RBDWAh!Q1s74e'],
    user_id: [''],
    PTitle: [''],
    FName: ['', [Validators.required, Validators.maxLength(50)]],
    LName: ['', [Validators.required, Validators.maxLength(50)]],
    Mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    Alt_mobile_no: ['', Validators.pattern('^[0-9]{10}$')],
    Email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    Gender: ['', [Validators.required]],
    Dateofbirth: ['', [Validators.required]],
    Address: ['', [Validators.required, Validators.maxLength(50)]],
    City: [''],
    ZipCode: ['', [Validators.required]],
    landmark: [''],
    comments: [''],
    Rdate: ['', [Validators.required]],
    Rtime: ['', [Validators.required]],
    APPToTime: [''],
    total_price: [''],
    services_list: ['', [Validators.required]],
    State: [''],
    // ref_doctor: [''],
    // ref_doctorID: [''],
    BookedBy: ['Patient'],
    channel: ['W'],
    CollectorNote: [''],
    appointment_id: ['0'],
    Status: ['B'],
    COVIDSample: ['N'],
    Center_ID: ['1'],
    PrescImage: ['']
  });
  /*
  "RBAuthKey": "RBDWAh!Q1s74e",
"user_id": "PRB0616267",
"PTitle": "Mr.",
"FName": "Atanu",
"LName": "Jana",
"Gender": "M",
"Dateofbirth": "30-06-2021",
"Email": "atanu@gmail.com",
"Alt_mobile_no": "",
"Mobile_no": "1233211233",
"Address": "Contai",
"ZipCode": "123456",
"City": "Contai",
"State": "",
"Rdate":"02-07-2021",
"Landmark": "Contai",
"Rtime": "06:00 AM",
"APPToTime": "8:00 AM",
"total_price": 6200.0,
"services_list": "1720,1707,",
"comments": "test",
"CollectorNote": "",
"appointment_id": "0",
"Status": "B",
"BookedBy": "Patient",
"Channel": "M",
"COVIDSample": "N",
"Center_ID": "1",
"PrescImage": ""
}
  */
  ngOnInit(): void {
    this.timeArr = this.returnTimesInBetween('06:00:00', '18:00:00');
    this.testList();
    // for selected test
    this.aroute.params.subscribe((res: any) => {
      // tslint:disable-next-line:radix
      this.serviceArr.push(parseInt(res.service_id));
      this.serviceNameArr.push(atob(res.service_name));
      // tslint:disable-next-line:radix
      this.price = parseInt(res.price);
    });
  }

  get getControl(): any {
    return this.homeColform.controls;
  }

  // time calculation
  getGenTime = (timeString) => {
    const H = +timeString.substr(0, 2);
    const h = (H % 12) || 12;
    const ampm = H < 12 ? ' AM' : ' PM';
    return timeString = h + timeString.substr(2, 3) + ampm;
  }

  returnTimesInBetween(start: any, end: any): any {
    const timesInBetween = [];
    // tslint:disable-next-line: radix
    let startH = parseInt(start.split(':')[0]);
    // tslint:disable-next-line: radix
    const startM = parseInt(start.split(':')[1]);
    // tslint:disable-next-line: radix
    const endH = parseInt(end.split(':')[0]);
    // tslint:disable-next-line: radix
    const endM = parseInt(end.split(':')[1]);

    if (startM === 30) {
      startH++;
    }

    for (let i = startH; i < endH; i++) {
      timesInBetween.push(i < 10 ? '0' + i + ':00' : i + ':00');
      timesInBetween.push(i < 10 ? '0' + i + ':30' : i + ':30');
    }

    timesInBetween.push(endH + ':00');
    if (endM === 30) {
      timesInBetween.push(endH + ':30');
    }

    return timesInBetween.map(this.getGenTime);
  }
  // time calculation
  // for appointment time
  onTime(ev): any {
    let n = '';
    let nextTime = '';
    const time = ev.target.value;
    const onlyTime = time.split(':');
    // tslint:disable-next-line: radix
    const t = parseInt(onlyTime[0]);
    if (t >= 10 && t <= 12) {
      const end = onlyTime[1].split(' ');
      if (t === 10) {
        n = (12).toString();
      } else if (t === 11) {
        n = (1).toString();
      } else if (t === 12) {
        n = (2).toString();
      }
      nextTime = n + ':' + end[0] + ' PM';
    } else {
      n = (t + 2).toString();
      nextTime = n + ':' + onlyTime[1];
    }
    // console.log(nextTime);
    this.homeColform.controls.APPToTime.setValue(nextTime);
  }
  // for appointment time

  detailsBymobile(mobile): any {
    if (mobile.value.length === 10) {
      this.rbservice.addClass();
      const UserData = { RBAuthKey: 'RBDWAh!Q1s74e', user_id: '', mobile_no: mobile.value };
      this.rbservice.postService('Patient/Profile', UserData)
        .subscribe((res: any) => {
          this.rbservice.removeClass();
          if (res.data.length === 0) {
            this.familyMemberList = [];
          } else {
            // for pushing data to dropdown
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < res.data.length; i++) {
              this.familyMemberList.push({ user_id: res.data[i].user_id, name: res.data[i].PFirstName + ' ' + res.data[i].PLastName });
            }
          }
        },
          (err: any) => {
            setTimeout(() => {
              this.rbservice.removeClass();
            }, 5000);
          });
    }
  }
  // to show family member
  memberChange(id): any {
    this.rbservice.addClass();
    const UserData = { RBAuthKey: 'RBDWAh!Q1s74e', user_id: id, mobile_no: '' };
    this.rbservice.postService('Patient/Profile', UserData)
      .subscribe((res: any) => {
        this.rbservice.removeClass();
        console.log('event', res);
        this.homeColform.controls.user_id.patchValue(res.data[0].user_id);
        this.homeColform.controls.FName.patchValue(res.data[0].PFirstName);
        this.homeColform.controls.LName.patchValue(res.data[0].PLastName);
        this.homeColform.controls.Alt_mobile_no.patchValue(res.data[0].alt_mobile_no);
        this.homeColform.controls.Email.patchValue(res.data[0].email);
        this.homeColform.controls.Gender.patchValue(res.data[0].PSex);
        this.homeColform.controls.Dateofbirth.patchValue(this.datePipe.transform(res.data[0].dateofbirth, 'yyyy-dd-MM'));
        this.homeColform.controls.Address.patchValue(res.data[0].address);
        this.homeColform.controls.City.patchValue(res.data[0].City);
        this.homeColform.controls.ZipCode.patchValue(res.data[0].Zipcode);
        this.homeColform.controls.landmark.patchValue(res.data[0].landmark);
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
  test(longContent): any {
    this.modalService.open(longContent, { centered: true, size: 'lg' });
  }
  testList(): any {
    const ServiceData = { RBAuthKey: 'RBDWAh!Q1s74e', Center_ID: '', search_key: '' };
    this.rbservice.postService('RBD/Service', ServiceData)
      .subscribe((res: any) => {
        console.log(res);
        this.testData = res.data;
      });
  }
  search(event): any {
    this.data = event.value;
  }
  selectTest(id, name, priceT, event, i): any {
    if (event.checked === true) {
      this.serviceArr.push(id);
      this.serviceNameArr.push(name);
      this.price += priceT;
    } else {
      const index = this.serviceArr.indexOf(id);
      const index1 = this.serviceNameArr.indexOf(name);
      this.price -= priceT;
      if (index > -1 && index1 > -1) {
        this.serviceArr.splice(index, 1);
        this.serviceNameArr.splice(index1, 1);
      }
    }
    this.homeColform.controls.services_list.setValue((this.serviceArr).toString());
    // console.log(this.homeColform.controls.services_list.value);
  }
  // for set checkbox html
  toggleCheckBox(elementId): any {
    return (this.serviceArr.indexOf(elementId) !== -1) ? true : false;
  }
  // for submitting data
  async hcCollection(Content): Promise<any> {
    this.rbservice.addClass();
    const validData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      RDate: this.datePipe.transform(this.homeColform.controls.Rdate.value, 'dd-MM-yyyy'),
      mobile_no: this.homeColform.controls.Mobile_no.value
    };
    await this.rbservice.postService('HomeCollection/ValidRequest', validData)
      .toPromise().then(async (res: any) => {
        if (await res.status === 'success') {
          if (res.flag === '0') {
            // for ptitle
            if (this.homeColform.controls.Gender.value === 'M') {
              this.homeColform.controls.PTitle.setValue('Mr');
            } else {
              this.homeColform.controls.PTitle.setValue('Mrs');
            }
            // for ptitle
            this.homeColform.controls.total_price.setValue(this.price);
            // this.homeColform.controls.services_list.setValue((this.serviceArr).toString());
            this.homeColform.controls.Dateofbirth.setValue(
              this.datePipe.transform(this.homeColform.controls.Dateofbirth.value, 'dd-MM-yyyy'));
            this.homeColform.controls.Rdate.setValue(
              this.datePipe.transform(this.homeColform.controls.Rdate.value, 'dd-MM-yyyy'));
            // console.log(this.homeColform.value);
            this.rbservice.postService('HomeCollection/BookHCRequest', this.homeColform.value).subscribe(
              async (resp: any) => {
                this.rbservice.removeClass();
                // console.log(resp);
                if (await resp.status === 'success') {
                  this.appointmentId = resp.appointment_id;
                  this.patientName = this.homeColform.controls.FName.value + ' ' + this.homeColform.controls.LName.value;
                  this.appointmentTime = this.homeColform.controls.Rtime.value + ' ' + 'to' + ' ' +
                    this.homeColform.controls.APPToTime.value;
                  this.appointmentDate = this.homeColform.controls.Rdate.value;
                  this.locationofPatioent = this.homeColform.controls.Address.value + ' ' + this.homeColform.controls.ZipCode.value;
                  this.rbservice.removeClass();
                  this.modalService.open(Content, { centered: true, size: 'md' });
                }
              }
            );
          }
        } else {
          if (res.flag === '1') {
            this.appointmentDate = this.homeColform.controls.Rdate.value;
            this.toaster.warning('Already homecollection requst is scheduled on' + ' ' + this.appointmentDate);
            this.familyMemberList = [];
            this.serviceArr = [];
            this.serviceNameArr = [];
            this.patientData = '';
            this.rbservice.removeClass();
            this.homeColform.reset();
            this.formDefaultValueSet();
          }
        }
      });
  }
  // for closing modal
  closeSms(): any {
    this.familyMemberList = [];
    this.serviceArr = [];
    this.serviceNameArr = [];
    this.patientData = '';
    this.homeColform.reset();
    this.formDefaultValueSet();
    this.modalService.dismissAll();
  }
  // for setting default value
  formDefaultValueSet(): any {
    this.homeColform.controls.RBAuthKey.setValue('RBDWAh!Q1s74e');
    this.homeColform.controls.Status.setValue('B');
    this.homeColform.controls.channel.setValue('W');
    this.homeColform.controls.BookedBy.setValue('Patient');
    this.homeColform.controls.COVIDSample.setValue('N');
    this.homeColform.controls.Center_ID.setValue('1');
    this.homeColform.controls.appointment_id.setValue('0');
  }
  // for showing package test
  detailsPackage(data: any, PackageTestContent): any {
    this.rbservice.addClass();
    const packageData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      service_id: data.service_id
    };
    this.rbservice.postService('RBD/PackageDetail', packageData)
      .subscribe((res: any) => {
        this.rbservice.removeClass();
        console.log(res);
        this.packageReqDAta = res.data;
        setTimeout(() => {
          this.modalService.open(PackageTestContent, { centered: true, scrollable: true , size: 'md' });
        }, 300);
      },
        (res: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 4000);
        });

  }
}
