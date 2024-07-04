import { createAction, props } from "@ngrx/store";
import { Book } from "../../models/book.interface";

export const loadBooks = createAction('Load books');
export const addBooks = createAction('Add books', props<{list: Book[]}>())
export const selectBook = createAction(
    'Select book',
    props<{ bookId: number }>(),
);

export const addNewBook = createAction(
    '[Book] Add Book',
    props<{ book: FormData }>()
  );
  
  export const addNewBookSuccess = createAction(
    '[Book] Add Book Success',
    props<{ book: Book }>()
  );
  
  export const addNewBookFailure = createAction(
    '[Book] Add Book Failure',
    props<{ error: any }>()
  );
  