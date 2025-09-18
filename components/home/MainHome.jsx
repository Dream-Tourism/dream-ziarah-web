"use client";
import { useGetSliderImagesQuery } from "@/features/image/imageApi";
import { useAllTour } from "@/hooks/useAllTour";
import useWindowSize from "@/hooks/useWindowSize";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const TopDestinations = dynamic(() =>
  import("@/components/destinations/TopDestinations")
);
const Hero3 = dynamic(() => import("@/components/hero/hero-3"));
const WhyChoose = dynamic(() => import("@/components/home/home-3/WhyChoose"));
const Tours = dynamic(() => import("@/components/tours/Tours"));
const ToursMadina = dynamic(() => import("@/components/tours/ToursMadina"));
const ToursJedda = dynamic(() => import("@/components/tours/ToursJedda"));
const ToursTaif = dynamic(() => import("@/components/tours/ToursTaif"));
const ToursForMobile = dynamic(() =>
  import("@/components/tours/ToursForMobile")
);
const ToursHajjUmrah = dynamic(() =>
  import("@/components/tours/ToursHajjUmrah")
);
const ToursHajjUmrahForMobile = dynamic(() =>
  import("@/components/tours/ToursHajjUmrahForMobile")
);
const ServicesOverview = dynamic(() =>
  import("@/components/services/ServicesOverview")
);

