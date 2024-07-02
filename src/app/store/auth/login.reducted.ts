import { createReducer, on } from '@ngrx/store';
import { loginFailure, loginSuccess } from './auth.actions';

export interface AuthState {
  token: string | null;
  error: any | null;
}

export const initialState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
