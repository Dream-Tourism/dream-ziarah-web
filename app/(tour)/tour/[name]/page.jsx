import Wrapper from "@/components/layout/Wrapper";
import TourHeading from "@/components/tour-single/TourHeading";
import TourSingle from "@/components/tour-single/TourSingle";
import { useAllTour } from "@/hooks/useAllTour";
import { useSingleTour } from "@/hooks/useSingleTour";
import { useTourBySlug } from "@/hooks/useTourBySlug";
import getAllContentByMenuId from "@/services/contentService";
import getAllMenuItem from "@/services/menuService";
import {
  getAllToursServer,
  getSingleTourServer,
  getTourBySlugServer,
} from "@/services/tourService";
import { notFound } from "next/navigation";

function getFullUrl(slug) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://dreamtourism.it";
  const fullPath = `${baseUrl}/tour/${slug}`;
  return fullPath;
}

const tourMetadatas = {
  //makka

  "makkah-city-ziarah-vehicle-sharing-with-guide": {
    title: "Ziyarat in Makkah: Shared Vehicle Tour with Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Makkah with our shared vehicle tour. A guided journey offering a deep dive into the spiritual heritage of Makkah.",
  },
  "makkah-city-ziarah-luxury-private-vehicle-without-guide-(3-person-luxury)": {
    title: "Ziyarat in Makkah: 3-Person Luxury Self-Guided Tour | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Makkah at your own pace with our 3-person luxury vehicle. A private, flexible journey for those seeking solitude and spiritual reflection.",
  },
  "makkah-city-ziarah-luxury-private-vehicle-with-guide-(3-person-luxury)": {
    title:
      "Ziyarat in Makkah: 3-Person Luxury Tour with Private Vehicle & Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Makkah with our 3-person luxury vehicle tour accompanied by a knowledgeable guide for a personalized spiritual journey.",
  },
  "makkah-city-ziarah-luxury-private-vehicle-with-guide-(5-person-family)": {
    title:
      "Ziyarat in Makkah: Family Tour in Luxury Vehicle with Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Makkah with our 5-person family luxury vehicle tour. Guided visits to enrich your family's spiritual experience in the holy city.",
  },
  "makkah-city-ziarah-luxury-private-vehicle-with-guide-(10-person-group)": {
    title:
      "Ziyarat in Makkah: Group Luxury Vehicle Tour with Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Makkah with our 10-person group luxury tour. A guided exploration tailored for groups seeking spiritual depth and connection.",
  },
  "makkah-city-ziarah-luxury-private-vehicle-with-guide-(15-person-large-group)":
    {
      title:
        "Ziyarat in Makkah: Large Group Tour in Luxury Vehicle with Guide | Dream Ziarah",
      description:
        "Explore sacred Ziyarat places in Makkah with our 15-person large group luxury vehicle tour. Perfect for communities looking for a guided spiritual journey in Makkah.",
    },
  "makkah-city-ziarah-luxury-private-vehicle-without-guide-(5-person-family)": {
    title: "Ziyarat in Makkah: 5-Person Family Self-Guided Tour | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Makkah with our 5-person family vehicle, ideal for families desiring a private journey through the spiritual landmarks of Makkah.",
  },
  "makkah-city-ziarah-luxury-private-vehicle-without-guide-(10-person-group)": {
    title: "Ziyarat in Makkah: 10-Person Group Self-Guided Tour | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Makkah with our 10-person group luxury vehicle. Craft your own spiritual journey and connect with Makkah's holy sites at your group’s rhythm.",
  },
  "makkah-city-ziarah-luxury-private-vehicle-without-guide-(15-person-large-group)":
    {
      title:
        "Ziyarat in Makkah: Large Group Self-Guided Tour in Luxury Vehicle | Dream Ziarah",
      description:
        "Explore sacred Ziyarat places in Makkah with our 15-person large group vehicle. The ideal choice for large groups wanting the freedom to experience Makkah’s spirituality independently.",
    },

  //end makkah

  //madina
  "madinah-city-ziarah-vehicle-sharing-with-guide": {
    title: "Ziyarat in Madina: Shared Vehicle Tour with Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Madina with our shared vehicle tour. A guided journey offering a profound insight into Madina's spiritual heritage.",
  },
  "madinah-city-ziarah-luxury-private-vehicle-with-guide-(3-person-luxury)": {
    title:
      "Ziyarat in Madina: 3-Person Luxury Tour with Private Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Madina with our exclusive 3-person luxury vehicle tour, complete with a knowledgeable guide for a deeply personal spiritual experience.",
  },
  "madinah-city-ziarah-luxury-private-vehicle-with-guide-(5-person-family)": {
    title:
      "Ziyarat in Madina: Family Luxury Vehicle Tour with Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Madina with our 5-person family luxury vehicle tour. A guided experience designed to enrich your family's spiritual connection.",
  },
  "madinah-city-ziarah-luxury-private-vehicle-with-guide-(10-person-group)": {
    title:
      "Ziyarat in Madina: Group Luxury Vehicle Tour with Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Madina with our 10-person group luxury tour. Guided exploration for groups seeking spiritual depth and unity in the heart of Madina.",
  },
  "madinah-city-ziarah-luxury-private-vehicle-with-guide-(15-person-large-group)":
    {
      title:
        "Ziyarat in Madina: Large Group Luxury Vehicle Tour with Guide | Dream Ziarah",
      description:
        "Explore sacred Ziyarat places in Madina with our 15-person large group luxury vehicle tour. Ideal for large groups or communities on a spiritual journey together.",
    },
  "madinah-city-ziarah-luxury-private-vehicle-without-guide-(3-person-luxury)":
    {
      title:
        "Ziyarat in Madina: 3-Person Luxury Self-Guided Tour | Dream Ziarah",
      description:
        "Explore sacred Ziyarat places in Madina at your pace with our 3-person luxury vehicle. A self-guided option for those who wish to connect with Madina's spiritual essence privately.",
    },
  "madinah-city-ziarah-luxury-private-vehicle-without-guide-(5-person-family)":
    {
      title:
        "Ziyarat in Madina: 5-Person Family Self-Guided Tour | Dream Ziarah",
      description:
        "Explore sacred Ziyarat places in Madina with our 5-person family vehicle. Perfect for families desiring to explore Madina's holy sites independently, creating lasting memories.",
    },
  "madinah-city-ziarah-luxury-private-vehicle-without-guide-(10-person-group)":
    {
      title:
        "Ziyarat in Madina: 10-Person Group Self-Guided Tour | Dream Ziarah",
      description:
        "Explore sacred Ziyarat places in Madina with our 10-person group luxury vehicle. A flexible option for groups wanting to discover Madina’s spiritual sites at their own rhythm.",
    },
  "madinah-city-ziarah-luxury-private-vehicle-without-guide-(15-person-large-group)":
    {
      title:
        "Ziyarat in Madina: Large Group Self-Guided Tour in Luxury Vehicle | Dream Ziarah",
      description:
        "Explore sacred Ziyarat places in Madina with our 15-person large group vehicle. Tailored for large groups looking to experience the spiritual majesty of Madina independently.",
    },
  //end madina

  // Jeddah
  "day-trip-from-makkah-to-jeddah-vehicle-sharing-with-guide": {
    title:
      "Ziyarat in Jeddah: Shared Day Trip from Makkah with Guide | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Jeddah on a shared day trip from Makkah. Experience the cultural and spiritual heritage of Jeddah with our knowledgeable guide.",
  },
  "day-trip-from-makkah-to-jeddah-luxury-private-vehicle-(3-person-luxury)": {
    title:
      "Ziyarat in Jeddah: 3-Person Luxury Day Trip from Makkah | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Jeddah with our exclusive 3-person luxury private vehicle tour from Makkah. A personalized journey tailored for luxury and intimacy.",
  },
  "day-trip-from-makkah-to-jeddah-luxury-private-vehicle-(5-person-family)": {
    title:
      "Ziyarat in Jeddah: Family Day Trip from Makkah in Luxury Vehicle | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Jeddah on a family-friendly day trip from Makkah. Travel in comfort with our 5-person luxury vehicle, making family memories along the way.",
  },
  "day-trip-from-makkah-to-jeddah-luxury-private-vehicle-(10-person-group)": {
    title:
      "Ziyarat in Jeddah: Group Day Trip from Makkah in Luxury Vehicle | Dream Ziarah",
    description:
      "Explore sacred Ziyarat places in Jeddah with our 10-person group luxury vehicle. A perfect day trip from Makkah for groups seeking a shared spiritual and cultural experience.",
  },
  "day-trip-from-makkah-to-jeddah-luxury-private-vehicle-(15-person-large-group)":
    {
      title:
        "Ziyarat in Jeddah: Large Group Day Trip from Makkah in Luxury Vehicle | Dream Ziarah",
      description:
        "Explore sacred Ziyarat places in Jeddah with our 15-person large group luxury vehicle. Ideal for large groups or communities looking for a comprehensive day trip from Makkah.",
    },
  //end jeddah
  // taif
  "day-trip-from-makkah-to-taif-vehicle-sharing-with-guide": {
    title: "Ziyarat in Taif: Shared Day Trip from Makkah with Guide",
    description:
      "Explore sacred Ziyarat places in Taif on a shared day trip from Makkah. Journey through Taif's spiritual sites with our expert guide, uncovering its rich cultural tapestry.",
  },
  "day-trip-from-makkah-to-taif-luxury-private-vehicle-(3-person-luxury)": {
    title: "Ziyarat in Taif: 3-Person Luxury Day Trip from Makkah",
    description:
      "Explore sacred Ziyarat places in Taif with our 3-person luxury private vehicle. A bespoke journey from Makkah for those seeking a personal and enriching spiritual experience.",
  },
  "day-trip-from-makkah-to-taif-luxury-private-vehicle-(5-person-family)": {
    title: "Ziyarat in Taif: Family Day Trip from Makkah in Luxury Vehicle",
    description:
      "Explore sacred Ziyarat places in Taif on a family day trip from Makkah. Our 5-person luxury vehicle ensures comfort and a memorable experience for the whole family.",
  },
  "day-trip-from-makkah-to-taif-luxury-private-vehicle-(10-person-group)": {
    title: "Ziyarat in Taif: Group Day Trip from Makkah in Luxury Vehicle",
    description:
      "Explore sacred Ziyarat places in Taif with our 10-person group luxury vehicle. Ideal for friends and groups from Makkah seeking a shared spiritual journey in the beauty of Taif.",
  },
  "day-trip-from-makkah-to-taif-luxury-private-vehicle-(15-person-large-group)":
    {
      title:
        "Ziyarat in Taif: Large Group Day Trip from Makkah in Luxury Vehicle",
      description:
        "Explore sacred Ziyarat places in Taif with our 15-person large group luxury vehicle. Perfect for larger groups or communities from Makkah looking for a collective spiritual exploration.",
    },
  //end taif
};

