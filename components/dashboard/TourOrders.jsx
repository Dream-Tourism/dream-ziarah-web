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
        return "icon-check-circle text-14 me-2";
      case "pending":
        return "icon-clock text-14 me-2";
      case "cancelled":
        return "icon-x-circle text-14 me-2";
      default:
        return "icon-help-circle text-14 me-2";
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

  return (
    <div style={{ marginTop: "120px" }}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <i
            className="icon-route text-14 me-3"
            style={{ fontSize: "2rem" }}
          ></i>
          <div>
            <h2 className="mb-0 text-primary">Tour Bookings</h2>
            <p className="text-muted mb-0">Manage all your tour reservations</p>
          </div>
        </div>
        <button
          className="btn btn-outline-primary"
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
              <i className="icon-refresh-cw text-14 me-2"></i>
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
                <i className="icon-filter text-14 me-2"></i>
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
                  <i className="icon-list text-14 me-2"></i>
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
                  <i className="icon-check-circle text-14 me-2"></i>
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
                  <i className="icon-clock text-14 me-2"></i>
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
                  <i className="icon-x-circle text-14 me-2"></i>
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
                <i className="icon-calendar text-14 me-2"></i>
                From Date
              </label>
              <input
                type="date"
                className="form-control border-2"
                style={{
                  borderColor: "#3554d1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters({ ...filters, dateFrom: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-primary fw-semibold">
                <i className="icon-calendar text-14 me-2"></i>
                To Date
              </label>
              <input
                type="date"
                className="form-control border-2"
                style={{
                  borderColor: "#3554d1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters({ ...filters, dateTo: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-primary fw-semibold">
                <i className="icon-search text-14 me-2"></i>
                Search Tours
              </label>
              <input
                type="text"
                className="form-control border-2"
                style={{
                  borderColor: "#3554d1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
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
                <i className="icon-refresh-cw text-14 me-2"></i>
                Clear Filters
              </button>
              <span className="text-muted">
                <i className="icon-info text-14 me-1"></i>
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
            <i className="icon-compass" style={{ fontSize: "4rem" }}></i>
          </div>
          <h5 className="mb-0 position-relative">
            <i className="icon-list text-14 me-2"></i>
            Tour Reservations ({filteredOrders.length})
          </h5>
        </div>
        <div className="card-body p-0">
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
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="icon-hash text-14 me-2"></i>
                      Booking ID
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="icon-info text-14 me-2"></i>
                      Status
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="icon-map-pin text-14 me-2"></i>
                      Tour Destination
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="icon-users text-14 me-2"></i>
                      Participants
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="icon-calendar text-14 me-2"></i>
                      Tour Date
                    </th>
                    <th className="text-primary fw-semibold border-0 py-3">
                      <i className="icon-dollar-sign text-14 me-2"></i>
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
                            <i className="icon-ticket text-primary"></i>
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
                            )} d-flex align-items-center justify-content-center mb-2 text-dark`}
                            style={{ width: "120px", padding: "8px" }}
                          >
                            <i className={getStatusIcon(order.status)}></i>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                          {order.status === "pending" && (
                            <small className="text-dark fw-semibold">
                              <i className="icon-hand text-14 me-1"></i>
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
                              {new Date(order.selectedDate).toLocaleDateString(
                                "en-US",
                                { weekday: "short" }
                              )}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="text-success fw-bold fs-5">
                          <i className="icon-dollar-sign text-14 me-1"></i>
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
