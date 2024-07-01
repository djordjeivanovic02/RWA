import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { BookState, bookReducer } from "./store/book/book.reducer";
import { hydrationMetaReducer } from "./store/hydration/hydration.reducer";

export interface AppState{
    books: BookState;
}
export const metaReducers: MetaReducer[] = [
    hydrationMetaReducer
]
export const reducers: ActionReducerMap<AppState> = {
    books: bookReducer
}