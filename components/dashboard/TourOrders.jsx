"use client";

import { useState, useMemo } from "react";

export default function TourOrders({ orderData, onOrderSelect, onPayment }) {
  const [filters, setFilters] = useState({
    status: "all",
    dateFrom: "",
    dateTo: "",
    searchTerm: "",
  });

  const statusPriority = { paid: 3, pending: 2, cancelled: 1 };

  const filteredOrders = useMemo(() => {
    let filtered = [...orderData.orders];

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (order) => new Date(order.datePurchased) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (order) => new Date(order.datePurchased) <= new Date(filters.dateTo)
      );
    }

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          order.tourName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          order.customerName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
      );
    }

    // Sort by status priority (paid > pending > cancelled)
    filtered.sort(
      (a, b) => statusPriority[b.status] - statusPriority[a.status]
    );

    return filtered;
  }, [orderData.orders, filters]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return "fas fa-check-circle";
      case "pending":
        return "fas fa-clock";
      case "cancelled":
        return "fas fa-times-circle";
      default:
        return "fas fa-question-circle";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusCount = (status) => {
    if (status === "all") return orderData.orders.length;
    return orderData.orders.filter((order) => order.status === status).length;
  };

  // const handlePaymentClick = (e, orderId) => {
  //   e.stopPropagation(); // Prevent row click when clicking payment button
  //   onPayment(orderId);
  // };

  return (
    <div style={{ marginTop: "120px" }}>
      <div className="d-flex align-items-center mb-4">
        <i className="fas fa-route fa-2x text-primary me-3"></i>
        <div>
          <h2 className="mb-0 text-primary">Tour Bookings</h2>
          <p className="text-muted mb-0">Manage all your tour reservations</p>
        </div>
      </div>

      {/* Filters Section */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        <div className="card-body">
          {/* Status Filter Buttons */}
          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label text-primary fw-semibold mb-3">
                <i className="fas fa-filter me-2"></i>
                Filter by Status
              </label>
              <div className="btn-group w-100" role="group">
                <button
                  type="button"
                  className={`btn ${
                    filters.status === "all"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } position-relative`}
                  style={{
                    backgroundColor:
                      filters.status === "all" ? "#3554d1" : "transparent",
                    borderColor: "#3554d1",
                    color: filters.status === "all" ? "white" : "#3554d1",
                  }}
                  onClick={() => setFilters({ ...filters, status: "all" })}
                >
                  <i className="fas fa-list me-2"></i>
                  All Tours
                  <span className="badge bg-light text-dark ms-2">
                    {getStatusCount("all")}
                  </span>
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filters.status === "paid"
                      ? "btn-success"
                      : "btn-outline-success"
                  } position-relative`}
                  onClick={() => setFilters({ ...filters, status: "paid" })}
                >
                  <i className="fas fa-check-circle me-2"></i>
                  Confirmed
                  <span className="badge bg-light text-dark ms-2">
                    {getStatusCount("paid")}
                  </span>
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filters.status === "pending"
                      ? "btn-warning"
                      : "btn-outline-warning"
                  } position-relative`}
                  onClick={() => setFilters({ ...filters, status: "pending" })}
                >
                  <i className="fas fa-clock me-2"></i>
                  Pending
                  <span className="badge bg-light text-dark ms-2">
                    {getStatusCount("pending")}
                  </span>
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filters.status === "cancelled"
                      ? "btn-danger"
                      : "btn-outline-danger"
                  } position-relative`}
                  onClick={() =>
                    setFilters({ ...filters, status: "cancelled" })
                  }
                >
                  <i className="fas fa-times-circle me-2"></i>
                  Cancelled
                  <span className="badge bg-light text-dark ms-2">
                    {getStatusCount("cancelled")}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Date and Search Filters */}
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label text-primary fw-semibold">
                <i className="fas fa-calendar-alt me-2"></i>
                From Date
              </label>
              <input
                type="date"
                className="form-control border-2"
                style={{ borderColor: "#3554d1" }}
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters({ ...filters, dateFrom: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-primary fw-semibold">
                <i className="fas fa-calendar-alt me-2"></i>
                To Date
              </label>
              <input
                type="date"
                className="form-control border-2"
                style={{ borderColor: "#3554d1" }}
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters({ ...filters, dateTo: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-primary fw-semibold">
                <i className="fas fa-search me-2"></i>
                Search Tours
              </label>
              <input
                type="text"
                className="form-control border-2"
                style={{ borderColor: "#3554d1" }}
                placeholder="Search by ID, tour, or customer..."
                value={filters.searchTerm}
                onChange={(e) =>
                  setFilters({ ...filters, searchTerm: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() =>
                  setFilters({
                    status: "all",
                    dateFrom: "",
                    dateTo: "",
                    searchTerm: "",
                  })
                }
              >
                <i className="fas fa-undo me-2"></i>
                Clear Filters
              </button>
              <span className="text-muted">
                <i className="fas fa-info-circle me-1"></i>
                Showing {filteredOrders.length} of {orderData.orders.length}{" "}
                bookings
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-lg">
        <div
          className="card-header text-white position-relative overflow-hidden"
          style={{ backgroundColor: "#3554d1" }}
        >
          <div className="position-absolute top-0 end-0 opacity-25">
            <i className="fas fa-compass fa-4x"></i>
          </div>
          <h5 className="mb-0 position-relative">
            <i className="fas fa-list-alt me-2"></i>
            Tour Reservations ({filteredOrders.length})
          </h5>
        </div>
        <div className="card-body p-0">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-search fa-4x text-muted mb-3"></i>
              <h4 className="text-muted">No tours found</h4>
              <p className="text-muted">
                Try adjusting your filters or search criteria
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="fas fa-hashtag me-2"></i>
                      Booking ID
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="fas fa-info-circle me-2"></i>
                      Status
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      Tour Destination
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="fas fa-users me-2"></i>
                      Travelers
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="fas fa-calendar me-2"></i>
                      Booking Date
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="fas fa-dollar-sign me-2"></i>
                      Total Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className="align-middle border-bottom"
                      style={{ cursor: "pointer" }}
                      onClick={() => onOrderSelect(order)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.transform = "scale(1.01)";
                        e.currentTarget.style.transition = "all 0.2s ease";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                            <i className="fas fa-ticket-alt text-primary"></i>
                          </div>
                          <div>
                            <strong className="text-primary">{order.id}</strong>
                            <br />
                            <small className="text-muted">
                              {order.customerName}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="d-flex flex-column align-items-start">
                          <span
                            className={`badge bg-${getStatusColor(
                              order.status
                            )} d-flex align-items-center justify-content-center mb-2`}
                            style={{ width: "120px", padding: "8px" }}
                          >
                            <i
                              className={`${getStatusIcon(order.status)} me-2`}
                            ></i>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                          {order.status === "pending" && (
                            <div className="d-flex flex-column align-items-start">
                              <small className="text-warning fw-semibold mb-1">
                                <i className="fas fa-hand-pointer me-1"></i>
                                Click to pay
                              </small>
                              {/* <button
                                className="btn btn-sm btn-success"
                                onClick={(e) => handlePaymentClick(e, order.id)}
                                style={{ fontSize: "11px", padding: "4px 8px" }}
                              >
                                <i className="fas fa-credit-card me-1"></i>
                                Process Payment
                              </button> */}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-globe-americas text-primary me-2"></i>
                          <div>
                            <strong>{order.tourName}</strong>
                            <br />
                            <small className="text-muted">
                              Adventure Package
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-info bg-opacity-10 rounded-circle p-2 me-2">
                            <i className="fas fa-user-friends text-info"></i>
                          </div>
                          <span className="fw-semibold">
                            {order.participants}
                          </span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-calendar-check text-success me-2"></i>
                          <div>
                            <strong>
                              {new Date(
                                order.datePurchased
                              ).toLocaleDateString()}
                            </strong>
                            <br />
                            <small className="text-muted">
                              {new Date(order.datePurchased).toLocaleDateString(
                                "en-US",
                                { weekday: "short" }
                              )}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="text-success fw-bold fs-5">
                          <i className="fas fa-dollar-sign me-1"></i>
                          {order.totalPrice.toLocaleString()}
                        </div>
                        <small className="text-muted">USD</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
