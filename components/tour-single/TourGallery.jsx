"use client";

import Overview from "@/components/tour-single/Overview";
import TourSnapShot from "@/components/tour-single/TourSnapShot";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../styles/weather.scss";
import { useState, useEffect } from "react";
import OverviewSkeleton from "../skeleton/OverviewSkeleton";
import TourGalleryGridSkeleton from "./TourGalleryGridSkeleton";
import Slider from "react-slick";
import SidebarRight2 from "./SidebarRight2";

export default function TourGallery({ tour, onDataAvailable }) {
  console.log("tourgallery", tour);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const width = useWindowSize();
  const isMobile = width < 768;

  // Get images from tour_images or fallback to cloudflare_thumbnail_image_url
  const getImageArray = () => {
    if (tour?.tour_images && tour.tour_images.length > 0) {
      return tour.tour_images;
    } else if (tour?.cloudflare_thumbnail_image_url) {
      return [tour.cloudflare_thumbnail_image_url];
    }
    return [];
  };

  const tourImages = getImageArray();

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
  const normalizedImages = ensureMinimumImages(tourImages);

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
    setCurrentImageIndex(index);
    setLightboxOpen(true);
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

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate lightbox
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (tourImages?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + (tourImages?.length || 1)) % (tourImages?.length || 1)
    );
  };

  useEffect(() => {
    // Set loading to false after a short delay to show skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show skeleton for 2 seconds

    return () => clearTimeout(timer);
  }, [tour]);

  // Check if there's only one image
  const hasSingleImage = tourImages?.length === 1;

  return (
    <>
      <section className="pt-40 js-pin-container">
        <div className="container">
          {/* Full Width Gallery Section */}
          <div className="row">
            <div className="col-12">
              {/* Show skeleton while loading */}
              {isLoading ? (
                <TourGalleryGridSkeleton />
              ) : (
                <>
                  {/* Desktop View */}
                  {!isMobile && (
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
                            alt={`${tour?.name || "Tour"} - Image 1`}
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
                            alt={`${tour?.name || "Tour"} - Image 2`}
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
                            alt={`${tour?.name || "Tour"} - Image 3`}
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
                            alt={`${tour?.name || "Tour"} - Image 4`}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover rounded-4"
                            onLoad={handleImageLoad}
                          />
                          {tourImages?.length > 4 && (
                            <div className="more-photos-overlay rounded-4">
                              <span>+{tourImages.length - 4}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile View */}
                  {isMobile && (
                    <div className="mobile-slider-container">
                      {hasSingleImage ? (
                        // Single image for mobile - no grid, no slider
                        <div
                          className="mobile-single-image"
                          onClick={() => handleImageClick(0)}
                        >
                          <Image
                            src={normalizedImages[0] || "/placeholder.svg"}
                            alt={`${tour?.name || "Tour"} - Image 1`}
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
                                  onClick={() =>
                                    handleImageClick(groupIndex * 3)
                                  }
                                >
                                  <Image
                                    src={group[0] || "/placeholder.svg"}
                                    alt={`${tour?.name || "Tour"} - Image ${
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
                                      alt={`${tour?.name || "Tour"} - Image ${
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
                                      alt={`${tour?.name || "Tour"} - Image ${
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
                </>
              )}
            </div>
          </div>

          {/* Content Section Below Gallery */}
          <div className="row y-gap-30 mt-xl-40 mt-0">
            {/* Sidebar on Right */}
            <div className="col-xl-4 order-xl-2">
              <SidebarRight2 tour={tour} />
            </div>

            {/* Main Content on Left */}
            <div className="col-xl-8 order-xl-1">
              <h3 className="text-22 fw-600">Tour snapshot</h3>
              <TourSnapShot tour={tour} />
              {/* End toursnapshot */}

              <div className="border-top-light mt-40 mb-40"></div>

              {dataAvailable ? <Overview tour={tour} /> : <OverviewSkeleton />}
              {/* End Overview */}
            </div>
          </div>
        </div>
        {/* End container */}
      </section>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="icon icon-close text-20"></i>
            </button>
            <button className="lightbox-prev" onClick={prevImage}>
              <i className="icon icon-chevron-left text-20"></i>
            </button>
            <button className="lightbox-next" onClick={nextImage}>
              <i className="icon icon-chevron-right text-20"></i>
            </button>
            <div className="lightbox-image-container">
              <Image
                src={tourImages?.[currentImageIndex] || "/placeholder.svg"}
                alt={`${tour?.name || "Tour"} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
