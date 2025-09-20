import Link from "next/link";
import Banner from "@/components/destinations/components/Banner";
import IntroTown from "@/components/destinations/components/IntroTown";
import Weather from "@/components/destinations/components/Weather";
import Faq from "@/components/faq/Faq";
import Testimonial from "@/components/home/home-1/Testimonial";
import TestimonialLeftCol from "@/components/home/home-1/TestimonialLeftCol";
import Slights from "@/components/block/Slights";
import TopDestinations2 from "@/components/destinations/TopDestinations2";
import Tours from "@/components/tours/Tours";
import ToursMadina from "@/components/tours/ToursMadina";
import ToursJedda from "@/components/tours/ToursJedda";
import ToursTaif from "@/components/tours/ToursTaif";
import { slightContent } from "@/data/desinations";
import getAllMenuItem from "@/services/menuService";
import dynamic from "next/dynamic";

const destinationsMetadatas = {
  jeddah: {
    title: "Jeddah: Gateway to Tranquil Beauty - Dream Ziarah",
    description:
      "Explore the enchanting city of Jeddah with DreamZiarah.com. Immerse yourself in the blend of modernity and tradition, where vibrant culture meets serene coastal beauty. Plan your journey to Jeddah and create unforgettable memories.",
  },
  makkah: {
    title: "Makkah: The Spiritual Heartbeat - Dream Ziarah",
    description:
      "Embark on a sacred pilgrimage to Makkah with DreamZiarah.com. Discover the spiritual heartbeat of Islam, where the iconic Kaaba stands as a symbol of devotion. Explore our Makkah packages and embark on a journey of profound spiritual significance.",
  },
  madinah: {
    title: "Madinah: Oasis of Peace and Spirituality - Dream Ziarah",
    description:
      "Experience the tranquility of Madinah with DreamZiarah.com. Immerse yourself in the peaceful surroundings of the Prophet's Mosque and explore the rich Islamic history. Plan your spiritual journey to Madinah with our curated packages.",
  },
  taif: {
    title: "Taif: Mountain Retreat and Cultural Gem - Dream Ziarah",
    description:
      "Discover the scenic beauty and cultural richness of Taif with DreamZiarah.com. Nestled in the mountains, Taif offers a refreshing escape with its lush landscapes and historical charm. Explore our Taif packages for a unique cultural experience.",
  },
  tabuk: {
    title: "Tabuk: Unveiling Historical Treasures - Dream Ziarah",
    description:
      "Uncover the historical treasures of Tabuk with DreamZiarah.com. Immerse yourself in the rich heritage of this ancient city, known for its archaeological wonders and unique landscapes. Explore Tabuk with our thoughtfully designed travel packages.",
  },
};

const Destinations = ({ params }) => {
  const slug = params.slug;

  const renderToursSection = (location) => (
    <section className="layout-pb-lg">
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">
                Popular Tours In {location}
              </h2>
              <p className=" sectionTitle__text mt-5 sm:mt-0">
                Find Your Perfect {location} Tour: Private, Shared, and More
              </p>
            </div>
          </div>
          <div className="col-auto">
            <Link
              href={`/tours/?location=${location}`}
              className="button -md -blue-1 bg-blue-1-05 text-blue-1"
            >
              More <div className="icon-arrow-top-right ml-15" />
            </Link>
          </div>
        </div>
        <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
          {location == "Makkah" && <Tours filterLocation="Makkah" />}
          {location == "Madinah" && <ToursMadina />}
          {location == "Jeddah" && <ToursJedda />}
          {location == "Taif" && <ToursTaif />}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <div className="header-margin"></div>
      <section className="layout-pb-md">
        <div className="container">
          <div className="row">
            <Banner slug={slug} />
          </div>
          <div className="row y-gap-20 pt-40">
            <div className="col-auto">
              <h2>
                What to know before visiting{" "}
                {slug.charAt(0).toUpperCase() + slug.slice(1)}
              </h2>
            </div>
            <IntroTown slug={slug} />
          </div>
          <div className="pt-30 mt-30 border-top-light" />
          <div className="row y-gap-20">
            <div className="col-12">
              <h2 className="text-22 fw-600">Local weather</h2>
            </div>
            <Weather slug={slug} />
          </div>
          <div className="pt-30 mt-30 border-top-light" />
        </div>
      </section>
      {slug === "makkah" && renderToursSection("Makkah")}
      {slug === "madinah" && renderToursSection("Madinah")}
      {slug === "jeddah" && renderToursSection("Jeddah")}
      {slug === "taif" && renderToursSection("Taif")}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Top sights in {slug.charAt(0).toUpperCase() + slug.slice(1)}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  {slightContent[slug]?.title}
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40">
            <Slights slug={slug} />
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-auto">
              <div className="mt-20 sectionTitle -md">
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  {slightContent[slug]?.footerContent}
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-center mt-40">
            <div className="col-auto">
              <Link
                href="#"
                className="button h-50 w-250 -outline-blue-1 text-blue-1"
              >
                Explore more <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Top sights in London */}
      <section className="layout-pt-md layout-pb-lg bg-light-2">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-5 col-lg-6" data-aos="fade-up">
              <TestimonialLeftCol />
            </div>
            <div className="col-lg-6">
              <Testimonial />
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row y-gap-20">
            <div className="col-lg-4">
              <h2 className="text-30 fw-600">
                FAQs about{" "}
                {slug === "madinah"
                  ? "Madina"
                  : slug === "jedda"
                  ? "Jeddah"
                  : slug.charAt(0).toUpperCase() + slug.slice(1)}
              </h2>
            </div>
            <div className="col-lg-8">
              <div className="accordion -simple row y-gap-20 js-accordion">
                <Faq slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Destinations near{" "}
                  {slug === "madinah"
                    ? "Madina"
                    : slug === "jedda"
                    ? "Jeddah"
                    : slug.charAt(0).toUpperCase() + slug.slice(1)}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>
          <div className="pt-40 relative" style={{ width: "700px" }}>
            <TopDestinations2 slug={slug} />
          </div>
        </div>
      </section>
    </>
  );
};

export async function generateStaticParams() {
  const data = await getAllMenuItem();
  return data?.menus
    .find((item) => item.name === "Destinations")
    ?.children?.map((item) => ({ slug: item.name }));
}

export async function generateMetadata({ params, searchParams }, parent) {
  const slug = params.slug;
  return {
    title: destinationsMetadatas[slug]?.title,
    description: destinationsMetadatas[slug]?.description,
  };
}

export default dynamic(() => Promise.resolve(Destinations), { ssr: true });
