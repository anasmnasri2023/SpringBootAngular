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
  pdfFileUrl:any;
  constructor(private studentsService : StudentsService , private route:ActivatedRoute) {
  }
  ngOnInit() {
    this.paymentId=this.route.snapshot.params['id']
    this.studentsService.getPaymenDetails(this.paymentId).subscribe(
      {
        next:value => {
          let blob : Blob = new Blob( [value], { type: 'application/pdf' });
          this.pdfFileUrl = URL.createObjectURL(blob);
        },
        error:err => {
          console.log(err);
        }
      }
    );
  }


  afterLoadComplete($event:any) {

  }
}
