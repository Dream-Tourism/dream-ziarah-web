import { useMemo } from "react";
import { useAllTour } from "./useAllTour";

export const useTourBySlug = (slug) => {
  const { data, error, isLoading } = useAllTour();

  const tour = useMemo(() => {
    if (!data || !slug) return null;
    return data.find((tour) => tour.slug === slug) || null;
  }, [data, slug]);

  return {
    tour,
    tourIds: tour ? tour.id : null, // ✅ return only the ID
    error,
    isLoading,
    notFound: !isLoading && !error && !tour,
  };
};
