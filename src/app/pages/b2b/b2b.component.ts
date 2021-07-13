import { Component, OnInit } from '@angular/core';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-b2b',
  templateUrl: './b2b.component.html',
  styleUrls: ['./b2b.component.css']
})
export class B2bComponent implements OnInit {
  b2bList: any = [];
  constructor(private rbservice: RbService) { }
  panelOpenState = false;

  ngOnInit(): void {
    this.allB2B();
  }
  allB2B(): any {
    this.rbservice.postService('getB2B', '')
      .subscribe((res: any) => {
        // console.log(res);
        this.b2bList = res.data;
      });
  }
}
