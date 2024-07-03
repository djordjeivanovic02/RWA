import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BookListActions from './booklist.actions';
import { BooklistService } from '../../services/booklist.service';

@Injectable()
export class BookListEffects {

  createBookList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookListActions.createBookList),
      mergeMap(({ bookListData }) =>
        this.booklistService.createBookList(bookListData).pipe(
          map(bookList => BookListActions.createBookListSuccess({ bookList })),
          catchError(error => of(BookListActions.createBookListFailure({ error })))
        )
      )
    )
  );
  createBookListSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookListActions.createBookListSuccess),
      map(action => action.bookList.user.id),
      mergeMap(userId =>
        of(BookListActions.getUserToReadBooks({ userId }))
      )
    )
  );
  getUserReadedBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookListActions.getUserReadedBooks),
      mergeMap(({ userId }) =>
        this.booklistService.getUserReadedBooks(userId).pipe(
          map(books => BookListActions.getUserReadedBooksSuccess({ books })),
          catchError(error => of(BookListActions.getUserReadedBooksFailure({ error })))
        )
      )
    )
  );

  getUserToReadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookListActions.getUserToReadBooks),
      mergeMap(({ userId }) =>
        this.booklistService.getUserToReadBooks(userId).pipe(
          map(books => BookListActions.getUserToReadBooksSuccess({ books })),
          catchError(error => of(BookListActions.getUserToReadBooksFailure({ error })))
        )
      )
    )
  );

  deleteBookList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookListActions.deleteBookList),
      mergeMap(action =>
        this.booklistService.deleteBookListStatusByUser(action.listId, action.userId).pipe(
          map(() => BookListActions.deleteBookListSuccess({ listId: action.listId, userId: action.userId })),
          catchError(error => of(BookListActions.deleteBookListFailure({ error })))
        )
      )
    )
  );

  deleteBookListSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookListActions.deleteBookListSuccess),
      map(action => action.userId),
      switchMap(listId =>
        this.booklistService.getUserToReadBooks(listId).pipe(
          map(books => BookListActions.getUserToReadBooksSuccess({ books })),
          catchError(error => of(BookListActions.getUserToReadBooksFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private booklistService: BooklistService
  ) {}
}
