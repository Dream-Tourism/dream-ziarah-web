"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from "./Calendar";
import TourType from "./TourType";
import Participants from "./Participants";
import BookingPreview from "./BookingPreview";
import CustomDropdown from "./CustomDropdown";

const AgentCalendar = ({ tourData = null }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTourType, setSelectedTourType] = useState(null);
  const [participantCount, setParticipantCount] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [bookingAvailable, setBookingAvailable] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableParticipantCounts, setAvailableParticipantCounts] = useState(
    []
  );
  const [isMobile, setIsMobile] = useState(false);

  const bookingPreviewRef = useRef(null);
  const dateButtonRef = useRef(null);
  // console.log("tour", tourData);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use provided tourData or sample data
  const priceList = tourData?.day_tour_price_list;

  // Get unique tour types
  const getUniqueTourTypes = () => {
    const uniqueGuides = [...new Set(priceList.map((item) => item.guide))];
    return uniqueGuides.map((guide) => {
      const firstMatch = priceList.find((item) => item.guide === guide);
      return {
        guide: firstMatch.guide,
        // You can add more properties here if needed
      };
    });
  };

  // Initialize tour types and set first one as default
  useEffect(() => {
    const tourTypes = getUniqueTourTypes();
    if (tourTypes.length > 0 && !selectedTourType) {
      setSelectedTourType(tourTypes[0]);
    }
  }, [priceList]);

  // Update available participant counts when tour type changes
  useEffect(() => {
    if (selectedTourType) {
      const filteredOptions = priceList.filter(
        (option) => option.guide === selectedTourType.guide
      );
      const participantCounts = filteredOptions.map((option) =>
        Number.parseInt(option.person)
      );
      const uniqueCounts = [...new Set(participantCounts)].sort(
        (a, b) => a - b
      );

      setAvailableParticipantCounts(uniqueCounts);

      // Set first available participant count as default
      if (uniqueCounts.length > 0) {
        setParticipantCount(uniqueCounts[0]);
      }
    }
  }, [selectedTourType, priceList]);

  // Update available times and dates when tour type and participant count change
  useEffect(() => {
    if (selectedTourType && participantCount) {
      const matchingOption = priceList.find(
        (option) =>
          option.guide === selectedTourType.guide &&
          Number.parseInt(option.person) === participantCount
      );

      if (matchingOption) {
        setAvailableTimes(matchingOption.available_times);
        setAvailableDates(
          matchingOption.available_dates.map((date) => new Date(date))
        );
      } else {
        setAvailableTimes([]);
        setAvailableDates([]);
      }

      // Reset selections when options change
      setSelectedTime("");
      setSelectedDate(null);
      setBookingAvailable(false);
      setBookingData(null);
    }
  }, [selectedTourType, participantCount, priceList]);

  // Scroll when calendar opens on desktop
  useEffect(() => {
    if (showCalendar && !isMobile) {
      setTimeout(() => {
        if (dateButtonRef.current) {
          dateButtonRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  }, [showCalendar, isMobile]);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const isDateAvailable = (date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );
  };

  const handleTourTypeChange = (tourType) => {
    setSelectedTourType(tourType);
  };

  const handleParticipantChange = (newCount) => {
    setParticipantCount(newCount);
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setShowCalendar(false);
      // Reset booking availability when date changes
      setBookingAvailable(false);
      setBookingData(null);
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    // Reset booking availability when time changes
    setBookingAvailable(false);
    setBookingData(null);
  };

  const getCurrentPriceOption = () => {
    if (!selectedTourType || !participantCount) return null;

    return priceList.find(
      (option) =>
        option.guide === selectedTourType.guide &&
        Number.parseInt(option.person) === participantCount
    );
  };

  const calculateTotalPrice = () => {
    const currentOption = getCurrentPriceOption();
    if (!currentOption) return 0;
    return Number.parseFloat(currentOption.price) * participantCount;
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
        totalPrice: calculateTotalPrice(),
        bookingId: "BK-" + Date.now(),
        details: bookingDetails,
        priceOption: getCurrentPriceOption(),
      };
    }
  };

  const handleCheckAvailability = async () => {
    if (!selectedTourType) {
      alert("Please select a tour type");
      return;
    }

    if (!participantCount) {
      alert("Please select number of participants");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time");
      return;
    }

    setIsCheckingAvailability(true);

    const currentPriceOption = getCurrentPriceOption();
    const totalPrice = calculateTotalPrice();

    const bookingDetails = {
      tourType: selectedTourType,
      participantCount,
      date: selectedDate,
      time: selectedTime,
      totalPrice,
      priceOption: currentPriceOption,
      pricePerPerson: Number.parseFloat(currentPriceOption.price),
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

  const currentPriceOption = getCurrentPriceOption();
  const totalPrice = calculateTotalPrice();

  return (
    <div className="bg-white">
      {/* Price Section */}
      <div
        className="p-3 border-bottom mb-1"
        style={{
          padding: "12px 16px 30px", // added bottom padding: 20px
          height: "auto",
          borderTop: "3px solid #007bff", // keep the blue top border
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // subtle shadow
        }}
      >
        <small className="text-muted">From</small>
        <h4 className="mb-0 fw-bold">
          $
          {currentPriceOption
            ? Number.parseFloat(currentPriceOption.price).toFixed(2)
            : "0.00"}
        </h4>
        {currentPriceOption && (
          <small className="text-muted">
            per person • {currentPriceOption.guide} • Up to{" "}
            {currentPriceOption.person} people
          </small>
        )}
      </div>

      {/* Booking Form */}
      <div className="p-3" style={{ backgroundColor: "#3554d1" }}>
        <h5 className="text-white mb-3 fw-bold">Select date & participants</h5>

        {/* Tour Type Selection */}
        <TourType
          onTourTypeChange={handleTourTypeChange}
          availableTourTypes={getUniqueTourTypes()}
        />

        {/* Participants Selection */}
        <Participants
          onParticipantChange={handleParticipantChange}
          availableParticipantCounts={availableParticipantCounts}
        />

        {/* Date Selection */}
        <div className="mb-3 position-relative" ref={dateButtonRef}>
          <div
            className="form-control d-flex align-items-center bg-white border-0 rounded"
            style={{
              cursor: "pointer",
              padding: "12px 16px",
              height: "48px",
              width: "100%",
              minWidth: isMobile ? "auto" : "280px",
            }}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <i className={`icon-twitter text-14 me-2`} />
            <span
              className="flex-grow-1"
              style={{ fontSize: isMobile ? "14px" : "16px" }}
            >
              {selectedDate ? formatDate(selectedDate) : "Select Date"}
            </span>
            <i
              className={`icon-chevron-${
                showCalendar ? "up" : "down"
              } text-muted ms-2`}
            ></i>
          </div>

          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onClose={() => setShowCalendar(false)}
            isVisible={showCalendar}
            availableDates={availableDates}
            isDateAvailable={isDateAvailable}
          />
        </div>

        {/* Time Selection */}
        <CustomDropdown
          label="Select Time"
          icon="icon-twitter"
          value={selectedTime}
          options={availableTimes}
          onChange={handleTimeChange}
        />

        {/* Price Display */}
        {currentPriceOption && participantCount && (
          <div className="mb-3 p-3 bg-white bg-opacity-10 rounded">
            <div className="d-flex justify-content-between text-black">
              <span>
                {participantCount} × $
                {Number.parseFloat(currentPriceOption.price).toFixed(2)}
              </span>
              <span className="fw-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <small className="text-black-50">{currentPriceOption.guide}</small>
          </div>
        )}

        {/* Check Availability Button */}
        <button
          className="btn w-100 fw-bold text-dark border-0 rounded"
          style={{
            backgroundColor: "#ffa500",
            padding: "12px 16px",
            fontSize: isMobile ? "14px" : "16px",
            height: "48px",
          }}
          onClick={handleCheckAvailability}
          disabled={isCheckingAvailability || !currentPriceOption}
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
            tourId={tourData?.id}
            bookingData={bookingData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedTourType={selectedTourType}
            participantCount={participantCount}
            totalPrice={totalPrice}
            priceOption={currentPriceOption}
            tourName={tourData?.name}
          />
        </div>
      )}
    </div>
  );
};

export default AgentCalendar;
