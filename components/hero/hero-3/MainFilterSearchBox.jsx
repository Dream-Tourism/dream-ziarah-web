"use client";

import { useRouter } from "next/navigation";

import DateSearch from "./DateSearch";
// import GuestSearch from "./GuestSearch";
import { useSelector } from "react-redux";
import LocationSearch from "./LocationSearch";

const MainFilterSearchBox = () => {
  const Router = useRouter();
  const { searchValue } = useSelector((state) => state.search);

  return (
    <>
      <div className="mainSearch bg-white px-20 py-20 lg:px-20 lg:pt-5 lg:pb-5">
        <div className="button-grid items-center">
          <LocationSearch />
          {/* End Location */}

          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">
                Check in - Check out
              </h4>
              <DateSearch />
            </div>
          </div>
          {/* End check-in-out */}

          {/* <GuestSearch /> */}
          {/* End guest */}

          <div className="button-item">
            <button
              className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
              onClick={() => Router.push(`/tours/?location=${searchValue}`)}
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;
