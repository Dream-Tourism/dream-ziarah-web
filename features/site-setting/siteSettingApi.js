import { GET_SITESETTINGS } from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const siteSettingApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getLogoUrl : builder.query({
            query : () => ({
                url :  GET_SITESETTINGS,
                method : 'GET'
            })
        })
    })
});

export const {useGetLogoUrlQuery} = siteSettingApi;