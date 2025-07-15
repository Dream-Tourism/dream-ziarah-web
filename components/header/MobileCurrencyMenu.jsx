"use client";

import { addCurrency } from "@/features/currency/currencySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const MobileCurrencyMenu = () => {
  const dispatch = useDispatch();

  const currencyContent = [
    { id: 400, name: "United States dollar", currency: "USD", symbol: "$" },
    { id: 2, name: "Australian dollar", currency: "AUD", symbol: "$" },
    { id: 5, name: "Canadian dollar", currency: "CAD", symbol: "$" },
    { id: 10, name: "Euro", currency: "EUR", symbol: "€" },
    { id: 13, name: "Great Britain Pound", currency: "GBP", symbol: "£" },
    { id: 15, name: "Saudi riyal", currency: "SAR", symbol: "ريال" },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(currencyContent[0]);

  const handleItemClick = (item) => {
    setSelectedCurrency(item);
    dispatch(addCurrency(item));
  };

  return (
    <div className="dropdown">
      <button
        className={`d-flex items-center text-14 text-dark-1`}
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span
          style={{ color: "black", fontSize: "13px" }}
          className="js-currencyMenu-mainTitle"
        >
          {selectedCurrency.currency}
        </span>
        <i className="icon-chevron-sm-down text-7 ml-10" />
      </button>

      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {currencyContent?.map((item) => (
          <li
            style={{ color: "black", fontSize: "13px" }}
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="dropdown-item"
          >
            {item.currency} {item.symbol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileCurrencyMenu;
