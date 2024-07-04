import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RatingState } from './rating.reducer';

export const selectRatingState = createFeatureSelector<RatingState>('ratings');

export const selectRatings = createSelector(
  selectRatingState,
  (state: RatingState) => state.ratings
);

export const selectError = createSelector(
  selectRatingState,
  (state: RatingState) => state.error
);
