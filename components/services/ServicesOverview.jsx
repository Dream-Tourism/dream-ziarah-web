"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";

const ServicesOverview = () => {
  const [isMobile, setIsMobile] = useState(false);

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
        "Explore sacred places of Makkah and Madinah with guided tours.",
      icon: "🕌",
      route: "/tours",
      color: "bg-gradient-to-br from-green-50 to-green-100",
      features: ["Sacred Sites", "English Guide"],
    },
    {
      id: 2,
      title: "Umrah Packages",
      description: "Complete Umrah packages with accommodation and guidance.",
      icon: "🌙",
      route: "/umrah",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      features: ["Full Package", "24/7 Support"],
    },
    {
      id: 3,
      title: "Hajj Packages",
      description: "Affordable Hajj packages with comprehensive services.",
      icon: "🕋",
      route: "/hajj",
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      features: ["Complete Hajj", "Best Prices"],
    },
  ];

  const ServiceCard = ({ service }) => (
    <div
      className={`service-card h-100 ${service.color} border-0 shadow transition-all duration-300 hover:shadow-lg`}
    >
      <div className={`card-body text-center ${isMobile ? "p-2" : "p-3"}`}>
        <div className={isMobile ? "mb-1" : "mb-2"}>
          <div
            className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-sm"
            style={{
              width: isMobile ? "35px" : "50px",
              height: isMobile ? "35px" : "50px",
              fontSize: isMobile ? "1rem" : "1.2rem",
            }}
          >
            {service.icon}
          </div>
        </div>

        <h6
          className={`card-title fw-bold text-dark ${
            isMobile ? "mb-1" : "mb-2"
          } ${isMobile ? "small" : ""}`}
        >
          {service.title}
        </h6>

        <p
          className={`card-text text-muted mb-2 ${
            isMobile ? "text-xs" : "small"
          }`}
        >
          {service.description}
        </p>

        <div className={isMobile ? "mb-2" : "mb-3"}>
          {service.features.map((feature, index) => (
            <span
              key={index}
              className={`badge bg-white text-dark me-1 mb-1 ${
                isMobile ? "text-xs" : "small"
              }`}
            >
              ✓ {feature}
            </span>
          ))}
        </div>

        <Link href={service.route} className="text-decoration-none">
          <button
            className={`btn btn-success fw-bold rounded-pill ${
              isMobile ? "btn-xs px-2 py-1" : "btn-sm px-3"
            }`}
          >
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="layout-pt-md layout-pb-md">
      <div className="container">
        <div className="row y-gap-22 justify-between items-start">
          <div className="col-8 col-lg-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title md:text-24">
                Ziyarat Tours, Umrah & Hajj Packages
              </h2>
              <p className=" sectionTitle__text mt-5 sm:mt-0 md:text-13">
                Guided tours with English guides and easy transport
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-20 pt-40 sm:pt-20">
          {!isMobile ? (
            // Desktop View
            services.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6">
                <ServiceCard service={service} />
              </div>
            ))
          ) : (
            // Mobile View - Slider
            <div className="col-12">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={15}
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
        </div>
      </div>

      <style jsx>{`
        .service-card {
          transition: all 0.3s ease;
          border-radius: 12px !important;
        }

        .service-card:hover {
          transform: translateY(-4px);
        }

        .services-swiper {
          padding-bottom: 40px !important;
        }

        .services-swiper .swiper-pagination {
          bottom: 0 !important;
          margin-top: 15px !important;
        }

        .services-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #28a745;
          opacity: 0.3;
        }

        .services-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }

        .y-gap-20 > * {
          margin-bottom: 20px;
        }

        .y-gap-22 > * {
          margin-bottom: 22px;
        }

        .pt-40 {
          padding-top: 40px;
        }

        @media (max-width: 640px) {
          .pt-40 {
            padding-top: 20px;
          }

          .sm\\:pt-20 {
            padding-top: 20px !important;
          }

          .sm\\:mt-0 {
            margin-top: 0 !important;
          }
        }

        @media (max-width: 768px) {
          .md\\:text-24 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesOverview;
