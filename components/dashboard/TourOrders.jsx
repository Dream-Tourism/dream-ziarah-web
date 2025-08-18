"use client";

import { useState, useMemo } from "react";

export default function TourOrders({
  orderData,
  onOrderSelect,
  loading,
  onRefresh,
}) {
  const [filters, setFilters] = useState({
    status: "all",
    dateFrom: "",
    dateTo: "",
    searchTerm: "",
  });

  // Add this check at the beginning of the component
  if (!orderData || !orderData.orders) {
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="text-center py-5">
          <i
            className="icon-alert-circle text-warning mb-3"
            style={{ fontSize: "4rem" }}
          ></i>
          <h4 className="text-muted">No Data Available</h4>
          <p className="text-muted">Unable to load tour booking data</p>
          <button className="btn btn-primary" onClick={onRefresh}>
            <i className="icon-refresh-cw me-2"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
        return "icon-check-circle me-2";
      case "pending":
        return "icon-clock me-2";
      case "cancelled":
        return "icon-x-circle me-2";
      default:
        return "icon-help-circle me-2";
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

  // Mobile Order Card Component
  const MobileOrderCard = ({ order }) => (
    <div
      className="mobile-order-card"
      onClick={() => onOrderSelect(order)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-0 fw-bold">{order.id}</h6>
          <small className="opacity-75">{order.customerName}</small>
        </div>
        <span
          className={`badge bg-${getStatusColor(
            order.status
          )} text-dark px-3 py-2`}
        >
          <i className={getStatusIcon(order.status)}></i>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12">
            <div className="d-flex align-items-start">
              <i className="icon-map-pin text-primary me-2 mt-1"></i>
              <div className="flex-grow-1">
                <h6 className="mb-1 fw-semibold">{order.tourName}</h6>
                <small className="text-muted">
                  {order.selectedTime} • {order.guide || "Standard Package"}
                </small>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="icon-users text-info me-2"></i>
              <div>
                <small className="text-muted d-block">Travelers</small>
                <span className="fw-semibold">{order.participants}</span>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="icon-calendar text-success me-2"></i>
              <div>
                <small className="text-muted d-block">Tour Date</small>
                <span className="fw-semibold">
                  {new Date(order.selectedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
              <div className="d-flex align-items-center">
                <i className="icon-dollar-sign text-success me-2"></i>
                <div>
                  <span className="fw-bold text-success fs-5">
                    ${order.totalPrice.toLocaleString()}
                  </span>
                  <small className="text-muted ms-1">USD</small>
                </div>
              </div>

              {order.status === "pending" && (
                <small className="text-primary fw-semibold">
                  <i className="icon-hand me-1"></i>
                  Tap to pay
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ marginTop: "20px" }}>
      {" "}
      {/* Fixed margin */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <i
            className="icon-route me-3"
            style={{ fontSize: "2rem", color: "#3554d1" }}
          ></i>
          <div>
            <h2 className="mb-0 text-primary">Tour Bookings</h2>
            <p className="text-muted mb-0 d-none d-md-block">
              Manage all your tour reservations
            </p>
          </div>
        </div>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? (
            <>
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Refreshing...
            </>
          ) : (
            <>
              <i className="icon-refresh-cw me-2"></i>
              Refresh
            </>
          )}
        </button>
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
                <i className="icon-filter me-2"></i>
                Filter by Status
              </label>
              <div
                className="btn-group w-100 d-flex flex-column flex-sm-row"
                role="group"
              >
                <button
                  type="button"
                  className={`btn ${
                    filters.status === "all"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } position-relative mb-2 mb-sm-0`}
                  style={{
                    backgroundColor:
                      filters.status === "all" ? "#3554d1" : "transparent",
                    borderColor: "#3554d1",
                    color: filters.status === "all" ? "white" : "#3554d1",
                  }}
                  onClick={() => setFilters({ ...filters, status: "all" })}
                >
                  <i className="icon-list me-2"></i>
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
                  } position-relative mb-2 mb-sm-0`}
                  onClick={() => setFilters({ ...filters, status: "paid" })}
                >
                  <i className="icon-check-circle me-2"></i>
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
                  } position-relative mb-2 mb-sm-0`}
                  onClick={() => setFilters({ ...filters, status: "pending" })}
                >
                  <i className="icon-clock me-2"></i>
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
                  <i className="icon-x-circle me-2"></i>
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
                <i className="icon-calendar me-2"></i>
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
                <i className="icon-calendar me-2"></i>
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
                <i className="icon-search me-2"></i>
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
                className="btn btn-outline-secondary me-2 btn-sm"
                onClick={() =>
                  setFilters({
                    status: "all",
                    dateFrom: "",
                    dateTo: "",
                    searchTerm: "",
                  })
                }
              >
                <i className="icon-refresh-cw me-2"></i>
                Clear Filters
              </button>
              <span className="text-muted">
                <i className="icon-info me-1"></i>
                Showing {filteredOrders.length} of {orderData.orders.length}{" "}
                bookings
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Orders Display */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">Loading tour bookings...</h5>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-5">
          <i
            className="icon-search text-muted mb-3"
            style={{ fontSize: "4rem" }}
          ></i>
          <h4 className="text-muted">No tours found</h4>
          <p className="text-muted">
            Try adjusting your filters or search criteria
          </p>
        </div>
      ) : (
        <>
          {/* Mobile View - Cards */}
          <div className="d-md-none">
            {filteredOrders.map((order) => (
              <MobileOrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="d-none d-md-block">
            <div className="card border-0 shadow-lg">
              <div
                className="card-header text-white position-relative overflow-hidden"
                style={{ backgroundColor: "#3554d1" }}
              >
                <div className="position-absolute top-0 end-0 opacity-25">
                  <i className="icon-compass" style={{ fontSize: "4rem" }}></i>
                </div>
                <h5 className="mb-0 position-relative">
                  <i className="icon-list me-2"></i>
                  Tour Reservations ({filteredOrders.length})
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ backgroundColor: "#f8f9fa" }}>
                      <tr>
                        <th className="text-primary fw-semibold border-0 py-3">
                          <i className="icon-hash me-2"></i>
                          Booking ID
                        </th>
                        <th className="text-primary fw-semibold border-0 py-3">
                          <i className="icon-info me-2"></i>
                          Status
                        </th>
                        <th className="text-primary fw-semibold border-0 py-3">
                          <i className="icon-map-pin me-2"></i>
                          Tour Destination
                        </th>
                        <th className="text-primary fw-semibold border-0 py-3">
                          <i className="icon-users me-2"></i>
                          Travelers
                        </th>
                        <th className="text-primary fw-semibold border-0 py-3">
                          <i className="icon-calendar me-2"></i>
                          Tour Date
                        </th>
                        <th className="text-primary fw-semibold border-0 py-3">
                          <i className="icon-dollar-sign me-2"></i>
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
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                <i className="icon-ticket text-primary"></i>
                              </div>
                              <div>
                                <strong className="text-primary">
                                  {order.id}
                                </strong>
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
                                )} d-flex align-items-center justify-content-center mb-2 text-dark`}
                                style={{ width: "120px", padding: "8px" }}
                              >
                                <i className={getStatusIcon(order.status)}></i>
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </span>
                              {order.status === "pending" && (
                                <small className="text-dark fw-semibold">
                                  <i className="icon-hand me-1"></i>
                                  Click to pay
                                </small>
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <i className="icon-globe text-primary me-2"></i>
                              <div>
                                <strong>{order.tourName}</strong>
                                <br />
                                <small className="text-muted">
                                  {order.selectedTime} • ${order.pricePerPerson}
                                  /person
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <div className="bg-info bg-opacity-10 rounded-circle p-2 me-2">
                                <i className="icon-users text-info"></i>
                              </div>
                              <span className="fw-semibold">
                                {order.participants}
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <i className="icon-calendar-check text-success me-2"></i>
                              <div>
                                <strong>
                                  {new Date(
                                    order.selectedDate
                                  ).toLocaleDateString()}
                                </strong>
                                <br />
                                <small className="text-muted">
                                  {new Date(
                                    order.selectedDate
                                  ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                  })}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="text-success fw-bold fs-5">
                              <i className="icon-dollar-sign me-1"></i>
                              {order.totalPrice.toLocaleString()}
                            </div>
                            <small className="text-muted">USD</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
