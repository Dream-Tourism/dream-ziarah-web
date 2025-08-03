"use client";

export default function OrderDetails({
  selectedOrder,
  onClose,
  onPayment,
  onCancel,
}) {
  if (!selectedOrder) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(53, 84, 209, 0.1)", marginTop: "120px" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div
            className="modal-header text-white"
            style={{ backgroundColor: "#3554d1" }}
          >
            <h5 className="modal-title">
              <i className="fas fa-file-alt me-2"></i>
              Order Details - {selectedOrder.id}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div
                  className="card border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="card-body">
                    <h6 className="text-primary mb-3">
                      <i className="fas fa-info-circle me-2"></i>
                      Order Information
                    </h6>
                    <div className="mb-2">
                      <strong>Order ID:</strong>
                      <span className="text-primary ms-2">
                        {selectedOrder.id}
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong>Tour Name:</strong>
                      <span className="ms-2">{selectedOrder.tourName}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong>
                      <span
                        className={`badge ms-2 ${
                          selectedOrder.status === "paid"
                            ? "bg-success"
                            : selectedOrder.status === "pending"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong>Participants:</strong>
                      <span className="ms-2">
                        <i className="fas fa-users me-1"></i>
                        {selectedOrder.participants}
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong>Date Purchased:</strong>
                      <span className="ms-2">
                        <i className="fas fa-calendar me-1"></i>
                        {new Date(
                          selectedOrder.datePurchased
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mb-0">
                      <strong>Total Price:</strong>
                      <span className="text-success ms-2 fs-5">
                        <i className="fas fa-dollar-sign me-1"></i>
                        {selectedOrder.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="card border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="card-body">
                    <h6 className="text-primary mb-3">
                      <i className="fas fa-user me-2"></i>
                      Customer Information
                    </h6>
                    <div className="mb-2">
                      <strong>Name:</strong>
                      <span className="ms-2">{selectedOrder.customerName}</span>
                    </div>
                    <div className="mb-0">
                      <strong>Email:</strong>
                      <span className="ms-2">
                        <i className="fas fa-envelope me-1"></i>
                        {selectedOrder.customerEmail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light">
            {selectedOrder.status === "pending" && (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => onPayment(selectedOrder.id)}
                >
                  <i className="fas fa-credit-card me-2"></i>
                  Process Payment
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onCancel(selectedOrder.id)}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancel Order
                </button>
              </>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              <i className="fas fa-times me-2"></i>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
