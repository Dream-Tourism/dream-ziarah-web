"use client";

export default function SupportTickets() {
  return (
    <div>
      <h2 className="mb-4 text-primary">Support Tickets</h2>
      <div className="card border-0 shadow">
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#3554d1" }}
        >
          <h5 className="mb-0">
            <i className="fas fa-headset me-2"></i>
            Support Ticket Management
          </h5>
        </div>
        <div className="card-body text-center py-5">
          <i className="fas fa-headset fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">Support Tickets</h4>
          <p className="text-muted">
            Support ticket management functionality will be implemented here.
          </p>
          <button
            className="btn text-white"
            style={{ backgroundColor: "#3554d1" }}
          >
            <i className="fas fa-plus me-2"></i>
            Create New Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
