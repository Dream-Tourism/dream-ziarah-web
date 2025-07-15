
import { GET_LOCATION_BY_COORDS } from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const currencyApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getCurrencyByLocation : builder.query({
            query : ( coords ) => ({
                url : `${GET_LOCATION_BY_COORDS}?q=${coords?.latitude}+${coords?.longitude}&key=4c6d199989144fd1b8d3f6adbcf3b9ac`,
                method : 'GET'
            }),
            keepUnusedDataFor : 120
        })
    })
});

export const {useGetCurrencyByLocationQuery} = currencyApi;