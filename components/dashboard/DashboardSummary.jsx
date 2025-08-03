"use client";

export default function DashboardSummary({ orderData }) {
  return (
    <div>
      <h2 className="mb-4 text-primary">Dashboard Overview</h2>
      <div className="row g-4">
        <div className="col-md-3">
          <div
            className="card text-white"
            style={{ backgroundColor: "#3554d1" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Total Orders</h6>
                  <h2 className="mb-0">{orderData.summary.totalOrders}</h2>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-shopping-cart fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Paid Orders</h6>
                  <h2 className="mb-0">{orderData.summary.paidOrders}</h2>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-check-circle fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Pending Payment</h6>
                  <h2 className="mb-0">{orderData.summary.pendingPayment}</h2>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-clock fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Cancelled Orders</h6>
                  <h2 className="mb-0">{orderData.summary.cancelledOrders}</h2>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-times-circle fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
