import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCategory :  { id: 1, name: "Hajj", number: 0 },
    searchTerm : "",
};

export const blogSlice = createSlice({
    name : 'blog',
    initialState,
    reducers : {
        addCategory : (state, action) => {
            state.currentCategory = action.payload
        },
        addSearchTerm : (state, action) => {
            state.searchTerm = action.payload
        }
    }
});

export const {addCategory, addSearchTerm} = blogSlice.actions;
export default blogSlice.reducer;