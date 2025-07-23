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
          <div className="gallery-grid">
            <div className="gallery-grid-container">
              {/* First large image (left) - Tall rectangle */}
              <div className="gallery-item gallery-item-large-left">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Center large image - Tall rectangle */}
              <div className="gallery-item gallery-item-large-center">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Top right image - Small square */}
              <div className="gallery-item gallery-item-small-top-right">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
              {/* Bottom right image - Small square */}
              <div className="gallery-item gallery-item-small-bottom-right">
                <div className="skeleton-pulse rounded-4 h-full w-full"></div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile View Skeleton - Matches the mobile grid slider
          <div className="mobile-slider-container">
            <Slider {...sliderSettings}>
              {/* First slide */}
              <div>
                <div className="mobile-grid-slide">
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
                <div className="mobile-grid-slide">
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

      {/* CSS for the skeleton */}
      <style jsx global>{`
        /* Skeleton pulse animation */
        .skeleton-pulse {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            background-position: 0% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Desktop Grid Layout - Exact match to the real grid */
        .gallery-grid {
          width: 100%;
          overflow: hidden;
        }

        .gallery-grid-container {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: repeat(2, 250px);
          grid-gap: 10px;
          height: 510px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
        }

        .gallery-item-large-left {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
        }

        .gallery-item-large-center {
          grid-column: 2 / 3;
          grid-row: 1 / 3;
        }

        .gallery-item-small-top-right {
          grid-column: 3 / 4;
          grid-row: 1 / 2;
        }

        .gallery-item-small-bottom-right {
          grid-column: 3 / 4;
          grid-row: 2 / 3;
        }

        /* Mobile Styles - Exact match to the mobile grid */
        .mobile-slider-container {
          margin-bottom: 20px;
        }

        .mobile-grid-slide {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          height: 400px;
        }

        .mobile-grid-large {
          width: 60%;
          height: 100%;
          position: relative;
        }

        .mobile-grid-small-container {
          width: calc(40% - 4px);
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-grid-small {
          width: 100%;
          height: calc(50% - 2px);
          position: relative;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .mobile-grid-slide {
            height: 350px;
          }
        }

        @media (max-width: 480px) {
          .mobile-grid-slide {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default TourGalleryGridSkeleton;
