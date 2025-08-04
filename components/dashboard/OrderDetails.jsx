"use client";

export default function OrderDetails({
  selectedOrder,
  onClose,
  onPayment,
  onCancel,
}) {
  if (!selectedOrder) return null;

  // Function to get tour image based on tour name
  const getTourImage = (tourName) => {
    const tourImages = {
      "Bali Adventure Package": "/placeholder.png?height=300&width=400",
      "Tokyo City Tour": "/placeholder.png?height=300&width=400",
      "European Explorer": "/placeholder.png?height=300&width=400",
      "Safari Adventure": "/placeholder.png?height=300&width=400",
      "Mountain Hiking": "/placeholder.png?height=300&width=400",
    };
    return tourImages[tourName] || "/placeholder.png?height=300&width=400";
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(53, 84, 209, 0.15)" }}
    >
      <div className="modal-dialog" style={{ maxWidth: "80%", width: "80%" }}>
        <div
          className="modal-content border-0 shadow-lg"
          style={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <div
            className="modal-header text-white position-relative overflow-hidden"
            style={{ backgroundColor: "#3554d1" }}
          >
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
                                onClick={() => onPayment(selectedOrder.id)}
                              >
                                <i className="icon-credit-card text-14 me-2"></i>
                                Process Payment
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
                            Booking Date
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-calendar-check text-warning me-2"></i>
                            <strong>
                              {new Date(
                                selectedOrder.datePurchased
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </strong>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="text-muted small">
                            Total Investment
                          </label>
                          <div className="d-flex align-items-center">
                            <i className="icon-dollar-sign text-success me-2"></i>
                            <strong className="text-success fs-4">
                              {selectedOrder.totalPrice.toLocaleString()} USD
                            </strong>
                          </div>
                        </div>
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
                        "/placeholder.svg"
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
                      {selectedOrder.tourName}
                    </h6>
                    <p className="text-muted small mb-3">
                      Experience the adventure of a lifetime with our carefully
                      curated tour package designed for unforgettable memories.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">Duration</small>
                        <div className="fw-semibold">7 Days</div>
                      </div>
                      <div>
                        <small className="text-muted">Rating</small>
                        <div className="text-warning">
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <i className="icon-star"></i>
                          <small className="text-muted ms-1">4.9</small>
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
                          className="icon-plane text-primary mb-2"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <div>
                          <strong>Flight Included</strong>
                        </div>
                        <small className="text-muted">Round trip airfare</small>
                      </div>
                      <div className="col-md-3 text-center">
                        <i
                          className="icon-home text-success mb-2"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <div>
                          <strong>Accommodation</strong>
                        </div>
                        <small className="text-muted">4-star hotel stay</small>
                      </div>
                      <div className="col-md-3 text-center">
                        <i
                          className="icon-coffee text-warning mb-2"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <div>
                          <strong>Meals Included</strong>
                        </div>
                        <small className="text-muted">Breakfast & dinner</small>
                      </div>
                      <div className="col-md-3 text-center">
                        <i
                          className="icon-user-check text-info mb-2"
                          style={{ fontSize: "2rem" }}
                        ></i>
                        <div>
                          <strong>Tour Guide</strong>
                        </div>
                        <small className="text-muted">Professional guide</small>
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
                  Last updated: {new Date().toLocaleString()}
                </small>
              </div>
              <div>
                {selectedOrder.status === "pending" && (
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => onCancel(selectedOrder.id)}
                  >
                    <i className="icon-x text-14 me-2"></i>
                    Cancel Booking
                  </button>
                )}
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
