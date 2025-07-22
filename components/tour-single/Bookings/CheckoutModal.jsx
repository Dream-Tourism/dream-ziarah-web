"use client";

import { useState } from "react";

const CheckoutModal = ({
  isOpen,
  onClose,
  bookingData,
  selectedDate,
  selectedTime,
  participants,
  tourName = "C1 - Heart of Montreal City Tour",
  tourImage = "/placeholder.svg?height=120&width=180",
  rating = 4.2,
  reviewCount = 814,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    acceptOffers: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    // Convert to 12-hour format if needed
    return time;
  };

  const getTimeRange = () => {
    const startTime = selectedTime;
    const endTime = "12:30 pm"; // You can calculate this based on duration
    return `${startTime} - ${endTime}`;
  };

  const getParticipantSummary = () => {
    const summary = [];
    Object.entries(participants).forEach(([type, count]) => {
      if (count > 0) {
        const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
        summary.push(`${count} x ${typeLabel}${count > 1 ? "s" : ""}`);
      }
    });
    return summary.join(", ");
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(participants).forEach(([type, count]) => {
      if (count > 0) {
        const pricePerPerson =
          type === "adult" ? 52.64 : type === "youth" ? 42.64 : 32.64;
        total += pricePerPerson * count;
      }
    });
    return total;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProceedToPayment = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Proceeding to payment with:", {
        travelerInfo: formData,
        bookingDetails: {
          date: selectedDate,
          time: selectedTime,
          participants,
          total: calculateTotal(),
        },
      });

      alert("Redirecting to payment...");
      onClose();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i
          key={i}
          className="fas fa-star text-warning"
          style={{ fontSize: "12px" }}
        ></i>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          className="fas fa-star-half-alt text-warning"
          style={{ fontSize: "12px" }}
        ></i>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <i
          key={`empty-${i}`}
          className="far fa-star text-warning"
          style={{ fontSize: "12px" }}
        ></i>
      );
    }

    return stars;
  };

  if (!isOpen) return null;

  const total = calculateTotal();

  return (
    <div
      className="modalOverlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
        padding: "20px",
      }}
    >
      <div
        className="modalContent"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "1000px",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <div
          className="modalHeader"
          style={{
            padding: "20px 30px",
            borderBottom: "1px solid #e9ecef",
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          <div className="headerContent d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Checkout</h4>
            <button
              className="btn-close"
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                padding: "0",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div className="modal-body p-0">
          <div className="row g-0">
            {/* Left Column - Traveler Information */}
            <div className="col-lg-7 col-12">
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "#e9ecef",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </div>
                  <h5 className="mb-0">Traveler information</h5>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">
                      First name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Simone"
                      style={{ padding: "12px 16px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      Last name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Stevenson"
                      style={{ padding: "12px 16px" }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                      <small className="text-muted ms-2">
                        We'll send your tickets here
                      </small>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nidewa@mailinator.com"
                      style={{ padding: "12px 16px" }}
                    />
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="acceptOffers"
                    checked={formData.acceptOffers}
                    onChange={handleInputChange}
                    id="acceptOffers"
                  />
                  <label className="form-check-label" htmlFor="acceptOffers">
                    Send me special offers, news and other relevant information
                  </label>
                </div>

                <button
                  className="btn btn-primary w-100 fw-bold"
                  style={{
                    backgroundColor: "#1e4a72",
                    border: "none",
                    padding: "12px 16px",
                    fontSize: "16px",
                  }}
                  onClick={handleProceedToPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
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
                      <i className="fas fa-lock me-2"></i>
                      Proceed to payment
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div
              className="col-lg-5 col-12"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="p-4">
                <h5 className="mb-4">Order summary</h5>

                {/* Tour Card */}
                <div className="card border-0 mb-3">
                  <div className="row g-0">
                    <div className="col-4">
                      <img
                        src={tourImage || "/placeholder.svg"}
                        className="img-fluid rounded-start h-100 object-fit-cover"
                        alt="Tour"
                        style={{ minHeight: "80px" }}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body p-3">
                        <h6
                          className="card-title mb-1"
                          style={{ fontSize: "14px", lineHeight: "1.3" }}
                        >
                          {tourName}
                        </h6>
                        <div className="d-flex align-items-center mb-2">
                          <span
                            className="me-1 fw-bold"
                            style={{ fontSize: "12px" }}
                          >
                            {rating}
                          </span>
                          <div className="me-2">{renderStars(rating)}</div>
                          <small className="text-muted">({reviewCount})</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i
                      className="fas fa-calendar-alt text-muted me-2"
                      style={{ fontSize: "14px" }}
                    ></i>
                    <span style={{ fontSize: "14px" }}>
                      {formatDate(selectedDate)} at {getTimeRange()}
                    </span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i
                      className="fas fa-users text-muted me-2"
                      style={{ fontSize: "14px" }}
                    ></i>
                    <span style={{ fontSize: "14px" }}>
                      {getParticipantSummary()}
                    </span>
                  </div>
                  <div className="d-flex align-items-center text-success">
                    <i
                      className="fas fa-check-circle me-2"
                      style={{ fontSize: "14px" }}
                    ></i>
                    <span style={{ fontSize: "14px" }}>Free Cancellation</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span></span>
                  <h5 className="mb-0">US${total.toFixed(2)}</h5>
                </div>

                <div className="mb-3">
                  <a
                    href="#"
                    className="text-primary text-decoration-none"
                    style={{ fontSize: "14px" }}
                  >
                    Enter gift or promo code
                  </a>
                </div>

                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Total</h5>
                    <h4 className="mb-0">US${total.toFixed(2)}</h4>
                  </div>
                  <small className="text-success">
                    All taxes and fees included
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
