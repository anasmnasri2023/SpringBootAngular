import {Component, OnInit} from '@angular/core';
import {StudentsService} from '../services/students.service';
import {MatTableDataSource} from '@angular/material/table';
import {Student} from '../model/students.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  students!:Array<Student>;
  studentsDataSource! :MatTableDataSource<Student>;
  displayedColumns : string[]=['id','firstName','lastName','code','programId','payments'];
  constructor(private studentsService : StudentsService,private router : Router ) {
  }
ngOnInit() {
    this.studentsService.getAllStudents().subscribe({
      next: value => {
        this.students=value;
        this.studentsDataSource=new MatTableDataSource<Student>(this.students);

      },
      error:err => {
        console.log(err);

      }
    })
}

  studentPayments(student: Student) {
this.router.navigateByUrl(`/admin/student-details/${student.code}`);
  }
}
