"use client";

import { useState } from "react";

const Participants = ({
  onParticipantChange,
  availableParticipantCounts = [1],
}) => {
  const [participantCount, setParticipantCount] = useState(
    availableParticipantCounts[0] || 1
  );

  const handleParticipantCountChange = (count) => {
    const newCount = Number.parseInt(count);
    setParticipantCount(newCount);

    // Notify parent component of changes
    if (onParticipantChange) {
      onParticipantChange(newCount);
    }
  };

  return (
    <div className="participants-container">
      <div className="mb-3">
        <div
          className="form-control d-flex align-items-center justify-content-between bg-white border-0 rounded"
          style={{ padding: "12px 16px", height: "48px" }}
        >
          <div className="d-flex align-items-center">
            <i className={`icon-twitter text-14`} />
            <span>Participants</span>
          </div>
          <div className="d-flex align-items-center">
            <select
              className="form-select border-0 bg-transparent text-center fw-bold"
              style={{ width: "auto", minWidth: "60px" }}
              value={participantCount}
              onChange={(e) => handleParticipantCountChange(e.target.value)}
            >
              {availableParticipantCounts.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
