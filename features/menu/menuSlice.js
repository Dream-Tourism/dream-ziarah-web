import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItems : []
};

export const menuSlice = createSlice({
    name : 'menu',
    initialState,
    reducers : {
        addMenuItems : (state, action) => {
            state.menuItems = action.payload
        }
    }
});

export const {addMenuItems} = menuSlice.actions;
export default menuSlice.reducer;