"use client";

import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";

const Cart = () => {
  const {
    cartItems,
    getCartCount,
    getCartTotal,
    removeFromCart,
    clearCart,
    isLoaded,
  } = useCart();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Update cart count when cartItems change
  useEffect(() => {
    if (isLoaded) {
      setCartCount(getCartCount());
    }
  }, [cartItems, isLoaded, getCartCount]);

  const formatDate = (date) => {
    if (typeof date === "string") {
      date = new Date(date);
    }
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getParticipantSummary = (participants) => {
    const summary = [];
    Object.entries(participants).forEach(([type, count]) => {
      if (count > 0) {
        const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
        summary.push(`${count} ${typeLabel}${count > 1 ? "s" : ""}`);
      }
    });
    return summary.join(", ");
  };

  // Don't render until cart is loaded
  if (!isLoaded) {
    return null;
  }

  // Don't show cart if empty
  if (cartCount === 0) {
    return null;
  }

  return (
    <div className="position-relative">
      {/* Cart Icon */}
      <button
        className="btn btn-outline-primary position-relative"
        onClick={() => setShowCartDropdown(!showCartDropdown)}
        style={{ border: "none", background: "none", padding: "8px" }}
      >
        <i
          className="fas fa-shopping-cart"
          style={{ fontSize: "20px", color: "#333" }}
        ></i>
        {cartCount > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "10px", minWidth: "18px", height: "18px" }}
          >
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {showCartDropdown && (
        <div
          className="position-absolute bg-white border rounded shadow-lg"
          style={{
            top: "100%",
            right: "0",
            width: "400px",
            maxHeight: "500px",
            overflowY: "auto",
            zIndex: 1000,
            marginTop: "5px",
          }}
        >
          {/* Cart Header */}
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold">Your Cart ({cartCount})</h6>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={clearCart}
              style={{ fontSize: "12px" }}
            >
              Clear All
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-0">
            {cartItems.map((item) => (
              <div key={item.id} className="p-3 border-bottom">
                <div className="d-flex">
                  <img
                    src={
                      item.tourImage || "/placeholder.svg?height=60&width=80"
                    }
                    alt="Tour"
                    className="rounded me-3"
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6
                      className="mb-1"
                      style={{ fontSize: "14px", lineHeight: "1.3" }}
                    >
                      {item.tourName}
                    </h6>
                    <p className="mb-1 text-muted" style={{ fontSize: "12px" }}>
                      {formatDate(item.selectedDate)} at {item.selectedTime}
                    </p>
                    <p className="mb-1 text-muted" style={{ fontSize: "12px" }}>
                      {getParticipantSummary(item.participants)}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className="fw-bold text-primary"
                        style={{ fontSize: "14px" }}
                      >
                        ${item.totalPrice.toFixed(2)}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                        style={{ fontSize: "12px", padding: "2px 8px" }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div
            className="bg-light shadow p-3"
            style={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "#f8f9fa",
              zIndex: 10,
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Total:</span>
              <span className="fw-bold text-primary h5 mb-0">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>
            <button
              className="btn btn-primary w-100 fw-bold"
              onClick={() => {
                setShowCartDropdown(false);
                // Navigate to checkout page or open checkout modal for all items
                console.log("Proceed to checkout with all items");
              }}
            >
              Checkout All Items
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {showCartDropdown && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 999 }}
          onClick={() => setShowCartDropdown(false)}
        ></div>
      )}
    </div>
  );
};

export default Cart;
