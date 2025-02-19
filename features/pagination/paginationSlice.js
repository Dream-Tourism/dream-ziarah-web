import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage : 1,
    totalItem : 0,
    PageSize : 2
};

export const paginationSlice = createSlice({
    name : 'pagination',
    initialState,
    reducers : {
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload
        },
        setTotalItem : (state, action) =>{
            state.totalItem = action.payload
        }
    }
});

export const {setCurrentPage, setTotalItem} = paginationSlice.actions;
export default paginationSlice.reducer;