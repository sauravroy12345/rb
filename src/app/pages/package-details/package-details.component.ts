import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {
  serviceId: string;
  serviceReqDAta: any = [];
  constructor(private rbservice: RbService, private aroute: ActivatedRoute, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.aroute.params.subscribe(
      (res: any) => {
        console.log(res.service_id);
        this.serviceId = res.service_id;
      }
    );
    // for package
    this.detailsOfPackage();
  }
  detailsOfPackage(): any {
    this.rbservice.addClass();
    const packageData = {
      RBAuthKey: 'RBDWAh!Q1s74e',
      service_id: this.serviceId
    };
    this.rbservice.postService('RBD/PackageDetail', packageData)
      .subscribe((res: any) => {
        this.rbservice.removeClass();
        console.log(res);
        this.serviceReqDAta = res.data;
      },
        (res: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 4000);
        });

  }
}
