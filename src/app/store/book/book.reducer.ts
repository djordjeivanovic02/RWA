import { createReducer, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import * as actions from './book.actions';
import { Book } from "../../models/book.interface";

export interface BookState extends EntityState<Book> {
  selectedBookId: number | null;
  books: Book[];
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: BookState = adapter.getInitialState({
  selectedBookId: null,
  books: [],
});

export const bookReducer = createReducer(
  initialState,
  on(actions.addBooks, (state, { list }) => adapter.addMany(list, state)),
  on(actions.selectBook, (state, { bookId }) => ({
    ...state,
    selectedBookId: bookId,
  })),
  on(actions.addNewBookSuccess, (state, { book }) => ({
    ...state,
    books: [...state.books, book]
  }))
);
