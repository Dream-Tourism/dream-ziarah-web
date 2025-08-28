import { GET_ALL_TOUR, GET_TOUR_ENTRYID } from "@/constant/constants";

export async function getAllToursServer() {
  try {
    const response = await fetch(`${GET_ALL_TOUR}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tours: ${response.status}`);
    }

    const data = await response.json();

    // Filter only published tours (same logic as your hook)
    const filteredData = data?.filter((tour) => tour.published === true) || [];

    return filteredData;
  } catch (error) {
    console.error("Error fetching all tours:", error);
    return [];
  }
}

export async function getTourBySlugServer(slug) {
  try {
    const allTours = await getAllToursServer();

    if (!allTours || !slug) return null;

    const tour = allTours.find((tour) => tour.slug === slug) || null;

    return {
      tour,
      tourIds: tour ? tour.id : null,
      notFound: !tour,
    };
  } catch (error) {
    console.error("Error fetching tour by slug:", error);
    return null;
  }
}

export async function getSingleTourServer(tourId) {
  try {
    if (!tourId) return null;

    const response = await fetch(`${GET_TOUR_ENTRYID}/${tourId}/`, {
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch single tour: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching single tour:", error);
    return null;
  }
}
