import { TitleCasePipe } from '@angular/common';
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
  serviceName: any;
  title: string;
  constructor(private rbservice: RbService, private aroute: ActivatedRoute, private titlecase: TitleCasePipe) { }
  panelOpenState = false;

  ngOnInit(): void {
    this.aroute.params.subscribe((res: any) => {
      this.title = this.titlecase.transform(res.title);
      this.serviceName = {title: this.titlecase.transform(res.title)};
    });
    this.allserviceImgList();
  }
  allserviceImgList(): any {
    this.rbservice.addClass();
    this.rbservice.postService('getServiceDetails', this.serviceName)
      .subscribe((res: any) => {
        // console.log(res);
        this.rbservice.removeClass();
        this.serviceImg = res.data;
      });
  }
}
