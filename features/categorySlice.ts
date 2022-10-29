import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {}
});

export default categorySlice.reducer;