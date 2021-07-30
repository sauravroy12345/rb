import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment.prod';
// const header = new HttpHeaders();
// header.set('Access-Control-Allow-Origin', '*');
const API_URL: string = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class RbService {
  patientData: any;
  private subject = new Subject<any>();
  constructor(private http: HttpClient) {
    this.patientData = JSON.parse(localStorage.getItem('patientData'));
  }
  sendMessage(message: string): any {
    this.subject.next(message);
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getService(serviceName: string): any {
    return this.http.get(API_URL + serviceName);
  }
  postService(serviceName: string, data: any): any {
    return this.http.post(API_URL + serviceName, data);
  }
  // for date modification
  pad(numbe: number, length): any {

    let str = '' + numbe;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
  getToday(): any {
    const today = new Date();
    return this.pad(today.getDate(), 2) + '-' + this.pad((today.getMonth() + 1), 2) + '-' + today.getFullYear();
  }
  removeClass(): any {
    document.getElementById('load').classList.remove('loader');
    document.getElementById('spin').classList.remove('cm-spinner');
  }
  addClass(): any {
    document.getElementById('load').classList.add('loader');
    document.getElementById('spin').classList.add('cm-spinner');
  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('id') !== null);
  }
  downloadFile(data: any): any {
    return this.http.get(data, { responseType: 'blob' });
    }
}
