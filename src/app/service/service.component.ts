import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RbService } from '../rb.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  serviceList: any = [];
  constructor(private rbservice: RbService, private router: Router) { }

  ngOnInit(): void {
    this.allserviceList();
  }
  allserviceList(): any {
    this.rbservice.postService('getServicelist', '')
      .subscribe((res: any) => {
        // console.log(res);
        this.serviceList = res.data;
      });
  }
  detailsService(data: any): any {
    // console.log(data);
    this.router.navigateByUrl('service-imaging/' + data.Id + '/' + data.title);
  }
}
