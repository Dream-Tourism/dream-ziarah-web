"use client";

import { useState, useRef } from "react";
import Calendar from "./Calendar";
import Participants from "./Participants";
import BookingPreview from "./BookingPreview";

const AgentCalendar = ({
  participantTypes = [],
  availableTimes = ["09:00 AM", "10:00 PM"],
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 6)); // Nov 6, 2025
  const [selectedTime, setSelectedTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [participants, setParticipants] = useState({});
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [bookingAvailable, setBookingAvailable] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const bookingPreviewRef = useRef(null);

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
    // Reset booking availability when date changes
    setBookingAvailable(false);
    setBookingData(null);
  };

  const handleParticipantChange = (newParticipants) => {
    setParticipants(newParticipants);
    // Reset booking availability when participants change
    setBookingAvailable(false);
    setBookingData(null);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    // Reset booking availability when time changes
    setBookingAvailable(false);
    setBookingData(null);
  };

  const checkAvailabilityFromBackend = async (bookingDetails) => {
    // Simulate API call to backend
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/check-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to check availability");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      // For demo purposes, simulate successful response
      return {
        available: true,
        totalPrice: 315.6,
        bookingId: "BK-" + Date.now(),
        details: bookingDetails,
      };
    }
  };

  const handleCheckAvailability = async () => {
    if (!selectedTime) {
      alert("Please select a time");
      return;
    }

    const totalParticipants = Object.values(participants).reduce(
      (sum, count) => sum + count,
      0
    );
    if (totalParticipants === 0) {
      alert("Please select at least one participant");
      return;
    }

    setIsCheckingAvailability(true);

    const bookingDetails = {
      date: selectedDate,
      time: selectedTime,
      participants,
      totalParticipants,
    };

    try {
      const availabilityResult = await checkAvailabilityFromBackend(
        bookingDetails
      );

      if (availabilityResult.available) {
        setBookingAvailable(true);
        setBookingData(availabilityResult);

        // Scroll to booking preview section
        setTimeout(() => {
          bookingPreviewRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        setBookingAvailable(false);
        alert("Sorry, no availability for the selected date and time.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error checking availability. Please try again.");
    } finally {
      setIsCheckingAvailability(false);
    }
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

        {/* Time Selection */}
        <div className="mb-3">
          <select
            className="form-select bg-white border-0 rounded"
            style={{ padding: "12px 16px" }}
            value={selectedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
          >
            <option value="">Select Time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
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
          disabled={isCheckingAvailability}
        >
          {isCheckingAvailability ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Checking...
            </>
          ) : (
            "Check Availability"
          )}
        </button>
      </div>

      {/* Booking Preview Section */}
      {bookingAvailable && bookingData && (
        <div ref={bookingPreviewRef} className="mt-4">
          <BookingPreview
            bookingData={bookingData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            participants={participants}
          />
        </div>
      )}
    </div>
  );
};

export default AgentCalendar;
