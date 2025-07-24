"use client";
import {
  useGetContentsByMenuContentIdQuery,
  useGetContentsByMenuContentTitleQuery,
} from "@/features/content/contentApi";
import { capitalize } from "@/utils";
import { useParams } from "next/navigation";
import Script from "next/script";
import GuestCalculate from "./GuestCalculate";

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

const SidebarRight = () => {
  const params = useParams();
  const { data: contentItem, isFulfilled } =
    useGetContentsByMenuContentTitleQuery(capitalize(params?.name));
  const { data, isSuccess } = useGetContentsByMenuContentIdQuery(
    contentItem?.id
  );

  return bokunUrls[params?.name] ? (
    <GuestCalculate contentItem={contentItem} />
  ) : (
    <div
      // className="d-flex justify-end js-pin-content"
      className="d-flex js-pin-content"
      style={{ height: "fit-content" }}
    >
      <div className="w-360 lg:w-full  items-left">
        {isSuccess && <div className="bokunWidget" data-src={data?.url}></div>}
      </div>
      <Script
        type="text/javascript"
        src="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=aa4c5059-8d0b-43dc-8bd3-bac143537416"
        async={true}
      />
    </div>
  );
};

export default SidebarRight;
