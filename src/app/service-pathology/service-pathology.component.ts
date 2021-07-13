import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-pathology',
  templateUrl: './service-pathology.component.html',
  styleUrls: ['./service-pathology.component.css']
})
export class ServicePathologyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  panelOpenState = false;
}
