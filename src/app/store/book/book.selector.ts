import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookState } from "./book.reducer";
import { Book } from "../../models/book";

export const booksFeature = createFeatureSelector<BookState>('books');

export const selectAllBooks = createSelector(booksFeature, (books) => {
    return books.ids
        .map((id) => books.entities[id])
        .filter((book) => book != undefined)
        .map((book) => book as Book);
});

export const selectAllBooksAsDict = createSelector(
    booksFeature,
    (books) => books.entities
);

export const selectCurrentBookId = createSelector(
    booksFeature,
    (books) => books.selectedBookId,
);

export const selectCurrentBook = createSelector(
   selectAllBooksAsDict,
   selectCurrentBookId,
   (bookDict, bookId) => {
    return bookId ? bookDict[bookId] : undefined
   }
)