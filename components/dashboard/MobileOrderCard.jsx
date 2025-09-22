import React from "react";

// Component to render cancel button or status
const CancelButtonOrStatus = ({
  order,
  onCancelClick,
  getCancellationRequestStatus,
  canCancelOrder,
  isOrderDisabled,
}) => {
  const statusInfo = getCancellationRequestStatus(order);

  if (statusInfo.showStatus) {
    return (
      <div className="d-flex align-items-center justify-content-center">
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
        onClick={(e) => onCancelClick(order, e)}
        title="Cancel booking"
        style={{
          fontSize: "12px",
          padding: "6px 12px",
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
const ChangeDateButtonOrStatus = ({
  order,
  onDateChangeClick,
  getDateChangeRequestStatus,
  canChangeDate,
  isOrderDisabled,
}) => {
  const statusInfo = getDateChangeRequestStatus(order);

  if (statusInfo.showStatus) {
    return (
      <div className="d-flex align-items-center justify-content-center">
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
        onClick={(e) => onDateChangeClick(order, e)}
        title="Change booking date"
        style={{
          fontSize: "12px",
          padding: "6px 12px",
        }}
      >
        <i className="icon-calendar me-1"></i>
        Change Date
      </button>
    );
  }

  return <span className="text-muted">-</span>;
};

export default function MobileOrderCard({
  order,
  onOrderSelect,
  onCancelClick,
  onDateChangeClick,
  getStatusIcon,
  getStatusColor,
  getCancellationRequestStatus,
  getDateChangeRequestStatus,
  canCancelOrder,
  canChangeDate,
  isOrderDisabled,
}) {
  const disabled = isOrderDisabled(order);

  return (
    <div
      className={`mobile-order-card ${disabled ? "opacity-50" : ""}`}
      onClick={disabled ? undefined : () => onOrderSelect(order)}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        filter: disabled ? "grayscale(50%)" : "none",
        marginBottom: "1rem",
        border: "1px solid #dee2e6",
        borderRadius: "0.5rem",
        backgroundColor: "#fff",
        boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
      }}
    >
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          padding: "0.75rem 1rem",
        }}
      >
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
            <ChangeDateButtonOrStatus
              order={order}
              onDateChangeClick={onDateChangeClick}
              getDateChangeRequestStatus={getDateChangeRequestStatus}
              canChangeDate={canChangeDate}
              isOrderDisabled={isOrderDisabled}
            />
          )}
        </div>
      </div>
      <div className="card-body" style={{ padding: "1rem" }}>
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
                  <CancelButtonOrStatus
                    order={order}
                    onCancelClick={onCancelClick}
                    getCancellationRequestStatus={getCancellationRequestStatus}
                    canCancelOrder={canCancelOrder}
                    isOrderDisabled={isOrderDisabled}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
