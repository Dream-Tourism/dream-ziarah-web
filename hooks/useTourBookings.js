"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchTourBookings,
  transformBookingData,
} from "@/services/tourBookingService";

export const useTourBookings = (travellerId) => {
  const [bookingData, setBookingData] = useState({
    summary: {
      totalOrders: 0,
      cancelledOrders: 0,
      pendingPayment: 0,
      paidOrders: 0,
    },
    orders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBookings = useCallback(async () => {
    if (!travellerId) return;

    try {
      setLoading(true);
      setError(null);

      const apiResponse = await fetchTourBookings(travellerId);
      const transformedData = transformBookingData(apiResponse);

      setBookingData(transformedData);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load tour bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [travellerId]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const updateBookingStatus = useCallback((bookingId, newStatus) => {
    setBookingData((prev) => {
      const updatedOrders = prev.orders.map((order) =>
        order.id === bookingId ? { ...order, status: newStatus } : order
      );

      // Recalculate summary
      const summary = {
        totalOrders: updatedOrders.length,
        paidOrders: updatedOrders.filter((order) => order.status === "paid")
          .length,
        pendingPayment: updatedOrders.filter(
          (order) => order.status === "pending"
        ).length,
        cancelledOrders: updatedOrders.filter(
          (order) => order.cancellation_status === "approved"
        ).length,
      };

      return {
        summary,
        orders: updatedOrders,
      };
    });
  }, []);

  const refreshBookings = useCallback(() => {
    loadBookings();
  }, [loadBookings]);

  return {
    bookingData,
    loading,
    error,
    updateBookingStatus,
    refreshBookings,
  };
};
