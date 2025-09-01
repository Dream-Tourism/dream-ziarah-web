"use client";

import { useState } from "react";
import { processStripePayment } from "@/services/tourBookingService";

export default function OrderDetails({
  selectedOrder,
  onClose,
  onPayment,
  onCancel,
}) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!selectedOrder) return null;

  // Function to get tour image based on tour name
  const getTourImage = (tourName) => {
    const tourImages = {
      "Bali Adventure Package": "/placeholder.png?height=200&width=400",
      "Tokyo City Tour": "/placeholder.png?height=200&width=400",
      "European Explorer": "/placeholder.png?height=300&width=400",
      "Safari Adventure": "/placeholder.png?height=300&width=400",
      "Mountain Hiking": "/placeholder.png?height=300&width=400",
    };
    return tourImages[tourName] || "/placeholder.png?height=240&width=320";
  };

  const handleStripePayment = async () => {
    if (!selectedOrder.paymentUrl) {
      alert("Payment URL not available. Please contact support.");
      return;
    }

    try {
      setIsProcessingPayment(true);

      // Open checkout URL in a new tab/window
      const checkoutWindow = window.open(selectedOrder.paymentUrl, "_blank");

      // For mobile devices (iPhone Safari), ensure the URL opens properly
      if (
        !checkoutWindow ||
        checkoutWindow.closed ||
        typeof checkoutWindow.closed == "undefined"
      ) {
        // Fallback: redirect current window if popup was blocked
        window.location.href = selectedOrder.paymentUrl;
        return;
      }

      // Clear any existing booking cookies
      // document.cookie =
      //   "booking_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // document.cookie =
      //   "channel_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Show success message
      alert("Redirecting to payment gateway...");

      // Close the modal immediately
      onClose();

      // Optional: Monitor the payment window and refresh data when it closes
      const checkClosed = setInterval(() => {
        if (checkoutWindow.closed) {
          clearInterval(checkClosed);
          // Refresh bookings to get updated status after payment window closes
          setTimeout(() => {
            window.location.reload(); // Refresh the entire page to get latest data
          }, 1000);
        }
      }, 1000);

      // Set a timeout to stop monitoring after 30 minutes
      setTimeout(() => {
        clearInterval(checkClosed);
      }, 1800000); // 30 minutes
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleProcessPayment = () => {
    if (selectedOrder.paymentUrl) {
      // Use Stripe payment flow with new tab opening
      handleStripePayment();
    } else {
      // Fallback to original payment flow
      onPayment(selectedOrder.id);
    }
  };

  return (
    <div className="modal show d-block bg-blue-3">
      <div className="modal-dialog" style={{ maxWidth: "80%", width: "80%" }}>
        <div
          className="modal-content border-0 shadow-lg"
          style={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <div className="modal-header text-white position-relative overflow-hidden bg-blue-1">
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-mountain" style={{ fontSize: "4rem" }}></i>
            </div>
            <h5 className="modal-title position-relative">
              <i className="icon-file-text text-14 me-2"></i>
              Tour Booking Details - {selectedOrder.id}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="row">
              {/* Tour Information */}
              <div className="col-md-8">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  }}
                >
                  <div className="card-body">
                    <h6 className="text-primary mb-3 d-flex align-items-center">
                      <i className="icon-map text-14 me-2"></i>
                      Tour Package Information
                    </h6>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="text-muted small">
                            Booking Reference
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-hash text-primary me-2"></i>
                            <strong className="text-primary fs-5">
                              {selectedOrder.id}
                            </strong>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-muted small">
                            Destination
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-globe text-success me-2"></i>
                            <strong>{selectedOrder.tourName}</strong>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-muted small">
                            Guide Service
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-user-check text-info me-2"></i>
                            <strong>
                              {selectedOrder.guide || "Not specified"}
                            </strong>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-muted small">
                            Customer Name
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-user text-info me-2"></i>
                            <strong>{selectedOrder.customerName}</strong>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-muted small">
                            Contact Email
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-mail text-warning me-2"></i>
                            <small>{selectedOrder.customerEmail}</small>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="text-muted small">
                            Booking Status
                          </label>
                          <div className="d-flex align-items-center">
                            <span
                              className={`badge fs-6 px-3 py-2 text-dark me-2 ${
                                selectedOrder.status === "paid"
                                  ? "bg-success"
                                  : selectedOrder.status === "pending"
                                  ? "bg-warning"
                                  : "bg-danger"
                              }`}
                            >
                              <i
                                className={`${
                                  selectedOrder.status === "paid"
                                    ? "icon-check-circle"
                                    : selectedOrder.status === "pending"
                                    ? "icon-clock"
                                    : "icon-x-circle"
                                } text-14 me-2`}
                              ></i>
                              {selectedOrder.status.charAt(0).toUpperCase() +
                                selectedOrder.status.slice(1)}
                            </span>
                            {selectedOrder.status === "pending" && (
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={handleProcessPayment}
                                disabled={isProcessingPayment}
                              >
                                {isProcessingPayment ? (
                                  <>
                                    <div
                                      className="spinner-border spinner-border-sm me-2"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Processing...
                                      </span>
                                    </div>
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <i className="icon-credit-card text-14 me-2"></i>
                                    {selectedOrder.paymentUrl
                                      ? "Pay with Stripe"
                                      : "Process Payment"}
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-muted small">
                            Number of Travelers
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-users text-info me-2"></i>
                            <strong className="fs-5">
                              {selectedOrder.participants} People
                            </strong>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-muted small">
                            Tour Date & Time
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-calendar-check text-warning me-2"></i>
                            <div>
                              <strong>
                                {new Date(
                                  selectedOrder.selectedDate
                                ).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </strong>
                              <br />
                              <small className="text-muted">
                                at {selectedOrder.selectedTime}
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-muted small">
                            Pricing Details
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-dollar-sign text-success me-2"></i>
                            <div>
                              {selectedOrder.priceByVehicle ? (
                                <>
                                  <strong className="text-success fs-4">
                                    $
                                    {selectedOrder.groupPrice?.toLocaleString()}{" "}
                                    USD
                                  </strong>
                                  <br />
                                  <small className="text-muted">
                                    Group Price (Vehicle)
                                  </small>
                                </>
                              ) : (
                                <>
                                  <strong className="text-success fs-4">
                                    ${selectedOrder.totalPrice.toLocaleString()}{" "}
                                    USD
                                  </strong>
                                  <br />
                                  <small className="text-muted">
                                    ${selectedOrder.pricePerPerson}/person ×{" "}
                                    {selectedOrder.participants}
                                  </small>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {selectedOrder.paymentKey && (
                          <div className="mb-3">
                            <label className="text-muted small">
                              Payment Reference
                            </label>
                            <div className="d-flex align-items-center">
                              <i className="icon-key text-primary me-2"></i>
                              <small className="font-monospace">
                                {selectedOrder.paymentKey}
                              </small>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Image */}
              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="position-relative">
                    <img
                      src={
                        getTourImage(selectedOrder.tourName) ||
                        "/placeholder.png"
                      }
                      alt={selectedOrder.tourName}
                      className="card-img-top"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 start-0 m-2">
                      <span className="badge bg-primary bg-opacity-90">
                        <i className="icon-camera text-14 me-1"></i>
                        Tour Preview
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="text-primary mb-2">
                      <i className="icon-map-pin text-14 me-2"></i>
                      {selectedOrder.tourName.split("(")[0].trim()}
                    </h6>
                    <p className="text-muted small mb-3">
                      Experience the adventure of a lifetime with our carefully
                      curated tour package designed for unforgettable memories.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">Vehicle Type</small>
                        <div className="fw-semibold">
                          {selectedOrder.tourName.includes("Luxury")
                            ? "Luxury"
                            : "Standard"}
                        </div>
                      </div>
                      <div>
                        <small className="text-muted">Guide</small>
                        <div className="text-warning">
                          {selectedOrder.guide === "Without Guide" ? (
                            <i className="icon-x-circle"></i>
                          ) : (
                            <i className="icon-user-check"></i>
                          )}
                          <small className="text-muted ms-1">
                            {selectedOrder.guide}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Tour Details */}
            <div className="row mt-4">
              <div className="col-12">
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
                  }}
                >
                  <div className="card-body">
                    <h6 className="text-primary mb-3 d-flex align-items-center">
                      <i className="icon-info text-14 me-2"></i>
                      Tour Package Highlights
                    </h6>
                    <div className="row">
                      <div className="col-md-3 text-center">
                        <i
                          className="icon-car text-primary mb-2"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <div>
                          <strong>Private Vehicle</strong>
                        </div>
                        <small className="text-muted">
                          Luxury transportation
                        </small>
                      </div>
                      <div className="col-md-3 text-center">
                        <i
                          className="icon-clock text-success mb-2"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <div>
                          <strong>Flexible Timing</strong>
                        </div>
                        <small className="text-muted">
                          Choose your schedule
                        </small>
                      </div>
                      <div className="col-md-3 text-center">
                        <i
                          className="icon-map text-warning mb-2"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <div>
                          <strong>Scenic Route</strong>
                        </div>
                        <small className="text-muted">
                          Beautiful landscapes
                        </small>
                      </div>
                      <div className="col-md-3 text-center">
                        <i
                          className={`${
                            selectedOrder.guide === "Without Guide"
                              ? "icon-x-circle text-danger"
                              : "icon-user-check text-info"
                          } mb-2`}
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <div>
                          <strong>{selectedOrder.guide}</strong>
                        </div>
                        <small className="text-muted">
                          {selectedOrder.guide === "Without Guide"
                            ? "Self-guided tour"
                            : "Professional guide"}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer bg-light border-0 p-4">
            <div className="d-flex justify-content-between w-100 align-items-center">
              <div>
                <small className="text-muted">
                  <i className="icon-clock text-14 me-1"></i>
                  Last updated:{" "}
                  {new Date(selectedOrder.updatedAt).toLocaleString()}
                </small>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  <i className="icon-x text-14 me-2"></i>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
