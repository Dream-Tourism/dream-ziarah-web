import { apiSlice } from "@/features/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blog/blogSlice";
import bokunReducer from "../features/bokun/bokunSlice";
import currencyReducer from "../features/currency/currencySlice";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import locationReducer from "../features/location/locationSlice";
import menuReducer from "../features/menu/menuSlice";
import paginatonReducer from "../features/pagination/paginationSlice";
import searchReducer from "../features/search/searchSlice";
import siteSettingReducer from "../features/site-setting/siteSettingSlice";
import tourReducer from "../features/tour/tourSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    hero: findPlaceSlice,
    menus: menuReducer,
    tour: tourReducer,
    blog: blogReducer,
    currency: currencyReducer,
    siteSettings: siteSettingReducer,
    pagination: paginatonReducer,
    location: locationReducer,
    search: searchReducer,
    bokun: bokunReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
