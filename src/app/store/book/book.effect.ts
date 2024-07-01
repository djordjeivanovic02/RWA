import { Injectable } from "@angular/core";
import {
    loadBooks as loadBooksAction,
    addBooks as addBooksAction
} from './book.actions';
import { map, switchMap } from "rxjs";
import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookService } from "../../services/book.service";
import { Book } from "../../models/book.interface";

@Injectable()
export class BooksEffects {
    constructor(
        private actions$: Actions,
        private service: BookService
    ){}

    loadBooks = createEffect(() =>
        this.actions$.pipe(
            ofType(loadBooksAction.type),
            switchMap((action: Action) =>
                this.service
                .getBooks()
                .pipe(map((books: Book[]) => addBooksAction({ list: books }))),
            ),
        ),
    );
}