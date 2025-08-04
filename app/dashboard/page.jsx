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

// Mock data - replace with your API calls
const mockOrderData = {
  summary: {
    totalOrders: 156,
    cancelledOrders: 12,
    pendingPayment: 23,
    paidOrders: 121,
  },
  orders: [
    {
      id: "TO001",
      status: "pending",
      participants: 4,
      datePurchased: "2024-01-15",
      totalPrice: 1200,
      tourName: "Bali Adventure Package",
      customerName: "John Doe",
      customerEmail: "john@example.com",
    },
    {
      id: "TO002",
      status: "paid",
      participants: 2,
      datePurchased: "2024-01-14",
      totalPrice: 800,
      tourName: "Tokyo City Tour",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
    },
    {
      id: "TO003",
      status: "cancelled",
      participants: 6,
      datePurchased: "2024-01-13",
      totalPrice: 1800,
      tourName: "European Explorer",
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
    },
    {
      id: "TO004",
      status: "paid",
      participants: 3,
      datePurchased: "2024-01-12",
      totalPrice: 1500,
      tourName: "Safari Adventure",
      customerName: "Sarah Wilson",
      customerEmail: "sarah@example.com",
    },
    {
      id: "TO005",
      status: "pending",
      participants: 2,
      datePurchased: "2024-01-11",
      totalPrice: 900,
      tourName: "Mountain Hiking",
      customerName: "David Brown",
      customerEmail: "david@example.com",
    },
  ],
};

function Dashboard() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState(mockOrderData);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      dispatch(verifySessionThunk());
    }
  }, [dispatch, isAuthenticated, loading]);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  const handlePayment = (orderId) => {
    console.log("Processing payment for order:", orderId);
    setOrderData((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order.id === orderId ? { ...order, status: "paid" } : order
      ),
    }));
    setSelectedOrder(null);
  };

  const handleCancelOrder = (orderId) => {
    console.log("Cancelling order:", orderId);
    setOrderData((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      ),
    }));
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSummary orderData={orderData} />;
      case "tour-orders":
        return (
          <TourOrders orderData={orderData} onOrderSelect={setSelectedOrder} />
        );
      case "returns":
        return <Returns />;
      case "support":
        return <SupportTickets />;
      case "account":
        return <AccountSettings user={user} />;
      default:
        return <DashboardSummary orderData={orderData} />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 col-lg-2 text-white min-vh-100 p-0 position-relative"
          style={{ backgroundColor: "#3554d1", marginTop: "120px" }}
        >
          <div className="position-absolute top-0 end-0 opacity-10">
            <i className="fas fa-compass fa-6x"></i>
          </div>
          <div className="p-3 position-relative">
            <div className="text-center mb-4 pb-3 border-bottom border-white border-opacity-25">
              <div
                className="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                style={{ width: "60px", height: "60px" }}
              >
                <i className="fas fa-user-circle fa-2x"></i>
              </div>
              <h6 className="mb-0 opacity-75">Welcome back,</h6>
              <h5 className="fw-bold">
                {user?.first_name || "Travel Manager"}
              </h5>
            </div>

            <nav className="nav flex-column">
              <button
                className={`nav-link border-0 bg-transparent text-start mb-2 rounded-3 p-3 position-relative ${
                  activeSection === "dashboard" ? "bg-white bg-opacity-20" : ""
                }`}
                onClick={() => setActiveSection("dashboard")}
                style={{
                  color: activeSection === "dashboard" ? "#0d2857" : "#ffffff",
                  fontWeight: activeSection === "dashboard" ? "600" : "400",
                }}
              >
                <i className="fas fa-chart-pie me-3"></i>
                Dashboard
                {activeSection === "dashboard" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </button>

              <button
                className="nav-link text-white border-0  text-start mb-2 rounded-3 p-3 position-relative"
                onClick={() => setActiveSection("tour-orders")}
                style={{
                  backgroundColor:
                    activeSection === "tour-orders" ? "#0d2857" : "transparent",
                  color:
                    activeSection === "tour-orders" ? "#ffffff" : "#ffffff",
                  fontWeight: activeSection === "tour-orders" ? "600" : "400",
                }}
              >
                <i className="fas fa-briefcase me-3"></i>
                Tour Orders
                {activeSection === "tour-orders" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </button>

              <button
                className="nav-link text-white border-0  text-start mb-2 rounded-3 p-3 position-relative"
                onClick={() => setActiveSection("returns")}
                style={{
                  backgroundColor:
                    activeSection === "returns" ? "#0d2857" : "transparent",
                  color: activeSection === "returns" ? "#ffffff" : "#ffffff",
                  fontWeight: activeSection === "returns" ? "600" : "400",
                }}
              >
                <i className="fas fa-undo-alt me-3"></i>
                Returns
                {activeSection === "returns" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </button>

              <button
                className={`nav-link text-white border-0 bg-transparent text-start mb-2 rounded-3 p-3 position-relative ${
                  activeSection === "support" ? "bg-white bg-opacity-20" : ""
                }`}
                onClick={() => setActiveSection("support")}
                style={{
                  color: activeSection === "support" ? "#0d2857" : "#ffffff",
                  fontWeight: activeSection === "support" ? "600" : "400",
                }}
              >
                <i className="fas fa-life-ring me-3"></i>
                Support Tickets
                {activeSection === "support" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </button>

              <button
                className={`nav-link text-white border-0 bg-transparent text-start mb-2 rounded-3 p-3 position-relative ${
                  activeSection === "account" ? "bg-white bg-opacity-20" : ""
                }`}
                onClick={() => setActiveSection("account")}
                style={{
                  color: activeSection === "account" ? "#0d2857" : "#ffffff",
                  fontWeight: activeSection === "account" ? "600" : "400",
                }}
              >
                <i className="fas fa-user-cog me-3"></i>
                Account Settings
                {activeSection === "account" && (
                  <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )}
              </button>

              <hr className="my-3 border-white border-opacity-25" />

              <button
                className="nav-link text-white border-0 bg-transparent text-start rounded-3 p-3 opacity-75 hover-opacity-100"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-3"></i>
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
