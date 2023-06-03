import { createSlice } from "@reduxjs/toolkit";


const favoritesSlice = createSlice({
    initialState:[],
    name:'favorites',
    reducers: {
        add:(state,action)=>{

            const foundIndex = state.findIndex((stateRecipe)=> stateRecipe.id === action.payload.id);
            
            if (foundIndex === -1) {
                state.push(action.payload); // Mutable
            }

            // Immutable
            // return [...state,action.payload]
        },
        remove:(state,action)=>{
            const newArr = state.filter((stateRecipe)=> stateRecipe.id !== action.payload);
            return newArr;
        },
        clear:(state,action) =>{
            return [];
        }
    }
});

export const { reducer } = favoritesSlice;
export const { add , remove } = favoritesSlice.actions;