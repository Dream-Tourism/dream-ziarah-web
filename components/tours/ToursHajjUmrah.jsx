"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import useWindowSize from "@/hooks/useWindowSize";
import TourSkeleton from "../skeleton/TourSkeleton";
import convertCurrency from "@/utils/currency";

const ToursHajjUmrah = ({ filterLocation, allTours: data }) => {
  const { currentCurrency } = useSelector((state) => state.currency);
  const width = useWindowSize();
  const isMobile = width < 768;

  // Filter tours for Hajj and Umrah
  const filteredTours =
    data
      ?.filter((tour) => {
        if (filterLocation === "HajjUmrah") {
          return (
            tour.location_type?.toLowerCase() === "hajj" ||
            tour.location_type?.toLowerCase() === "umrah"
          );
        }
        return true;
      })
      .sort((a, b) => {
        const orderA = a.order !== undefined ? a.order : Infinity;
        const orderB = b.order !== undefined ? b.order : Infinity;
        return orderA - orderB;
      }) || [];

  // Generate appropriate link based on item name
  const generateLink = (item) => {
    const name = item.name?.toLowerCase() || '';
    if (name.includes('hajj')) {
      return '/hajj';
    } else if (name.includes('umrah')) {
      return '/umrah';
    }
    return `/tour/${item.slug}`;
  };

  // Calculate per person price (always defaults to "With Guide")
  const calculatePerPersonPrice = (tour) => {
    const dayTourPriceList = tour.day_tour_price_list;

    if (dayTourPriceList && dayTourPriceList.length > 0) {
      // Always pick the "With Guide" option
      const priceOption = dayTourPriceList.find(
        (item) => item.guide === "With Guide"
      );

      if (!priceOption) return "0.00";

      if (tour.price_by_vehicle) {
        const groupPrice = parseFloat(priceOption.group_price || 0);
        const groupSize = parseInt(tour.group_size || 1);
        return (groupPrice / groupSize).toFixed(2);
      }

      if (tour.price_by_passenger) {
        return parseFloat(priceOption.price_per_person || 0).toFixed(2);
      }
    }

    return "0.00";
  };

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: filteredTours.length > 4,
    speed: 500,
    slidesToShow: Math.min(4, filteredTours.length),
    slidesToScroll: Math.min(4, filteredTours.length),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(3, filteredTours.length),
          slidesToScroll: Math.min(3, filteredTours.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, filteredTours.length),
          slidesToScroll: Math.min(2, filteredTours.length),
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: Math.min(2, filteredTours.length),
          slidesToScroll: Math.min(2, filteredTours.length),
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "35px",
        },
      },
    ],
  };

  // Custom arrow
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-secondary shadow-1 size-30 rounded-full js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-secondary shadow-1 size-30 rounded-full js-prev";
    const char =
      props.type === "next" ? (
        <i className="icon icon-chevron-right text-12 text-light"></i>
      ) : (
        <span className="icon icon-chevron-left text-12 text-light"></span>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  if (filteredTours.length === 0) {
    return <TourSkeleton />;
  }

  //  Bootstrap Grid fallback when < 4 tours
  if (filteredTours.length < 4) {
    return filteredTours.map((item) => {
      const perPersonPrice = calculatePerPersonPrice(item);
      return (
        <div className="col-lg-3 col-md-3 col-6" key={item.id}>
          <Link
            href={generateLink(item)}
            className="tourCard -type-1 rounded-4 hover-inside-slider d-block h-100"
          >
            <div className="tourCard__image position-relative">
              {item?.cloudflare_thumbnail_image_url && (
                <div className="cardImage ratio ratio-1x1">
                  <div className="cardImage__content">
                    <Image
                      width={300}
                      height={300}
                      priority
                      className="w-100 h-100 object-fit-cover"
                      src={item?.cloudflare_thumbnail_image_url}
                      alt={item?.name}
                    />
                  </div>
                </div>
              )}
              <div className="cardImage__leftBadge sm:d-none">
                <div className="buttons">
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
                </div>
              </div>
            </div>

            <div className="tourCard__content mt-10">
              <div className="d-flex justify-content-between lh-14 mb-5">
                <div className="text-14 md:text-12 text-light-1">
                  {isMobile
                    ? `${item?.duration || "Full Package"}`
                    : `${item?.duration || "Full Package"}`}
                </div>
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
              <h4 className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600">
                <span>{item?.name}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 md:text-12 mt-5">
                {item?.location}
              </p>
              <div className="d-flex align-items-center pt-15">
                <div className="d-flex align-items-center me-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="icon-star text-yellow-1 text-10" />
                  ))}
                </div>
                <div className="text-14 md:text-12 text-light-1">
                  {item?.reviews} reviews
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }

  // Slick Slider
  return (
    <Slider
      {...settings}
      arrows={true}
      nextArrow={<Arrow type="next" />}
      prevArrow={<Arrow type="prev" />}
    >
      {filteredTours.map((item) => {
        const perPersonPrice = calculatePerPersonPrice(item);
        return (
          <div key={item?.id}>
            <Link
              href={generateLink(item)}
              className="tourCard -type-1 rounded-4 hover-inside-slider d-block h-100"
            >
              <div className="tourCard__image position-relative">
                {item?.cloudflare_thumbnail_image_url && (
                  <div className="cardImage ratio ratio-1x1">
                    <div className="cardImage__content">
                      <Image
                        width={300}
                        height={300}
                        priority
                        className="w-100 h-100 object-fit-cover"
                        src={item?.cloudflare_thumbnail_image_url}
                        alt={item?.name}
                      />
                    </div>
                  </div>
                )}
                <div className="cardImage__leftBadge sm:d-none">
                  <div className="buttons">
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
                  </div>
                </div>
              </div>

              <div className="tourCard__content mt-10">
                <div className="d-flex justify-content-between lh-14 mb-5">
                  <div className="text-14 md:text-12 text-light-1">
                    {isMobile
                      ? `${item?.duration || "Full Package"}`
                      : `${item?.duration || "Full Package"}`}
                  </div>
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
                <h4 className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600">
                  <span>{item?.name}</span>
                </h4>
                <p className="text-light-1 lh-14 text-14 md:text-12 mt-5">
                  {item?.location}
                </p>
                <div className="d-flex align-items-center pt-15">
                  <div className="d-flex align-items-center me-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="icon-star text-yellow-1 text-10"
                      />
                    ))}
                  </div>
                  <div className="text-14 md:text-12 text-light-1">
                    {item?.reviews} reviews
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </Slider>
  );
};

export default ToursHajjUmrah;
