import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAddComponent } from './payment-add.component';

describe('PaymentAddComponent', () => {
  let component: PaymentAddComponent;
  let fixture: ComponentFixture<PaymentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
