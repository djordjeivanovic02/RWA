import { createAction, props } from '@ngrx/store';
import { BookList } from '../../models/booklist.interface';
import { Book } from '../../models/book.interface';

export const createBookList = createAction(
  '[Book List] Create Book List',
  props<{ bookListData: any }>()
);

export const createBookListSuccess = createAction(
  '[Book List] Create Book List Success',
  props<{ bookList: BookList }>()
);

export const createBookListFailure = createAction(
  '[Book List] Create Book List Failure',
  props<{ error: any }>()
);

export const getUserReadedBooks = createAction(
  '[Book List] Get User Readed Books',
  props<{ userId: number }>()
);

export const getUserReadedBooksSuccess = createAction(
  '[Book List] Get User Readed Books Success',
  props<{ books: Book[] }>()
);

export const getUserReadedBooksFailure = createAction(
  '[Book List] Get User Readed Books Failure',
  props<{ error: any }>()
);

export const getUserToReadBooks = createAction(
  '[Book List] Get User To Read Books',
  props<{ userId: number | undefined}>()
);

export const getUserToReadBooksSuccess = createAction(
  '[Book List] Get User To Read Books Success',
  props<{ books: Book[] }>()
);

export const getUserToReadBooksFailure = createAction(
  '[Book List] Get User To Read Books Failure',
  props<{ error: any }>()
);

export const deleteBookList = createAction(
  '[Book List] Delete Book List',
  props<{ listId: number | undefined, userId: number | undefined }>()
);

export const deleteBookListSuccess = createAction(
  '[Book List] Delete Book List Success',
  props<{ listId: number | undefined, userId: number | undefined }>()
);

export const deleteBookListFailure = createAction(
  '[Book List] Delete Book List Failure',
  props<{ error: any }>()
);