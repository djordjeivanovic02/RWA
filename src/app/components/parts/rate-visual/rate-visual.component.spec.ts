import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateVisualComponent } from './rate-visual.component';

describe('RateVisualComponent', () => {
  let component: RateVisualComponent;
  let fixture: ComponentFixture<RateVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateVisualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
