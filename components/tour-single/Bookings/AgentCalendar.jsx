"use client";

import { useState } from "react";
import Calendar from "./Calendar";
import Participants from "./Participants";

const AgentCalendar = ({ participantTypes = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 6)); // Nov 6, 2025
  const [showCalendar, setShowCalendar] = useState(false);
  const [participants, setParticipants] = useState({});

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleParticipantChange = (newParticipants) => {
    setParticipants(newParticipants);
  };

  const handleCheckAvailability = () => {
    console.log("Checking availability for:", {
      date: selectedDate,
      participants,
    });
    // Add your availability check logic here
  };

  return (
    <div className="bg-white">
      {/* Price Section */}
      <div className="p-3 border-bottom">
        <small className="text-muted">From</small>
        <h4 className="mb-0 fw-bold">$52.60</h4>
      </div>

      {/* Booking Form */}
      <div className="p-3" style={{ backgroundColor: "#3554d1" }}>
        <h5 className="text-white mb-3 fw-bold">Select date & participants</h5>

        {/* Date Selection */}
        <div className="mb-3 position-relative">
          <div
            className="form-control d-flex align-items-center bg-white border-0 rounded"
            style={{ cursor: "pointer", padding: "12px 16px" }}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <i className="fas fa-calendar-alt me-2 text-muted"></i>
            <span className="flex-grow-1">{formatDate(selectedDate)}</span>
          </div>

          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onClose={() => setShowCalendar(false)}
            isVisible={showCalendar}
          />
        </div>

        {/* Participants Selection */}
        <Participants
          participantTypes={participantTypes}
          onParticipantChange={handleParticipantChange}
        />

        {/* Check Availability Button */}
        <button
          className="btn w-100 fw-bold text-dark border-0 rounded"
          style={{
            backgroundColor: "#ffa500",
            padding: "12px 16px",
            fontSize: "16px",
          }}
          onClick={handleCheckAvailability}
        >
          Check Availability
        </button>
      </div>
    </div>
  );
};

export default AgentCalendar;
