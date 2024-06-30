import { createReducer, on } from "@ngrx/store";
import { Book } from "../../models/book";
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import * as actions from './book.actions'

export interface BookState extends EntityState<Book>{
    selectedBookId: number | null;
}

export const initialState: BookState = {
    ids: [],
    entities: {},
    selectedBookId: null
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const bookReducer = createReducer(
    initialState,
    on(actions.addBooks, (state, new_movies) => {
      return adapter.addMany(new_movies.list, state);
    }),
    on(actions.selectBook, (state, action) => {
      return {
        ...state,
        selectedBookId: action.bookId,
      };
    }),
  );