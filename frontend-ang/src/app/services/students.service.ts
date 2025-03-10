import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Payment, Student} from '../model/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http : HttpClient ) { }
  public getAllPayements():Observable<Array<Payment>>{
    return   this.http.get<Array<Payment>>(`${environment.backendHost}/api/payments`);

  }
  public getAllStudents():Observable<Array<Student>>{
    return   this.http.get<Array<Student>>(`${environment.backendHost}/api/students`);

  }
  public getStudentPayments(code:string):Observable<Array<Payment>>{
    return   this.http.get<Array<Payment>>(`${environment.backendHost}/api/students/${code}/payments`);

  }
  public savePayment(formData:any):Observable<Payment>{
    return   this.http.post<Payment>(`${environment.backendHost}/api/payments`,formData);

  }

}
