"use client";

import { useState } from "react";

const Calendar = ({
  selectedDate,
  onDateSelect,
  onClose,
  isVisible,
  availableDates = [],
  isDateAvailable,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6)); // July 2025

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      if (isDateAvailable && isDateAvailable(newDate)) {
        onDateSelect(newDate);
        onClose();
      }
    }
  };

  const days = getDaysInMonth(currentMonth);
  const selectedDay =
    selectedDate &&
    selectedDate.getMonth() === currentMonth.getMonth() &&
    selectedDate.getFullYear() === currentMonth.getFullYear()
      ? selectedDate.getDate()
      : null;

  if (!isVisible) return null;

  return (
    <div
      className="position-absolute bg-white border rounded shadow-lg p-3"
      style={{
        top: "100%",
        left: "0",
        zIndex: 1000,
        width: "420px",
        marginTop: "5px",
      }}
    >
      {/* Calendar Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-link p-0 text-decoration-none"
          onClick={handlePrevMonth}
          type="button"
        >
          <i className="icon icon-chevron-left"></i>
        </button>
        <h6 className="mb-0 fw-bold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h6>
        <button
          className="btn btn-link p-0 text-decoration-none"
          onClick={handleNextMonth}
          type="button"
        >
          <i className="icon icon-chevron-right"></i>
        </button>
      </div>

      {/* Day Names */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {dayNames.map((day) => (
          <div key={day} className="text-center fw-bold text-muted">
            <small>{day}</small>
          </div>
        ))}
      </div>
      {/* Calendar Days */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {days.map((day, index) => {
          if (!day) {
            return (
              <div key={index} className="col p-1">
                <div style={{ minHeight: "35px" }}></div>
              </div>
            );
          }

          const currentDate = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const isAvailable = isDateAvailable
            ? isDateAvailable(currentDate)
            : true;
          const isSelected = day === selectedDay;

          return (
            <div key={index} className="col p-1">
              <button
                className={`btn w-100 p-2 border-0 ${
                  isSelected
                    ? "btn-primary text-white"
                    : isAvailable
                    ? "btn-light text-dark hover-bg-light"
                    : "btn-light text-muted"
                }`}
                onClick={() => handleDateClick(day)}
                type="button"
                disabled={!isAvailable}
                style={{
                  minHeight: "35px",
                  opacity: isAvailable ? 1 : 0.5,
                  fontSize: isAvailable ? "15px" : "14px",
                  fontWeight: isAvailable ? "bold" : "normal",
                }}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
