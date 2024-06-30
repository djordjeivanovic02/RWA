import { BookState } from "./store/book/book.reducer";

export interface AppState{
    books: BookState;
}