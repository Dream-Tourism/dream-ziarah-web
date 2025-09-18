"use client";

import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { reviewsSchema } from "./reviews-data";

const Testimonial = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (reviewsSchema?.review) {
      setExpandedRows(Array(reviewsSchema.review.length).fill(false));
    }
  }, []);

  const toggleReadMore = (index) => {
    const updatedRows = [...expandedRows];
    updatedRows[index] = !updatedRows[index];
    setExpandedRows(updatedRows);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const options = { day: "numeric", month: "long" };
    if (date.getFullYear() !== now.getFullYear()) {
      options.year = "numeric";
    }
    return date.toLocaleDateString("en-GB", options);
  }

  // SVG Avatar Component
  const Avatar = ({ name }) => (
    <svg width="50" height="50" viewBox="0 0 50 50" className="avatar-svg">
      <circle cx="25" cy="25" r="25" fill="#e5e7eb"/>
      <circle cx="25" cy="18" r="8" fill="#9ca3af"/>
      <path d="M8 42c0-9.4 7.6-17 17-17s17 7.6 17 17" fill="#9ca3af"/>
    </svg>
  );

  // Filter reviews
  const filteredReviews = reviewsSchema?.review
    ? reviewsSchema.review
        .filter((item) => Number(item.reviewRating?.ratingValue) === 5)
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))
    : [];

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: filteredReviews.length > 4,
    speed: 1500,
    slidesToShow: Math.min(4, filteredReviews.length),
    slidesToScroll: 1,
    autoplay: filteredReviews.length > 4,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    useCSS: true,
    useTransform: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(3, filteredReviews.length),
          slidesToScroll: 1,
          infinite: filteredReviews.length > 3,
          autoplay: filteredReviews.length > 3,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: Math.min(2, filteredReviews.length),
          slidesToScroll: 1,
          infinite: filteredReviews.length > 2,
          autoplay: filteredReviews.length > 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: filteredReviews.length > 1,
          autoplay: filteredReviews.length > 1,
          centerMode: false,
        }
      }
    ]
  };

  if (!filteredReviews.length) {
    return <div>No 5-star reviews available</div>;
  }

  return (
    <>
      <style jsx global>{`
        .testimonial-slider-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 60px;
          position: relative;
        }

        .testimonial-slider-container .slick-list {
          margin: 0 -15px;
          overflow: hidden;
        }

        .testimonial-slider-container .slick-track {
          display: flex !important;
        }

        .testimonial-slider-container .slick-slide {
          height: inherit !important;
          padding: 0 15px;
        }

        .testimonial-slider-container .slick-slide > div {
          height: 100%;
        }

        .testimonial-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          height: 100%;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          position: relative;
        }

        .testimonial-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .user-section {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .avatar-svg {
          margin-right: 12px;
          border-radius: 50%;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          font-size: 14px;
          color: #1f2937;
          margin: 0 0 4px 0;
        }

        .review-date {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .stars-row {
          display: flex;
          gap: 2px;
          margin-bottom: 16px;
        }

        .star-icon {
          color: #fbbf24;
          font-size: 16px;
        }

        .review-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .review-text {
          font-size: 14px;
          line-height: 1.6;
          color: #374151;
          margin: 0 0 12px 0;
          flex: 1;
        }

        .review-text.truncated {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: #3b82f6;
          font-size: 12px;
          cursor: pointer;
          padding: 0;
          text-align: left;
          font-weight: 500;
        }

        .toggle-btn:hover {
          text-decoration: underline;
        }

        /* Custom Arrow Styles */
        .testimonial-slider-container .slick-prev,
        .testimonial-slider-container .slick-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          font-size: 0;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex !important;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .testimonial-slider-container .slick-prev {
          left: 10px;
        }

        .testimonial-slider-container .slick-next {
          right: 10px;
        }

        .testimonial-slider-container .slick-prev:hover,
        .testimonial-slider-container .slick-next:hover {
          background: #2563eb;
          transform: translateY(-50%) scale(1.05);
        }

        .testimonial-slider-container .slick-prev::before,
        .testimonial-slider-container .slick-next::before {
          font-size: 18px;
          color: white;
          opacity: 1;
        }

        .testimonial-slider-container .slick-prev::before {
          content: '←';
        }

        .testimonial-slider-container .slick-next::before {
          content: '→';
        }

        .testimonial-slider-container .slick-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .testimonial-slider-container {
            padding: 20px;
          }
          
          .testimonial-slider-container .slick-prev,
          .testimonial-slider-container .slick-next {
            display: none !important;
          }
        }
      `}</style>

      <div className="testimonial-slider-container">
        <Slider ref={sliderRef} {...sliderSettings}>
          {filteredReviews.map((review, index) => (
            <div key={`review-${index}`}>
              <div className="testimonial-card">
                <div className="user-section">
                  <Avatar name={review.author?.name || 'Anonymous'} />
                  <div className="user-details">
                    <h4 className="user-name">{review.author?.name || 'Anonymous'}</h4>
                    <p className="review-date">{formatDate(review.datePublished)}</p>
                  </div>
                </div>

                <div className="stars-row">
                  {[...Array(5)].map((_, starIndex) => (
                    <span key={starIndex} className="star-icon">★</span>
                  ))}
                </div>

                <div className="review-body">
                  <p 
                    className={`review-text ${expandedRows[index] ? '' : 'truncated'}`}
                  >
                    {review.reviewBody}
                  </p>
                  
                  {review.reviewBody && review.reviewBody.length > 200 && (
                    <button
                      className="toggle-btn"
                      onClick={() => toggleReadMore(index)}
                    >
                      {expandedRows[index] ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Testimonial;