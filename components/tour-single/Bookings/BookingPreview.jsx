"use client";

import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const BookingPreview = ({
  bookingData,
  selectedDate,
  selectedTime,
  selectedTourType,
  participantCount,
  totalPrice,
  priceOption,
  tourName = "Makkah City Ziarah Luxury Private Vehicle",
  duration = "4 Hours",
}) => {
  const [isBooking, setIsBooking] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getTimeRange = () => {
    const startTime = selectedTime;
    const endTime = selectedTime; // You can calculate end time based on duration
    return `${startTime} - ${endTime}`;
  };

  const handleBookNow = () => {
    setShowCheckoutModal(true);
  };

  return (
    <div
      className="booking-preview bg-white border rounded shadow-sm"
      style={{ maxWidth: "400px" }}
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
          <p
            className="mb-1 fw-bold"
            style={{ color: "#333", fontSize: "16px" }}
          >
            {formatDate(selectedDate)}
          </p>
        </div>

        {/* Customisation Section */}
        <div className="mb-3">
          <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
            Customisation
          </p>
          <p
            className="mb-1 fw-bold"
            style={{ color: "#333", fontSize: "16px" }}
          >
            {getTimeRange()}
          </p>
        </div>

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
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Total Price Section */}
        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
          <div>
            <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
              Total Price
            </p>
            <h4 className="mb-0 fw-bold" style={{ color: "#333" }}>
              ${totalPrice.toFixed(2)}
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
              "Book now"
            )}
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        bookingData={bookingData}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedTourType={selectedTourType}
        participantCount={participantCount}
        totalPrice={totalPrice}
        priceOption={priceOption}
        tourName={tourName}
        duration={duration}
      />
    </div>
  );
};

export default BookingPreview;
