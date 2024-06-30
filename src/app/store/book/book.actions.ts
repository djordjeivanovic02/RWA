import { createAction, props } from "@ngrx/store";
import { Book } from "../../models/book";

export const loadBooks = createAction('Load books');
export const addBooks = createAction('Add books', props<{list: Book[]}>())
export const selectBook = createAction(
    'Select book',
    props<{ bookId: number }>(),
);