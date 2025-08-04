"use client";

export default function DashboardSummary({ orderData }) {
  return (
    <div style={{ marginTop: "120px" }}>
      <div className="d-flex align-items-center mb-4">
        <i
          className="icon-globe text-primary me-3"
          style={{ fontSize: "2rem" }}
        ></i>
        <div>
          <h2 className="mb-0 text-primary">Dashboard Overview</h2>
          <p className="text-muted mb-0">
            Welcome to your tour management center
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-3">
          <div
            className="card text-white border-0 shadow-lg position-relative overflow-hidden"
            style={{ backgroundColor: "#3554d1" }}
          >
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-mountain" style={{ fontSize: "4rem" }}></i>
            </div>
            <div className="card-body position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">
                    <i className="icon-luggage text-14 me-2"></i>
                    Total Tours
                  </h6>
                  <h2 className="mb-0 fw-bold">
                    {orderData.summary.totalOrders}
                  </h2>
                  <small className="opacity-75">All bookings</small>
                </div>
                <div className="text-end">
                  <div className="bg-white bg-opacity-25 rounded-circle p-3">
                    <i
                      className="icon-trending-up"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-white border-0 shadow-lg position-relative overflow-hidden"
            style={{ backgroundColor: "#28a745" }}
          >
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-palm-tree" style={{ fontSize: "4rem" }}></i>
            </div>
            <div className="card-body position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">
                    <i className="icon-check-circle text-14 me-2"></i>
                    Confirmed Tours
                  </h6>
                  <h2 className="mb-0 fw-bold">
                    {orderData.summary.paidOrders}
                  </h2>
                  <small className="opacity-75">Ready to explore</small>
                </div>
                <div className="text-end">
                  <div className="bg-white bg-opacity-25 rounded-circle p-3">
                    <i
                      className="icon-passport"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-white border-0 shadow-lg position-relative overflow-hidden"
            style={{ backgroundColor: "#ffc107" }}
          >
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-clock" style={{ fontSize: "4rem" }}></i>
            </div>
            <div className="card-body position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1 text-dark">
                    <i className="icon-hourglass text-14 me-2"></i>
                    Pending Payment
                  </h6>
                  <h2 className="mb-0 fw-bold text-dark">
                    {orderData.summary.pendingPayment}
                  </h2>
                  <small className="opacity-75 text-dark">
                    Awaiting confirmation
                  </small>
                </div>
                <div className="text-end">
                  <div className="bg-white bg-opacity-25 rounded-circle p-3">
                    <i
                      className="icon-credit-card text-dark"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div
            className="card text-white border-0 shadow-lg position-relative overflow-hidden"
            style={{ backgroundColor: "#dc3545" }}
          >
            <div className="position-absolute top-0 end-0 opacity-25">
              <i className="icon-ban" style={{ fontSize: "4rem" }}></i>
            </div>
            <div className="card-body position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">
                    <i className="icon-x-circle text-14 me-2"></i>
                    Cancelled Tours
                  </h6>
                  <h2 className="mb-0 fw-bold">
                    {orderData.summary.cancelledOrders}
                  </h2>
                  <small className="opacity-75">Refund processed</small>
                </div>
                <div className="text-end">
                  <div className="bg-white bg-opacity-25 rounded-circle p-3">
                    <i
                      className="icon-refresh-cw"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="row mt-4">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            }}
          >
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      className="icon-users text-primary me-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0 text-primary">1,247</h4>
                      <small className="text-muted">Happy Travelers</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      className="icon-map text-success me-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0 text-success">45</h4>
                      <small className="text-muted">Destinations</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      className="icon-star text-warning me-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0 text-warning">4.8</h4>
                      <small className="text-muted">Average Rating</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <i
                      className="icon-calendar-check text-info me-3"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0 text-info">98%</h4>
                      <small className="text-muted">Success Rate</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
