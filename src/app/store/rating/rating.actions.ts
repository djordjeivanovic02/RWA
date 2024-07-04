import { createAction, props } from '@ngrx/store';
import { Rate } from '../../models/rate.interface';

export const addRating = createAction(
  '[Rating] Add Rating',
  props<{ rating: Rate }>()
);

export const addRatingSuccess = createAction(
  '[Rating] Add Rating Success',
  props<{ rating: Rate }>()
);

export const addRatingFailure = createAction(
  '[Rating] Add Rating Failure',
  props<{ error: any }>()
);

export const updateRating = createAction(
  '[Rating] Update Rating',
  props<{ rating: Rate, userId: number }>()
);

export const updateRatingSuccess = createAction(
  '[Rating] Update Rating Success',
  props<{ rating: Rate }>()
);

export const updateRatingFailure = createAction(
  '[Rating] Update Rating Failure',
  props<{ error: any }>()
);

