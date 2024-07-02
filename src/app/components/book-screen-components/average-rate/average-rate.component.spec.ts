import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageRateComponent } from './average-rate.component';

describe('AverageRateComponent', () => {
  let component: AverageRateComponent;
  let fixture: ComponentFixture<AverageRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
