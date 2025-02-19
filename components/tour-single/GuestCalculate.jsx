"use client";
import convertCurrency from "@/utils/currency";
import { useParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterBox from "../../components/tour-single/filter-box";

const bokunUrls = {
  "makkah-city-ziarah-luxury-private-vehicle-with-guide": {
    three:
      "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/820419",
    four: "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834199",
    six: "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834200",
    eleven:
      "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834203",
  },
  "makkah-city-ziarah-luxury-private-vehicle-without-guide": {
    three:
      "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834206",
    four: "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/820434",
    six: "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834208",
    eleven:
      "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834209",
  },
  "day-trip-from-makkah-to-taif-luxury-private-vehicle": {
    three:
      "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834225",
    four: "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834226",
    six: "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834227",
    eleven:
      "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834228",
  },
  "day-trip-from-makkah-to-jeddah-luxury-private-vehicle": {
    three:
      "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834382",
    four: "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/827316",
    six: "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834383",
    eleven:
      "https://widgets.bokun.io/online-sales/aa4c5059-8d0b-43dc-8bd3-bac143537416/experience-calendar/834384",
  },
};

const GuestCalculate = ({ contentItem }) => {
  const params = useParams();
  const [isShowBokun, setIsShowBokun] = useState(false);
  const [bokunUrl, setBokunUrl] = useState("");
  const { guests } = useSelector((state) => state.bokun);
  const { currentCurrency } = useSelector((state) => state?.currency);

  useEffect(() => {
    if (guests.Adults === 3) {
      setBokunUrl(bokunUrls[params?.name]?.three);
    } else if (guests.Adults === 4 || guests.Adults === 5) {
      setBokunUrl(bokunUrls[params?.name]?.four);
    } else if (guests.Adults >= 6 && guests.Adults <= 10) {
      setBokunUrl(bokunUrls[params?.name]?.six);
    } else if (guests.Adults >= 11 && guests.Adults <= 15) {
      setBokunUrl(bokunUrls[params?.name]?.eleven);
    }
  }, [guests?.Adults]);

  return !isShowBokun ? (
    <div className="d-flex justify-end js-pin-content">
      <div className="w-360 lg:w-full d-flex flex-column items-center">
        <div className="px-30 py-30 rounded-four border-light bg-white shadow-four">
          <div className="text-14 text-light-1">
            From {currentCurrency?.symbol}
            <span className="text-20 fw-600 text-dark-1 ml-5">
              {convertCurrency(
                parseInt(contentItem?.price),
                "USD",
                currentCurrency?.currency
              )}
            </span>
          </div>

          <div className="row y-gap-20 pt-30">
            <FilterBox setIsShowBokun={setIsShowBokun} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-end js-pin-content">
      <div className="w-360 lg:w-full d-flex flex-column items-center">
        <div className="bokunWidget" data-src={bokunUrl}></div>
      </div>
      <Script
        type="text/javascript"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=aa4c5059-8d0b-43dc-8bd3-bac143537416"
        async={true}
      />
    </div>
  );
};

export default GuestCalculate;
