import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRatesComponent } from './customer-rates.component';

describe('CustomerRatesComponent', () => {
  let component: CustomerRatesComponent;
  let fixture: ComponentFixture<CustomerRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerRatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
