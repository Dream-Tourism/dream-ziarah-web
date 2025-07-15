import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coords : {}
};

export const locationSlice = createSlice({
    name : 'location',
    initialState,
    reducers : {
        setCoords : (state, action) => {
            state.coords = action.payload
        }
    }
});

export const {setCoords} = locationSlice.actions;
export default locationSlice.reducer;