
import { CREATE_NEWS_LETTER, CREATE_SUBSCRIPTION_WITH_EMAIL } from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const newsLetterApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createNewsLetter : builder.mutation({
            query : (data) => ({
                url : CREATE_NEWS_LETTER,
                method : 'POST',
                body : data
            })
        }),
        createNewsLetterJustEmail : builder.mutation({
            query : (data) => ({
                url : CREATE_SUBSCRIPTION_WITH_EMAIL,
                method : 'POST',
                body : data
            })
        })
    })
});

export const {useCreateNewsLetterMutation, useCreateNewsLetterJustEmailMutation} = newsLetterApi;