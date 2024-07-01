import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookScreenComponent } from './book-screen.component';

describe('BookScreenComponent', () => {
  let component: BookScreenComponent;
  let fixture: ComponentFixture<BookScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
