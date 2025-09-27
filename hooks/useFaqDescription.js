import { useGetAllTourQuery } from "@/features/content/newContentApi";

export const useFaqDescription = () => {
  const result = useGetAllTourQuery();

  // Find the first tour that matches published === true and name === "FAQ"
  const faqItem = result.data?.find(
    (tour) => tour.published === false && tour.name === "FAQ"
  );

  // Extract only the description or return null if not found
  const description = faqItem?.description || null;

  return {
    ...result,
    data: description, // return only the description field
  };
};
