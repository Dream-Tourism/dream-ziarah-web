"use client";
import { useEffect, useState } from "react";

const ItineraryContent = ({
  itenarayItems,
  onLocationSelect,
  selectedMarker,
}) => {
  // Maintain state for expanded items
  const [expandedItems, setExpandedItems] = useState({});

  const modifiedItenarayItem = itenarayItems?.map((item, indx) => {
    // Debug: Log each item to see the actual structure
    // console.log(`Itinerary item ${indx}:`, item);

    return {
      id: item.id,
      targetCollapse: `item_${indx + 1}`,
      itemNo: indx + 1,
      title: item.title,
      lat: item.lat,
      lng: item.lng || item.longitude || 0, // Handle different property names
      img: "/img/tours/list.png",
      content: item.description,
      classShowHide: "",
      location: item.location,
    };
  });

  // Function to toggle item expansion
  const toggleItem = (itemId) => {
    setExpandedItems((prevExpandedItems) => ({
      // ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId],
    }));
  };

  useEffect(() => {
    if (selectedMarker) {
      toggleItem(selectedMarker);
    }
  }, [selectedMarker]);

  return (
    <>
      {modifiedItenarayItem?.map((item, index) => (
        <div
          className="col-12"
          key={item.id}
          onClick={() => {
            if (expandedItems[item.id]) {
              onLocationSelect(item, true);
            } else {
              onLocationSelect(item, false);
            }
          }}
        >
          <div className="accordion__item">
            <div className="d-flex">
              <div
                className={`accordion__icon size-40 flex-center bg-blue-2 ${
                  expandedItems[item.id] ? "text-blue-1" : ""
                } rounded-full`}
              >
                <div className="text-14 fw-500">{index + 1}</div>
              </div>
              <div className="ml-20">
                <div
                  className={`text-16 lh-15 fw-500 ${
                    expandedItems[item.id] ? "text-blue-1" : ""
                  }`}
                >
                  {item.title}
                </div>
                <div
                  className={`accordion-collapse collapse ${
                    expandedItems[item.id] ? "show" : ""
                  } ${expandedItems[item.id] ? "expanded" : ""}`}
                  id={item.targetCollapse}
                  data-bs-parent="#itineraryContent"
                >
                  <div className="pt-15 pb-15">
                    <div className="text-14 lh-17 mt-15 text-black">
                      <div className="interweave-content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.content || null,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion__button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${item.targetCollapse}`}
                  onClick={() => {
                    toggleItem(item.id);
                  }}
                >
                  {/* Toggle button text based on item expansion state */}
                  <button className="d-block lh-15 text-14 text-blue-1 underline fw-500 mt-5">
                    {expandedItems[item.id] ? "See less" : "See more"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItineraryContent;
