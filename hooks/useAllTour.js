import { useGetAllTourQuery } from "@/features/content/newContentApi";

export const useAllTour = () => {
  const result = useGetAllTourQuery();

  // Filter only published tours
  const filteredData =
    result.data?.filter((tour) => tour.published === true) || [];

  return {
    ...result,
    data: filteredData, // replace raw data with filtered
  };
};
