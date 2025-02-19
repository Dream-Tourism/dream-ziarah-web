"use client";

import Script from "next/script";

const UmrahSidebarRight = () => {
  return (
    <div className="d-flex js-pin-content">
      <div className="w-360 lg:w-full items-left">
        <div
          className="bokunWidget"
          data-src="https://widgets.bokun.io/online-sales/d894d0d4-5eab-4e15-821d-6770f0186810/experience-calendar/830933"
        ></div>
      </div>
      <Script
        type="text/javascript"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=d894d0d4-5eab-4e15-821d-6770f0186810"
        async={true}
      />
    </div>
  );
};

export default UmrahSidebarRight;
