"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Mock API data - replace with your actual API endpoint
const mockOrders = [
  {
    id: 1,
    orderCreatedDate: "2024-01-15",
    travelerName: "John Smith",
    tourName: "Paris City Tour",
    participants: 2,
    dateOfTravel: "2024-02-20",
    totalPrice: 299.99,
    status: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    orderCreatedDate: "2024-01-18",
    travelerName: "Sarah Johnson",
    tourName: "Rome Historical Walk",
    participants: 4,
    dateOfTravel: "2024-03-15",
    totalPrice: 599.99,
    status: "Pending",
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    orderCreatedDate: "2024-01-10",
    travelerName: "Mike Wilson",
    tourName: "Tokyo Food Experience",
    participants: 1,
    dateOfTravel: "2024-02-28",
    totalPrice: 149.99,
    status: "Canceled",
    paymentMethod: "Credit Card",
  },
  {
    id: 4,
    orderCreatedDate: "2024-01-22",
    travelerName: "Emily Davis",
    tourName: "London Thames Cruise",
    participants: 3,
    dateOfTravel: "2024-04-10",
    totalPrice: 449.99,
    status: "Paid",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 5,
    orderCreatedDate: "2024-01-25",
    travelerName: "David Brown",
    tourName: "Barcelona Architecture Tour",
    participants: 2,
    dateOfTravel: "2024-03-25",
    totalPrice: 199.99,
    status: "Pending",
    paymentMethod: "Credit Card",
  },
];

export default function TourDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("Auth status updated");
    console.log("Authenticated:", isAuthenticated);
    console.log("User:", user);
  }, [isAuthenticated, user]);
  // Simulate API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace this with your actual API call
        // const response = await fetch('/api/orders')
        // const data = await response.json()

        // Simulating API delay
        setTimeout(() => {
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDownloadReceipt = (orderId) => {
    // Simulate receipt download
    console.log(`Downloading receipt for order ${orderId}`);
    // Replace with actual download logic
    alert(`Receipt for Order #${orderId} downloaded successfully!`);
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        // Replace with actual API call
        // await fetch(`/api/orders/${orderId}/cancel`, { method: 'POST' })

        // Update local state
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
        alert("Order canceled successfully!");
      } catch (error) {
        console.error("Error canceling order:", error);
        alert("Failed to cancel order. Please try again.");
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Paid: "bg-success",
      Pending: "bg-warning",
      Canceled: "bg-danger",
    };
    return `badge ${statusClasses[status] || "bg-secondary"}`;
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              {isAuthenticated && user?.first_name && user?.last_name ? (
                <h3 className="card-title mb-0 text-center text-white">
                  Welcome, {user.first_name} {user.last_name}
                </h3>
              ) : (
                <p className="text-center mb-0">Loading user...</p>
              )}
            </div>
            <div className="card-body">
              {/* Filter Buttons */}
              <div className="mb-3">
                <div className="btn-group" role="group">
                  {["All", "Pending", "Paid", "Canceled"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`btn ${
                        filter === status
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>No.</th>
                      <th>Order Created Date</th>
                      <th>Traveler Name</th>
                      <th>Tour Name</th>
                      <th>Participants</th>
                      <th>Date of Travel</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          <div className="text-muted">
                            <i className="fas fa-inbox fa-3x mb-3"></i>
                            <p>No orders found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order, index) => (
                        <tr key={order.id}>
                          <td>{index + 1}</td>
                          <td>
                            {new Date(
                              order.orderCreatedDate
                            ).toLocaleDateString()}
                          </td>
                          <td>{order.travelerName}</td>
                          <td>{order.tourName}</td>
                          <td>
                            <span className="badge bg-info">
                              {order.participants}
                            </span>
                          </td>
                          <td>
                            {new Date(order.dateOfTravel).toLocaleDateString()}
                          </td>
                          <td>
                            <strong>${order.totalPrice.toFixed(2)}</strong>
                          </td>
                          <td>
                            <span className={getStatusBadge(order.status)}>
                              {order.status}
                            </span>
                          </td>
                          <td>{order.paymentMethod}</td>
                          <td>
                            <div className="btn-group-vertical btn-group-sm">
                              {order.status === "Paid" && (
                                <button
                                  className="btn btn-success btn-sm mb-1"
                                  onClick={() =>
                                    handleDownloadReceipt(order.id)
                                  }
                                  title="Download Receipt"
                                >
                                  <i className="fas fa-download me-1"></i>
                                  Receipt
                                </button>
                              )}
                              {order.status === "Pending" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleCancelOrder(order.id)}
                                  title="Cancel Order"
                                >
                                  <i className="fas fa-times me-1"></i>
                                  Cancel
                                </button>
                              )}
                              {order.status === "Canceled" && (
                                <span className="text-muted small">
                                  <i className="fas fa-ban me-1"></i>
                                  Canceled
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Summary Cards */}
              <div className="row mt-4">
                <div className="col-md-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body">
                      <h5 className="card-title">Total Orders</h5>
                      <h2>{orders.length}</h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-success text-white">
                    <div className="card-body">
                      <h5 className="card-title">Paid Orders</h5>
                      <h2>
                        {orders.filter((o) => o.status === "Paid").length}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-warning text-white">
                    <div className="card-body">
                      <h5 className="card-title">Pending Orders</h5>
                      <h2>
                        {orders.filter((o) => o.status === "Pending").length}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-danger text-white">
                    <div className="card-body">
                      <h5 className="card-title">Canceled Orders</h5>
                      <h2>
                        {orders.filter((o) => o.status === "Canceled").length}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
