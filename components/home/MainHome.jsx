"use client";
import { useGetSliderImagesQuery } from "@/features/image/imageApi";
import useWindowSize from "@/hooks/useWindowSize";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFaqDescription } from "@/hooks/useFaqDescription";
import FrequentlyQ from "../faq/FrequentlyQ";


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
);import TestimonialSection from './../testimonial/TestimonialSection';




const MainHome = ({ allTours }) => {
  // console.log("All Tour Data in MainHome:", allTours);
  const { isSuccess, isLoading, data } = useGetSliderImagesQuery();
  const { data: faqDescription } = useFaqDescription();
  // console.log("FAQ Description:", faqDescription);

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
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md d-flex justify-content-between">
                    <h2 className="sectionTitle__title md:text-24">
                      {currentTab === "Hajj"
                        ? "Book Affordable Makkah Ziyarat Package and Hajj Deals"
                        : `Book ${currentTab} Ziyarat Places List Tour`}
                    </h2>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-12 mb-5" style={{ marginTop: "-6px" }}>
                  <p className="sectionTitle__text  sm:mt-0 md:text-13">
                    {currentTab === "Hajj"
                      ? "Get Makkah ziyarat package and luxury umrah packages in Saudi Arabia."
                      : `Explore Sacred Ziyarat Places in ${currentTab}`}
                  </p>
                </div>
                {/* End .col */}
              </div>

              {/* End .row */}

              <div className="row y-gap-40 mb-5">
                {currentTab === "Hajj" ? (
                  <ToursHajjUmrahForMobile
                    searchLocation={currentTab}
                    onMobileTourDataAvailable={handleMobileTourDataAvailability}
                  />
                ) : (
                  <ToursForMobile
                    searchLocation={currentTab}
                    onMobileTourDataAvailable={handleMobileTourDataAvailability}
                  />
                )}
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>

          {/* Show Makkah section only if current tab is NOT Makkah */}
          {currentTab !== "Makkah" && mobileTourDataAvailable && (
            <section className="layout-pt-md layout-pb-md ">
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-12">
                    <div className="sectionTitle -md ">
                      <h2 className="sectionTitle__title md:text-24">
                        Book Makkah Ziyarat Places List Tour
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        Reserve the Makkah ziyarat tour at Haram Sharif. Choose
                        $25-$40 packages with or without guides for the list of
                        ziyarat places in Makkah. Secure your sacred journey
                        spot now!
                      </p>
                    </div>
                  </div>
                  {/* End .col */}
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
          {/* End Makkah Tours Sections */}

          {/* Show Madina section only if current tab is NOT Madina */}
          {currentTab !== "Madina" && mobileTourDataAvailable && (
            <section className="layout-pt-md layout-pb-md">
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-12">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title md:text-24">
                        Book Guided Madinah Ziyarat Tour
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        Plan Madinah ziyarat tour at the Prophet’s Mosque. Enjoy
                        $25-$40 packages with English guides for the ziyarat
                        places in Madinah. Limited spots, book now for the holy
                        sites in Saudi Arabia!
                      </p>
                    </div>
                  </div>
                  {/* End .col */}

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
          {/* End Madina Tours Sections */}

          {/* Show Jeddah section only if current tab is NOT Jeddah */}
          {currentTab !== "Jeddah" && mobileTourDataAvailable && (
            <section className="layout-pt-md layout-pb-md">
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-12">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title md:text-24">
                        Book Guided Ziyarat in Jeddah Holy Places
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        Book a ziyarat in Jeddah's holy places from the Jeddah
                        gateway. Select $25-$40 packages with or without guides
                        to Masjid Al-Jinn. Reserve your spiritual pilgrimage at
                        holy sites in Saudi Arabia now!
                      </p>
                    </div>
                  </div>
                  {/* End .col */}

                  {/* <div className="col-4 col-lg-auto">
                    <Link
                      href="/tours/?location=Jedda"
                      className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                    >
                      More <div className="icon-arrow-top-right ml-15" />
                    </Link>
                  </div> */}
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
          {/* End Jeddah Tours Sections */}

          {/* Show Taif section only if current tab is NOT Taif */}
          {currentTab !== "Taif" && mobileTourDataAvailable && (
            <section className="layout-pt-md layout-pb-md">
              <div className="container">
                <div className="row justify-center text-center">
                  <div className="col-12">
                    <div className="sectionTitle -md">
                      <h2 className="sectionTitle__title md:text-24">
                        Book Day Trip Taif Ziyarat Places
                      </h2>
                      <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                        Explore Taif ziyarat places on a day trip from Makkah.
                        Enjoy $40-$100 packages with guided transport to the
                        Abdullah Ibn Abbas Mosque. Book today for sacred
                        journeys in holy sites in Saudi Arabia!
                      </p>
                    </div>
                  </div>
                  {/* End .col */}

                  {/* <div className="col-4 col-lg-auto">
                    <Link
                      href="/tours/?location=Taif"
                      className="button -md -blue-1 bg-blue-1-05 text-blue-1"
                    >
                      More <div className="icon-arrow-top-right ml-15" />
                    </Link>
                  </div> */}
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
          {/* End Taif Tours Sections */}

          {/* Show Why Book With Us and Top Destinations sections */}
          {mobileTourDataAvailable && (
            <>
              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-12">
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
                    <div className="col-12">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">
                          Explore Ziyarat Tours Makkah, Madinah, and Taif
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                          Check ziyarat in Makkah and Madinah, holy sites in
                          Saudi Arabia, like the Prophet’s Mosque. Enjoy guided
                          transport to the Jeddah gateway and the Taif ziyarat
                          places. Book your spiritual pilgrimage spot today!
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

              <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-12">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">
                          What Pilgrims Say About Ziyarat Places in Makkah and
                          Madinah
                        </h2>
                        <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                          We have 4.8/5 from over 200 pilgrims! "Ziyarat in
                          Makkah and Madinah was smooth with English help, love
                          the list of ziyarat places!" Book Umrah packages with
                          our holy sites in Saudi Arabia.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-40">
                    <TestimonialSection />
                  </div>
                  {/* End .row */}
                </div>
                {/* End .container */}
              </section>

              {/* review section */}
                      <section className="layout-pt-md layout-pb-md">
                <div className="container">
                  <div className="row justify-center text-center">
                    <div className="col-12">
                      <div className="sectionTitle -md">
                        <h2 className="sectionTitle__title md:text-24">
                         FAQ
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="row y-gap-40">
                     <FrequentlyQ faqDescription={faqDescription} />
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

      {/* Regular Desktop Sections for other tabs */}
      {isMobile && dataAvailable && (
        <>
          {/* Always show Hajj/Umrah section on desktop */}
          <section className="layout-pt-md layout-pb-md ">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md ">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Affordable Makkah Ziyarat Package and Hajj Deals
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Get Makkah ziyarat package and luxury umrah packages in Saudi Arabia. Includes flights, hotels near the Two Holy Mosques, and guided ziyarat tours. Book fast to save your spot for ziyarat in Makkah and Madinah!
                    </p>
                  </div>
                </div>
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

          {/* Always show Makkah section on desktop */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Makkah Ziyarat Places List Tour
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Reserve the Makkah ziyarat tour at Haram Sharif. Choose
                      $25-$40 packages with or without guides for the list of
                      ziyarat places in Makkah. Secure your sacred journey spot
                      now!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Makkah" allTours={allTours} />
              </div>
            </div>
          </section>
          {/* End Makkah Tours Sections */}

          {/* Always show Madina section on desktop */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Guided Madinah Ziyarat Tour
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Plan Madinah ziyarat tour at the Prophet’s Mosque. Enjoy
                      $25-$40 packages with English guides for the ziyarat
                      places in Madinah. Limited spots, book now for the holy
                      sites in Saudi Arabia!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Madina" allTours={allTours} />
              </div>
            </div>
          </section>
          {/* End Madina Tours Sections */}

          {/* Always show Jeddah section on desktop */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Guided Ziyarat in Jeddah Holy Places
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Book a ziyarat in Jeddah's holy places from the Jeddah
                      gateway. Select $25-$40 packages with or without guides to
                      Masjid Al-Jinn. Reserve your spiritual pilgrimage at holy
                      sites in Saudi Arabia now!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Jeddah" allTours={allTours} />
              </div>
            </div>
          </section>
          {/* End Jeddah Tours Sections */}

          {/* Always show Taif section on desktop */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Book Day Trip Taif Ziyarat Places
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Explore Taif ziyarat places on a day trip from Makkah.
                      Enjoy $40-$100 packages with guided transport to the
                      Abdullah Ibn Abbas Mosque. Book today for sacred journeys
                      in holy sites in Saudi Arabia!
                    </p>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
                <Tours filterLocation="Taif" allTours={allTours} />
              </div>
            </div>
          </section>
          {/* End Taif Tours Sections */}

          {/* Always show Why Book With Us section on desktop */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Your Trusted Guide for Ziyarat Tours Makkah 
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
Count on us for ziyarat tours, Makkah, and guided ziyarat tours in Saudi Arabia. We help European pilgrims with all ziyarat in Makkah and the holy sites in Saudi Arabia know-how. Book easily for your trip!                    </p>
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

          {/* Always show Top Destinations section on desktop */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      Explore Ziyarat Tours Makkah, Madinah, and Taif
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      Check ziyarat in Makkah and Madinah, holy sites in Saudi
                      Arabia, like the Prophet’s Mosque. Enjoy guided transport
                      to the Jeddah gateway and the Taif ziyarat places. Book
                      your spiritual pilgrimage spot today!
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
 {/* Review section */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      What Pilgrims Say About Ziyarat Places in Makkah and
                      Madinah
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                      We have 4.8/5 from over 200 pilgrims! "Ziyarat in Makkah
                      and Madinah was smooth with English help, love the list of
                      ziyarat places!" Book Umrah packages with our holy sites
                      in Saudi Arabia.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 ">
                <TestimonialSection />
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>

           {/* FAQ */}
          <section className="layout-pt-md layout-pb-md">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-12">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title md:text-24">
                      FAQ
                    </h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row y-gap-40 ">
           <FrequentlyQ faqDescription={faqDescription} />
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </section>
        </>
      )}
    </>
  );
};

// export default dynamic(() => Promise.resolve(MainHome), { ssr: false });
export default MainHome;
