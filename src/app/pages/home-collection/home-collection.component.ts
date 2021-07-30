import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
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
  title = 'Home Collection';
  submitted = false;
  divVar = true;
  urlData: any;
  url: any;
  familyMemberList: any = [];
  timeArr = [];
  reachTimeArr = [];
  testData: any = [];
  data: string;
  name: string;
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
  todayTime: string;
  todayHour: string;
  todayMin: string;
  todayEra: string;
  // mapppppppppp
  map: any;
  mapClickListener: Event;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder = new google.maps.Geocoder();


  // fetching data into modal

  dobMax: any = this.datePipe.transform(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd');
  maxDate: any = this.datePipe.transform(new Date().setDate(new Date().getDate() + 15), 'yyyy-MM-dd');
  minDate: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private rbservice: RbService, private toaster: ToastrService, private router: Router, private fb: FormBuilder,
              private datePipe: DatePipe, private modalService: NgbModal, config: NgbModalConfig,
              private aroute: ActivatedRoute, private ngZone: NgZone) {
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
    Gender: ['M', [Validators.required]],
    Dateofbirth: ['', [Validators.required]],
    Address: ['', [Validators.required, Validators.maxLength(50)]],
    City: [''],
    ZipCode: ['', [Validators.required]],
    landmark: [''],
    comments: [''],
    Rdate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
    Rtime: ['', [Validators.required]],
    APPToTime: [''],
    total_price: [''],
    services_list: ['', [Validators.required]],
    State: [''],
    ref_doctor: [''],
    // ref_doctorID: [''],
    BookedBy: ['Patient'],
    channel: ['W'],
    CollectorNote: [''],
    appointment_id: ['0'],
    Status: ['B'],
    COVIDSample: ['N'],
    Center_ID: ['1'],
    PrescImage: [''],
    longitude: [''],
    lattitude: ['']
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
    this.longitude = 88.45240;
    this.latitude = 22.004024;
    this.timeArr = this.returnTimesInBetween('06:00:00', '18:00:00');
    this.reachTimeArr = this.returnTimesInBetween('08:00:00', '20:00:00');
    this.testList();
    // for selected test
    this.aroute.params.subscribe((res: any) => {
      if (Object.keys(res).length !== 0) {
        this.url = res.serviceData;
        this.urlData = JSON.parse(atob(res.serviceData));
        // tslint:disable-next-line:radix
        this.serviceArr.push(this.urlData.service_id);
        this.serviceNameArr.push(this.urlData);
        // tslint:disable-next-line:radix
        this.price = parseInt(this.urlData.price);
      }
    });
    // checking of url
    if (this.router.url === '/home') {
      this.divVar = false;
    }
    // time format
    this.timeSetOfAppointment();
  }

  get getControl(): any {
    return this.homeColform.controls;
  }

  //////////////////////// for seting appointment time by default
  timeSetOfAppointment(): any {
    const timenow = this.datePipe.transform(new Date(), 'shortTime');
    const tSplit = timenow.split(' ');
    const era = tSplit[1];
    this.todayEra = era;
    const timeSplit = tSplit[0].split(':');
    // tslint:disable-next-line: radix
    const hour = parseInt(timeSplit[0]);
    // tslint:disable-next-line: radix
    const min = parseInt(timeSplit[1]);
    // console.log(hour, min);
    if (min < 30) {
      this.todayMin = '30';
      this.todayHour = hour.toString();
      this.todayTime = this.todayHour + ':' + this.todayMin + ' ' + this.todayEra;
      this.homeColform.controls.Rtime.setValue(this.todayTime);
      this.onTimeApp(this.todayTime);
      // console.log(this.todayTime);
    } else {
      this.todayMin = '00';
      this.todayHour = (hour + 1).toString();
      if (this.todayHour === '12') {
        this.todayEra = 'PM';
      }
      this.todayTime = this.todayHour + ':' + this.todayMin + ' ' + this.todayEra;
      this.homeColform.controls.Rtime.setValue(this.todayTime);
      this.onTimeApp(this.todayTime);
      // console.log(this.todayTime);
    }
    if (hour === 12 && min > 30) {
      this.todayTime = '1:00 PM';
      this.homeColform.controls.Rtime.setValue(this.todayTime);
      this.onTimeApp(this.todayTime);
      // console.log(this.todayTime);
    }
    if (hour === 6 && era === 'PM') {
      this.todayTime = '6:00 AM';
      this.homeColform.controls.Rtime.setValue(this.timeArr[0]);
      this.homeColform.controls.Rdate.setValue(this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd'));
      this.onTimeApp(this.todayTime);
      // console.log(this.todayTime);
    }
  }
  //////////////////////// for seting appointment time by default

  //////////////////////////// time calculation
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
  ///////////////////////////////// time calculation
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

  //////////////////////////////////////////////////////
  onTimeApp(ev): any {
    let n = '';
    let nextTime = '';
    const time = ev;
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
    return this.homeColform.controls.APPToTime.setValue(nextTime);
  }
  //////////////////////////////////////////////////////

  detailsBymobile(mobile): any {
    if (mobile.value.length === 10) {
      this.familyMemberList = [];
      this.rbservice.addClass();
      const UserData = { RBAuthKey: 'RBDWAh!Q1s74e', user_id: '', mobile_no: mobile.value };
      this.rbservice.postService('Patient/Profile', UserData)
        .subscribe((res: any) => {
          this.rbservice.removeClass();
          if (res.data.length === 0) {
            this.familyMemberList = [];
            ///////////////////
            this.homeColform.controls.user_id.patchValue('');
            this.homeColform.controls.FName.patchValue('');
            this.homeColform.controls.LName.patchValue('');
            this.homeColform.controls.Alt_mobile_no.patchValue('');
            this.homeColform.controls.Email.patchValue('');
            this.homeColform.controls.Gender.patchValue('');
            this.homeColform.controls.PTitle.patchValue('');
            this.homeColform.controls.Dateofbirth.patchValue('');
            this.homeColform.controls.Address.patchValue('');
            this.homeColform.controls.City.patchValue('');
            this.homeColform.controls.ZipCode.patchValue('');
            this.homeColform.controls.landmark.patchValue('');
            ///////////////////
            this.formDefaultValueSet();
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
        console.log(res);
        this.rbservice.removeClass();
        this.homeColform.controls.user_id.patchValue(res.data[0].user_id);
        this.homeColform.controls.FName.patchValue(res.data[0].PFirstName);
        this.homeColform.controls.LName.patchValue(res.data[0].PLastName);
        this.homeColform.controls.Alt_mobile_no.patchValue(res.data[0].alt_mobile_no);
        this.homeColform.controls.Email.patchValue(res.data[0].email);
        this.homeColform.controls.Gender.patchValue(res.data[0].PSex);
        this.homeColform.controls.PTitle.patchValue(res.data[0].PTitle);
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
  search(): any {
    this.data = this.name;
  }
  selectTest(id, item, priceT, event, i): any {
    if (event.checked === true) {
      this.serviceArr.push(id);
      this.serviceNameArr.push(item);
      // tslint:disable-next-line:radix
      this.price += parseInt(priceT);
      this.homeColform.controls.total_price.setValue(this.price);
      this.data = '';
      this.name = '';
    } else {
      const index = this.serviceArr.indexOf(id);
      const index1 = this.serviceNameArr.indexOf(item);
      // tslint:disable-next-line:radix
      this.price -= parseInt(priceT);
      this.homeColform.controls.total_price.setValue(this.price);
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
    this.submitted = true;
     // stop here if form is invalid
    if (this.homeColform.invalid) {
      return;
  }
    this.rbservice.addClass();
    const validData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      RDate: this.datePipe.transform(this.homeColform.controls.Rdate.value, 'dd-MM-yyyy'),
      mobile_no: this.homeColform.controls.Mobile_no.value
    };
    await this.rbservice.postService('HomeCollection/ValidRequest', validData)
      .toPromise().then(async (res: any) => {
        // console.log('>>>>>>>>>>>' , res);
        if (await res.status === 'success') {
          if (res.flag === '0') {
            // for ptitle
            if (this.homeColform.controls.Gender.value === 'M') {
              this.homeColform.controls.PTitle.setValue('Mr');
            } else {
              this.homeColform.controls.PTitle.setValue('Mrs');
            }
            // for ptitle
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
            this.appointmentDate = this.datePipe.transform(this.homeColform.controls.Rdate.value, 'dd-MM-yyyy');
            this.toaster.warning('Already homecollection requst is scheduled on' + ' ' + this.appointmentDate);
            this.familyMemberList = [];
            this.serviceArr = [];
            this.serviceNameArr = [];
            this.patientData = '';
            this.price = 0;
            this.rbservice.removeClass();
            this.homeColform.reset();
            this.formDefaultValueSet();
          }
        }
      });
  }

  removeData(v): any {
    const index = this.serviceArr.indexOf(v.service_id);
    const index1 = this.serviceNameArr.indexOf(v);
    // this.price -= priceT;
    if (index > -1 && index1 > -1) {
      this.serviceArr.splice(index, 1);
      this.serviceNameArr.splice(index1, 1);
      // tslint:disable-next-line:radix
      this.price -= parseInt(v.price);
      this.homeColform.controls.total_price.setValue(this.price);
    }
    this.homeColform.controls.services_list.setValue((this.serviceArr).toString());
  }

  // for closing modal
  closeSms(): any {
    window.location.reload();
    this.familyMemberList = [];
    this.serviceArr = [];
    this.serviceNameArr = [];
    this.patientData = '';
    this.price = 0;
    this.homeColform.reset();
    this.formDefaultValueSet();
    this.modalService.dismissAll();
  }
  // for setting default value
  formDefaultValueSet(): any {
    this.homeColform.controls.RBAuthKey.patchValue('RBDWAh!Q1s74e');
    this.homeColform.controls.Status.patchValue('B');
    this.homeColform.controls.channel.patchValue('W');
    this.homeColform.controls.BookedBy.patchValue('Patient');
    this.homeColform.controls.COVIDSample.patchValue('N');
    this.homeColform.controls.Center_ID.patchValue('1');
    this.homeColform.controls.appointment_id.patchValue('0');
    this.homeColform.controls.Rdate.patchValue(
      this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
    this.submitted = false;
    this.timeSetOfAppointment();
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
        // console.log(res);
        this.packageReqDAta = res.data;
        setTimeout(() => {
          this.modalService.open(PackageTestContent, { centered: true, scrollable: true, size: 'md' });
        }, 50);
      },
        (res: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 4000);
        });

  }
  openMap(map): any {
    this.modalService.open(map , {centered: true});
  }

  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.ngZone.run(() => {
        // Here we can get correct event
        // console.log(e.latLng.lat(), e.latLng.lng());
      });
    });
  }
  markerDragEnd($event): any {
    console.log('$event', $event.latLng.lng() , $event.latLng.lat());
    // return
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.homeColform.controls.longitude.setValue($event.latLng.lat());
    this.homeColform.controls.lattitude.setValue($event.latLng.lng());
    // this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude, longitude): any {
    // const latlng = new google.maps.LatLng(latitude, longitude);
    // this.geoCoder.geocode({ 'location': latlng }, (results, status) => {
    //   console.log(results);
    //   console.log(status);
    //   return;
    //   if (status === 'OK') {
    //     if (results[0]) {
    //       this.zoom = 12;
    //       this.address = results[0].formatted_address;
    //       console.log(this.address);
    //     } else {
    //       window.alert('No results found');
    //     }
    //   } else {
    //     window.alert('Geocoder failed due to: ' + status);
    //   }

    // });
  }
}
