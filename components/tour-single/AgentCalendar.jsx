"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./calendar.module.css";
// import useFilterTours from "@/hooks/useFilterTours";
import { useSelector } from "react-redux";
import convertCurrency from "@/utils/currency";

const AgentCalendar = ({
  tourSlug,
  busId,
  availableDates,
  price,
  adultPrice,
  childPrice,
  youthPrice,
  data,
  data2,
}) => {
  const realPrice = price;
  const realAdultPrice = adultPrice;
  const realChildPrice = childPrice;
  const realYouthPrice = youthPrice;
  const searchParams = useSearchParams();
  const search = searchParams.get("location");
  const agentRef = searchParams.get("agentRef");
  // const tourItems = useFilterTours(search || "Home");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [participants, setParticipants] = useState({
    child: 0,
    adult: 1,
    youth: 0,
  });
  const [matchedTourData, setMatchedTourData] = useState(null);
  const [isValidBooking, setIsValidBooking] = useState(false);
  const { currentCurrency, exchangeRates } = useSelector(
    (state) => state?.currency
  );
  console.log("currentCurrency", currentCurrency);

  // Convert prices
  const convertedPrice = convertCurrency(
    price,
    "GBP",
    currentCurrency.currency,
    exchangeRates
  );
  const convertedAdultPrice = convertCurrency(
    adultPrice,
    "GBP",
    currentCurrency.currency,
    exchangeRates
  );
  const convertedChildPrice = convertCurrency(
    childPrice,
    "GBP",
    currentCurrency.currency,
    exchangeRates
  );
  const convertedYouthPrice = convertCurrency(
    youthPrice,
    "GBP",
    currentCurrency.currency,
    exchangeRates
  );

  // useEffect(() => {
  //   const matchedTour = tourItems.find((tour) => tour.title === data2.name);
  //   if (matchedTour) {
  //     setMatchedTourData(matchedTour.slideImg[0]);
  //   }
  // }, [tourItems, data2.name]);

  const tourName = data?.name || "Tour Name Not Available";

  const handleParticipantChange = (counts) => {
    setParticipants(counts);
  };

  const handleDateSelection = (selection) => {
    setSelectedDate(selection.date);
    setSelectedTime(selection.time);
  };

  const parsedAvailableDates = availableDates
    ? availableDates.map((dateStr) => new Date(dateStr))
    : [];

  // Validate booking requirements
  useEffect(() => {
    const hasValidDate = !!selectedDate;
    const hasValidTime = !!selectedTime;

    setIsValidBooking(hasValidDate && hasValidTime);

    // Debug logging
    // console.log("Validation in AgentCalendar:", {
    //   isMinParticipantsMet,
    //   isMaxParticipantsExceeded,
    //   hasValidDate,
    //   hasValidTime,
    //   hasValidPrice,
    //   isValidBooking:
    //     isMinParticipantsMet &&
    //     !isMaxParticipantsExceeded &&
    //     hasValidDate &&
    //     hasValidTime &&
    //     hasValidPrice,
    // });
  }, [selectedDate, selectedTime]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col px-0">
          <div className={styles.bookingColumn}>
            <div className={styles.section}>
              <h1>perticipants</h1>
              {/* <Participants
                onCountChange={handleParticipantChange}
                adultPrice={convertedAdultPrice}
                childPrice={convertedChildPrice}
                youthPrice={convertedYouthPrice}
                currentCurrency={currentCurrency}
              /> */}
            </div>
            <div className={styles.section}>
              <h1>Choose Date</h1>
              {/* <ChooseDate
                onSelectionComplete={handleDateSelection}
                availableDates={parsedAvailableDates}
                price={convertedPrice}
                currentCurrency={currentCurrency}
              /> */}
            </div>
            <div className={styles.section}>
              <h1>Booking Calender</h1>
              {/* <BookingSummary
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                participants={participants}
                adultPrice={convertedAdultPrice}
                childPrice={convertedChildPrice}
                youthPrice={convertedYouthPrice}
                tourName={tourName}
                busId={busId}
                duration={data2.duration}
                tourImage={matchedTourData}
                tourID={data2.id}
                agentRef={agentRef}
                currentCurrency={currentCurrency}
                realPrice={realPrice}
                realAdultPrice={realAdultPrice}
                realChildPrice={realChildPrice}
                realYouthPrice={realYouthPrice}
                isValidBooking={isValidBooking}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCalendar;
