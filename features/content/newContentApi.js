import { GET_ALL_TOUR, GET_TOUR_ENTRYID } from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const newContentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTour: builder.query({
      query: () => ({
        url: GET_ALL_TOUR,
        method: "GET",
      }),
      keepUnusedDataFor: 120,
    }),
    getSingleTour: builder.query({
      query: (tourId) => ({
        url: `${GET_TOUR_ENTRYID}/${tourId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 120,
    }),
  }),
});

export const { useGetAllTourQuery, useGetSingleTourQuery } = newContentApi;
