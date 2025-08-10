"use client";

import { useState, useRef, useEffect } from "react";
import CustomDropdown from "./CustomDropdown";

const Participants = ({
  onParticipantChange,
  availableParticipantCounts = [1],
}) => {
  const initial = availableParticipantCounts[0] || 1;
  const [selected, setSelected] = useState(initial);

  const handleChange = (count) => {
    setSelected(count);
    if (onParticipantChange) onParticipantChange(count);
  };

  return (
    <CustomDropdown
      label="Participants"
      icon="icon-twitter"
      value={selected}
      options={availableParticipantCounts}
      onChange={handleChange}
    />
  );
};

export default Participants;
