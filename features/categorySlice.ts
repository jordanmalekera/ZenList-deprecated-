import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
    value: {
        movies_series: boolean,
        anime_manga: boolean,
        games: boolean
    }
}

const initialState: CategoryState = {
    value: {
        movies_series: false,
        anime_manga: true,
        games: false
    }
};

export const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<keyof CategoryState["value"]>) => {
            state.value = {
                movies_series: false,
                anime_manga: false,
                games: false
            };
            state.value[action.payload] = true;
        }
    }
});

export const { changeCategory } = categorySlice.actions;

export  default categorySlice.reducer;