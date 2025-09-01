"use client";

import Overview from "@/components/tour-single/Overview";
import TourSnapShot from "@/components/tour-single/TourSnapShot";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import "../../styles/weather.scss";
import { useState, useEffect, useRef } from "react";
import OverviewSkeleton from "../skeleton/OverviewSkeleton";
import TourGalleryGridSkeleton from "./TourGalleryGridSkeleton";
import Slider from "react-slick";
import SidebarRight2 from "./SidebarRight2";
import Itinerary from "./itinerary/index";
import ImportantInfo from "@/components/tour-single/ImportantInfo";

export default function TourGallery({ tour, onDataAvailable }) {
  // console.log("tourgallery", tour);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollMenus, setShowScrollMenus] = useState(false);
  const [activeTab, setActiveTab] = useState("tour-snapshot");
  const [showMobileBottomButton, setShowMobileBottomButton] = useState(true);

  const width = useWindowSize();
  const isMobile = width < 768;

  // Refs for scrolling to sections
  const tourSnapshotRef = useRef(null);
  const overviewRef = useRef(null);
  const sidebarRef = useRef(null);
  const importantInfoRef = useRef(null);
  const itineraryRef = useRef(null);
  const scrollMenuRef = useRef(null);

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

  // Handle scroll to show/hide menus
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show menus after scrolling 300px
      if (scrollY > 300) {
        setShowScrollMenus(true);
      } else {
        setShowScrollMenus(false);
      }

      // Handle mobile bottom button visibility based on sidebar position
      if (isMobile && sidebarRef.current) {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Hide button when sidebar is in viewport, show when passed
        if (sidebarRect.top <= windowHeight && sidebarRect.bottom >= 0) {
          // Sidebar is in viewport - hide button
          setShowMobileBottomButton(false);
        } else {
          // Sidebar is not in viewport - show button
          setShowMobileBottomButton(true);
        }
      } else if (isMobile) {
        // If sidebar ref is not available yet, show button by default
        setShowMobileBottomButton(true);
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Scroll to section function
  const scrollToSection = (ref, tabName) => {
    if (ref && ref.current) {
      const offsetTop =
        ref.current.offsetTop - (isMobile ? (showScrollMenus ? 50 : 20) : 140); // Account for fixed menu height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveTab(tabName);
    }
  };

  // Scroll to sidebar (Check Availability)
  const scrollToAvailability = () => {
    scrollToSection(sidebarRef, "calendar");
  };

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
    }, 500); // Show skeleton for 2 seconds

    return () => clearTimeout(timer);
  }, [tour]);

  // Check if there's only one image
  const hasSingleImage = tourImages?.length === 1;

  return (
    <>
      {/* Desktop Scroll Menus */}
      {!isMobile && showScrollMenus && (
        <div
          ref={scrollMenuRef}
          className="fixed-scroll-menus"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* First Menu - Tour Name & Check Availability */}
          <div
            className="tour-header-menu"
            style={{
              padding: "15px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f0f0f0",
              maxWidth: "1345px",
              margin: "0 auto",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
              {tour?.name || "Tour Details"}
            </h2>
            <button
              onClick={scrollToAvailability}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              Check Availability
            </button>
          </div>

          {/* Second Menu - Tab Navigation */}
          <div
            className="tab-navigation-menu"
            style={{
              padding: "0 20px",
              display: "flex",
              gap: "30px",
              overflowX: "auto",
              maxWidth: "1345px",
              margin: "0 auto",
            }}
          >
            <button
              onClick={() => scrollToSection(tourSnapshotRef, "tour-snapshot")}
              style={{
                padding: "15px 0",
                border: "none",
                background: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: activeTab === "tour-snapshot" ? "#3b82f6" : "#666",
                borderBottom:
                  activeTab === "tour-snapshot"
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              Tour Snapshot
            </button>
            <button
              onClick={() => scrollToSection(overviewRef, "overview")}
              style={{
                padding: "15px 0",
                border: "none",
                background: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: activeTab === "overview" ? "#3b82f6" : "#666",
                borderBottom:
                  activeTab === "overview"
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection(sidebarRef, "calendar")}
              style={{
                padding: "15px 0",
                border: "none",
                background: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: activeTab === "calendar" ? "#3b82f6" : "#666",
                borderBottom:
                  activeTab === "calendar"
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              Calendar
            </button>
            <button
              onClick={() =>
                scrollToSection(importantInfoRef, "important-info")
              }
              style={{
                padding: "15px 0",
                border: "none",
                background: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: activeTab === "important-info" ? "#3b82f6" : "#666",
                borderBottom:
                  activeTab === "important-info"
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              Important Info
            </button>
            {tour?.itineraries_list?.length > 0 && (
              <button
                onClick={() => scrollToSection(itineraryRef, "itinerary")}
                style={{
                  padding: "15px 0",
                  border: "none",
                  background: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: activeTab === "itinerary" ? "#3b82f6" : "#666",
                  borderBottom:
                    activeTab === "itinerary"
                      ? "2px solid #3b82f6"
                      : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                Itinerary
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Top Menu (appears after scrolling) */}
      {isMobile && showScrollMenus && (
        <div
          className="mobile-top-menu"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "white",
            padding: "12px 20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: "600",
              textAlign: "center",
              lineHeight: "1.3",
              color: "#333",
            }}
          >
            {tour?.name || "Tour Details"}
          </h2>
        </div>
      )}

      {/* Mobile Bottom Menu (conditionally visible) */}
      {isMobile && showMobileBottomButton && (
        <div
          className="mobile-bottom-menu"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "white",
            padding: "15px 20px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <button
            onClick={scrollToAvailability}
            style={{
              width: "100%",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "15px",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Check Availability
          </button>
        </div>
      )}

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
            <div className="col-xl-4 order-xl-2" ref={sidebarRef}>
              <SidebarRight2 tour={tour} />
            </div>

            {/* Main Content on Left */}
            <div className="col-xl-8 order-xl-1">
              <div ref={tourSnapshotRef}>
                <h3 className="text-22 fw-600">Tour snapshot</h3>
                <TourSnapShot tour={tour} />
              </div>
              {/* End toursnapshot */}

              <div className="border-top-light mt-40 mb-40"></div>

              <div ref={overviewRef}>
                {dataAvailable ? (
                  <Overview tour={tour} />
                ) : (
                  <OverviewSkeleton />
                )}
              </div>
              {/* End Overview */}
            </div>
          </div>
        </div>
        {/* End container */}
      </section>

      {dataAvailable && (
        <>
          <section className="pt-40" ref={importantInfoRef}>
            <div className="container">
              <div className="pt-40 border-top-light">
                <div className="row x-gap-40 y-gap-40">
                  <div className="col-auto">
                    <h3 className="text-22 fw-600">Important information</h3>
                  </div>
                </div>
                <ImportantInfo tour={tour} />
              </div>
            </div>
          </section>

          {tour?.itineraries_list?.length > 0 && (
            <section
              className="border-top-light  mt-40 pt-40"
              ref={itineraryRef}
            >
              <div className="container">
                <h3 className="text-22 fw-600 mb-20">Itinerary</h3>
                <Itinerary
                  name={tour?.name}
                  itenarayItems={tour?.itineraries_list}
                />
              </div>
            </section>
          )}
        </>
      )}

      {/* Add bottom padding for mobile to account for fixed bottom menu */}
      {isMobile && showMobileBottomButton && <div style={{ height: "80px" }} />}

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