const MainHome = ({ allTours }) => {
  console.log("All Tour Data in MainHome:", allTours);
  const { isSuccess, isLoading, data } = useGetSliderImagesQuery();

  const [dataAvailable, setDataAvailable] = useState(false);
  const [mobileDataAvailable, setMobileDataAvailable] = useState(false);
  const [mobileTourDataAvailable, setMobileTourDataAvailable] = useState(false);

  const width = useWindowSize();
  const isMobile = width > 768;

  const { currentTab } = useSelector((state) => state.hero) || {};

  // Function to handle data availability big device
  const handleDataAvailability = (isDataAvailable) => {
    setDataAvailable(isDataAvailable);
  };
  // Function to handle data availability for mobile
  const handleMobileDataAvailability = (isMobileDataAvailable) => {
    setMobileDataAvailable(isMobileDataAvailable);
  };
  // Function to handle data availability for mobile
  const handleMobileTourDataAvailability = (isMobileTourDataAvailable) => {
    setMobileTourDataAvailable(isMobileTourDataAvailable);
  };

  return (
    <>
      {/* <Hero7/> */}
      <div className="header-margin"></div>
      <Hero3
        onDataAvailable={handleDataAvailability}
        onMobileDataAvailable={handleMobileDataAvailability}
        isSuccess={isSuccess}
        isLoading={isLoading}
        data={data}
      />
      {/* End Hero 3 */}

      {/* Services Overview Section */}
      <ServicesOverview />
      {/* End Services Overview */}

      {/* Hajj/Umrah Section for Mobile */}
      {!isMobile && mobileDataAvailable ? (
        <>
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row y-gap-22 justify-between items-start">
                <div className="col-12">
                  <div className="sectionTitle -md d-flex justify-content-between">
                    <h2 className="sectionTitle__title md:text-24">
                      Ziyarat In {currentTab}
                    </h2>
                    <Link
                      href={`/tours/?location=${currentTab}`}
                      className="button -md -blue-1 bg-blue-1-05 text-blue-1 md:text-13"
                    >
                      More{" "}
                      <div className="icon-arrow-top-right ml-15 md:text-13" />
                    </Link>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-12 mb-5" style={{ marginTop: "-6px" }}>
                  <p className="sectionTitle__text  sm:mt-0 md:text-13">
                    Explore Sacred Ziyarat Places in {currentTab}
                  </p>
                </div>
                {/* End .col */}
              </div>

              {/* End .row */}

              <div className="row y-gap-40 mb-5">
                <ToursForMobile
                  searchLocation={currentTab}
                  onMobileTourDataAvailable={handleMobileTourDataAvailability}
                />
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>
          {currentTab == "Makkah" ? (
            ""
          ) : (
            <>
              {mobileTourDataAvailable && (
                <section className="layout-pt-md layout-pb-md ">
                  <div className="container">
                    <div className="row y-gap-22 justify-between items-start">
                      <div className="col-8 col-lg-auto">
                        <div className="sectionTitle -md ">
                          <h2 className="sectionTitle__title md:text-24">
                            Ziyarat In Makkah
                          </h2>
                          <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                            Explore Sacred Ziyarat Places in Makkah
                          </p>
                        </div>
                      </div>
                      {/* End .col */}

                      <div className="col-4 col-lg-auto">
                        <Link
                          href="/tours/?location=Makkah"
                          className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                        >
                          More <div className="icon-arrow-top-right ml-15" />
                        </Link>
                      </div>
                      {/* End .col */}
                    </div>

                    {/* End .row */}

                    <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                      <Tours filterLocation="Makkah" allTours={allTours} />
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .container */}
                </section>
              )}
            </>
          )}
          {/* End Makka Tours Sections */}
          {currentTab == "Madina" ? (
            ""
          ) : (
            <>
              {mobileTourDataAvailable && (
                <section className="layout-pt-md layout-pb-md">
                  <div className="container">
                    <div className="row y-gap-22 justify-between items-start">
                      <div className="col-8 col-lg-auto ">
                        <div className="sectionTitle -md">
                          <h2 className="sectionTitle__title md:text-24">
                            Ziyarat In Madina
                          </h2>
                          <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                            Explore Sacred Ziyarat Places in Madina
                          </p>
                        </div>
                      </div>
                      {/* End .col */}

                      <div className="col-4 col-lg-auto">
                        <Link
                          href="/tours/?location=Medina"
                          className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                        >
                          More <div className="icon-arrow-top-right ml-15" />
                        </Link>
                      </div>
                      {/* End .col */}
                    </div>

                    {/* End .row */}

                    <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                      <Tours filterLocation="Madina" allTours={allTours} />
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .container */}
                </section>
              )}
            </>
          )}
          {/* End Madina Tours Sections */}

          {currentTab == "Jeddah" ? (
            ""
          ) : (
            <>
              {mobileTourDataAvailable && (
                <section className="layout-pt-md layout-pb-md">
                  <div className="container">
                    <div className="row y-gap-22 justify-between items-start">
                      <div className="col-8 col-lg-auto">
                        <div className="sectionTitle -md">
                          <h2 className="sectionTitle__title md:text-24">
                            Ziyarat In Jeddah
                          </h2>
                          <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                            Explore Sacred Ziyarat Places in Jeddah
                          </p>
                        </div>
                      </div>
                      {/* End .col */}

                      <div className="col-4 col-lg-auto">
                        <Link
                          href="/tours/?location=Jedda"
                          className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                        >
                          More <div className="icon-arrow-top-right ml-15" />
                        </Link>
                      </div>
                      {/* End .col */}
                    </div>

                    {/* End .row */}

                    <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                      <Tours filterLocation="Jeddah" allTours={allTours} />
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .container */}
                </section>
              )}
            </>
          )}
          {/* End Jedda Tours Sections */}

          {currentTab == "Taif" ? (
            ""
          ) : (
            <>
              {mobileTourDataAvailable && (
                <section className="layout-pt-md layout-pb-md">
                  <div className="container">
                    <div className="row y-gap-22 justify-between items-start">
                      <div className="col-8 col-lg-auto">
                        <div className="sectionTitle -md">
                          <h2 className="sectionTitle__title md:text-24">
                            Ziyarat In Taif
                          </h2>
                          <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                            Explore Sacred Ziyarat Places in Taif
                          </p>
                        </div>
                      </div>
                      {/* End .col */}

                      <div className="col-4 col-lg-auto">
                        <Link
                          href="/tours/?location=Taif"
                          className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                        >
                          More <div className="icon-arrow-top-right ml-15" />
                        </Link>
                      </div>
                      {/* End .col */}
                    </div>

                    {/* End .row */}

                    <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                      <Tours filterLocation="Taif" allTours={allTours} />
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .container */}
                </section>
              )}
            </>
          )}
          {/* End Taif Tours Sections */}
          {mobileTourDataAvailable && (
            <>
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-auto">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">
                          Why Book With Us
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                          Experience Quality and Excellence with DreamZiarah
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-40 justify-between pt-50">
                    <WhyChoose />
                  </div>
                  {/* End row */}
                </div>
                {/* End .container */}
              </section>
              {/* End Why choose Section */}

              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-auto">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">
                          Top Destinations
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                          Explore Exciting Destinations, Tailored for Every
                          Explorer
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-40 pt-40 sm:pt-20">
                    <TopDestinations />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>
            </>
          )}

          {/* End Top Destinations Section */}
        </>
      ) : null}

      {/* Desktop Hajj/Umrah Section */}
      {isMobile && dataAvailable && (
        <>
          <section className="layout-pt-md layout-pb-md ">
            <div className="container">
              <div className="row y-gap-22 justify-between items-start">
                <div className="col-8 col-lg-auto">
                  <div className="sectionTitle -md ">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Affordable Umrah and Hajj Deals
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Get Makkah ziyarat package and luxury umrah packages in
                      Saudi Arabia.
                    </p>
                  </div>
                </div>
                {/* End .col */}

                {/* <div className="col-4 col-lg-auto">
                  <Link
                    href="/tours/?location=Hajj"
                    className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                  >
                    More <div className="icon-arrow-top-right ml-15" />
                  </Link>
                </div> */}
                {/* End .col */}
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <ToursHajjUmrah
                  filterLocation="HajjUmrah"
                  allTours={allTours}
                />
              </div>
            </div>
          </section>
          {/* End Hajj/Umrah Tours Sections */}
        </>
      )}

      {/* Regular Desktop Sections for other tabs */}
      {isMobile && dataAvailable && currentTab !== "Hajj" && (
        <>
          <section className="layout-pt-md layout-pb-md ">
            <div className="container">
              <div className="row y-gap-22 justify-between items-start">
                <div className="col-8 col-lg-auto">
                  <div className="sectionTitle -md ">
                    <h2 className="sectionTitle__title md:text-24">
                      Ziyarat In {currentTab}
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Explore Sacred Ziyarat Places in {currentTab}
                    </p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-4 col-lg-auto">
                  <Link
                    href={`/tours/?location=${currentTab}`}
                    className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                  >
                    More <div className="icon-arrow-top-right ml-15" />
                  </Link>
                </div>
                {/* End .col */}
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation={currentTab} allTours={allTours} />
              </div>
            </div>
          </section>
          {/* End Current Tab Tours Sections */}
        </>
      )}

      {dataAvailable && isMobile && currentTab !== "Hajj" && (
        <>
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row y-gap-22 justify-between items-start">
                <div className="col-8 col-lg-auto ">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Ziyarat In Madina
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Explore Sacred Ziyarat Places in Madina
                    </p>
                  </div>
                </div>
                <div className="col-4 col-lg-auto">
                  <Link
                    href="/tours/?location=Medina"
                    className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                  >
                    More <div className="icon-arrow-top-right ml-15" />
                  </Link>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Madina" allTours={allTours} />
              </div>
            </div>
          </section>
          {/* End Madina Tours Sections */}

          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row y-gap-22 justify-between items-start">
                <div className="col-8 col-lg-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Ziyarat In Jeddah
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Explore Sacred Ziyarat Places in Jeddah
                    </p>
                  </div>
                </div>
                <div className="col-4 col-lg-auto">
                  <Link
                    href="/tours/?location=Jedda"
                    className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                  >
                    More <div className="icon-arrow-top-right ml-15" />
                  </Link>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Jeddah" allTours={allTours} />
              </div>
            </div>
          </section>
          {/* End Jedda Tours Sections */}

          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row y-gap-22 justify-between items-start">
                <div className="col-8 col-lg-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Ziyarat In Taif
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Explore Sacred Ziyarat Places in Taif
                    </p>
                  </div>
                </div>
                <div className="col-4 col-lg-auto">
                  <Link
                    href="/tours/?location=Taif"
                    className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                  >
                    More <div className="icon-arrow-top-right ml-15" />
                  </Link>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Taif" allTours={allTours} />
              </div>
            </div>
          </section>
          {/* End Taif Tours Sections */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Why Book With Us
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Experience Quality and Excellence with DreamZiarah
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 justify-between pt-50">
                <WhyChoose />
              </div>
              {/* End row */}
            </div>
            {/* End .container */}
          </section>
          {/* End Why choose Section */}

          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Top Destinations
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Explore Exciting Destinations, Tailored for Every Explorer
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 pt-40 sm:pt-20">
                <TopDestinations />
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>

          {/* End Top Destinations Section */}
        </>
      )}
    </>
  );
};

// export default dynamic(() => Promise.resolve(MainHome), { ssr: false });
export default MainHome;
