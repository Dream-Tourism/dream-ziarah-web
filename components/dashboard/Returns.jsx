"use client";

export default function Returns() {
  return (
    <div>
      <h2 className="mb-4 text-primary">Returns</h2>
      <div className="card border-0 shadow">
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#3554d1" }}
        >
          <h5 className="mb-0">
            <i className="fas fa-undo me-2"></i>
            Return Management
          </h5>
        </div>
        <div className="card-body text-center py-5">
          <i className="fas fa-undo fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">Return Management</h4>
          <p className="text-muted">
            Return management functionality will be implemented here.
          </p>
          <button
            className="btn text-white"
            style={{ backgroundColor: "#3554d1" }}
          >
            <i className="fas fa-plus me-2"></i>
            Add Return Request
          </button>
        </div>
      </div>
    </div>
  );
}
