"use client";

import { useState, useEffect } from "react";

const Participants = ({
  onParticipantChange,
  maxParticipants = 1,
  hasError = false,
}) => {
  const [participantCount, setParticipantCount] = useState(1);

  useEffect(() => {
    // Set initial value and notify parent
    if (onParticipantChange) {
      onParticipantChange(participantCount);
    }
  }, []);

  const handleParticipantCountChange = (e) => {
    const value = Number.parseInt(e.target.value) || 1;
    const clampedValue = Math.min(Math.max(1, value), maxParticipants);
    setParticipantCount(clampedValue);

    // Notify parent component of changes
    if (onParticipantChange) {
      onParticipantChange(clampedValue);
    }
  };

  return (
    <div className="participants-container">
      <div className="mb-3">
        <div
          className="form-control d-flex align-items-center justify-content-between bg-white border-0 rounded"
          style={{
            padding: "12px 16px",
            height: "48px",
            border: hasError ? "2px solid #dc3545" : "none",
          }}
        >
          <div className="d-flex align-items-center">
            <i className="fas fa-users me-2 text-muted"></i>
            <span>Participants</span>
          </div>
          <div className="d-flex align-items-center">
            <input
              type="number"
              className="form-control border-0 bg-transparent text-end fw-bold"
              style={{ width: "80px", minWidth: "60px" }}
              value={participantCount}
              onChange={handleParticipantCountChange}
              min="1"
              max={maxParticipants}
            />
            <span className="text-muted ms-1">/ {maxParticipants}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
