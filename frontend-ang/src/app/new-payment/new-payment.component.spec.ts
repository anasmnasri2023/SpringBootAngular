import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentComponent } from './new-payment.component';

describe('NewPaymentComponent', () => {
  let component: NewPaymentComponent;
  let fixture: ComponentFixture<NewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
