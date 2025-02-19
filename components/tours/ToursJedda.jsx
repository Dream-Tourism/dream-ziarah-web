"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import isTextMatched from "../../utils/isTextMatched";
import useToursJedda from "@/hooks/useToursJedda";
import useWindowSize from "@/hooks/useWindowSize";

const ToursJedda = ({ filterTour }) => {
  const tourItems = useToursJedda(filterTour);
  const { currentCurrency } = useSelector((state) => state.currency);
  const width = useWindowSize();
  const isMobile = width < 768;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },

      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1.09,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "35px",
        },
      },
    ],
  };

  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // custom navigation
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

  return tourItems?.length === 0 ? (
    " "
  ) : (
    <>
      <Slider
        {...settings}
        arrows={true}
        nextArrow={<Arrow type="next" />}
        prevArrow={<Arrow type="prev" />}
      >
        {tourItems?.map((item) => (
          <div
            key={item?.id}
            // data-aos="fade"
            // data-aos-delay={item?.delayAnimation}
          >
            <Link
              href={`/tour/${item?.title
                ?.toLowerCase()
                ?.split(" ")
                ?.join("-")}`}
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
                    {item?.slideImg?.map((slide, i) => (
                      <div className="cardImage ratio ratio-1:1" key={i}>
                        <div className="cardImage__content ">
                          <Image
                            width={300}
                            height={300}
                            priority
                            className="col-12 js-lazy"
                            src={slide}
                            alt={item?.title}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>

                  <div className="cardImage__leftBadge sm:d-none">
                    {/* <div
                    className={`py-5  rounded-right-4 text-12 lh-16 fw-600 uppercase ${
                      isTextMatched(item?.tag, "likely to sell out*")
                        ? "bg-dark-1 text-white"
                        : ""
                    } ${
                      isTextMatched(item?.tag, "best seller")
                        ? "bg-blue-1 text-white"
                        : ""
                    }  ${
                      isTextMatched(item?.tag, "top rated")
                        ? "bg-yellow-1 text-dark-1"
                        : ""
                    }`}
                  >
                    Item
                  </div> */}
                    <div className="buttons">
                      <button
                        style={{
                          backgroundColor: "#353537",
                          backgroundImage:
                            "linear-gradient(to right, #353537 , #0d0c0d)",
                        }}
                      >
                        {`${currentCurrency?.symbol} ${item.price}`}{" "}
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
                      ? `${item?.duration}+ hrs`
                      : `${item?.duration}+ hours`}
                  </div>
                  <div className="ml-10 mr-10" />
                  <div className="col-auto">
                    <div className="text-14 md:text-12 text-dark-1 fw-bold">
                      From {currentCurrency?.symbol}
                      <span className="text-16 md:text-13 fw-600 text-blue-1 fw-bold">
                        {" "}
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="tourCard__title text-dark-5 text-18 md:text-13 lh-16 fw-600">
                  <span>{item?.title}</span>
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
                        {item?.numberOfReviews} reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ToursJedda;
