"use client";

import { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropdown";

const Participants = ({
  onParticipantChange,
  availableParticipantCounts = [],
}) => {
  const [selected, setSelected] = useState(null);

  // Set initial value when availableParticipantCounts changes
  useEffect(() => {
    if (availableParticipantCounts.length > 0) {
      setSelected(availableParticipantCounts[0]);
    }
  }, [availableParticipantCounts]);

  const handleChange = (count) => {
    setSelected(count);
    if (onParticipantChange) onParticipantChange(count);
  };

  return (
    <CustomDropdown
      label="Participants"
      icon="icon-twitter"
      value={selected ?? ""}
      options={availableParticipantCounts}
      onChange={handleChange}
    />
  );
};

export default Participants;
