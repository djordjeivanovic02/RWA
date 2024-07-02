import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { BookState, bookReducer } from "./store/book/book.reducer";
import { hydrationMetaReducer } from "./store/hydration/hydration.reducer";
import { AuthState, authReducer } from "./store/auth/login.reducted";

export interface AppState{
    books: BookState;
    auth: AuthState;
}
export const metaReducers: MetaReducer[] = [
    hydrationMetaReducer
]
export const reducers: ActionReducerMap<AppState> = {
    books: bookReducer,
    auth: authReducer
}