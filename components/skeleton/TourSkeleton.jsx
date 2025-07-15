"use client";
// import useTours from "@/hooks/useTours";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import isTextMatched from "../../utils/isTextMatched";

const TourSkeleton = () => {
  //   const width = useWindowSize();
  //   const isMobile = width < 768;

  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 0, // Adjust breakpoint to 0 for smallest devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  const defaultTourItem = [
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Madinah City Ziarah Luxury Private Vehicle With Guide (3 Person Luxury)",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 1200,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Madinah City Ziarah Luxury Private Vehicle With Guide (3 Person Luxury)",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 1200,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Madinah City Ziarah Luxury Private Vehicle With Guide (3 Person Luxury)",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 1200,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Madinah City Ziarah Luxury Private Vehicle With Guide (3 Person Luxury)",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 1200,
      tourType: "Default Tour Type",
    },
    {
      id: 0,
      delayAnimation: 0,
      title:
        "Madinah City Ziarah Luxury Private Vehicle With Guide (3 Person Luxury)",
      slideImg: [
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/96e787f4-98cb-4a60-6cfc-c83e723dd900/public",
      ],
      tag: " ",
      duration: "1",
      location: "Default Location",
      numberOfReviews: 0,
      price: 1200,
      tourType: "Default Tour Type",
    },
  ];

  //   const defaultTourItems = new Array(1).fill(defaultTourItem);

  return (
    <Slider
      {...settings}
      arrows={true}
      nextArrow={<Arrow type="next" />}
      prevArrow={<Arrow type="prev" />}
    >
      {defaultTourItem?.map((item) => (
        <div
          key={item?.id}
          //   data-aos="fade"
          //   data-aos-delay={item?.delayAnimation}
        >
          <Link
            href={`/tour/${item?.title?.toLowerCase()?.split(" ")?.join("-")}`}
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
                    <div className="cardImage ratio ratio-1:1 skeleton" key={i}>
                      <div className="cardImage__content skeleton">
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

                <div className="cardImage__wishlist">
                  <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                    <i className="icon-heart text-12" />
                  </button>
                </div>

                <div className="cardImage__leftBadge skeleton">
                  <div
                    className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-600 uppercase bg-blue-1 text-white `}
                  >
                    {item?.tag}
                  </div>
                </div>
              </div>
            </div>
            {/* End .tourCard__image */}

            <div className="tourCard__content mt-10">
              <div className="d-flex justify-content-between lh-14 mb-5">
                <div className="text-14 text-light-1 skeleton">
                  {`${item?.duration}+ hours`}
                </div>
                {/* <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" /> */}
                <div className="ml-10 mr-10" />
                {/* <div className="text-14 text-light-1">{item?.tourType}</div> */}
                <div className="col-auto">
                  <div className="text-14 text-dark-1 fw-bold skeleton">
                    From $
                    <span className="text-16 fw-600 text-blue-1 fw-bold">
                      {" "}
                      {item?.price}
                    </span>
                  </div>
                </div>
              </div>
              <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-600 skeleton">
                <span>{item?.title}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5 skeleton">
                {item?.location}
              </p>

              <div className="row justify-between items-center pt-15">
                <div className="col-auto">
                  <div className="d-flex items-center skeleton">
                    <div className="d-flex items-center x-gap-5">
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                      <div className="icon-star text-yellow-1 text-10" />
                    </div>
                    {/* End ratings */}

                    <div className="text-14 text-light-1 ml-10">
                      {item?.numberOfReviews} reviews
                    </div>
                  </div>
                </div>
                {/* <div className="col-auto">
                <div className="text-14 text-light-1">
                  From {currentCurrency?.symbol} 
                  <span className="text-16 fw-600 text-dark-1">
                    {" "}
                    
                    {item.price}
                  </span>
                </div>
              </div> */}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default TourSkeleton;
