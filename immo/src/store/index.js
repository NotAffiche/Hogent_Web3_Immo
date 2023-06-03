import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as favoritesReducer } from "./favorites/slice";
import { loadState,saveState } from "./localstorage";
import { throttle } from 'lodash';

// Combineren van reducers
const rootReducer = combineReducers({favorites:favoritesReducer});

// Opvragen state uit localStorage
const loadedState = loadState();

// Mogelijk om maar één reducer mee te geven dus combineren zie hierboven
export const store = configureStore({
    reducer: rootReducer,
    // State die in onze localStorage hadden staan meegeven aan onze store
    preloadedState: loadedState,
});

store.subscribe(throttle(() => saveState(store.getState()),1000))