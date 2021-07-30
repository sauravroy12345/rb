import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  public contactForm = this.fb.group({
    name: ['', [Validators.required]],
    mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    sms: ['']
  });
  ngOnInit(): void {
    window.scroll(0, 0);
  }
  // convenience getter for easy access to form fields
  get getControl(): any {
    return this.contactForm.controls;
  }
  contactSubmit(): any {
    console.log(this.contactForm.value);

  }
}
