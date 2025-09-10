"use client";

import { CHECKOUTDATA } from "@/constant/constants";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useGetLogoUrlQuery } from "@/features/site-setting/siteSettingApi";
import { useSelector } from "react-redux";
import convertCurrency from "@/utils/currency";
import Loading from "../loading";
import Link from "next/link";

const CheckoutPage = () => {
  const [bookingData, setBookingData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    acceptOffers: false,
  });

  // console.log("Authenticated:", bookingData);
  //currency
  const { currentCurrency } = useSelector((state) => state.currency);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { user, isAuthenticated } = useSelector((state) => state.auth);

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

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value || value.trim().length === 0) {
          return "First name is required";
        }
        if (value.trim().length < 2) {
          return "First name must be at least 2 characters";
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          return "First name can only contain letters and spaces";
        }
        return "";

      case "lastName":
        if (!value || value.trim().length === 0) {
          return "Last name is required";
        }
        if (value.trim().length < 2) {
          return "Last name must be at least 2 characters";
        }
        if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          return "Last name can only contain letters and spaces";
        }
        return "";

      case "phone":
        if (!value || value.trim().length === 0) {
          return "Phone number is required";
        }
        const phoneDigits = value.replace(/\D/g, "");
        if (phoneDigits.length < 10) {
          return "Phone number must be at least 10 digits";
        }
        if (phoneDigits.length > 15) {
          return "Phone number cannot exceed 15 digits";
        }
        return "";

      case "email":
        if (!value || value.trim().length === 0) {
          return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return "";

      default:
        return "";
    }
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== "acceptOffers") {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    });
    return newErrors;
  };

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

  useEffect(() => {
    if (isAuthenticated && user) {
      const newFormData = {
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        phone: user.phone || "",
        email: user.email || "",
        acceptOffers: user.acceptOffers || false,
      };

      setFormData(newFormData);

      const newErrors = {};
      Object.keys(newFormData).forEach((field) => {
        if (field !== "acceptOffers") {
          const error = validateField(field, newFormData[field]);
          if (error) {
            newErrors[field] = error;
          }
        }
      });
      setErrors(newErrors);
    }
  }, [isAuthenticated, user]);

  const {
    data,
    isSuccess: logoSuccess,
    isLoading: logoLoading,
  } = useGetLogoUrlQuery(null);

  const logoUrl = logoSuccess
    ? data?.general_settings?.[0]?.cloudflare_favicon
    : "";

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getTimeRange = () => {
    if (!bookingData) return "";

    const startTimeStr = bookingData.selectedTime; // e.g. "08:30 am"
    const durationStr = bookingData.duration; // e.g. "4 hours"

    // Parse duration number
    const hoursToAdd = parseInt(durationStr);

    // Parse start time
    const [time, modifier] = startTimeStr.split(" "); // ["08:30", "am"]
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

    const startDate = new Date();
    startDate.setHours(hours, minutes);

    // Add duration
    const endDate = new Date(startDate.getTime() + hoursToAdd * 60 * 60 * 1000);

    // Format back to hh:mm am/pm
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes().toString().padStart(2, "0");
    const endModifier = endHours >= 12 ? "pm" : "am";
    const formattedEndHours = endHours % 12 === 0 ? 12 : endHours % 12;

    const endTimeStr = `${formattedEndHours}:${endMinutes} ${endModifier}`;

    return `${startTimeStr} - ${endTimeStr}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (type !== "checkbox") {
      const error = validateField(name, newValue);
      if (error && touched[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleProceedToPayment = async () => {
    const validationErrors = validateAllFields();

    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const errorMessages = Object.values(validationErrors);
      alert(
        `Please fix the following errors:\n• ${errorMessages.join("\n• ")}`
      );

      const firstErrorField = Object.keys(validationErrors)[0];
      const fieldElement = document.querySelector(
        `input[name="${firstErrorField}"]`
      );
      if (fieldElement) {
        fieldElement.focus();
      }

      return;
    }

    setIsProcessing(true);

    try {
      const completeBookingDetails = {
        traveller_info: {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          acceptOffers: formData.acceptOffers,
        },
        tour_details: {
          tour_id: bookingData?.tourId || null,
          selected_date: formatDateToYYYYMMDD(bookingData.selectedDate),
          selected_time: bookingData.selectedTime,
          total_participants: bookingData.participantCount,
          total_price: bookingData.totalPrice,
          guide: bookingData.selectedTourType?.guide,
          cancel_url: bookingData?.url,
        },
      };

      const response = await fetch(CHECKOUTDATA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeBookingDetails),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("Booking processed successfully:", result);

        // Check if there's a checkout_url in the response
        if (result.checkout_url) {
          // Open checkout URL in a new tab/window
          const checkoutWindow = window.open(result.checkout_url, "_blank");

          // For mobile devices (iPhone Safari), ensure the URL opens properly
          if (
            !checkoutWindow ||
            checkoutWindow.closed ||
            typeof checkoutWindow.closed == "undefined"
          ) {
            // Fallback: redirect current window if popup was blocked
            window.location.href = result.checkout_url;
            return;
          }

          // Clear cookies after opening checkout
          document.cookie =
            "booking_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "channel_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          // Redirect current page to home after a short delay
          setTimeout(() => {
            window.location.href = "/"; // Redirect to home page
          }, 1000);

          // Show success message
          alert("Redirecting to payment gateway...");
        } else {
          // Fallback for responses without checkout_url
          alert("Payment successful! Booking confirmed.");

          // Clear cookies after successful payment
          document.cookie =
            "booking_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "channel_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          // Redirect to home
          window.location.href = "/";
        }
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
          className="icon-star text-yellow-1 text-10"
          style={{ fontSize: "12px" }}
        ></i>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          className="icon-star text-yellow-1 text-10"
          style={{ fontSize: "12px" }}
        ></i>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <i
          key={`empty-${i}`}
          className="icon-star text-yellow-1 text-10"
          style={{ fontSize: "12px" }}
        ></i>
      );
    }

    return stars;
  };

  const getInputStyling = (fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName];
    const isValid =
      !errors[fieldName] && touched[fieldName] && formData[fieldName];

    return {
      padding: "12px 16px",
      border: hasError
        ? "2px solid #dc3545"
        : isValid
        ? "2px solid #28a745"
        : "1px solid #007bff",
      boxShadow: hasError
        ? "0 2px 6px rgba(220, 53, 69, 0.2)"
        : isValid
        ? "0 2px 6px rgba(40, 167, 69, 0.2)"
        : "0 2px 6px rgba(0, 123, 255, 0.2)",
    };
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
    <div className="min-vh-100">
      <div
        className="border-bottom py-3"
        style={{
          fontSize: "14px",
          borderRadius: "4px",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Link href="/">
              {isLoading ? (
                <Loading />
              ) : (
                <Image
                  style={{ width: "60px", height: "60px" }}
                  src={logoUrl}
                  width={128}
                  height={128}
                  alt="Hajj, Umrah and Ziarah"
                />
              )}
            </Link>
            <h4 className="mb-0 text-black">Secure Checkout</h4>
          </div>

          <div className="d-flex">
            <a
              className="btn-whatsapp-pulse whatsapp_icon"
              href="https://api.whatsapp.com/send/?phone=966548037409&amp;text=Hi DreamZiarah, I need assistance&amp;type=phone_number&amp;lang=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                style={{ cursor: "pointer" }}
                src="/img/whatsapp.svg"
                width={50}
                height={50}
                alt="WhatsApp"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="bg-white rounded shadow-sm p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3 bg-blue-2"
                      style={{
                        width: "24px",
                        height: "24px",
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
                        onBlur={handleInputBlur}
                        placeholder="First name"
                        style={getInputStyling("firstName")}
                      />
                      {errors.firstName && touched.firstName && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: "12px" }}
                        >
                          {errors.firstName}
                        </div>
                      )}
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
                        onBlur={handleInputBlur}
                        placeholder="Last name"
                        style={getInputStyling("lastName")}
                      />
                      {errors.lastName && touched.lastName && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: "12px" }}
                        >
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <label className="form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="Phone"
                        style={getInputStyling("phone")}
                      />
                      {errors.phone && touched.phone && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: "12px" }}
                        >
                          {errors.phone}
                        </div>
                      )}
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
                        onBlur={handleInputBlur}
                        placeholder="Email"
                        style={getInputStyling("email")}
                      />
                      {errors.email && touched.email && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: "12px" }}
                        >
                          {errors.email}
                        </div>
                      )}
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
                    className="btn btn-primary w-100 fw-bold bg-blue-1"
                    style={{
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

              <div className="col-lg-5">
                <div className="bg-white rounded shadow-sm p-4">
                  <h5 className="mb-4">Order summary</h5>

                  <div className="card border-0 mb-3">
                    <div className="row g-0">
                      <div className="col-4">
                        <img
                          src={
                            bookingData.tourImage ||
                            "/placeholder.svg?height=80&width=120" ||
                            "/placeholder.svg"
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
                      {/* ${bookingData.totalPrice.toFixed(2)} */}
                      {`${currentCurrency?.symbol}${convertCurrency(
                        parseFloat(bookingData.totalPrice),
                        "USD",
                        currentCurrency?.currency
                      )}`}
                    </h5>
                  </div>
                  {/* 
                  <div className="mb-3">
                    <a
                      href="#"
                      className="text-primary text-decoration-none"
                      style={{ fontSize: "14px" }}
                    >
                      Enter gift or promo code
                    </a>
                  </div> */}

                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Total</h5>
                      <h4 className="mb-0">
                        {`${currentCurrency?.symbol}${convertCurrency(
                          parseFloat(bookingData.totalPrice),
                          "USD",
                          currentCurrency?.currency
                        )}`}
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
