import { useCallback } from "react";

export default function PaginationControls({
  orderData,
  currentPage,
  pageSize,
  loading,
  onPageChange,
  onPageSizeChange,
}) {
  // First check if we have pagination data
  if (!orderData) return null;

  const {
    totalPages = 0,
    totalElements = 0,
    page: currentPageFromData = 1,
  } = orderData;

  // Use the current page from props or fallback to data
  const activePage = currentPage || currentPageFromData;

  // Calculate pagination info
  const startItem = totalElements > 0 ? (activePage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(activePage * pageSize, totalElements);

  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, activePage - 2);
      const endPage = Math.min(totalPages, activePage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const handlePageClick = useCallback(
    (page) => {
      if (page !== activePage && page >= 1 && page <= totalPages && !loading) {
        onPageChange(page);
      }
    },
    [activePage, totalPages, loading, onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (newSize) => {
      if (newSize !== pageSize && !loading) {
        onPageSizeChange(newSize);
      }
    },
    [pageSize, loading, onPageSizeChange]
  );

  // Don't render pagination if there's no data or only one page
  if (!totalElements || totalPages <= 1) {
    return null;
  }

  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-body">
        <div className="row align-items-center">
          {/* Results Info */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="d-flex align-items-center flex-wrap">
              <span className="text-muted me-3">
                <i className="icon-info me-2"></i>
                Showing <strong>{startItem}</strong> to{" "}
                <strong>{endItem}</strong> of <strong>{totalElements}</strong>{" "}
                bookings
              </span>

              {/* Page Size Selector */}
              <div className="d-flex align-items-center">
                <span className="text-muted me-2 small">Show:</span>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "auto", minWidth: "70px" }}
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  disabled={loading}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-md-end justify-content-center align-items-center gap-2">
              {/* Previous Button */}
              <button
                className="btn btn-outline-primary btn-sm d-flex align-items-center"
                onClick={() => handlePageClick(activePage - 1)}
                disabled={activePage <= 1 || loading}
                style={{ minWidth: "80px" }}
              >
                <i className="icon-arrow-left me-1"></i>
                <span className="d-none d-sm-inline">Previous</span>
                <span className="d-sm-none">Prev</span>
              </button>

              {/* Mobile Page Info */}
              <div className="">
                <span className="btn btn-outline-secondary">
                  {activePage} / {totalPages}
                </span>
              </div>

              {/* Desktop Page Numbers */}
              <div className="d-none d-sm-flex align-items-center gap-1">
                {/* First page if not in range */}
                {activePage > 3 && totalPages > 5 && (
                  <>
                    <button
                      className={`btn btn-sm ${
                        activePage === 1 ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => handlePageClick(1)}
                      disabled={loading}
                      style={{ minWidth: "35px" }}
                    >
                      1
                    </button>
                    {activePage > 4 && <span className="text-muted">...</span>}
                  </>
                )}

                {/* Page numbers around current page */}
                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`btn btn-sm ${
                      activePage === pageNum
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => handlePageClick(pageNum)}
                    disabled={loading}
                    style={{ minWidth: "35px" }}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Last page if not in range */}
                {activePage < totalPages - 2 && totalPages > 5 && (
                  <>
                    {activePage < totalPages - 3 && (
                      <span className="text-muted">...</span>
                    )}
                    <button
                      className={`btn btn-sm ${
                        activePage === totalPages
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handlePageClick(totalPages)}
                      disabled={loading}
                      style={{ minWidth: "35px" }}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* Next Button */}
              <button
                className="btn btn-outline-primary btn-sm d-flex align-items-center"
                onClick={() => handlePageClick(activePage + 1)}
                disabled={activePage >= totalPages || loading}
                style={{ minWidth: "80px" }}
              >
                <span className="d-none d-sm-inline">Next</span>
                <span className="d-sm-none">Next</span>
                <i className="icon-arrow-right ms-1"></i>
              </button>

              {/* Quick jump buttons for desktop */}
              <div className="d-none d-lg-flex ms-2 gap-1">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePageClick(1)}
                  disabled={activePage === 1 || loading}
                  title="First page"
                  style={{ minWidth: "35px" }}
                >
                  <i className="icon-chevrons-left"></i>
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePageClick(totalPages)}
                  disabled={activePage === totalPages || loading}
                  title="Last page"
                  style={{ minWidth: "35px" }}
                >
                  <i className="icon-chevrons-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <div className="d-flex align-items-center text-primary">
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <span>Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
