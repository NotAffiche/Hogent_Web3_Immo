import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  initialState: [],
  name: 'favorites',
  reducers: {
    add: (state, action) => {
      const foundIndex = state.findIndex((statePand) => statePand.id === action.payload.id);
      if (foundIndex === -1) {
        return [...state, action.payload];
      }
      return state;
    },
    remove: (state, action) => {
      const filteredState = state.filter((statePand) => statePand.id !== action.payload);
      return filteredState;
    }
  }
});

export const { reducer, actions } = favoritesSlice;
export const { add, remove } = actions;
