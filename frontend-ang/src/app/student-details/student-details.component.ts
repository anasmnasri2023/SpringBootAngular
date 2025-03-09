import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentsService} from '../services/students.service';
import {Payment} from '../model/students.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  studentCode!: string;
  studentPayments! : Array<Payment>;
  paymentsDataSource!: MatTableDataSource<Payment>;
  public displayedColumns: string[]=['id','date','amount','type','status','firstName'];

  constructor(private activatedRoute: ActivatedRoute,
             private studentsService : StudentsService) {
  }
  ngOnInit() {
    this.studentCode =this.activatedRoute.snapshot.params['code'];
    this.studentsService.getStudentPayments(this.studentCode).subscribe({
    next : value => {
      this.studentPayments= value;
      this.paymentsDataSource=new MatTableDataSource<Payment>(this.studentPayments)
    },
      error : err => {
      console.log(err);
      }
    });
  }

}
