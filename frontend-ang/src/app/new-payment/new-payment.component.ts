import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Payment, paymentType} from '../model/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css'] // Correction ici
})
export class NewPaymentComponent implements OnInit {
  paymentFormGroup!: FormGroup;
  studentCode!: string;
  paymentTypes: string[] = [];
  pdfFileUrl!: string;
  showProgress : boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {
    // Charger les types de paiement
    for (let element in paymentType) {
      let value = paymentType[element];
      if (typeof value === 'string') {
        this.paymentTypes.push(value);
      }
    }

    // Récupérer le code étudiant de l'URL
    this.studentCode = this.activatedRoute.snapshot.params['studentCode'];

    // Initialiser le formulaire avec validations
    this.paymentFormGroup = this.fb.group({
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      studentCode: [{ value: this.studentCode, disabled: true }, Validators.required],
      fileSource: ['', Validators.required],
      fileName: [''],
    });
  }

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      if (file.type !== 'application/pdf') {
        alert('Veuillez sélectionner un fichier PDF.');
        return;
      }

      this.paymentFormGroup.patchValue({
        fileSource: file,
        fileName: file.name,
      });

      this.pdfFileUrl = URL.createObjectURL(file);
    }
  }

  savePayment() {


    let date = new Date(this.paymentFormGroup.value.date);
    let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+date.getFullYear();

    let formData: FormData = new FormData();
    formData.set('date', formattedDate);
    formData.set('amount', this.paymentFormGroup.value.amount);
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);
    formData.set('file', this.paymentFormGroup.value.fileSource);

    this.studentsService.savePayment(formData).subscribe({
      next: value => {
        this.showProgress=false;
        alert('Payment Saved Successfully!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  afterLoadComplete(event: any){
    console.log(event);

  }
}
