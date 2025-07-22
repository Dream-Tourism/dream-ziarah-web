"use client";

import { useState } from "react";

const Participants = ({ participantTypes = [], onParticipantChange }) => {
  const [participants, setParticipants] = useState({});

  // Default participant types if none provided
  const defaultParticipantTypes = [
    {
      id: "adult",
      label: "Adult (12-99)",
      icon: "fas fa-user",
      minCount: 0,
      maxCount: 10,
      defaultCount: 0,
    },
    {
      id: "youth",
      label: "Youth (6-11)",
      icon: "fas fa-user",
      minCount: 0,
      maxCount: 10,
      defaultCount: 0,
    },
    {
      id: "child",
      label: "Child (0-5)",
      icon: "fas fa-user",
      minCount: 0,
      maxCount: 10,
      defaultCount: 0,
    },
  ];

  // Use provided participant types or default ones
  const availableTypes =
    participantTypes.length > 0 ? participantTypes : defaultParticipantTypes;

  // Filter out participant types that have no data or are disabled
  const visibleParticipantTypes = availableTypes.filter((type) => {
    // Only show if the type is enabled and has valid configuration
    return type && (type.maxCount > 0 || type.available !== false);
  });

  // Initialize participants state
  useState(() => {
    const initialParticipants = {};
    visibleParticipantTypes.forEach((type) => {
      initialParticipants[type.id] = type.defaultCount || 0;
    });
    setParticipants(initialParticipants);
  }, []);

  const handleParticipantCountChange = (typeId, count) => {
    const newParticipants = {
      ...participants,
      [typeId]: Number.parseInt(count),
    };
    setParticipants(newParticipants);

    // Notify parent component of changes
    if (onParticipantChange) {
      onParticipantChange(newParticipants);
    }
  };

  // Don't render anything if no participant types are available
  if (visibleParticipantTypes.length === 0) {
    return null;
  }

  return (
    <div className="participants-container">
      {visibleParticipantTypes.map((type) => (
        <div key={type.id} className="mb-3">
          <div
            className="form-control d-flex align-items-center justify-content-between bg-white border-0 rounded"
            style={{ padding: "12px 16px" }}
          >
            <div className="d-flex align-items-center">
              <i className={`${type.icon} me-2 text-muted`}></i>
              <span>{type.label}</span>
            </div>
            <div className="d-flex align-items-center">
              <select
                className="form-select border-0 bg-transparent text-end fw-bold"
                style={{ width: "auto", minWidth: "60px" }}
                value={participants[type.id] || 0}
                onChange={(e) =>
                  handleParticipantCountChange(type.id, e.target.value)
                }
              >
                {Array.from(
                  { length: (type.maxCount || 10) - (type.minCount || 0) + 1 },
                  (_, i) => i + (type.minCount || 0)
                ).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Participants;
