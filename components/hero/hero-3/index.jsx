"use client";
import { useGetSliderImagesQuery } from "@/features/image/imageApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import MainFilterSearchBox from "./MainFilterSearchBox";
import CoverSkeleton from "@/components/skeleton/CoverSkeleton";
import useWindowSize from "@/hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentTab } from "@/features/hero/findPlaceSlice";
const index = ({
  onDataAvailable,
  isSuccess,
  isLoading,
  data,
  onMobileDataAvailable,
}) => {
  const width = useWindowSize();
  const isMobile = width > 768;

  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    onMobileDataAvailable(true);
  }, [isSuccess]);
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);
  let sliderImageItems = [];
  if (isSuccess) {
    sliderImageItems = data?.homepage_sliders?.map((item) => ({
      ...item,
      image: `${item.image}`,
    }));
  }
  // useEffect(() => {
  //   if (sliderImageItems !== 0) {
  //     onDataAvailable(true);
  //   }
  // }, [onDataAvailable, sliderImageItems]);

  return isLoading ? (
    <CoverSkeleton />
  ) : (
    <>
      {!isMobile ? (
        <section className="masthead__bg bg-dark-5 -type-2 z-2">
          <div className="row">
            <div className="col-12">
              <div
                className={`masthead__tabs  ${
                  navbar ? "header-masterhead controls-head  is-sticky" : ""
                }`}
              >
                <div className="tabs -bookmark-2 js-tabs w-100">
                  <div
                    className={`tabs__controls d-flex items-center js-tabs-controls  ${
                      navbar ? "bg-dark-5 " : ""
                    }`}
                  >
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        className={`tabs__button px-30 py-20 sm:px-20 sm:py-15 rounded-4 fw-600 text-white js-tabs-button ${
                          tab?.name === currentTab ? "is-tab-el-active" : ""
                        }`}
                        onClick={() => {
                          scrollToTop();
                          dispatch(addCurrentTab(tab?.name));
                        }}
                      >
                        {/* <i className={`${tab.icon} text-20 mr-10 sm:mr-5`}></i> */}
                        {tab?.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* End tabs */}
              </div>
              {/* End .masthead__tabs */}

              <div className="">
                <div
                  className="row justify-center"
                  style={{
                    backgroundImage:
                      "url(https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/e8c9ea82-4d87-4e1a-5458-9a7348e14400/public)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.89,
                    height: "120px",
                    // width: '100%',  // Uncomment if you need this property
                    backgroundPosition: "center",
                    backgroundAttachment: "local",
                  }}
                >
                  <div className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center mt-10">
                    <div className="text-center">
                      <h1
                        className="text-25 lg:text-25 md:text-25  text-white"
                        data-aos="fade-up"
                        style={{
                          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        }}
                      >
                        Book Your Ziyarat <br /> in Makkah & Madina
                      </h1>
                      <p
                        className="text-white text-12 mt-5"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        style={{
                          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        }}
                      >
                        Immerse in Spiritual Quests
                      </p>
                    </div>
                    {/* End hero title */}
                  </div>
                </div>
              </div>
            </div>

            {/* End .masthead__content */}
          </div>
          {/* End .container */}
        </section>
      ) : (
        <section className=" masthead -type-6 mb-40">
          <div className="masthead__bg ">
            <Image
              src={sliderImageItems[1]?.cloudflare_image_url}
              width={1920}
              height={600}
              alt="image"
              priority={true}
              onLoad={onDataAvailable(true)}
            />
          </div>

          <div
            className="container"
            style={{ position: "relative", top: "70px" }}
          >
            <div className="row justify-center">
              <div className="col-xl-9 d-lg-flex flex-column justify-content-center align-items-center">
                <div className="text-center">
                  <h1
                    className="text-45 lg:text-40 md:text-30 text-white"
                    data-aos="fade-up"
                    style={{
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    Book Your Ziyarat <br /> in Makkah & Madina
                  </h1>
                  <p
                    className="text-white mt-5"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    style={{
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    Immerse in Spiritual Quests
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div
              className="mainSearch-wrap bg-white shadow-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <MainFilterSearchBox />
              {/* End tab-filter */}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default index;
