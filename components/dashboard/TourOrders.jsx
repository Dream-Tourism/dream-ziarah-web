"use client";

import { useState, useMemo, useEffect } from "react";
import CancellationModal from "./Cancellation"; // Import the separate component
import ChangeDate from "./ChangeDate"; // Import the ChangeDate modal

export default function TourOrders({
  orderData,
  onOrderSelect,
  loading,
  onRefresh,
  onCancelRequest,
  onDateChange, // Add this prop to handle date changes
}) {
  const [filters, setFilters] = useState({
    status: "all",
    dateFrom: "",
    dateTo: "",
    searchTerm: "",
  });

  // console.log("orderData", orderData);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
  const [selectedOrderForDateChange, setSelectedOrderForDateChange] =
    useState(null);
  useEffect(() => {
    if (!selectedOrderForCancel && !selectedOrderForDateChange) {
      onRefresh();
    }
  }, [selectedOrderForCancel, selectedOrderForDateChange, onRefresh]);

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
      if (filters.status === "cancelled") {
        // For cancelled status, include tours with approved cancellation
        filtered = filtered.filter(
          (order) =>
            order.status === "cancelled" ||
            (order.cancellation_status &&
              order.cancellation_status.toLowerCase() === "approved")
        );
      } else {
        // For other statuses, filter normally but exclude approved cancellations
        filtered = filtered.filter(
          (order) =>
            order.status === filters.status &&
            !(
              order.cancellation_status &&
              order.cancellation_status.toLowerCase() === "approved"
            )
        );
      }
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

    // Sort by status priority (paid > pending > cancelled/refunded)
    const statusPriorityUpdated = {
      paid: 3,
      pending: 2,
      cancelled: 1,
      refunded: 1, // Add refunded status with same priority as cancelled
    };

    filtered.sort((a, b) => {
      // If order has approved cancellation, treat it as cancelled for sorting
      const aStatus =
        a.cancellation_status &&
        a.cancellation_status.toLowerCase() === "approved"
          ? "cancelled"
          : a.status;
      const bStatus =
        b.cancellation_status &&
        b.cancellation_status.toLowerCase() === "approved"
          ? "cancelled"
          : b.status;

      return statusPriorityUpdated[bStatus] - statusPriorityUpdated[aStatus];
    });

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

    if (status === "cancelled") {
      // Count tours with status "cancelled" OR approved cancellation
      return orderData.orders.filter(
        (order) =>
          order.status === "cancelled" ||
          (order.cancellation_status &&
            order.cancellation_status.toLowerCase() === "approved")
      ).length;
    }

    // For other statuses, count normally but exclude approved cancellations
    return orderData.orders.filter(
      (order) =>
        order.status === status &&
        !(
          order.cancellation_status &&
          order.cancellation_status.toLowerCase() === "approved"
        )
    ).length;
  };

  const canCancelOrder = (order) => {
    return order.status === "paid" || order.status === "pending";
  };

  const canChangeDate = (order) => {
    return order.status === "paid" || order.status === "pending";
  };

  // Check if order is disabled (has approved cancellation)
  const isOrderDisabled = (order) => {
    return (
      order.cancellation_request === false &&
      order.cancellation_status &&
      order.cancellation_status.toLowerCase() === "approved"
    );
  };

  // Helper functions to check request status
  const hasActiveCancellationRequest = (order) => {
    return order.cancellation_request === true;
  };

  const hasActiveDateChangeRequest = (order) => {
    return order.date_change_request === true;
  };

  const getDateChangeRequestStatus = (order) => {
    // If there's an active request, show the status
    if (order.date_change_request === true) {
      return {
        showStatus: true,
        status: order.date_change_request_status || "reviewing",
        badgeColor: "info",
        text: "Date Change Request",
      };
    }

    // If request is false but has approved/rejected status
    if (
      order.date_change_request === false &&
      order.date_change_request_status
    ) {
      const status = order.date_change_request_status.toLowerCase();
      return {
        showStatus: true,
        status: order.date_change_request_status,
        badgeColor:
          status === "approved"
            ? "success"
            : status === "cancelled"
            ? "danger"
            : "secondary",
        text:
          status === "approved"
            ? "Date Change Approved"
            : status === "cancelled"
            ? "Date Change Rejected"
            : "Date Change Request",
      };
    }

    // Default: no status to show (initial state or null status)
    return { showStatus: false };
  };

  const getCancellationRequestStatus = (order) => {
    // If there's an active request, show the status
    if (order.cancellation_request === true) {
      return {
        showStatus: true,
        status: order.cancellation_status || "reviewing",
        badgeColor: "warning",
        text: "Cancellation Request",
      };
    }

    // If request is false but has approved/rejected status
    if (order.cancellation_request === false && order.cancellation_status) {
      const status = order.cancellation_status.toLowerCase();
      return {
        showStatus: true,
        status: order.cancellation_status,
        badgeColor:
          status === "approved"
            ? "success"
            : status === "rejected"
            ? "danger"
            : "secondary",
        text:
          status === "approved"
            ? "Cancellation Approved"
            : status === "rejected"
            ? "Cancellation Rejected"
            : "Cancellation Request",
      };
    }

    // Default: no status to show (initial state or null status)
    return { showStatus: false };
  };

  const handleCancelClick = (order, e) => {
    e.stopPropagation();
    if (isOrderDisabled(order)) return;
    setSelectedOrderForCancel(order);
  };

  const handleDateChangeClick = (order, e) => {
    e.stopPropagation();
    if (isOrderDisabled(order)) return;
    setSelectedOrderForDateChange(order);
  };

  const handleCancelSubmit = async (cancellationData) => {
    try {
      await onCancelRequest(cancellationData);
      setSelectedOrderForCancel(null);
    } catch (error) {
      console.error("Cancel request failed:", error);
      // Error handling is done in the parent component and modal
    }
  };

  const handleDateChangeSubmit = async (dateChangeData) => {
    try {
      await onDateChange(dateChangeData);
      setSelectedOrderForDateChange(null);
      // Optionally refresh the data
      onRefresh();
    } catch (error) {
      console.error("Date change request failed:", error);
      // Error handling is done in the parent component and modal
    }
  };

  // Component to render cancel button or status
  const CancelButtonOrStatus = ({ order, isDesktop = false }) => {
    const statusInfo = getCancellationRequestStatus(order);

    if (statusInfo.showStatus) {
      return (
        <div
          className={`text-center ${
            isDesktop ? "" : "d-flex align-items-center justify-content-center"
          }`}
        >
          <div className="d-flex flex-column align-items-center">
            <span
              className={`badge bg-${statusInfo.badgeColor} text-dark px-2 py-1 mb-1`}
              style={{ fontSize: "10px" }}
            >
              <i className="icon-clock me-1"></i>
              {statusInfo.status}
            </span>
            <small className="text-muted" style={{ fontSize: "9px" }}>
              {statusInfo.text}
            </small>
          </div>
        </div>
      );
    }

    if (canCancelOrder(order) && !isOrderDisabled(order)) {
      return (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={(e) => handleCancelClick(order, e)}
          title="Cancel booking"
          style={{
            fontSize: isDesktop ? "11px" : "12px",
            padding: isDesktop ? "4px 8px" : "6px 12px",
          }}
        >
          <i className="icon-x me-1"></i>
          Cancel
        </button>
      );
    }

    return <span className="text-muted">-</span>;
  };

  // Component to render change date button or status
  const ChangeDateButtonOrStatus = ({ order, isDesktop = false }) => {
    const statusInfo = getDateChangeRequestStatus(order);

    if (statusInfo.showStatus) {
      return (
        <div
          className={`text-center ${
            isDesktop ? "" : "d-flex align-items-center justify-content-center"
          }`}
        >
          <div className="d-flex flex-column align-items-center">
            <span
              className={`badge bg-${statusInfo.badgeColor} text-dark px-2 py-1 mb-1`}
              style={{ fontSize: "10px" }}
            >
              <i
                className={`${
                  statusInfo.badgeColor === "success"
                    ? "icon-check"
                    : statusInfo.badgeColor === "danger"
                    ? "icon-x"
                    : "icon-clock"
                } me-1`}
              ></i>
              {statusInfo.status}
            </span>
            <small className="text-muted" style={{ fontSize: "9px" }}>
              {statusInfo.text}
            </small>
          </div>
        </div>
      );
    }

    if (canChangeDate(order) && !isOrderDisabled(order)) {
      return (
        <button
          className="btn btn-outline-primary btn-sm bg-yellow-4"
          onClick={(e) => handleDateChangeClick(order, e)}
          title="Change booking date"
          style={{
            fontSize: isDesktop ? "11px" : "12px",
            padding: isDesktop ? "4px 8px" : "6px 12px",
          }}
        >
          <i className="icon-calendar me-1"></i>
          Change {isDesktop ? "" : "Date"}
        </button>
      );
    }

    return <span className="text-muted">-</span>;
  };

  // Mobile Order Card Component
  const MobileOrderCard = ({ order }) => {
    const disabled = isOrderDisabled(order);

    return (
      <div
        className={`mobile-order-card ${disabled ? "opacity-50" : ""}`}
        onClick={disabled ? undefined : () => onOrderSelect(order)}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          filter: disabled ? "grayscale(50%)" : "none",
        }}
      >
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0 fw-bold">{order.id}</h6>
            <small className="opacity-75">{order.customerName}</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span
              className={`badge bg-${getStatusColor(
                order.status
              )} text-dark px-3 py-2`}
            >
              <i className={getStatusIcon(order.status)}></i>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            {!disabled && (
              <ChangeDateButtonOrStatus order={order} isDesktop={false} />
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12">
              <div className="d-flex align-items-start">
                <i className="icon-map-pin text-primary me-2 mt-1"></i>
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-semibold" title={order.tourName}>
                    {order.tourName.length > 50
                      ? `${order.tourName.substring(0, 50)}...`
                      : order.tourName}
                  </h6>
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

                <div className="d-flex align-items-center gap-2">
                  {order.status === "pending" && !disabled && (
                    <small className="text-primary fw-semibold">
                      <i className="icon-hand me-1"></i>
                      Tap to pay
                    </small>
                  )}
                  {!disabled && (
                    <CancelButtonOrStatus order={order} isDesktop={false} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
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
                    onClick={() =>
                      setFilters({ ...filters, status: "pending" })
                    }
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
            <div className="d-sm-none">
              {filteredOrders.map((order) => (
                <MobileOrderCard key={order.id} order={order} />
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="d-none d-sm-block">
              <div className="card border-0 shadow-lg">
                <div
                  className="card-header text-white position-relative overflow-hidden"
                  style={{ backgroundColor: "#3554d1" }}
                >
                  <div className="position-absolute top-0 end-0 opacity-25">
                    <i
                      className="icon-compass"
                      style={{ fontSize: "4rem" }}
                    ></i>
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
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "15%" }}
                          >
                            Booking ID
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "10%", whiteSpace: "nowrap" }}
                          >
                            Payment Status
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "20%" }}
                          >
                            Tour Name
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "8%" }}
                          >
                            Travelers
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "12%", whiteSpace: "nowrap" }}
                          >
                            Tour Date
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "10%" }}
                          >
                            TotalCost
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "10%", whiteSpace: "nowrap" }}
                          >
                            Change Date
                          </th>
                          <th
                            className="text-primary fw-semibold border-0 py-3"
                            style={{ width: "10%" }}
                          >
                            Cancel
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order, index) => {
                          const disabled = isOrderDisabled(order);

                          return (
                            <tr
                              key={order.id}
                              className={`align-middle border-bottom ${
                                disabled ? "table-secondary opacity-50" : ""
                              }`}
                              style={{
                                cursor: disabled ? "not-allowed" : "pointer",
                                filter: disabled ? "grayscale(50%)" : "none",
                              }}
                              onClick={
                                disabled
                                  ? undefined
                                  : () => onOrderSelect(order)
                              }
                              onMouseEnter={(e) => {
                                if (!disabled) {
                                  e.currentTarget.style.backgroundColor =
                                    "#f8f9fa";
                                  e.currentTarget.style.transform =
                                    "scale(1.01)";
                                  e.currentTarget.style.transition =
                                    "all 0.2s ease";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!disabled) {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.transform = "scale(1)";
                                }
                              }}
                            >
                              <td className="py-3">
                                <div className="d-flex align-items-center">
                                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                                    <i className="icon-ticket text-primary"></i>
                                  </div>
                                  <div>
                                    <strong
                                      className="text-primary d-block"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      {order.booking_id}
                                    </strong>
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
                                    )} d-flex align-items-center justify-content-center mb-1 text-dark`}
                                    style={{
                                      width: "90px",
                                      padding: "6px",
                                      fontSize: "10px",
                                    }}
                                  >
                                    <i
                                      className={getStatusIcon(order.status)}
                                    ></i>
                                    {order.status.charAt(0).toUpperCase() +
                                      order.status.slice(1)}
                                  </span>
                                  {order.status === "pending" && !disabled && (
                                    <small
                                      className="text-primary fw-semibold"
                                      style={{ fontSize: "9px" }}
                                    >
                                      <i className="icon-hand me-1"></i>
                                      Click to pay
                                    </small>
                                  )}
                                </div>
                              </td>
                              <td className="py-3">
                                <div className="d-flex align-items-center">
                                  <i className="icon-globe text-primary me-2"></i>
                                  <div style={{ maxWidth: "180px" }}>
                                    <strong
                                      title={order.tourName}
                                      className="d-block text-truncate"
                                    >
                                      {order.tourName}
                                    </strong>
                                    <small className="text-muted d-block text-truncate">
                                      {order.selectedTime} • ${order.totalPrice}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 text-center">
                                <div className="d-flex align-items-center justify-content-center">
                                  <div className="bg-info bg-opacity-10 rounded-circle p-1 me-1">
                                    <i
                                      className="icon-users text-info"
                                      style={{ fontSize: "12px" }}
                                    ></i>
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
                                    <strong
                                      className="d-block"
                                      style={{ fontSize: "13px" }}
                                    >
                                      {new Date(
                                        order.selectedDate
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </strong>
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
                                <div className="text-success fw-bold">
                                  <span style={{ fontSize: "14px" }}>
                                    {order.totalPrice.toLocaleString()}
                                  </span>
                                </div>
                                <small className="text-muted">USD</small>
                              </td>
                              <td className="py-3 text-center">
                                {disabled ? (
                                  <span className="text-muted">-</span>
                                ) : (
                                  <ChangeDateButtonOrStatus
                                    order={order}
                                    isDesktop={true}
                                  />
                                )}
                              </td>
                              <td className="py-3 text-center">
                                <CancelButtonOrStatus
                                  order={order}
                                  isDesktop={true}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Cancellation Modal - Only show if no active cancellation request and not disabled */}
      {selectedOrderForCancel &&
        !hasActiveCancellationRequest(selectedOrderForCancel) &&
        !isOrderDisabled(selectedOrderForCancel) && (
          <CancellationModal
            order={selectedOrderForCancel}
            onClose={() => setSelectedOrderForCancel(null)}
            onCancel={handleCancelSubmit}
          />
        )}

      {/* Change Date Modal - Only show if no active date change request and not disabled */}
      {selectedOrderForDateChange &&
        !hasActiveDateChangeRequest(selectedOrderForDateChange) &&
        !isOrderDisabled(selectedOrderForDateChange) && (
          <ChangeDate
            isOpen={!!selectedOrderForDateChange}
            onClose={() => setSelectedOrderForDateChange(null)}
            order={selectedOrderForDateChange}
            onDateChange={handleDateChangeSubmit}
          />
        )}
    </>
  );
}
