import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { paymentType } from '../model/students.model';
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
    if (this.paymentFormGroup.invalid) {
      alert('Veuillez remplir tous les champs correctement avant de sauvegarder.');
      return;
    }

    let date = new Date(this.paymentFormGroup.value.date);
    let formattedDate = date.toLocaleDateString('fr-FR');

    let formData: FormData = new FormData();
    formData.set('date', formattedDate);
    formData.set('amount', this.paymentFormGroup.getRawValue().amount);
    formData.set('type', this.paymentFormGroup.getRawValue().type);
    formData.set('studentCode', this.studentCode);
    formData.set('file', this.paymentFormGroup.getRawValue().fileSource);

    this.studentsService.savePayment(formData).subscribe({
      next: () => {
        alert('Payment Saved Successfully!');
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement du paiement :', err);
      },
    });
  }
}
