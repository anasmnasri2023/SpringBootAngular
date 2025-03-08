import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  public payments : any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:8021/api/payments")
      .subscribe({
        next: data => {
          this.payments=data;
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
