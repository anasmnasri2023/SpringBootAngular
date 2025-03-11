import {Component, OnInit} from '@angular/core';
import {StudentsService} from '../services/students.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  paymentId:number;
  constructor(private studentsService : StudentsService , private route:ActivatedRoute) {
  }
  ngOnInit() {
    this.paymentId=this.route.snapshot.params['id']
    this.studentsService.getPaymenDetails(this.paymentId);
  }



}
