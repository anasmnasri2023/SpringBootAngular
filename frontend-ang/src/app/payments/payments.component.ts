import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  public payments : any;
  public dataSource:any;
 public displayedColumns: string[]=['id','date','amount','type','status','firstName'];
  constructor(private http: HttpClient) {}
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  ngOnInit() {
    this.http.get("http://localhost:8021/api/payments")
      .subscribe({
        next: data => {
          this.payments=data;
          this.dataSource= new MatTableDataSource(this.payments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort= this.sort;
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
