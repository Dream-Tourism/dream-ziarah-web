"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderDetails from "@/components/dashboard/OrderDetails";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TourOrders from "@/components/dashboard/TourOrders";
import SupportTickets from "@/components/dashboard/SupportTickets";
import AccountSettings from "@/components/dashboard/AccountSettings";
import { logoutUserThunk, verifySessionThunk } from "@/features/auth/authSlice";
import { ProtectedRoute } from "@/components/protected-route";
import Returns from "@/components/dashboard/Returns";
import { useTourBookings } from "@/hooks/useTourBookings";

function Dashboard() {
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    loading: authLoading,
  } = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Use the custom hook for tour bookings
  const {
    bookingData,
    loading: bookingsLoading,
    error: bookingsError,
    updateBookingStatus,
    refreshBookings,
  } = useTourBookings(user?.traveller_id);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      dispatch(verifySessionThunk());
    }
  }, [dispatch, isAuthenticated, authLoading]);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  const handlePayment = async (orderId) => {
    try {
      console.log("Processing payment for order:", orderId);

      // Here you would typically call a payment API
      // For now, we'll just update the local state
      updateBookingStatus(orderId, "paid");

      // Close the modal
      setSelectedOrder(null);

      // Show success message (you can add toast notification here)
      console.log("Payment processed successfully!");
    } catch (error) {
      console.error("Payment processing failed:", error);
      // Show error message
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      console.log("Cancelling order:", orderId);

      // Here you would typically call a cancellation API
      updateBookingStatus(orderId, "cancelled");

      // Close the modal
      setSelectedOrder(null);

      // Show success message
      console.log("Order cancelled successfully!");
    } catch (error) {
      console.error("Order cancellation failed:", error);
      // Show error message
    }
  };

  // Show loading spinner while authenticating or loading bookings
  // if (
  //   authLoading ||
  //   (isAuthenticated && bookingsLoading && activeSection === "dashboard")
  // ) {
  //   return <LoadingSpinner />;
  // }

  if (!isAuthenticated) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h3 className="text-primary">Access Denied</h3>
          <p>Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  // Show error state if bookings failed to load
  if (bookingsError && activeSection === "dashboard") {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <i className="icon-alert-circle text-danger text-14 mb-3"></i>
          <h3 className="text-danger">Failed to Load Bookings</h3>
          <p className="text-muted">{bookingsError}</p>
          <button className="btn btn-primary" onClick={refreshBookings}>
            <i className="icon-refresh-cw text-14 me-2"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardSummary orderData={bookingData} loading={bookingsLoading} />
        );
      case "tour-orders":
        return (
          <TourOrders
            orderData={bookingData}
            onOrderSelect={setSelectedOrder}
            loading={bookingsLoading}
            onRefresh={refreshBookings}
          />
        );
      case "returns":
        return <Returns />;
      case "support":
        return <SupportTickets />;
      case "account":
        return <AccountSettings user={user} />;
      default:
        return (
          <DashboardSummary orderData={bookingData} loading={bookingsLoading} />
        );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 col-lg-2 text-white min-vh-100 p-0 position-relative bg-blue-1"
          style={{ marginTop: "120px" }}
        >
          {/* <div className="position-absolute top-0 end-0 opacity-10">
            <i className="icon-compass" style={{ fontSize: "6rem" }}></i>
          </div> */}
          <div className="p-3 position-relative">
            <div className="text-center mb-4 pb-3 border-bottom border-white border-opacity-25">
              <div
                className="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: "60px", height: "60px" }}
              >
                <i className="icon-user" style={{ fontSize: "2rem" }}></i>
              </div>
              <h6 className="mb-0 opacity-75">Welcome back,</h6>
              <h5 className="fw-bold">
                {user?.first_name || "Travel Manager"}
              </h5>
            </div>

            <nav className="nav flex-column">
              <button
                className={`nav-link border-0 mt-2  text-start mb-2 rounded-3 p-3 position-relative nav-button ${
                  activeSection === "dashboard" ? "active-dark" : "inactive"
                }`}
                onClick={() => setActiveSection("dashboard")}
              >
                <i className="icon-pie-chart text-14 me-3"></i>
                Dashboard
                {activeSection === "dashboard" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="icon-chevron-right"></i>
                  </div>
                )}
              </button>

              <button
                className={`nav-link border-0  text-start mb-2 rounded-3 p-3 position-relative nav-button ${
                  activeSection === "tour-orders" ? "active-dark" : "inactive"
                }`}
                onClick={() => setActiveSection("tour-orders")}
              >
                <i className="icon-route text-14 me-3"></i>
                Tour Orders
                {bookingsLoading && activeSection === "tour-orders" && (
                  <div
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                {activeSection === "tour-orders" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="icon-chevron-right"></i>
                  </div>
                )}
              </button>

              <button
                className={`nav-link border-0  text-start mb-2 rounded-3 p-3 position-relative nav-button ${
                  activeSection === "returns" ? "active-dark" : "inactive"
                }`}
                onClick={() => setActiveSection("returns")}
              >
                <i className="icon-route text-14 me-3"></i>
                Returns
                {bookingsLoading && activeSection === "returns" && (
                  <div
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                {activeSection === "returns" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="icon-chevron-right"></i>
                  </div>
                )}
              </button>

              <button
                className={`nav-link border-0  text-start mb-2 rounded-3 p-3 position-relative nav-button ${
                  activeSection === "support" ? "active-dark" : "inactive"
                }`}
                onClick={() => setActiveSection("support")}
              >
                <i className="icon-route text-14 me-3"></i>
                support
                {bookingsLoading && activeSection === "support" && (
                  <div
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                {activeSection === "support" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="icon-chevron-right"></i>
                  </div>
                )}
              </button>

              <button
                className={`nav-link border-0  text-start mb-2 rounded-3 p-3 position-relative nav-button ${
                  activeSection === "account" ? "active-dark" : "inactive"
                }`}
                onClick={() => setActiveSection("account")}
              >
                <i className="icon-route text-14 me-3"></i>
                Account Settiings
                {bookingsLoading && activeSection === "account" && (
                  <div
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                {activeSection === "account" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="icon-chevron-right"></i>
                  </div>
                )}
              </button>

              <hr className="my-3 border-white border-opacity-25" />

              <button
                className="nav-link text-white border-0  text-start rounded-3 p-3 opacity-75 hover-opacity-100"
                onClick={handleLogout}
              >
                <i className="icon-log-out text-14 me-3"></i>
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="col-md-9 col-lg-10"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="p-4">{renderContent()}</div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetails
        selectedOrder={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onPayment={handlePayment}
        onCancel={handleCancelOrder}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
