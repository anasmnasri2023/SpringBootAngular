import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {paymentType} from '../model/students.model';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  paymentFormGroup!: FormGroup;
  studentCode!:string;
  paymentTypes :string[]=[];
  pdfFileUrl!:string;

  constructor(private fb:FormBuilder,private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    for (let element in paymentType) {
      let value = paymentType[element]
      if (typeof value == 'string') {
        this.paymentTypes.push(value);
      }
    }
    this.studentCode=this.activatedRoute.snapshot.params['studentCode']
    this.paymentFormGroup= this.fb.group({
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type : this.fb.control(''),
      studentCode : this.fb.control(this.studentCode),
      fileSource : this.fb.control(''),
      fileName: this.fb.control(''),
    });
  }

  selectFile(event: any) {
    if(event.target.files.length>0){
      let file = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource : file,
        fileName:file.name,
      });
      this.pdfFileUrl =  URL.createObjectURL(file);
    }

  }

  savePayment() {

  }
}
