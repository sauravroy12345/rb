import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RbService } from '../rb.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {
  branchDetailsData: any = [];
  constructor(private rbservice: RbService, private toaster: ToastrService) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.branchwithMaps();
  }
  branchwithMaps(): any {
    this.rbservice.addClass();
    const mapsData = {RBAuthKey: 'RBDWAh!Q1s74e', longitude: '', latitude: ''};
    this.rbservice.postService('RBD/BranchNearBy' , mapsData)
      .subscribe((res: any) => {
        console.log(res);
        this.rbservice.removeClass();
        this.branchDetailsData = res.data;
      },
      (err: any) => {
        setTimeout(() => {
          this.rbservice.removeClass();
          this.toaster.error('Network Error');
        }, 5000);
      });
  }

  mapClicked(event: any): any {
    console.log(event);
  }

}
