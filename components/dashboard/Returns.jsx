"use client";

export default function Returns() {
  return (
    <div style={{ marginTop: "120px" }}>
      <div className="d-flex align-items-center mb-4">
        <i className="fas fa-undo-alt fa-2x text-primary me-3"></i>
        <div>
          <h2 className="mb-0 text-primary">Return Management</h2>
          <p className="text-muted mb-0">
            Handle tour cancellations and refunds
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-lg">
        <div
          className="card-header text-white position-relative overflow-hidden"
          style={{ backgroundColor: "#3554d1" }}
        >
          <div className="position-absolute top-0 end-0 opacity-25">
            <i className="fas fa-plane fa-4x"></i>
          </div>
          <h5 className="mb-0 position-relative">
            <i className="fas fa-clipboard-list me-2"></i>
            Return Requests
          </h5>
        </div>
        <div className="card-body text-center py-5">
          <i className="fas fa-suitcase-rolling fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">No Return Requests</h4>
          <p className="text-muted">
            All travelers are enjoying their adventures!
          </p>
          <button
            className="btn text-white"
            style={{ backgroundColor: "#3554d1" }}
          >
            <i className="fas fa-plus me-2"></i>
            Process New Return
          </button>
        </div>
      </div>
    </div>
  );
}
