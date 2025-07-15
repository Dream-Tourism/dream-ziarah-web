import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tourItem: {},
  itenarayItems: [],
  tourItems: [],
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    addtourItem: (state, action) => {
      state.tourItem = action.payload;
    },
    addItenarayItems: (state, action) => {
      state.itenarayItems = action.payload;
    },
    addTourItems: (state, action) => {
      state.tourItems = action.payload;
    },
  },
});

export const { addtourItem, addItenarayItems, addTourItems } =
  tourSlice.actions;
export default tourSlice.reducer;
