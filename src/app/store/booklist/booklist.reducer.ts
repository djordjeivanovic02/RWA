import { createReducer, on } from '@ngrx/store';
import * as BookListActions from './booklist.actions';
import { BookList } from '../../models/booklist.interface';
import { Book } from '../../models/book.interface';

export interface BookListState {
  bookLists: BookList[];
  readedBooks: Book[];
  toReadBooks: Book[];
  error: any;
}

export const initialState: BookListState = {
  bookLists: [],
  readedBooks: [],
  toReadBooks: [],
  error: null
};

export const bookListReducer = createReducer(
  initialState,
  on(BookListActions.createBookListSuccess, (state, { bookList }) => ({
    ...state,
    bookLists: [...state.bookLists, bookList],
    error: null
  })),
  on(BookListActions.createBookListFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(BookListActions.getUserReadedBooksSuccess, (state, { books }) => ({
    ...state,
    readedBooks: books,
    error: null
  })),
  on(BookListActions.getUserReadedBooksFailure, (state, { error }) => ({
    ...state,
    error
  })),
  
  on(BookListActions.getUserToReadBooksSuccess, (state, { books }) => ({
    ...state,
    toReadBooks: books,
    error: null
  })),
  on(BookListActions.getUserToReadBooksFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(BookListActions.deleteBookListSuccess, (state, { listId }) => ({
    ...state,
    bookLists: state.bookLists.filter(list => list.id !== listId),
    error: null
  })),

  on(BookListActions.deleteBookListFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
