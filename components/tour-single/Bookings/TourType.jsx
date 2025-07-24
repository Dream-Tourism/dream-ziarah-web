"use client";

import { useState } from "react";

const TourType = ({ onTourTypeChange, availableTourTypes = [] }) => {
  const [selectedTourType, setSelectedTourType] = useState(
    availableTourTypes[0]?.guide || ""
  );

  const handleTourTypeChange = (tourType) => {
    setSelectedTourType(tourType);

    // Find the full tour type object
    const tourTypeObject = availableTourTypes.find(
      (type) => type.guide === tourType
    );

    // Notify parent component of changes
    if (onTourTypeChange) {
      onTourTypeChange(tourTypeObject);
    }
  };

  if (availableTourTypes.length === 0) {
    return null;
  }

  return (
    <div className="tour-type-container">
      <div className="mb-3">
        <div
          className="form-control d-flex align-items-center justify-content-between bg-white border-0 rounded"
          style={{ padding: "12px 16px", height: "48px" }}
        >
          <div className="d-flex align-items-center">
            <i className="fas fa-user-tie me-2 text-muted"></i>
            <span>Tour Type</span>
          </div>
          <div className="d-flex align-items-center">
            <select
              className="form-select border-0 bg-transparent text-center fw-bold"
              style={{ width: "auto", minWidth: "120px" }}
              value={selectedTourType}
              onChange={(e) => handleTourTypeChange(e.target.value)}
            >
              {availableTourTypes.map((tourType, index) => (
                <option key={index} value={tourType.guide}>
                  {tourType.guide}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourType;