export async function generateStaticParams() {
  const data = await getAllMenuItem();
  const ziarahId = data?.menus
    ?.find((item) => item.name == "Tours")
    ?.children?.find((child) => child?.name == "Makka Tours")?.id;

  const tourContents = await getAllContentByMenuId(ziarahId);

  const modifiedContents = tourContents?.filter((item) => {
    if (
      item.name === "makkah" ||
      item.name === "medina" ||
      item.name === "jedda" ||
      item.name === "jeddah" ||
      item.name === "tabuk" ||
      item.name === "taif"
    )
      return false;
    return true;
  });

  return modifiedContents?.map((item) => ({
    name: item?.name?.toLowerCase()?.split(" ")?.join("-"),
  }));
}

export async function generateMetadata({ params, searchParams }, parent) {
  const { name } = params;

  return {
    title: tourMetadatas[name]?.title,
    description: tourMetadatas[name]?.description,
  };
}

// Server-side data fetching function
async function getTourData(slug) {
  try {
    // console.log("Fetching tour data for slug:", slug);

    // Fetch all data in parallel for better performance
    const [tourBySlugData, allTours] = await Promise.all([
      getTourBySlugServer(slug),
      getAllToursServer(),
    ]);

    if (!tourBySlugData || !tourBySlugData.tourIds) {
      // console.log("Tour not found for slug:", slug);
      return null;
    }

    // Get detailed tour data
    const tourData = await getSingleTourServer(tourBySlugData.tourIds);

    if (!tourData) {
      // console.log("Tour data not found for ID:", tourBySlugData.tourIds);
      return null;
    }

    return {
      tourData,
      allTours,
      tourIds: tourBySlugData.tourIds,
    };
  } catch (error) {
    console.error("Error fetching tour data:", error);
    return null;
  }
}

export default async function Tour({ params }) {
  const { slug } = await params;
  // console.log("Tour page params:", params);

  // Fetch all tour data at the server level
  const data = await getTourData(params.name);

  // Handle not found case
  if (!data || !data.tourData) {
    // console.log("Tour not found, redirecting to 404");
    notFound();
  }

  const { tourData, allTours, tourIds } = data;

  // console.log("Successfully fetched tour data:", {
  //   tourId: tourIds,
  //   tourName: tourData?.name,
  //   allToursCount: allTours?.length,
  // });
  const fullUrl = getFullUrl(slug);
  return (
    <>
      <Wrapper>
        <TourSingle
          params={params}
          tourData={tourData}
          allTours={allTours}
          tourIds={tourIds}
          fullUrl={fullUrl}
        >
          <TourHeading params={params} tourData={tourData} />
        </TourSingle>
      </Wrapper>
    </>
  );
}
