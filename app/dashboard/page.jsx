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
    <div className="container-fluid" style={{ marginTop: "120px" }}>
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 col-lg-2 text-white min-vh-100 p-0"
          style={{ backgroundColor: "#3554d1" }}
        >
          <div className="p-3">
            <div className="text-center mb-4">
              <i className="fas fa-user-circle fa-3x mb-2"></i>
              <h6 className="mb-0">Welcome,</h6>
              <h5>{user?.first_name || "User"}</h5>
            </div>
            <nav className="nav flex-column">
              <button
                className={`nav-link text-white border-0 bg-transparent text-start mb-2 rounded ${
                  activeSection === "dashboard" ? "bg-white text-primary" : ""
                }`}
                onClick={() => setActiveSection("dashboard")}
                style={
                  activeSection === "dashboard"
                    ? { color: "#3554d1 !important" }
                    : {}
                }
              >
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
              </button>
              <button
                className={`nav-link text-white border-0 bg-transparent text-start mb-2 rounded ${
                  activeSection === "tour-orders" ? "bg-white text-primary" : ""
                }`}
                onClick={() => setActiveSection("tour-orders")}
                style={
                  activeSection === "tour-orders"
                    ? { color: "#3554d1 !important" }
                    : {}
                }
              >
                <i className="fas fa-map me-2"></i>
                Tour Orders
              </button>
              <button
                className={`nav-link text-white border-0 bg-transparent text-start mb-2 rounded ${
                  activeSection === "returns" ? "bg-white text-primary" : ""
                }`}
                onClick={() => setActiveSection("returns")}
                style={
                  activeSection === "returns"
                    ? { color: "#3554d1 !important" }
                    : {}
                }
              >
                <i className="fas fa-undo me-2"></i>
                Returns
              </button>
              <button
                className={`nav-link text-white border-0 bg-transparent text-start mb-2 rounded ${
                  activeSection === "support" ? "bg-white text-primary" : ""
                }`}
                onClick={() => setActiveSection("support")}
                style={
                  activeSection === "support"
                    ? { color: "#3554d1 !important" }
                    : {}
                }
              >
                <i className="fas fa-headset me-2"></i>
                Support Tickets
              </button>
              <button
                className={`nav-link text-white border-0 bg-transparent text-start mb-2 rounded ${
                  activeSection === "account" ? "bg-white text-primary" : ""
                }`}
                onClick={() => setActiveSection("account")}
                style={
                  activeSection === "account"
                    ? { color: "#3554d1 !important" }
                    : {}
                }
              >
                <i className="fas fa-user-cog me-2"></i>
                Account Settings
              </button>
              <hr className="my-3" />
              <button
                className="nav-link text-white border-0 bg-transparent text-start rounded"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-2"></i>
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
