import { Component, OnInit } from '@angular/core';
import { RbService } from './rb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rb-diagnostics';
  constructor(private rbservice: RbService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.rbservice.removeClass();
  }
  baseUrl(): any {

  }
}
