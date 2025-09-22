// components/CookieConsent.js
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setShowPopup(false);
  };

  const handleReject = () => {
    Cookies.set("cookieConsent", "rejected", { expires: 365 });
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="cookieConsent">
      <div className="cookieContent">
        <div className="cookieText">
          <h3>We value your privacy</h3>
          <p>
            We use cookies to enhance your browsing experience, serve
            personalised ads or content, and analyse our traffic. By clicking
            "Accept All", you consent to our use of cookies.{" "}
            <a href="/terms?type=privacy_policy" className="privacyLink">
              Cookie Policy
            </a>
          </p>
        </div>
        <div className="cookieButtons">
          <button onClick={handleReject} className="rejectButton">
            Reject All
          </button>
          <button onClick={handleAccept} className="acceptButton">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
