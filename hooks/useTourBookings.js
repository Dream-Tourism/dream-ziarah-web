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
    // Pagination data
    page: 1,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const loadBookings = useCallback(
    async (page = currentPage, size = pageSize) => {
      if (!travellerId) return;

      try {
        setLoading(true);
        setError(null);

        const apiResponse = await fetchTourBookings(travellerId, page, size);
        console.log("API Response:", apiResponse); // Debug log

        const transformedData = transformBookingData(apiResponse);
        console.log("Transformed Data:", transformedData); // Debug log

        setBookingData(transformedData);
        setCurrentPage(page);
        setPageSize(size);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load tour bookings:", err);
      } finally {
        setLoading(false);
      }
    },
    [travellerId, currentPage, pageSize]
  );

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const updateBookingStatus = useCallback((bookingId, newStatus) => {
    setBookingData((prev) => {
      const updatedOrders = prev.orders.map((order) =>
        order.id === bookingId ? { ...order, status: newStatus } : order
      );

      // Recalculate summary for current page
      const summary = {
        totalOrders: prev.totalElements, // Use totalElements instead of counting current page
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
        ...prev,
        summary,
        orders: updatedOrders,
      };
    });
  }, []);

  const changePage = useCallback(
    async (page, size = pageSize) => {
      if (page !== currentPage || size !== pageSize) {
        await loadBookings(page, size);
      }
    },
    [currentPage, pageSize, loadBookings]
  );

  const changePageSize = useCallback(
    async (newSize) => {
      if (newSize !== pageSize) {
        // Reset to page 1 when changing page size
        await loadBookings(1, newSize);
      }
    },
    [pageSize, loadBookings]
  );

  const refreshBookings = useCallback(() => {
    loadBookings(currentPage, pageSize);
  }, [loadBookings, currentPage, pageSize]);

  return {
    bookingData,
    loading,
    error,
    updateBookingStatus,
    refreshBookings,
    changePage,
    changePageSize,
    currentPage,
    pageSize,
    // Make sure these are available
    totalPages: bookingData.totalPages || 0,
    totalElements: bookingData.totalElements || 0,
  };
};
