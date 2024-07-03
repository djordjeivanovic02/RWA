import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookListState } from './booklist.reducer';

export const selectBookListState = createFeatureSelector<BookListState>('booklist');

export const selectBookList = createSelector(
  selectBookListState,
  (state: BookListState) => state.bookLists
);

export const selectUserReadedBooks = createSelector(
  selectBookListState,
  (state: BookListState) => state.readedBooks
);

export const selectUserToReadBooks = createSelector(
  selectBookListState,
  (state: BookListState) => state.toReadBooks
);

export const selectBookListError = createSelector(
  selectBookListState,
  (state: BookListState) => state.error
);
