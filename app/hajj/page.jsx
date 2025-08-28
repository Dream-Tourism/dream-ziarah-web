import Wrapper from "@/components/layout/Wrapper";
import TourHeading from "@/components/tour-single/TourHeading";
import TourSingle from "@/components/tour-single/TourSingle";
import { getAllToursServer } from "@/services/tourService";

export const metadata = {
  title: "Hajj Packages | Complete Your Hajj Pilgrimage with Dream Ziarah",
  description:
    "Achieve a profound spiritual journey with Dream Ziarah's Hajj packages. We offer full support for your pilgrim, ensuring a deeply enriching and smooth experience.",
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

    // Filter only Hajj tours
    const hajjTours = allTours.filter((tour) => tour.location_type === "Hajj");

    if (hajjTours.length === 0) {
      console.log("No Hajj tours found");
      return null;
    }

    // Create a representative tour object for the Hajj page
    // Use the first Hajj tour as the base but modify it for the overview page
    const hajjPageTour = {
      ...hajjTours[0], // Use first Hajj tour as base
      id: "hajj-overview",
      name: "Hajj Packages Overview",
      location_type: "Hajj",
      overview:
        "Explore our comprehensive Hajj packages designed to provide you with a spiritually enriching pilgrimage experience.",
      // You can customize other fields as needed for the overview page
    };

    return {
      allTours,
      hajjTours,
      hajjPageTour,
    };
  } catch (error) {
    console.error("Error fetching Hajj tours:", error);
    return null;
  }
}

export default async function HajjPage() {
  // Fetch Hajj tours data
  const data = await getTourData();

  if (!data || !data.hajjTours) {
    console.log("No Hajj tours found");
    return (
      <Wrapper>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center">
            No Hajj packages available at the moment
          </h1>
        </div>
      </Wrapper>
    );
  }

  const { allTours, hajjTours, hajjPageTour } = data;

  console.log("Successfully fetched tours:", {
    totalTours: allTours.length,
    hajjToursCount: hajjTours.length,
  });

  return (
    <Wrapper>
      <TourSingle
        allTours={allTours}
        tourData={hajjPageTour} // Pass the representative Hajj tour
        hajjTours={hajjTours} // Pass all Hajj tours as additional prop
        isHajjPage={true} // Flag to indicate this is Hajj overview page
      >
        <TourHeading
          tourData={hajjPageTour}
          hajjTours={hajjTours}
          isHajjPage={true}
        />
      </TourSingle>
    </Wrapper>
  );
}
