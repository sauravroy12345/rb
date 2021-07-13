import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-cardiology',
  templateUrl: './service-cardiology.component.html',
  styleUrls: ['./service-cardiology.component.css']
})
export class ServiceCardiologyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  panelOpenState = false;
}
