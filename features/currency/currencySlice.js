import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCurrency : { id: 100, name: "United States dollar", currency: "USD", symbol: "$" },
    exchangeRates : {},
};

export const currencySlice = createSlice({
    name : 'currency',
    initialState,
    reducers : {
        addCurrency : (state, action) => {
            state.currentCurrency = action.payload
        },
        addExchangeRates : (state, action) => {
            state.exchangeRates = action.payload
        }
    }
});

export const {addCurrency, addExchangeRates} = currencySlice.actions;
export default currencySlice.reducer;