import {
  GET_ALL_CONTENT_AND_IMAGES_BY_MENU_ID,
  GET_IMAGE_BY_MENU_ID,
  GET_IMAGE_BY_MENU_NAME,
  GET_SLIDERSETTINGS,
} from "@/constant/constants";
import { apiSlice } from "../api/apiSlice";

export const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImagesByMenuId: builder.query({
      query: (menuId) => ({
        url: `${GET_IMAGE_BY_MENU_ID}/${menuId}`,
        method: "GET",
      }),
    }),

    getContentsAndImagesByMenuId: builder.query({
      query: (menuId) => ({
        url: `${GET_ALL_CONTENT_AND_IMAGES_BY_MENU_ID}/${menuId}`,
        method: "GET",
      }),
    }),
    getImagesByMenuName: builder.query({
      query: (menuName) => ({
        url: `${GET_IMAGE_BY_MENU_NAME}/${menuName}`,
        method: "GET",
      }),
    }),
    getSliderImages: builder.query({
      query: () => ({
        url: GET_SLIDERSETTINGS,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetImagesByMenuIdQuery,
  useGetContentsAndImagesByMenuIdQuery,
  useGetImagesByMenuNameQuery,
  useGetSliderImagesQuery,
} = imageApi;
