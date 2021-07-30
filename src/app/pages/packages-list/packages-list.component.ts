import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.css']
})
export class PackagesListComponent implements OnInit {
  testData: any = [];
  constructor(private rbservice: RbService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.testList();
  }
  testList(): any {
    this.rbservice.addClass();
    const ServiceData = { RBAuthKey: 'RBDWAh!Q1s74e', Center_ID: '', search_key: '' };
    this.rbservice.postService('RBD/Service', ServiceData)
      .subscribe((res: any) => {
        // console.log(res);
        if (res.status === 'success') {
          this.rbservice.removeClass();
          this.testData = res.data.filter(e => e.Package === 'Y');
          console.log(this.testData);
        }
      },
        (err: any) => {
          setTimeout(() => {
            this.rbservice.removeClass();
          }, 4000);
        });
  }
  // for viewing details
  packageDetails(data: any): any {
    console.log(data);
    this.router.navigateByUrl('pages/packages-details/' + data.service_id);
  }
  book(data: any): any {
    this.router.navigate(['/pages/home-collection/' + btoa(JSON.stringify(data))]);
  }
}
