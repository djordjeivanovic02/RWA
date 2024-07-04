import { Action, createReducer, on } from '@ngrx/store';
import { addRatingSuccess, updateRatingFailure, updateRatingSuccess } from './rating.actions';
import { Rate } from '../../models/rate.interface';

export interface RatingState {
  ratings: Rate[];
  userId: number;
  error: any;
}

export const initialState: RatingState = {
  ratings: [],
  userId: 0,
  error: null,
};

const _ratingReducer = createReducer(
  initialState,
  on(addRatingSuccess, (state, { rating }) => ({
    ...state,
    ratings: [...state.ratings, rating],
  })),
  on(updateRatingSuccess, (state, { rating }) => ({
    ...state,
    ratings: state.ratings.map(item => item.id === rating.id ? rating : item)
  })),
  on(updateRatingFailure, (state, { error }) => ({
    ...state,
    error: error
  }))
);

export function ratingReducer(state: RatingState | undefined, action: Action) {
  return _ratingReducer(state, action);
}
