// src/hooks/useTourBookingID.js

import { fetchBookingByUUID } from "@/services/tourBookingService";
import { useEffect, useState } from "react";

const useTourBookingUUID = (bookingId) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingId) return;

    const getBooking = async () => {
      try {
        setLoading(true);
        const data = await fetchBookingByUUID(bookingId);
        setBooking(data);
      } catch (err) {
        setError(err.message || "Failed to fetch booking");
      } finally {
        setLoading(false);
      }
    };

    getBooking();
  }, [bookingId]);

  return { booking, loading, error };
};

export default useTourBookingUUID;
