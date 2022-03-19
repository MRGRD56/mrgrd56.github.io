import { combineReducers, createStore } from 'redux';
import github, { GithubState } from './github';
import { TypedUseSelectorHook, useDispatch as useCommonDispatch, useSelector as useCommonSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'typescript-fsa';

export interface AppState {
    projects: GithubState;
}

const rootReducer = combineReducers<AppState>({
    projects: github
});

export const useSelector: TypedUseSelectorHook<AppState> = useCommonSelector;
export const useDispatch = () => useCommonDispatch<ThunkDispatch<AppState, void, AnyAction>>();

export type AppDispatch = ReturnType<typeof useDispatch>;
export type AppThunkAction<T = void> = (dispatch: AppDispatch) => T;

export const store = createStore(rootReducer);
