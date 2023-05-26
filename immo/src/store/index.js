import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {reducer as favorietenReducer} from "./slice";
import { loadState,saveState } from "./localstorage";
import { throttle } from 'lodash';

const rootReducer = combineReducers({favorieten:favorietenReducer});

const loadedState = loadState();

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadedState,
});

store.subscribe(throttle(() => saveState(store.getState()),1000))