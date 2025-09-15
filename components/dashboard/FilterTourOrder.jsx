import React from "react";

export default function FilterTourOrder({
  filters,
  onFiltersChange,
  getStatusCount,
  orderDataLength,
  filteredOrdersLength,
}) {
  const handleStatusChange = (status) => {
    onFiltersChange({ ...filters, status });
  };

  const handleDateFromChange = (dateFrom) => {
    onFiltersChange({ ...filters, dateFrom });
  };

  const handleDateToChange = (dateTo) => {
    onFiltersChange({ ...filters, dateTo });
  };

  const handleSearchTermChange = (searchTerm) => {
    onFiltersChange({ ...filters, searchTerm });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: "all",
      dateFrom: "",
      dateTo: "",
      searchTerm: "",
    });
  };

  return (
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
                onClick={() => handleStatusChange("all")}
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
                onClick={() => handleStatusChange("paid")}
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
                onClick={() => handleStatusChange("pending")}
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
                onClick={() => handleStatusChange("cancelled")}
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
              className="form-control border"
              style={{ borderColor: "#3554d1" }}
              value={filters.dateFrom}
              onChange={(e) => handleDateFromChange(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label text-primary fw-semibold">
              <i className="icon-calendar me-2"></i>
              To Date
            </label>
            <input
              type="date"
              className="form-control border"
              style={{ borderColor: "#3554d1" }}
              value={filters.dateTo}
              onChange={(e) => handleDateToChange(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label text-primary fw-semibold">
              <i className="icon-search me-2"></i>
              Search Tours
            </label>
            <input
              type="text"
              className="form-control border"
              style={{ borderColor: "#3554d1" }}
              placeholder="Search by ID, tour, or customer..."
              value={filters.searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <button
              className="btn btn-outline-secondary me-2 btn-sm"
              onClick={clearFilters}
            >
              <i className="icon-refresh-cw me-2"></i>
              Clear Filters
            </button>
            <span className="text-muted">
              <i className="icon-info me-1"></i>
              Showing {filteredOrdersLength} of {orderDataLength} bookings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
