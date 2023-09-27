import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Category {MOVIES_SERIES, ANIME_MANGA, GAMES}

interface CategoryState {
    value: Category
}

const initialState: CategoryState = {
    value: Category.MOVIES_SERIES
};

export const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<Category>) => {
            state.value = action.payload;
        }
    }
});

export const { changeCategory } = categorySlice.actions;

export  default categorySlice.reducer;