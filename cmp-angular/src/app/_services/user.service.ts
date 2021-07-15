import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private util: UtilService) { }

  getAllComplaints(): Observable<any> {
    return this.util.createPostApi('services/getAllComplaints');
  }

  getAllComplaintsByUserId(data: any): Observable<any> {
    return this.util.createPostApi('services/getAllComplaintsByUserId', data);
  }

  createComplaint(data: any): Observable<any> {
    return this.util.createPostApi('services/createComplaint', data);
  }

  updateComplaint(data: any): Observable<any> {
    return this.util.createPostApi('services/updateComplaint', data);
  }

  deleteComplaintById(data: any): Observable<any> {
    return this.util.createPostApi('services/deleteComplaintById', data);
  }
}
