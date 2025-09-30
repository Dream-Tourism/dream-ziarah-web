import { useState } from "react";

export default function SupportTicketForm() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    attachments: [],
  });

  const categories = [
    "Technical Issue",
    "Billing",
    "General Inquiry",
    "Feature Request",
    "Bug Report",
  ];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  const handleSubmit = () => {
    console.log("Ticket submitted:", formData);
    alert("Support ticket created successfully!");
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  return (
    <>
      <style>{`
        .ticket-form-container {
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 3rem 1rem;
        }
        .ticket-card {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 2.5rem;
        }
        .ticket-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .ticket-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        .ticket-subtitle {
          color: #6c757d;
          font-size: 0.95rem;
        }
        .form-label {
          font-weight: 500;
          color: #495057;
          margin-bottom: 0.5rem;
        }
        .required {
          color: #dc3545;
        }
        .form-control, .form-select {
          padding: 0.75rem 1rem;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 0.95rem;
        }
        .form-control:focus, .form-select:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.25);
        }
        .upload-area {
          border: 2px dashed #dee2e6;
          border-radius: 6px;
          padding: 3rem 2rem;
          text-align: center;
          background-color: #fafbfc;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .upload-area:hover {
          border-color: #8b5cf6;
          background-color: #f9f7ff;
        }
        .upload-icon {
          font-size: 3rem;
          color: #adb5bd;
          margin-bottom: 1rem;
        }
        .upload-text {
          color: #495057;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        .upload-subtext {
          color: #6c757d;
          font-size: 0.875rem;
        }
        .btn-create {
          background-color: #8b5cf6;
          border-color: #8b5cf6;
          color: white;
          padding: 0.75rem 2rem;
          font-weight: 500;
          border-radius: 6px;
        }
        .btn-create:hover {
          background-color: #7c3aed;
          border-color: #7c3aed;
          color: white;
        }
        .btn-cancel {
          padding: 0.75rem 2rem;
          font-weight: 500;
          border-radius: 6px;
          border: 1px solid #dee2e6;
          background-color: white;
          color: #495057;
        }
        .btn-cancel:hover {
          background-color: #f8f9fa;
        }
        .file-list-item {
          background-color: #f8f9fa;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #495057;
        }
        .priority-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .priority-badge.active {
          background-color: #8b5cf6;
          color: white;
        }
        .priority-badge:hover {
          background-color: #e9ecef;
        }
        .priority-badge.active:hover {
          background-color: #7c3aed;
        }
      `}</style>

      <div className="ticket-form-container">
        <div className="ticket-card">
          <div className="ticket-header">
            <h1 className="ticket-title">Create Support Ticket</h1>
            <p className="ticket-subtitle">
              Tell us about your issue and we'll help you resolve it quickly
            </p>
          </div>

          <div>
            <div className="mb-4">
              <label className="form-label">
                Subject <span className="required">*</span>
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Brief description of your issue"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">
                  Category <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Priority <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <option value="">Select priority</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Please provide detailed information about your issue. Include steps to reproduce if applicable..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label">Attachments (Optional)</label>
              <div
                className="upload-area"
                onClick={() => document.getElementById("file-upload").click()}
              >
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <div className="upload-icon">☁️</div>
                <p className="upload-text mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="upload-subtext mb-0">
                  PNG, JPG, PDF, DOC (MAX. 10MB each)
                </p>
              </div>
              {formData.attachments.length > 0 && (
                <div className="mt-3">
                  {formData.attachments.map((file, idx) => (
                    <div key={idx} className="file-list-item">
                      📎 {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="d-flex gap-3 justify-content-between">
              <button
                className="btn btn-create flex-grow-1"
                onClick={handleSubmit}
              >
                Create Ticket
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => window.history.back()}
              >
                ← Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
