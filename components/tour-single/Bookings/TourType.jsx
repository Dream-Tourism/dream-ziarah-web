"use client";
import { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const TourType = ({ onTourTypeChange, availableTourTypes = [] }) => {
  const initial = availableTourTypes[0]?.guide || "";
  const [selected, setSelected] = useState(initial);

  const handleChange = (tourType) => {
    setSelected(tourType);
    const tourTypeObject = availableTourTypes.find(
      (type) => type.guide === tourType
    );
    if (onTourTypeChange) onTourTypeChange(tourTypeObject);
  };

  if (availableTourTypes.length === 0) return null;

  return (
    <CustomDropdown
      label="Tour Type"
      icon="icon-twitter"
      value={selected}
      options={availableTourTypes.map((t) => t.guide)}
      onChange={handleChange}
    />
  );
};

export default TourType;
