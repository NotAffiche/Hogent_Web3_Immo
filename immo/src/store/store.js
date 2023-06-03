import { createStore } from 'redux';
import favoriteReducer from './favoriteReducer';

const store = createStore(favoriteReducer);

export default store;