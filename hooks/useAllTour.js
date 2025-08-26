import { useGetAllTourQuery } from "@/features/content/newContentApi";

export const useAllTour = () => {
  const result = useGetAllTourQuery();

  console.log("useGetAllTourQuery result:", result);

  return result;
};
