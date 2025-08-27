"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addItemsCount } from "@/features/search/searchSlice";
import Slider from "react-slick";
import useWindowSize from "@/hooks/useWindowSize";
import { useAllTour } from "@/hooks/useAllTour";

const TourProperties = ({ searchLocation }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const width = useWindowSize();
  const isMobile = width < 768;
  const search = searchParams.get("location");
  const { data, error, isLoading } = useAllTour();
  const { currentCurrency } = useSelector((state) => state.currency);

  // Get the current search location (from URL params or prop)
  const currentSearchLocation = search || searchLocation;

  // Map search locations to location_type format
  const getLocationTypeFilter = (location) => {
    switch (location) {
      case "Makkah":
        return "Ziyarat In Makkah";
      case "Medina":
      case "Madina":
        return "Ziyarat In Madina";
      case "Taif":
        return "Ziyarat In Taif";
      case "Jedda":
      case "Jeddah":
        return "Ziyarat In Jeddah";
      default:
        return "";
    }
  };

  // Filter tours based on location_type and published status
  const filteredTours =
    data?.filter((tour) => {
      const isPublished = tour.published === true;
      const locationTypeFilter = getLocationTypeFilter(currentSearchLocation);

      if (locationTypeFilter) {
        const locationMatch = tour.location_type
          ?.toLowerCase()
          .includes(locationTypeFilter.toLowerCase());
        return isPublished && locationMatch;
      }
      return isPublished;
    }) || [];

  // Calculate per person price
  const calculatePerPersonPrice = (tour) => {
    const dayTourPriceList = tour.day_tour_price_list;

    if (dayTourPriceList && dayTourPriceList.length > 0) {
      if (tour.price_by_vehicle) {
        // divide group price by group size
        const groupPrice = parseFloat(dayTourPriceList[0].group_price || 0);
        const groupSize = parseInt(tour.group_size || 1);
        return (groupPrice / groupSize).toFixed(2);
      }

      if (tour.price_by_passenger) {
        // just return the price_per_person
        return parseFloat(dayTourPriceList[0].price_per_person || 0).toFixed(2);
      }
    }

    return "0.00";
  };

  // Normalize location name for display
  const getDisplayLocationName = (location) => {
    switch (location) {
      case "Medina":
        return "Madina";
      case "Jedda":
        return "Jeddah";
      default:
        return location;
    }
  };

  useEffect(() => {
    const displayLocation = getDisplayLocationName(currentSearchLocation);
    dispatch(
      addItemsCount(`${filteredTours.length} tours in ${displayLocation || ""}`)
    );
  }, [filteredTours, currentSearchLocation, dispatch]);

  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Custom navigation arrow component
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-secondary shadow-1 size-30 rounded-full js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-secondary shadow-1 size-30 rounded-full js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12 text-light"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12 text-light"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div>Loading tours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <div>Error loading tours. Please try again.</div>
      </div>
    );
  }

  return (
    <div
      className="row row-cols-1 row-cols-md-3 g-3 "
      style={{ marginTop: searchLocation ? "" : "-20px" }}
    >
      {filteredTours?.map((item) => {
        const perPersonPrice = calculatePerPersonPrice(item);

        return (
          <div key={item?.id}>
            <Link
              href={`/tour/${item?.slug}`}
              style={{ cursor: "pointer" }}
              className="tourCard -type-1 rounded-4 hover-inside-slider"
            >
              <div className="tourCard__image position-relative">
                <div className="inside-slider">
                  <Slider
                    {...itemSettings}
                    arrows={true}
                    nextArrow={<Arrow type="next" />}
                    prevArrow={<Arrow type="prev" />}
                  >
                    {/* Use tour_images if available, otherwise use cloudflare_thumbnail_image_url */}
                    {item?.tour_images && item.tour_images.length > 0
                      ? item.tour_images.map((slide, i) => (
                          <div className="cardImage ratio ratio-1:1" key={i}>
                            <div className="cardImage__content ">
                              <Image
                                width={300}
                                height={300}
                                priority
                                className="col-12 js-lazy"
                                src={slide}
                                alt={item?.name}
                              />
                            </div>
                          </div>
                        ))
                      : item?.cloudflare_thumbnail_image_url && (
                          <div className="cardImage ratio ratio-1:1">
                            <div className="cardImage__content ">
                              <Image
                                width={300}
                                height={300}
                                priority
                                className="col-12 js-lazy"
                                src={item?.cloudflare_thumbnail_image_url}
                                alt={item?.name}
                              />
                            </div>
                          </div>
                        )}
                  </Slider>

                  <div className="cardImage__leftBadge cardImage-2__leftBadge">
                    <div className="buttons-2">
                      <button
                        style={{
                          backgroundColor:
                            currentSearchLocation == "Makkah"
                              ? "#353537"
                              : currentSearchLocation == "Medina" ||
                                currentSearchLocation == "Madina"
                              ? "#21b510"
                              : currentSearchLocation == "Taif"
                              ? "#824007"
                              : currentSearchLocation == "Jedda" ||
                                currentSearchLocation == "Jeddah"
                              ? "#078de6"
                              : "#353537",
                          backgroundImage:
                            currentSearchLocation == "Makkah"
                              ? "linear-gradient(to right, #353537 , #0d0c0d)"
                              : currentSearchLocation == "Medina" ||
                                currentSearchLocation == "Madina"
                              ? "linear-gradient(to right, #21b510 , #158805)"
                              : currentSearchLocation == "Taif"
                              ? "linear-gradient(to right, #824007 , #601817)"
                              : currentSearchLocation == "Jedda" ||
                                currentSearchLocation == "Jeddah"
                              ? "linear-gradient(to right, #078de6 , #29317a)"
                              : "linear-gradient(to right, #353537 , #0d0c0d)",
                        }}
                      >
                        {`${currentCurrency?.symbol} ${perPersonPrice}`}{" "}
                        <span> PER PERSON</span>
                      </button>
                      <button>No</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .tourCard__image */}

              <div className="tourCard__content mt-10">
                <div className="d-flex justify-content-between lh-14 mb-5">
                  <div className="text-14 text-light-1">
                    {isMobile
                      ? `${item?.duration || "Full Day"}`
                      : `${item?.duration || "Full Day Tour"}`}
                  </div>
                  <div className="ml-10 mr-10" />
                  <div className="col-auto">
                    <div className="text-14 text-dark-1 fw-bold">
                      From {currentCurrency?.symbol}
                      <span className="text-16 fw-600 text-blue-1 fw-bold">
                        {" "}
                        {perPersonPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="tourCard__title text-dark-5 text-18 lh-16 fw-600">
                  <span>{item?.name}</span>
                </h4>
                <p className="text-light-1 lh-14 text-14 mt-5">
                  {item?.location_type}
                </p>

                <div className="row justify-between items-center pt-15">
                  <div className="col-auto">
                    <div className="d-flex items-center">
                      <div className="d-flex items-center x-gap-5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="icon-star text-yellow-1 text-10"
                          />
                        ))}
                      </div>
                      {/* End ratings */}

                      <div className="text-14 text-light-1 ml-10">
                        {item?.group_size} max group size
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isMobile && (
                <button className="button -md h-5 border border-secondary bg-blue-1 text-white w-100">
                  Book Now
                </button>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TourProperties;
