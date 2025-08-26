import { useGetSingleTourQuery } from "@/features/content/newContentApi";

export const useSingleTour = (tourId) => {
  const result = useGetSingleTourQuery(tourId);
  return result;
};
