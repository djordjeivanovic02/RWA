import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickbookComponent } from './quickbook.component';

describe('QuickbookComponent', () => {
  let component: QuickbookComponent;
  let fixture: ComponentFixture<QuickbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
