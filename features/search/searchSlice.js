import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  location: "",
  itemsCount: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    addItemsCount: (state, action) => {
      state.itemsCount = action.payload;
    },
  },
});

export const { addSearchValue, addLocation, addItemsCount } =
  searchSlice.actions;
export default searchSlice.reducer;
