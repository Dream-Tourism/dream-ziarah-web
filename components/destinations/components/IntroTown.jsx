"use client";
import { slightContent } from "@/data/desinations";
import { useGetAllContentQuery } from "@/features/content/contentApi";
import { Interweave } from "interweave";
import { useSelector } from "react-redux";

const IntroTown = ({ slug }) => {
  const { menuItems } = useSelector((state) => state.menus);
  const destinationId = menuItems
    ?.find((item) => item.name === "Destinations")
    ?.children?.find((item) => item.name.toLowerCase() === slug)?.id;
  const { isSuccess, data } = useGetAllContentQuery(destinationId);

  let value = "";
  if (isSuccess) {
    value = data[0]?.value;
  }
  console.log(data, "value in intro town");
  return (
    <>
      <div className="col-xl-8">
        <div className="description-content">
          <Interweave
            allowAttributes
            allowElements
            disableLineBreaks={false}
            content={value}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-4">
        <div className="relative d-flex ml-35 xl:ml-0">
          <iframe
            src={slightContent[slug]?.location}
            width="100%"
            height={300}
          ></iframe>

          <div className="absolute d-flex justify-center items-end col-12 h-full z-1 px-35 py-20">
            <button className="button h-50 px-25 -blue-1 bg-white text-dark-1 text-14 fw-600 col-12">
              <i className="icon-eye text-18 mr-10" />
              See popular activities on the map
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroTown;
