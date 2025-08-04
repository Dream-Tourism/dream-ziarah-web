import { getAllTourBookingByTravellerID } from "@/constant/constants";

export const fetchTourBookings = async (travellerId) => {
  try {
    const response = await fetch(
      `${getAllTourBookingByTravellerID}${travellerId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tour bookings:", error);
    throw error;
  }
};

// Transform API data to match our component structure
export const transformBookingData = (apiResponse) => {
  const bookings = apiResponse.tour_bookings || [];

  // Calculate summary statistics
  const summary = {
    totalOrders: bookings.length,
    paidOrders: bookings.filter((booking) => booking.status === "paid").length,
    pendingPayment: bookings.filter((booking) => booking.status === "pending")
      .length,
    cancelledOrders: bookings.filter(
      (booking) => booking.status === "cancelled"
    ).length,
  };

  // Transform bookings to match component structure
  const transformedBookings = bookings.map((booking) => ({
    id: `TB${booking.id.toString().padStart(3, "0")}`, // TB001, TB002, etc.
    status: booking.status,
    participants: booking.total_participants,
    datePurchased: booking.created_at.split("T")[0], // Extract date part
    totalPrice: Number.parseFloat(booking.total_price),
    tourName: booking.tour,
    customerName: booking.created_by,
    customerEmail: `${booking.created_by}@example.com`, // You might need to get this from user data
    selectedDate: booking.selected_date,
    selectedTime: booking.selected_time,
    pricePerPerson: Number.parseFloat(booking.price_per_person),
    paymentKey: booking.payment_key,
    createdAt: booking.created_at,
    updatedAt: booking.updated_at,
    travellerId: booking.traveller,
    userId: booking.user,
    payment: booking.payment,
  }));

  return {
    summary,
    orders: transformedBookings,
  };
};
