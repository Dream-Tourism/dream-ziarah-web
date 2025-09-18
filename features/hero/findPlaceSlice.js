import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [
    { id: 1, name: "Hajj" },
    { id: 2, name: "Makkah" },
    { id: 3, name: "Madina" },
    { id: 4, name: "Jeddah" },
    { id: 5, name: "Taif" },
    // { id: 5, name: "Car" },
    // { id: 6, name: "Cruise" },
    // { id: 7, name: "Flights" },
  ],
  currentTab: "Makkah",
};

export const findPlaceSlice = createSlice({
  name: "find-place",
  initialState,
  reducers: {
    addCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
  },
});

export const { addCurrentTab } = findPlaceSlice.actions;
export default findPlaceSlice.reducer;
