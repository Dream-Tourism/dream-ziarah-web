"use client";

import useTourBookingUUID from "@/hooks/useTourBookingUUID";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const booking_id = searchParams.get("booking_id");

  const { booking, loading, error } = useTourBookingUUID(booking_id);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (!booking_id) {
      router.push("/");
      return;
    }

    // Trigger smooth entrance animation
    setAnimateIn(true);
  }, [booking_id, router]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (timeString) =>
    new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (loading) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="loading-spinner mb-4">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h5 className="text-muted fw-normal">Confirming your payment...</h5>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <div className="error-icon mb-4">
                  <i
                    className="bi bi-exclamation-triangle text-warning"
                    style={{ fontSize: "4rem" }}
                  ></i>
                </div>
                <h3 className="card-title text-dark mb-3">
                  Payment Verification Failed
                </h3>
                <p className="card-text text-muted mb-4 lead">
                  We couldn't verify your payment. Please contact our support
                  team if you believe this is an error.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    className="btn btn-primary btn-lg px-4"
                    onClick={() => router.push("/")}
                  >
                    <i className="bi bi-house me-2"></i>Return Home
                  </button>
                  <button
                    className="btn btn-outline-primary btn-lg px-4"
                    onClick={() => router.push("/contact")}
                  >
                    <i className="bi bi-headset me-2"></i>Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 bg-gradient-subtle mt-90">
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            {/* Success Header */}
            <div
              className={`text-center mb-5 ${
                animateIn ? "animate-fade-in" : ""
              }`}
            >
              <div className="success-checkmark mb-4">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
              <h1 className="display-5 text-success fw-bold mb-3 mt-10">
                Payment Successful!
              </h1>
              <p className="lead text-muted mb-0">
                Thank you for your booking. Your tour reservation has been
                confirmed and you'll receive a detailed confirmation email
                shortly.
              </p>
            </div>

            {/* Booking Details Card */}
            <div
              className={`card border-0 shadow-lg mb-5 ${
                animateIn ? "animate-slide-up" : ""
              }`}
            >
              <div className="card-header bg-gradient-primary text-white py-4">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="mb-0 fw-semibold">
                      <i className="bi bi-calendar-check me-3"></i>
                      Booking Confirmation
                    </h4>
                  </div>
                  <div className="col-auto">
                    <span className="badge bg-white text-primary fs-6 fw-semibold px-3 py-2">
                      #{booking.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-body p-4 p-md-5">
                {/* Tour Information */}
                <div className="section-divider mb-4">
                  <h5 className="section-title text-primary mb-4">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    Tour Information
                  </h5>
                  <div className="info-card">
                    <h6 className="fw-bold text-dark mb-3 fs-5">
                      {booking.tour}
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="info-item">
                          <small className="text-muted text-uppercase fw-medium">
                            Guide
                          </small>
                          <div className="fw-semibold text-dark">
                            {booking.guide}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="info-item">
                          <small className="text-muted text-uppercase fw-medium">
                            Participants
                          </small>
                          <div className="fw-semibold text-dark">
                            {booking.total_participants} people
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="info-item">
                          <small className="text-muted text-uppercase fw-medium">
                            Status
                          </small>
                          <span className="badge bg-success-soft text-success fw-semibold">
                            <i className="bi bi-check-circle me-1"></i>
                            Confirmed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="section-divider mb-4">
                  <h5 className="section-title text-primary mb-4">
                    <i className="bi bi-clock me-2"></i>
                    Schedule Details
                  </h5>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="schedule-item">
                        <div className="schedule-icon">
                          <i className="bi bi-calendar3"></i>
                        </div>
                        <div>
                          <small className="text-muted text-uppercase fw-medium">
                            Date
                          </small>
                          <div className="fw-semibold text-dark">
                            {formatDate(booking.selected_date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="schedule-item">
                        <div className="schedule-icon">
                          <i className="bi bi-clock-fill"></i>
                        </div>
                        <div>
                          <small className="text-muted text-uppercase fw-medium">
                            Time
                          </small>
                          <div className="fw-semibold text-dark">
                            {formatTime(booking.selected_time)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="section-divider mb-4">
                  <h5 className="section-title text-primary mb-4">
                    <i className="bi bi-receipt me-2"></i>
                    Payment Summary
                  </h5>
                  <div className="payment-summary">
                    <div className="row g-3 mb-4">
                      {booking.price_by_vehicle && (
                        <div className="col-md-6">
                          <div className="payment-item">
                            <small className="text-muted text-uppercase fw-medium">
                              Group Price
                            </small>
                            <div className="fw-semibold text-dark fs-6">
                              ${booking.group_price}
                            </div>
                          </div>
                        </div>
                      )}
                      {booking.price_by_passenger && (
                        <div className="col-md-6">
                          <div className="payment-item">
                            <small className="text-muted text-uppercase fw-medium">
                              Price per Person
                            </small>
                            <div className="fw-semibold text-dark fs-6">
                              ${booking.price_per_person}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="col-md-6">
                        <div className="payment-item">
                          <small className="text-muted text-uppercase fw-medium">
                            Payment ID
                          </small>
                          <div className="fw-semibold text-dark font-monospace">
                            {booking.payment_key}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="payment-item">
                          <small className="text-muted text-uppercase fw-medium">
                            Booking Date
                          </small>
                          <div className="fw-semibold text-dark">
                            {new Date(booking.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="total-amount-card">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 text-dark fw-semibold">
                          Total Amount Paid
                        </h6>
                        <h3 className="mb-0 text-success fw-bold">
                          ${booking.total_price}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`text-center ${animateIn ? "animate-fade-in-up" : ""}`}
            >
              <div className="d-grid gap-3 d-md-flex justify-content-md-center">
                <button
                  className="btn btn-primary btn-lg px-5 py-3"
                  onClick={() => router.push("/dashboard")}
                >
                  <i className="bi bi-list-ul me-2"></i>
                  View My Bookings
                </button>
                <button
                  className="btn btn-outline-primary btn-lg px-5 py-3"
                  onClick={() => router.push("/")}
                >
                  <i className="bi bi-house me-2"></i>
                  Back to Home
                </button>
              </div>

              <div className="mt-4">
                <small className="text-muted">
                  <i className="bi bi-envelope me-1"></i>A confirmation email
                  has been sent to your registered email address
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-subtle {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .bg-gradient-primary {
          background: linear-gradient(135deg, #0d6efd 0%, #0056b3 100%);
        }

        .bg-success-soft {
          background-color: rgba(25, 135, 84, 0.1);
        }

        /* Success Checkmark Animation */
        .success-checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 3;
          stroke: #28a745;
          stroke-miterlimit: 10;
          margin: 0 auto;
          position: relative;
        }

        .success-checkmark .check-icon {
          width: 80px;
          height: 80px;
          position: relative;
          border-radius: 50%;
          box-sizing: content-box;
          border: 3px solid #28a745;
        }

        .success-checkmark .check-icon::before {
          top: 3px;
          left: -2px;
          width: 30px;
          transform-origin: 100% 50%;
          border-radius: 100px 0 0 100px;
        }

        .success-checkmark .check-icon::after {
          top: 0;
          left: 30px;
          width: 60px;
          transform-origin: 0 50%;
          border-radius: 0 100px 100px 0;
          animation: rotate-circle 4.25s ease-in;
        }

        .success-checkmark .check-icon::before,
        .success-checkmark .check-icon::after {
          content: "";
          height: 100px;
          position: absolute;
          background: #f8f9fa;
          transform: rotate(-45deg);
        }

        .success-checkmark .icon-line {
          height: 3px;
          background-color: #28a745;
          display: block;
          border-radius: 2px;
          position: absolute;
          z-index: 10;
        }

        .success-checkmark .icon-line.line-tip {
          top: 46px;
          left: 14px;
          width: 25px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }

        .success-checkmark .icon-line.line-long {
          top: 38px;
          right: 8px;
          width: 47px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }

        .success-checkmark .icon-circle {
          top: -3px;
          left: -3px;
          z-index: 10;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          position: absolute;
          box-sizing: content-box;
          border: 3px solid rgba(40, 167, 69, 0.2);
        }

        .success-checkmark .icon-fix {
          top: 8px;
          width: 5px;
          left: 26px;
          z-index: 1;
          height: 85px;
          position: absolute;
          transform: rotate(-45deg);
          background-color: #f8f9fa;
        }

        @keyframes rotate-circle {
          0% {
            transform: rotate(-45deg);
          }
          5% {
            transform: rotate(-45deg);
          }
          12% {
            transform: rotate(-405deg);
          }
          100% {
            transform: rotate(-405deg);
          }
        }

        @keyframes icon-line-tip {
          0% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          54% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          70% {
            width: 50px;
            left: -8px;
            top: 37px;
          }
          84% {
            width: 17px;
            left: 21px;
            top: 48px;
          }
          100% {
            width: 25px;
            left: 14px;
            top: 46px;
          }
        }

        @keyframes icon-line-long {
          0% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          65% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          84% {
            width: 55px;
            right: 0px;
            top: 35px;
          }
          100% {
            width: 47px;
            right: 8px;
            top: 38px;
          }
        }

        /* Card and Layout Styles */
        .card {
          border-radius: 1rem;
          overflow: hidden;
        }

        .card-header {
          border: none;
        }

        .section-divider {
          position: relative;
          padding-bottom: 2rem;
        }

        .section-divider:not(:last-child)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #dee2e6, transparent);
        }

        .section-title {
          font-weight: 600;
          letter-spacing: -0.025em;
        }

        .info-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 0.75rem;
          padding: 1.5rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .info-item {
          padding: 0.75rem 0;
        }

        .schedule-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(13, 110, 253, 0.05);
          border-radius: 0.5rem;
          border-left: 4px solid #0d6efd;
        }

        .schedule-icon {
          width: 40px;
          height: 40px;
          background: #0d6efd;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.1rem;
        }

        .payment-summary {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          border-radius: 0.75rem;
          padding: 1.5rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .payment-item {
          padding: 0.5rem 0;
        }

        .total-amount-card {
          background: linear-gradient(
            135deg,
            rgba(25, 135, 84, 0.1) 0%,
            rgba(25, 135, 84, 0.05) 100%
          );
          border: 2px solid rgba(25, 135, 84, 0.2);
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-top: 1rem;
        }

        /* Animation Classes */
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Button Enhancements */
        .btn {
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .loading-spinner {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
