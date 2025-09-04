import Wrapper from "@/components/layout/Wrapper";
import TourHeading from "@/components/tour-single/TourHeading";
import TourSingle from "@/components/tour-single/TourSingle";
import { getAllToursServer } from "@/services/tourService";

export const metadata = {
  title: "Umrah Packages | Spiritual Umrah Journeys with Dream Ziarah",
  description:
    "Experience spiritual renewal and tranquility with Dream Ziarah's Umrah packages. Our carefully curated services provide a meaningful pilgrimage, designed for your peace and spiritual deepening.",
};

// Server-side data fetching function
async function getTourData() {
  try {
    console.log("Fetching all tours...");

    // Fetch all tours
    const allTours = await getAllToursServer();

    if (!allTours || allTours.length === 0) {
      console.log("No tours found");
      return null;
    }

    // Filter only Umrah tours
    const umrahTours = allTours.filter(
      (tour) => tour.location_type === "Umrah"
    );

    if (umrahTours.length === 0) {
      console.log("No Umrah tours found");
      return null;
    }

    // Create a representative tour object for the Umrah page
    // Use the first Umrah tour as the base but modify it for the overview page
    const umrahPageTour = {
      ...umrahTours[0], // Use first Umrah tour as base
      id: "umrah-overview",
      name: "Umrah Packages Overview",
      location_type: "Umrah",
      overview:
        "Experience spiritual renewal and tranquility with our comprehensive Umrah packages designed to provide you with a meaningful pilgrimage journey.",
      // You can customize other fields as needed for the overview page
    };

    return {
      allTours,
      umrahTours,
      umrahPageTour,
    };
  } catch (error) {
    console.error("Error fetching Umrah tours:", error);
    return null;
  }
}

export default async function UmrahPage() {
  // Fetch Umrah tours data
  const data = await getTourData();

  if (!data || !data.umrahTours) {
    console.log("No Umrah tours found");
    return (
      <Wrapper>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center">
            No Umrah packages available at the moment
          </h1>
        </div>
      </Wrapper>
    );
  }

  const { allTours, umrahTours, umrahPageTour } = data;

  // console.log("Successfully fetched tours:", {
  //   totalTours: allTours.length,
  //   umrahToursCount: umrahTours.length,
  // });

  return (
    <Wrapper>
      <TourSingle
        allTours={allTours}
        tourData={umrahPageTour} // Pass the representative Umrah tour
        umrahTours={umrahTours} // Pass all Umrah tours as additional prop
        isUmrahPage={true} // Flag to indicate this is Umrah overview page
      >
        <TourHeading
          tourData={umrahPageTour}
          umrahTours={umrahTours}
          isUmrahPage={true}
        />
      </TourSingle>
    </Wrapper>
  );
}
