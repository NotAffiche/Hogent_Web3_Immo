import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {reducer as favoritesReducer} from "./favorites/slice";
import { loadState,saveState } from "./localstorage";
import { throttle } from 'lodash';

const rootReducer = combineReducers({favorites:favoritesReducer});

const loadedState = loadState();

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadedState,
});

store.subscribe(throttle(() => saveState(store.getState()),1000))