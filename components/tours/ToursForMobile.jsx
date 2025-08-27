"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addItemsCount } from "@/features/search/searchSlice";
import useWindowSize from "@/hooks/useWindowSize";
import { useAllTour } from "@/hooks/useAllTour";
import TourMobileSkeleton from "../skeleton/TourMobileSkeleton";

const ToursForMobile = ({ searchLocation, onMobileTourDataAvailable }) => {
  const dispatch = useDispatch();
  const width = useWindowSize();
  const isMobile = width < 768;
  const { data, error, isLoading } = useAllTour();
  const { currentCurrency } = useSelector((state) => state.currency);

  // Filter tours based on location_type and published status
  const getLocationTypeFilter = (searchLocation) => {
    switch (searchLocation) {
      case "Makkah":
        return "Ziyarat In Makkah";
      case "Madina":
        return "Ziyarat In Madina";
      case "Taif":
        return "Ziyarat In Taif";
      case "Jeddah":
        return "Ziyarat In Jeddah";
      default:
        return "";
    }
  };

  const filteredTours =
    data?.filter((tour) => {
      const isPublished = tour.published === true;
      const locationTypeFilter = getLocationTypeFilter(searchLocation);

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

  useEffect(() => {
    dispatch(
      addItemsCount(
        `${filteredTours?.length} tours in ${
          searchLocation == "Makkah"
            ? "Makkah"
            : searchLocation == "Madina"
            ? "Madina"
            : searchLocation == "Taif"
            ? "Taif"
            : searchLocation == "Jeddah"
            ? "Jeddah"
            : ""
        }`
      )
    );

    if (filteredTours?.length > 0) {
      onMobileTourDataAvailable(true);
    }
  }, [filteredTours, searchLocation, dispatch, onMobileTourDataAvailable]);

  if (isLoading) {
    return <TourMobileSkeleton />;
  }

  if (error || filteredTours.length === 0) {
    return <TourMobileSkeleton />;
  }

  return filteredTours?.map((item) => {
    const perPersonPrice = calculatePerPersonPrice(item);

    return (
      <div className="col-lg-3 col-md-4 col-6" key={item?.id}>
        <Link
          href={`/tour/${item?.slug}`}
          style={{ cursor: "pointer" }}
          className="tourCard -type-1 rounded-4 hover-inside-slider"
        >
          <div className="tourCard__image position-relative">
            <div className="inside-slider">
              {/* Use cloudflare_thumbnail_image_url or first tour_image */}
              {(item?.cloudflare_thumbnail_image_url ||
                item?.tour_images?.[0]) && (
                <div className="cardImage ratio ratio-1:1">
                  <div className="cardImage__content ">
                    <Image
                      width={300}
                      height={300}
                      priority
                      className="col-12 js-lazy"
                      src={
                        item?.cloudflare_thumbnail_image_url ||
                        item?.tour_images?.[0]
                      }
                      alt={item?.name}
                    />
                  </div>
                </div>
              )}

              <div className="cardImage__leftBadge cardImage-2__leftBadge sm:d-none">
                <div className="buttons-2">
                  <button
                    style={{
                      backgroundColor: "#353537",
                      backgroundImage:
                        "linear-gradient(to right, #353537 , #0d0c0d)",
                    }}
                  >
                    {`${currentCurrency?.symbol} ${convertCurrency(
                      parseFloat(perPersonPrice),
                      "USD",
                      currentCurrency?.currency
                    )}`}{" "}
                    <span> PER PERSON</span>
                  </button>
                  <button>No</button>
                </div>
              </div>
            </div>
          </div>

          <div className="tourCard__content mt-10">
            <div className="d-flex justify-content-between lh-14 mb-5">
              <div className="text-14 md:text-12 text-light-1">
                {isMobile
                  ? `${item?.duration || "Full Day"}`
                  : `${item?.duration || "Full Day Tour"}`}
              </div>
              <div className="ml-10 mr-10" />
              <div className="col-auto">
                <div className="text-14 md:text-12 text-dark-1 fw-bold">
                  From {currentCurrency?.symbol}
                  <span className="text-16 md:text-13 fw-600 text-blue-1 fw-bold">
                    {" "}
                    {convertCurrency(
                      parseFloat(perPersonPrice),
                      "USD",
                      currentCurrency?.currency
                    )}
                  </span>
                </div>
              </div>
            </div>
            <h4 className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600">
              <span>{item?.name}</span>
            </h4>
            <p className="text-light-1 lh-14 text-14 md:text-12 mt-5">
              {item?.location}
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
                  <div className="text-14 md:text-12 text-light-1 ml-10">
                    {item?.reviews} reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
};

export default ToursForMobile;
