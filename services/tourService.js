import { GET_ALL_TOUR, GET_TOUR_ENTRYID } from "@/constant/constants";

export async function getAllToursServer() {
  try {
    const response = await fetch(GET_ALL_TOUR, {
      next: { revalidate: 300 }, // Cache with 5-minute revalidation
      headers: {
        "Content-Type": "application/json",
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
    if (!slug) return null;

    // First try to get tour directly by slug if API supports it
    // For now, we'll still need to fetch all tours, but we'll optimize the request
    const response = await fetch(GET_ALL_TOUR, {
      next: { revalidate: 300 }, // Cache with 5-minute revalidation
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tours: ${response.status}`);
    }

    const allTours = await response.json();
    const filteredTours = allTours?.filter((tour) => tour.published === true) || [];

    const tour = filteredTours.find((tour) => tour.slug === slug) || null;

    // Debug logging to help identify issues
    if (!tour) {
      console.log('Tour not found for slug:', slug);
      console.log('Available tour slugs:', filteredTours.map(t => t.slug).slice(0, 5));
    }

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
