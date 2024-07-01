import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const hydrationMetaReducer = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
  return (state, action) => {
    if (isPlatformBrowser(PLATFORM_ID)) {
      console.log(action.type)
      if (action.type === INIT || action.type === UPDATE) {
        const storageValue = localStorage.getItem("state");
        if (storageValue) {
          try {
            return JSON.parse(storageValue);
          } catch {
            localStorage.removeItem("state");
          }
        }
      }
      const nextState = reducer(state, action);
      localStorage.setItem("state", JSON.stringify(nextState));
      return nextState;
    } else {
      console.warn('localStorage is not available.');
      return reducer(state, action);
    }
  };
};
