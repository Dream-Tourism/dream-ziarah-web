"use client";

export default function SupportTickets() {
  return (
    <div style={{ marginTop: "120px" }}>
      <div className="d-flex align-items-center mb-4">
        <i className="fas fa-life-ring fa-2x text-primary me-3"></i>
        <div>
          <h2 className="mb-0 text-primary">Support Center</h2>
          <p className="text-muted mb-0">
            Assist travelers with their inquiries
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-lg">
        <div
          className="card-header text-white position-relative overflow-hidden"
          style={{ backgroundColor: "#3554d1" }}
        >
          <div className="position-absolute top-0 end-0 opacity-25">
            <i className="fas fa-comments fa-4x"></i>
          </div>
          <h5 className="mb-0 position-relative">
            <i className="fas fa-ticket-alt me-2"></i>
            Support Tickets
          </h5>
        </div>
        <div className="card-body text-center py-5">
          <i className="fas fa-headset fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">All Caught Up!</h4>
          <p className="text-muted">No pending support tickets at the moment</p>
          <button
            className="btn text-white bg-blue-1"
           
          >
            <i className="fas fa-plus me-2"></i>
            Create Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
