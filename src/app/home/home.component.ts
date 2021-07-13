import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
notification = [];
  constructor() { }

  ngOnInit(): void {
    this.notification = [
      {
        Notification_Title: 'New Version',
        Notification_Body: 'New App version comming soon with some advance features.',
        Notification_Date: '04-06-2021',
        Notification_Image: '',
        Event_Date: '04-06-2021',
        Tag: ''
      },
      {
        Notification_Title: 'Cowin Vaccine',
        Notification_Body: 'Cowin Vaccine release',
        Notification_Date: '05-02-2021',
        Notification_Image: 'https://images.financialexpress.com/2021/05/coronavirus-vaccine-8.jpg',
        Event_Date: '05-02-2021',
        Tag: ''
      },
      {
        Notification_Title: 'App Version',
        Notification_Body: 'New app version release',
        Notification_Date: '10-05-2019',
        Notification_Image: '',
        Event_Date: '10-05-2019',
        Tag: ''
      },
      {
        Notification_Title: 'OCD and stroke',
        Notification_Body: 'Stroke can result in severe disability or death. Identifying risk factors is an important way to help prevent stroke',
        Notification_Date: '04-06-2018',
        Notification_Image: 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/05/GettyImages-964172118_header-1024x575.jpg?w=1155&h=1528',
        Event_Date: '04-06-2018',
        Tag: ''
      },
      {
        Notification_Title: 'App Update',
        Notification_Body: 'Now available Doctor\'s appointment. Now you can directly appintment with doctor.',
        Notification_Date: '10-03-2018',
        Notification_Image: '',
        Event_Date: '10-03-2018',
        Tag: ''
      }
    ];
  }

}
