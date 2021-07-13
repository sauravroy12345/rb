import { Component, OnInit } from '@angular/core';
import { RbService } from '../rb.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private rbservice: RbService) { }
  panelOpenState = false;
  faqArray: any = [];
  ngOnInit(): void {
    this.getAllFaq();
  }
  getAllFaq(): any {
    this.rbservice.postService('getFaq', '')
      .subscribe((res: any) => {
        console.log(res);
        this.faqArray = res.data;
      });
  }
}
