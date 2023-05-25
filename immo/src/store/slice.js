import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    initialState: [],
    name: 'favorites',
    reducers: {
        add: (state, action) => {
            const index = state.findIndex((stateFavoriet) => stateFavoriet.id === action.payload.id);
            if (index === -1) return [...state, action.payload]
        },
        remove: (state, action) => { 
            return state.filter((stateFavoriet) => stateFavoriet.id !== action.payload);
        }
    }
});

export const { reducer } = favoritesSlice;
export const { add, remove } = favoritesSlice.actions;