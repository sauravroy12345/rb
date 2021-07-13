import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RbService } from '../rb.service';

@Component({
  selector: 'app-service-imaging',
  templateUrl: './service-imaging.component.html',
  styleUrls: ['./service-imaging.component.css']
})
export class ServiceImagingComponent implements OnInit {
  serviceImg: any = [];
  serviceId: any;
  title: string;
  constructor(private rbservice: RbService, private aroute: ActivatedRoute) { }
  panelOpenState = false;

  ngOnInit(): void {
    this.aroute.params.subscribe((res: any) => {
      console.log(res);
      this.title = res.title;
      this.serviceId = res;
    });
    this.allserviceImgList();
  }
  allserviceImgList(): any {
    this.rbservice.postService('getServiceDetails', this.serviceId)
      .subscribe((res: any) => {
        console.log(res);
        this.serviceImg = res.data;
      });
  }
}
