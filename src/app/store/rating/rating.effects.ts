import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addRating, addRatingSuccess, addRatingFailure, updateRating, updateRatingSuccess, updateRatingFailure } from './rating.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RatingService } from '../../services/rating.service';

@Injectable()
export class RatingEffects {
  constructor(
    private actions$: Actions,
    private ratingService: RatingService
  ) {}

  addRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRating),
      mergeMap(action =>
        this.ratingService.addRate(action.rating).pipe(
          map((rating) => addRatingSuccess({ rating })),
          catchError((error) => of(addRatingFailure({ error })))
        )
      )
    )
  );
  updateRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRating),
      mergeMap(action =>
        this.ratingService.updateRating(action.rating, action.userId).pipe(
          map((rating) => updateRatingSuccess({ rating })),
          catchError((error) => of(updateRatingFailure({ error })))
        )
      )
    )
  );
}
