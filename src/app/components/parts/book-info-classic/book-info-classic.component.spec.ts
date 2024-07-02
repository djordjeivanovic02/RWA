import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoClassicComponent } from './book-info-classic.component';

describe('BookInfoClassicComponent', () => {
  let component: BookInfoClassicComponent;
  let fixture: ComponentFixture<BookInfoClassicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookInfoClassicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookInfoClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
