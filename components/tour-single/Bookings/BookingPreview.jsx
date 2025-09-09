"use client";

import convertCurrency from "@/utils/currency";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const BookingPreview = ({
  tourId,
  bookingData,
  selectedDate,
  selectedTime,
  selectedTourType,
  participantCount,
  totalPrice,
  priceOption,
  tourName,
  duration,
  reviews,
  thumbnailImage,
  url,
}) => {
  const [isBooking, setIsBooking] = useState(false);
  // console.log("selectedTime", selectedTime);
  const router = useRouter();
  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  //currency
  const { currentCurrency } = useSelector((state) => state.currency);

  const setCookie = (name, value, days = 1) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      JSON.stringify(value)
    )};expires=${expires.toUTCString()};path=/`;
  };

  const handleBookNow = async () => {
    setIsBooking(true);

    try {
      // Store all booking information in cookies
      const bookingInfo = {
        tourId,
        tourName,
        selectedDate: selectedDate.toISOString(),
        selectedTime,
        selectedTourType,
        participantCount,
        totalPrice,
        priceOption,
        duration,
        bookingData,
        tourImage: thumbnailImage,
        rating: 4.2,
        reviewCount: reviews,
        timestamp: new Date().toISOString(),
        url,
      };

      // Set cookies with booking information
      setCookie("booking_info", bookingInfo, 1); // Expires in 1 day
      setCookie("channel_id", "12130", 1);

      router.push("/checkout");
    } catch (error) {
      console.error("Error preparing checkout:", error);
      alert("Error preparing checkout. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div
      className="booking-preview bg-white border rounded shadow-sm"
      style={{ maxWidth: "450px" }}
    >
      {/* Header with Logo */}
      <div className="p-3 border-bottom">
        <div
          className="d-inline-block px-3 py-1 rounded text-white fw-bold"
          style={{ backgroundColor: "#3554d1", fontSize: "12px" }}
        >
          DreamZiarah
        </div>
      </div>

      {/* Booking Content */}
      <div className="p-3">
        {/* Tour Name */}
        <h5
          className="fw-bold mb-3"
          style={{ color: "#333", fontSize: "18px" }}
        >
          {tourName}
        </h5>

        {/* Date */}
        <div className="mb-3">
          <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
            Date
          </p>
          <p
            className="mb-1 fw-bold"
            style={{ color: "#333", fontSize: "16px" }}
          >
            {formatDate(selectedDate)}
          </p>
        </div>

        {/* Time */}
        <div className="mb-3">
          <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
            Time
          </p>
          <p
            className="mb-1 fw-bold"
            style={{ color: "#333", fontSize: "16px" }}
          >
            {selectedTime}
          </p>
        </div>

        {/* Customisation Section */}
        {/* <div className="mb-3">
          <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
            Customisation
          </p>
          <p
            className="mb-1 fw-bold"
            style={{ color: "#333", fontSize: "16px" }}
          >
            {getTimeRange()}
          </p>
        </div> */}

        {/* Duration */}
        <div className="mb-4">
          <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
            Duration
          </p>
          <p
            className="mb-1 fw-bold"
            style={{ color: "#333", fontSize: "16px" }}
          >
            {duration}
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="mb-3">
          <p className="mb-2 text-muted" style={{ fontSize: "14px" }}>
            Price breakdown
          </p>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span style={{ color: "#333", fontSize: "16px" }}>
              {participantCount} × Participants ({selectedTourType?.guide})
            </span>
            <span
              className="fw-bold"
              style={{ color: "#333", fontSize: "16px" }}
            >
              {`${currentCurrency?.symbol}${convertCurrency(
                parseFloat(totalPrice),
                "USD",
                currentCurrency?.currency
              )}`}
            </span>
          </div>
        </div>

        {/* Total Price Section */}
        <div
          className="d-flex justify-content-between align-items-center pt-3 border-top"
          style={{
            backgroundColor: "#e6f0ff", // light blue
            padding: "12px 16px",
            height: "auto",
            borderTop: "1px solid #e9ecef",
            borderTop: "3px solid #007bff",
          }}
        >
          <div>
            <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
              Total Price
            </p>
            <h4 className="mb-0 fw-bold" style={{ color: "#333" }}>
              {`${currentCurrency?.symbol}${convertCurrency(
                parseFloat(totalPrice),
                "USD",
                currentCurrency?.currency
              )}`}
            </h4>
            <small className="text-muted" style={{ fontSize: "12px" }}>
              All taxes and fees included
            </small>
          </div>

          {/* Book Now Button */}
          <button
            className="btn text-white fw-bold px-4 py-2"
            style={{
              backgroundColor: "#3554d1",
              fontSize: "14px",
              borderRadius: "4px",
            }}
            onClick={handleBookNow}
            disabled={isBooking}
          >
            {isBooking ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-external-link-alt me-2"></i>
                Book now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPreview;
