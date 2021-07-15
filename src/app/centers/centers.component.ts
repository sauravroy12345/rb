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
    this.branchwithMaps();
  }
  branchwithMaps(): any {
    const mapsData = {RBAuthKey: 'RBDsds34gTY4e', 'longitude ': '88.4250703', 'latitude ': ''};
    this.rbservice.postService('RBD/BranchNearBy' , mapsData)
      .subscribe((res: any) => {
        console.log(res);
        this.branchDetailsData = res;
      });
  }

  mapClicked(event: any): any {
    console.log(event);
  }

}
