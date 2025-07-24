"use client";

import Overview from "@/components/tour-single/Overview";
import SidebarRight from "@/components/tour-single/SidebarRight";
import TourSnapShot from "@/components/tour-single/TourSnapShot";
import Image from "next/image";
import HajjSidebarRight from "../hajj/HajjSidebarRight";
import UmrahSidebarRight from "../umrah/UmrahSidebarRight";
import useWindowSize from "@/hooks/useWindowSize";
import "../../styles/weather.scss";
import { useState, useEffect } from "react";
import OverviewSkeleton from "../skeleton/OverviewSkeleton";
import TourGalleryGridSkeleton from "./TourGalleryGridSkeleton";
import Slider from "react-slick";

export default function TourGallery({ tour, hajj, umrah, onDataAvailable }) {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const width = useWindowSize();
  const isMobile = width < 768;

  // Ensure we always have at least 4 images for desktop grid and 3 for mobile
  const ensureMinimumImages = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      // If no images, use placeholder
      return [
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg",
      ];
    }
    // If we have fewer than 4 images, repeat the existing ones to fill the grid
    const result = [...images];
    while (result.length < 4) {
      // Add images from the beginning until we have at least 4
      result.push(
        ...images.slice(0, Math.min(4 - result.length, images.length))
      );
    }
    return result;
  };

  // Get the normalized array of images
  const normalizedImages = ensureMinimumImages(tour?.slideImg);

  // Function to chunk array into groups of 3 for mobile
  const createMobileImageGroups = (images) => {
    // Ensure we have at least 3 images for the first slide
    if (!images || images.length < 3) {
      const paddedImages = [...(images || [])];
      while (paddedImages.length < 3) {
        paddedImages.push(
          paddedImages[paddedImages.length % paddedImages.length] ||
            "/placeholder.svg"
        );
      }
      return [paddedImages];
    }
    // Create groups of 3 images
    const chunks = [];
    for (let i = 0; i < images.length; i += 3) {
      const chunk = images.slice(i, i + 3);
      // If chunk has fewer than 3 images, pad it
      while (chunk.length < 3) {
        chunk.push(chunk[chunk.length % chunk.length] || "/placeholder.svg");
      }
      chunks.push(chunk);
    }
    return chunks;
  };

  // Create image groups for mobile slider (3 images per slide)
  const mobileImageGroups = createMobileImageGroups(normalizedImages);

  // Slider settings for mobile
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

  // Handle image click and data loading
  const handleImageClick = (index) => {
    // Trigger data available callback when image is clicked
    if (onDataAvailable) {
      onDataAvailable(true);
      setDataAvailable(true);
    }
  };

  // Handle image load
  const handleImageLoad = (e) => {
    if (e) {
      setIsLoading(false);
      setDataAvailable(true);
      if (onDataAvailable) {
        onDataAvailable(true);
      }
    }
  };

  useEffect(() => {
    // Set loading to false after a short delay to show skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show skeleton for 2 seconds

    return () => clearTimeout(timer);
  }, [tour]);

  // Check if there's only one image
  const hasSingleImage = tour?.slideImg?.length === 1;

  return (
    <>
      <section className="pt-40 js-pin-container">
        <div className="container">
          {/* Full Width Gallery Section */}
          <div className="row">
            <div className="col-12">
              {/* New Gallery Grid/Slider - Full Width */}
              {isLoading ? (
                <TourGalleryGridSkeleton />
              ) : (
                // Desktop Grid Layout - Always show 4 images
                <div className="gallery-grid">
                  <div
                    className={`gallery-grid-container ${
                      hasSingleImage ? "single-image-grid" : ""
                    }`}
                  >
                    {/* First large image (left) */}
                    <div
                      className="gallery-item gallery-item-large-left"
                      onClick={() => handleImageClick(0)}
                    >
                      <Image
                        src={normalizedImages[0] || "/placeholder.svg"}
                        alt={`${tour?.title || "Tour"} - Image 1`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-4"
                        priority={true}
                        onLoad={handleImageLoad}
                      />
                    </div>
                    {/* Center large image */}
                    <div
                      className="gallery-item gallery-item-large-center"
                      onClick={() => handleImageClick(1)}
                    >
                      <Image
                        src={normalizedImages[1] || "/placeholder.svg"}
                        alt={`${tour?.title || "Tour"} - Image 2`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-4"
                        priority={true}
                        onLoad={handleImageLoad}
                      />
                    </div>
                    {/* Top right image */}
                    <div
                      className="gallery-item gallery-item-small-top-right"
                      onClick={() => handleImageClick(2)}
                    >
                      <Image
                        src={normalizedImages[2] || "/placeholder.svg"}
                        alt={`${tour?.title || "Tour"} - Image 3`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover rounded-4"
                        onLoad={handleImageLoad}
                      />
                    </div>
                    {/* Bottom right image */}
                    <div
                      className="gallery-item gallery-item-small-bottom-right"
                      onClick={() => handleImageClick(3)}
                    >
                      <Image
                        src={normalizedImages[3] || "/placeholder.svg"}
                        alt={`${tour?.title || "Tour"} - Image 4`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover rounded-4"
                        onLoad={handleImageLoad}
                      />
                      {tour?.slideImg?.length > 4 && (
                        <div className="more-photos-overlay rounded-4">
                          <span>+{tour.slideImg.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile View - Always show 3 images per slide */}
              {!isLoading && isMobile && (
                <div className="mobile-slider-container">
                  {hasSingleImage ? (
                    // Single image for mobile - no grid, no slider
                    <div
                      className="mobile-single-image"
                      onClick={() => handleImageClick(0)}
                    >
                      <Image
                        src={normalizedImages[0] || "/placeholder.svg"}
                        alt={`${tour?.title || "Tour"} - Image 1`}
                        width={800}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                        sizes="100vw"
                        className="object-cover rounded-4"
                        priority={true}
                        onLoad={handleImageLoad}
                      />
                    </div>
                  ) : (
                    // Multiple images - use grid slider with 3 images per slide
                    <Slider {...sliderSettings}>
                      {mobileImageGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                          <div className="mobile-grid-slide">
                            {/* Always 3 images layout (1 large + 2 small) */}
                            <div
                              className="mobile-grid-large"
                              onClick={() => handleImageClick(groupIndex * 3)}
                            >
                              <Image
                                src={group[0] || "/placeholder.svg"}
                                alt={`${tour?.title || "Tour"} - Image ${
                                  groupIndex * 3 + 1
                                }`}
                                width={600}
                                height={600}
                                style={{ height: "auto" }}
                                sizes="60vw"
                                className="object-cover w-full h-full rounded-4"
                                onLoad={handleImageLoad}
                              />
                            </div>
                            <div className="mobile-grid-small-container">
                              <div
                                className="mobile-grid-small"
                                onClick={() =>
                                  handleImageClick(groupIndex * 3 + 1)
                                }
                              >
                                <Image
                                  src={group[1] || "/placeholder.svg"}
                                  alt={`${tour?.title || "Tour"} - Image ${
                                    groupIndex * 3 + 2
                                  }`}
                                  width={300}
                                  height={200}
                                  style={{ height: "auto" }}
                                  sizes="40vw"
                                  className="object-cover w-full h-full rounded-4"
                                  onLoad={handleImageLoad}
                                />
                              </div>
                              <div
                                className="mobile-grid-small"
                                onClick={() =>
                                  handleImageClick(groupIndex * 3 + 2)
                                }
                              >
                                <Image
                                  src={group[2] || "/placeholder.svg"}
                                  alt={`${tour?.title || "Tour"} - Image ${
                                    groupIndex * 3 + 3
                                  }`}
                                  width={300}
                                  height={200}
                                  style={{ height: "auto" }}
                                  sizes="40vw"
                                  className="object-cover w-full h-full rounded-4"
                                  onLoad={handleImageLoad}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Content Section Below Gallery */}
          <div className="row y-gap-30 mt-40">
            {/* Sidebar on Right */}
            <div className="col-xl-4 order-xl-2">
              {hajj ? (
                <HajjSidebarRight />
              ) : umrah ? (
                <UmrahSidebarRight />
              ) : (
                <SidebarRight />
              )}
            </div>

            {/* Main Content on Left */}
            <div className="col-xl-8 order-xl-1">
              <h3 className="text-22 fw-600">Tour snapshot</h3>
              <TourSnapShot hajj={hajj} umrah={umrah} />
              {/* End toursnapshot */}

              <div className="border-top-light mt-40 mb-40"></div>

              {dataAvailable ? <Overview hajj={hajj} /> : <OverviewSkeleton />}
              {/* End Overview */}
            </div>
          </div>
        </div>
        {/* End container */}
      </section>

      {/* CSS for the gallery grid and mobile layout */}
      <style jsx global>{`
        /* Desktop Grid Layout */
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
        .gallery-grid-container.single-image-grid {
          position: relative;
        }
        .gallery-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .gallery-item:hover::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          z-index: 1;
          border-radius: 8px;
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
          position: relative;
        }
        .more-photos-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .more-photos-overlay span {
          color: white;
          font-size: 24px;
          font-weight: bold;
        }
        /* Mobile Styles */
        .mobile-slider-container {
          margin-bottom: 20px;
        }
        .mobile-single-image {
          width: 100%;
          cursor: pointer;
          border-radius: 8px;
          overflow: hidden;
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
          cursor: pointer;
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
          cursor: pointer;
        }
        .mobile-grid-full {
          width: 100%;
          height: 100%;
          position: relative;
          cursor: pointer;
        }
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .mobile-grid-slide {
            height: 350px;
          }
          /* On mobile, stack sidebar and content vertically */
          .row.y-gap-30.mt-40 {
            flex-direction: column;
          }
          .row.y-gap-30.mt-40 .col-xl-4,
          .row.y-gap-30.mt-40 .col-xl-8 {
            width: 100%;
            max-width: 100%;
          }
        }
        @media (max-width: 480px) {
          .mobile-grid-slide {
            height: 300px;
          }
        }
      `}</style>
    </>
  );
}
