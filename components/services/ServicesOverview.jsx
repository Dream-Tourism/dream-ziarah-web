"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";

const ServicesOverview = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const services = [
    {
      id: 1,
      title: "Ziyarat Tours",
      description:
        "Explore the sacred places of Makkah and Madinah with our guided ziyarat tours. Visit historical Islamic sites with experienced English-speaking guides.",
      icon: "🕌",
      route: "/tour",
      color: "bg-gradient-to-br from-green-50 to-green-100",
      hoverColor: "hover:from-green-100 hover:to-green-200",
      features: ["Sacred Sites", "English Guide", "Transportation"],
    },
    {
      id: 2,
      title: "Umrah Packages",
      description:
        "Complete Umrah packages with accommodation, transportation, and guidance. Make your spiritual journey comfortable and memorable.",
      icon: "🌙",
      route: "/umrah",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      hoverColor: "hover:from-blue-100 hover:to-blue-200",
      features: ["Full Package", "Accommodation", "24/7 Support"],
    },
    {
      id: 3,
      title: "Hajj Packages",
      description:
        "Affordable Hajj packages with comprehensive services. Experience the fifth pillar of Islam with our expert guidance and support.",
      icon: "🕋",
      route: "/hajj",
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      hoverColor: "hover:from-purple-100 hover:to-purple-200",
      features: ["Complete Hajj", "Group Support", "Best Prices"],
    },
  ];

  const ServiceCard = ({ service }) => (
    <div
      className={`service-card h-100 ${service.color} ${service.hoverColor} border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105`}
    >
      <div className="card-body p-4 text-center position-relative overflow-hidden">
        {/* Background decoration */}
        <div className="position-absolute top-0 end-0 opacity-10">
          <div className="fs-1" style={{ fontSize: "4rem" }}>
            {service.icon}
          </div>
        </div>

        {/* Main icon */}
        <div className="mb-3">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
            style={{ width: "80px", height: "80px", fontSize: "2rem" }}
          >
            {service.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="card-title fw-bold text-dark mb-3"
          style={{ fontSize: "1.5rem" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="card-text text-muted mb-3"
          style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
        >
          {service.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          {service.features.map((feature, index) => (
            <span
              key={index}
              className="badge bg-white text-dark me-2 mb-2 shadow-sm"
            >
              ✓ {feature}
            </span>
          ))}
        </div>

        {/* Book Now Button */}
        <Link href={service.route} className="text-decoration-none">
          <button className="btn btn-success btn-lg fw-bold px-4 py-2 rounded-pill shadow-sm hover-lift">
            <i className="fas fa-calendar-check me-2"></i>
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="services-overview py-5 position-relative">
      {/* Background with Saudi landscape */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-5">
        <div
          className="bg-image"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="mosque" patternUnits="userSpaceOnUse" width="20" height="20"><path d="M10 2 L8 8 L12 8 Z M6 8 L14 8 L14 18 L6 18 Z" fill="%23000" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23mosque)"/></svg>\')',
            backgroundSize: "200px 200px",
          }}
        ></div>
      </div>

      <div className="container position-relative">
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <div className="mb-3">
              <span className="badge bg-success text-white px-3 py-2 rounded-pill">
                Spiritual Journey
              </span>
            </div>
            <h2 className="display-5 fw-bold text-dark mb-3">
              Find Ziyarat Tours in Makkah, Umrah, and Hajj Packages
            </h2>
            <p
              className="lead text-muted mx-auto"
              style={{ maxWidth: "800px" }}
            >
              Enjoy guided ziyarat tours in Makkah, umrah packages, and cheap
              hajj deals. See the list of ziyarat places in Makkah and Madinah
              with easy transport and English guides. Book your spiritual
              pilgrimage now!
            </p>
          </div>
        </div>

        {/* Services Cards */}
        {!isMobile ? (
          // Desktop View - 3 columns
          <div className="row g-4">
            {services.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          // Mobile View - Swiper Slider
          <div className="mobile-slider">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="services-swiper"
            >
              {services.map((service) => (
                <SwiperSlide key={service.id}>
                  <ServiceCard service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Call to Action */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="bg-success text-white rounded-4 p-4 shadow-lg">
              <h4 className="fw-bold mb-2">
                Ready for Your Spiritual Journey?
              </h4>
              <p className="mb-3">
                Contact us for personalized packages and special group discounts
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <button className="btn btn-light btn-lg fw-semibold">
                  <i className="fas fa-phone me-2"></i>
                  Call Now
                </button>
                <button className="btn btn-outline-light btn-lg fw-semibold">
                  <i className="fas fa-envelope me-2"></i>
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .service-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 1rem !important;
          backdrop-filter: blur(10px);
        }

        .service-card:hover {
          transform: translateY(-8px) !important;
        }

        .hover-lift:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .services-swiper {
          padding-bottom: 40px !important;
        }

        .services-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .services-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #28a745;
          opacity: 0.3;
        }

        .services-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }

        @media (max-width: 767px) {
          .display-5 {
            font-size: 1.8rem !important;
          }

          .service-card .card-body {
            padding: 1.5rem !important;
          }

          .service-card h3 {
            font-size: 1.3rem !important;
          }
        }

        @media (max-width: 576px) {
          .services-overview {
            padding: 3rem 0 !important;
          }

          .container {
            padding: 0 15px !important;
          }
        }

        .bg-image {
          background-repeat: repeat;
          background-position: center;
        }
      `}</style>
    </section>
  );
};

export default ServicesOverview;
