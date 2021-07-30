import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {
  AllpageContent: any;
  header: any;
  constructor(private rbservice: RbService, private toaster: ToastrService) { }
  panelOpenState = false;

  ngOnInit(): void {
    this.allquality();
  }
  allquality(): any {
    this.rbservice.addClass();
    this.rbservice.postService('getQuality', '')
      .subscribe((res: any) => {
        console.log(res);
        this.rbservice.removeClass();
        if (res.status === 'success') {
          this.AllpageContent = res.content;
          this.header = res.header[0];
          console.log(res.content);
        }
      },
      (err: any) => {
        setTimeout(() => {
          this.rbservice.removeClass();
          this.toaster.error('Network Error');
        }, 5000);
      });
  }
}
