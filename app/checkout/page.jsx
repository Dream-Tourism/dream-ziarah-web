"use client";

import { CHECKOUTDATA } from "@/constant/constants";
import { useState, useEffect } from "react";

const CheckoutPage = () => {
  const [bookingData, setBookingData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    acceptOffers: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get cookie value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      try {
        return JSON.parse(decodeURIComponent(parts.pop().split(";").shift()));
      } catch (error) {
        console.error("Error parsing cookie:", error);
        return null;
      }
    }
    return null;
  };

  // Load booking data from cookies
  useEffect(() => {
    const loadBookingData = () => {
      try {
        const bookingInfo = getCookie("booking_info");
        if (bookingInfo) {
          setBookingData({
            ...bookingInfo,
            selectedDate: new Date(bookingInfo.selectedDate),
          });
        } else {
          console.error("No booking data found in cookies");
        }
      } catch (error) {
        console.error("Error loading booking data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookingData();
  }, []);
  console.log("Booking Data:", bookingData);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDateToMMDDYYYY = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getTimeRange = () => {
    if (!bookingData) return "";
    const startTime = bookingData.selectedTime;
    const endTime = "12:30 pm"; // You can calculate this based on duration
    return `${startTime} - ${endTime}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProceedToPayment = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare complete booking data for API
      const completeBookingDetails = {
        //Travel info
        travellerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          acceptOffers: formData.acceptOffers,
        },
        // Tour Details
        tourDetails: {
          tourId: bookingData?.tourId || null,
          tourName: bookingData?.tourName,
          description:
            bookingData.bookingData?.details?.tourData?.description || "",
          selectedDate: formatDateToMMDDYYYY(bookingData.selectedDate),
          selectedTime: bookingData.selectedTime,
          duration: bookingData.duration,
          participantCount: bookingData.participantCount,
          totalPrice: bookingData.totalPrice,
          pricePerPerson: bookingData.priceOption
            ? Number.parseFloat(bookingData.priceOption.price)
            : 0,
          tourImage: bookingData.tourImage,
        },
      };

      // Send booking data to API
      const response = await fetch(CHECKOUTDATA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeBookingDetails),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Booking processed successfully:", result);
        alert("Payment successful! Booking confirmed.");

        // Clear cookies after successful payment
        document.cookie =
          "booking_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "channel_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Redirect or close window
        // window.close();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Payment processing failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Payment failed: ${error.message}. Please try again.`);
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

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h4>No booking data found</h4>
          <p>Please return to the booking page and try again.</p>
          <button className="btn btn-primary" onClick={() => window.close()}>
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100"
      style={{ marginTop: "70px", paddingTop: "20px" }}
    >
      {/* Header */}
      <div
        className=" border-bottom py-3"
        style={{
          fontSize: "14px",
          borderRadius: "4px",
        }}
      >
        <div className="container">
          <h4 className="mb-0 text-black">Secure Checkout</h4>
        </div>
      </div>

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row g-4">
              {/* Left Column - Traveler Information */}
              <div className="col-lg-7">
                <div className="bg-white rounded shadow-sm p-4">
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
                        className="form-control shadow-sm"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        style={{
                          padding: "12px 16px",
                          border: "1px solid #007bff",
                          boxShadow: "0 2px 6px rgba(0, 123, 255, 0.2)",
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Last name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-sm"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        style={{
                          padding: "12px 16px",
                          border: "1px solid #007bff",
                          boxShadow: "0 2px 6px rgba(0, 123, 255, 0.2)",
                        }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="phone"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        style={{
                          padding: "12px 16px",
                          border: "1px solid #007bff",
                          boxShadow: "0 2px 6px rgba(0, 123, 255, 0.2)",
                        }}
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
                        placeholder="Email"
                        style={{
                          padding: "12px 16px",
                          border: "1px solid #007bff",
                          boxShadow: "0 2px 6px rgba(0, 123, 255, 0.2)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4 d-flex align-items-center">
                    <input
                      className="me-2"
                      type="checkbox"
                      name="acceptOffers"
                      checked={formData.acceptOffers}
                      onChange={handleInputChange}
                      id="acceptOffers"
                      style={{ width: "18px", height: "18px" }}
                    />
                    <label htmlFor="acceptOffers" className="mb-0">
                      Send me special offers, news and other relevant
                      information
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
                    disabled={isProcessing || !formData.acceptOffers}
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
              <div className="col-lg-5">
                <div className="bg-white rounded shadow-sm p-4">
                  <h5 className="mb-4">Order summary</h5>

                  {/* Tour Card */}
                  <div className="card border-0 mb-3">
                    <div className="row g-0">
                      <div className="col-4">
                        <img
                          src={
                            bookingData.tourImage ||
                            "/placeholder.svg?height=80&width=120"
                          }
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
                            {bookingData.tourName}
                          </h6>
                          <div className="d-flex align-items-center mb-2">
                            <span
                              className="me-1 fw-bold"
                              style={{ fontSize: "12px" }}
                            >
                              {bookingData.rating}
                            </span>
                            <div className="me-2">
                              {renderStars(bookingData.rating)}
                            </div>
                            <small className="text-muted">
                              ({bookingData.reviewCount})
                            </small>
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
                        {formatDate(bookingData.selectedDate)} at{" "}
                        {getTimeRange()}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className="fas fa-users text-muted me-2"
                        style={{ fontSize: "14px" }}
                      ></i>
                      <span style={{ fontSize: "14px" }}>
                        {bookingData.participantCount} Participants (
                        {bookingData.selectedTourType?.guide})
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className="fas fa-user-tie text-muted me-2"
                        style={{ fontSize: "14px" }}
                      ></i>
                      <span style={{ fontSize: "14px" }}>
                        Tour Type: {bookingData.selectedTourType?.guide}
                      </span>
                    </div>
                    <div className="d-flex align-items-center text-success">
                      <i
                        className="fas fa-check-circle me-2"
                        style={{ fontSize: "14px" }}
                      ></i>
                      <span style={{ fontSize: "14px" }}>
                        Free Cancellation
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span></span>
                    <h5 className="mb-0">
                      US${bookingData.totalPrice.toFixed(2)}
                    </h5>
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
                      <h4 className="mb-0">
                        US${bookingData.totalPrice.toFixed(2)}
                      </h4>
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
    </div>
  );
};

export default CheckoutPage;
