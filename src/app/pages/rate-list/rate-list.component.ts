import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.css']
})
export class RateListComponent implements OnInit {
  rateListArr: any = [];
  search: string;
  desBox = false;
  constructor(private rbservice: RbService, private router: Router) { }

  ngOnInit(): void {
    this.allRateList();
  }
  allRateList(): any {
    this.rbservice.addClass();
    const rateData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      Center_ID: '',
      search_key: ''
    };
    this.rbservice.postService('RBD/Service', rateData)
      .subscribe((res: any) => {
        console.log(res);
        this.rbservice.removeClass();
        this.rateListArr = res.data;
      },
      (err: any) => {
        setTimeout(() => {
        this.rbservice.removeClass();
        }, 5000);
      });
  }
  searchKey(): any {
    this.rbservice.addClass();
    const rateData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      Center_ID: '',
      search_key: this.search
    };
    this.rbservice.postService('RBD/Service', rateData)
      .subscribe((res: any) => {
        console.log(res);
        this.rbservice.removeClass();
        this.rateListArr = res.data;
      },
      (err: any) => {
        setTimeout(() => {
        this.rbservice.removeClass();
        }, 5000);
      });
  }
  des(): any {
    this.desBox = true;
  }
  desHide(): any {
    this.desBox = false;
  }
}
