import { Component, OnInit } from '@angular/core';
import { RbService } from 'src/app/rb.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit {
  AllpageContent: any;
  constructor(private rbservice: RbService) { }
  panelOpenState = false;

  ngOnInit(): void {
    this.allquality();
  }
  allquality(): any {
    this.rbservice.postService('getQuality', '')
      .subscribe((res: any) => {
        console.log(res);
        this.AllpageContent = res.data;
        console.log(res.data);
      });
  }
}
