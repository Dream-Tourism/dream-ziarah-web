import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bokunScriptUrl : "",
    currentPageUrl : "",
    guests : {}
};

export const bokunSlice = createSlice({
    name : 'bokun',
    initialState,
    reducers : {
        addBokunScriptUrl : (state, action) => {
            state.bokunScriptUrl = action.payload
        },
        addCurrentPageUrl : (state, action) => {
            state.currentPageUrl = action.payload
        },
        addGuests : (state, action) => {
            state.guests = action.payload
        }
    }
});

export const {addBokunScriptUrl, addCurrentPageUrl, addGuests} = bokunSlice.actions;
export default bokunSlice.reducer;