import { useState } from "react";

export default function CancellationModal({ order, onClose, onCancel }) {
  const [formData, setFormData] = useState({
    reason: "",
    additionalDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reason.trim()) {
      setError("Please select a reason for cancellation");
      return;
    }

    if (formData.reason === "others" && !formData.additionalDetails.trim()) {
      setError("Please provide additional details for 'Others' reason");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let cancellationData;

      if (formData.reason === "others") {
        // If "others" is selected, use additionalDetails as reason
        cancellationData = {
          tour_id: order.id,
          booking_id: order.id,
          reason: formData.additionalDetails.trim(),
          cancellation_request: true,
        };
      } else {
        // For predefined reasons, include additional_details if provided
        cancellationData = {
          tour_id: order.id,
          booking_id: order.id,
          reason: formData.reason.trim(),
          additional_details: formData.additionalDetails.trim(),
          cancellation_request: true,
        };
      }

      await onCancel(cancellationData);
    } catch (err) {
      setError(err.message || "Failed to submit cancellation request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable custom-modal-width">
        <div className="modal-content">
          <div className="modal-header border-0 pb-2">
            <h5 className="modal-title">Request Cancellation</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Tour Item Display */}
              <div className="mb-4">
                <label className="form-label">
                  Choose the item(s) you want to cancel
                </label>
                <div className="card bg-light border">
                  <div className="card-body py-3">
                    <div className="d-flex align-items-center flex-wrap flex-md-nowrap">
                      <div className="bg-success bg-opacity-10 rounded p-2 me-3">
                        <i className="icon-map-pin text-success"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-semibold tour-booking-name">
                          {order.tourName}
                        </div>
                        <small className="text-muted">
                          {order.participants} travelers •{" "}
                          {new Date(order.selectedDate).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="text-end">
                        <div className="dropdown-wrapper mt-2 mt-md-0">
                          <select
                            className="form-select form-select-sm mt-1"
                            style={{
                              width: "200px",
                              height: "50px",
                              cursor: "pointer",
                            }}
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            required
                            disabled={loading}
                          >
                            <option value="">Select a Reason</option>
                            <option value="weather_conditions">
                              Weather Conditions
                            </option>
                            <option value="health_emergency">
                              Health Emergency
                            </option>
                            <option value="family_emergency">
                              Family Emergency
                            </option>
                            <option value="work_conflict">Work Conflict</option>
                            <option value="travel_restrictions">
                              Travel Restrictions
                            </option>
                            <option value="financial_hardship">
                              Financial Hardship
                            </option>
                            <option value="change_of_plans">
                              Change of Plans
                            </option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information - Only show when "others" is selected */}
              {formData.reason === "others" && (
                <div className="mb-4">
                  <label className="form-label">
                    Additional Information (required)
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={handleInputChange}
                    placeholder="Please specify your reason for cancellation..."
                    disabled={loading}
                    required
                  />
                </div>
              )}

              {/* Cancellation Policy */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Cancellation Policy
                </label>
                <div className="card bg-light border">
                  <div className="card-body">
                    <p className="small mb-2">
                      Before cancelling the order, kindly read thoroughly our
                      following terms & conditions:
                    </p>
                    <ol className="small mb-3">
                      <li>
                        Once you submit this form you agree to cancel the
                        selected item(s) in your order. We will be unable to
                        retrieve your order once it is cancelled.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="alert alert-danger mb-3">
                  <i className="icon-alert-circle me-2"></i>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !formData.reason.trim()}
                  style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
                >
                  {loading ? (
                    <>
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Processing...
                    </>
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
