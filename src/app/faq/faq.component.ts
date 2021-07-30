import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RbService } from '../rb.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private rbservice: RbService, private toaster: ToastrService) { }
  panelOpenState = false;
  faqArray: any = [];
  ngOnInit(): void {
    this.getAllFaq();
  }
  getAllFaq(): any {
    this.rbservice.addClass();
    this.rbservice.postService('getFaq', '')
      .subscribe((res: any) => {
        console.log(res);
        this.rbservice.removeClass();
        this.faqArray = res.userdata;
      },
      (err: any) => {
        setTimeout(() => {
          this.rbservice.removeClass();
          this.toaster.error('Network Error');
        }, 5000);
      });
  }
}
