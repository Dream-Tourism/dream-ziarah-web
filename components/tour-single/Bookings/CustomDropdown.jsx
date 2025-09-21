"use client";

import { useState, useRef, useEffect } from "react";

// A small reusable dropdown component
const CustomDropdown = ({
  label,
  icon,
  value,
  options,
  onChange,
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="dropdown-container"
      style={{ position: "relative" }}
    >
      <div className="mb-3">
        <div
          className="form-control d-flex align-items-center justify-content-between bg-white rounded"
          style={{
            padding: "12px 16px",
            height: "48px",
            border: hasError ? "2px solid #ff4d4f" : "1px solid #e9ecef",
            boxShadow: hasError ? "0 0 6px rgba(255, 77, 79, 0.8)" : "none",
            cursor: "pointer",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="d-flex align-items-center">
            <i className={`${icon} text-14 me-2`} />
            <span>{label}</span>
          </div>
          <div
            className="d-flex align-items-center fw-bold"
            style={{
              borderLeft: "1px solid black",
              paddingLeft: "12px",
              width: "150px",
              justifyContent: "space-between",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value}
            <span style={{ marginLeft: "8px" }}>▾</span>
          </div>
        </div>

        {isOpen && (
          <ul
            className="shadow-lg border rounded"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              marginTop: "2px",
              listStyle: "none",
              padding: 0,
              zIndex: 700,
              backgroundColor: "white",
            }}
          >
            {options.map((opt, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(opt)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor: value === opt ? "#f1f1f1" : "white",
                  fontWeight: value === opt ? "bold" : "normal",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f8f9fa")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor =
                    value === opt ? "#f1f1f1" : "white")
                }
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
