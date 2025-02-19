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

  if (!showPopup) {
    return null;
  }

  return (
    <div className="cookieConsent">
      <div className="cookieContent">
        <p>
          We use cookies to personalize content and ads, to provide social media
          features and to analyze our traffic. By continuing to use our site,
          you consent to our use of cookies. For more details, please read our
          <a href="/terms?type=privacy_policy" className="privacyLink">
            Privacy Policy
          </a>
          .
        </p>
        <button onClick={handleAccept} className="acceptButton">
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
