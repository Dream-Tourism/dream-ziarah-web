import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logoUrl : ''
}

export const siteSettingSlice = createSlice({
    name : 'siteSetting',
    initialState,
    reducers : {
        addLogoUrl : (state, action) => {
            state.logoUrl = action.payload;
        }
    }
});

export const {addLogoUrl} = siteSettingSlice.actions;
export default siteSettingSlice.reducer;