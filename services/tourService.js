import { GET_ALL_TOUR, GET_TOUR_ENTRYID } from "@/constant/constants";

export async function getAllToursServer() {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const url = `${GET_ALL_TOUR}?t=${timestamp}`;

    const response = await fetch(url, {
      cache: "no-store", // This tells Next.js not to cache the response
      headers: {
        "Content-Type": "application/json",
        // Additional headers to prevent caching
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
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

    const timestamp = new Date().getTime();
    const url = `${GET_TOUR_ENTRYID}/${tourId}/?t=${timestamp}`;

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
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
