"use client";

import useWindowSize from "@/hooks/useWindowSize";
import Slider from "react-slick";

const TourGalleryGridSkeleton = () => {
  const width = useWindowSize();
  const isMobile = width < 768;

  // Slider settings for mobile skeleton
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
  };

  // Custom arrow component for slider
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "section-slider-nav -next flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none"
        : "section-slider-nav -prev flex-center button -blue-1 shadow-1 size-40 rounded-full sm:d-none ";
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

  return (
    <section className="pt-40 js-pin-container">
      <div className="container">
        {!isMobile ? (
          // Desktop Grid Layout Skeleton - Exact match to the real grid
          <div className="gallery-grid-skeleton">
            <div className="gallery-grid-skeleton-container">
              {/* First large image (left) - Tall rectangle */}
              <div className="gallery-item-skeleton gallery-item-skeleton-large-left">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Center large image - Tall rectangle */}
              <div className="gallery-item-skeleton gallery-item-skeleton-large-center">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Top right image - Small square */}
              <div className="gallery-item-skeleton gallery-item-skeleton-small-top-right">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Bottom right image - Small square */}
              <div className="gallery-item-skeleton gallery-item-skeleton-small-bottom-right">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile View Skeleton - Matches the mobile grid slider
          <div className="mobile-slider-skeleton-container">
            <Slider {...sliderSettings}>
              {/* First slide */}
              <div>
                <div className="mobile-grid-slide-skeleton">
                  {/* Large image (60% width, full height) */}
                  <div className="mobile-grid-large">
                    <div className="skeleton-pulse rounded-4 h-full w-full"></div>
                  </div>
                  <div className="mobile-grid-small-container">
                    {/* Small image top (40% width, 50% height) */}
                    <div className="mobile-grid-small">
                      <div className="skeleton-pulse rounded-4 h-full w-full"></div>
                    </div>
                    {/* Small image bottom (40% width, 50% height) */}
                    <div className="mobile-grid-small">
                      <div className="skeleton-pulse rounded-4 h-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Second slide */}
              <div>
                <div className="mobile-grid-slide-skeleton">
                  {/* Large image (60% width, full height) */}
                  <div className="mobile-grid-large">
                    <div className="skeleton-pulse rounded-4 h-full w-full"></div>
                  </div>
                  <div className="mobile-grid-small-container">
                    {/* Small image top (40% width, 50% height) */}
                    <div className="mobile-grid-small">
                      <div className="skeleton-pulse rounded-4 h-full w-full"></div>
                    </div>
                    {/* Small image bottom (40% width, 50% height) */}
                    <div className="mobile-grid-small">
                      <div className="skeleton-pulse rounded-4 h-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default TourGalleryGridSkeleton;
