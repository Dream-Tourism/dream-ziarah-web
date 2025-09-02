import AccordionContent from "./ItineraryContent";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

const index = ({ itenarayItems }) => {
  const [selectedLocation, setSelectedLocation] = useState(itenarayItems?.[0]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [zoom, setZoom] = useState(12);

  const handleLocationSelect = (location, zoomTrue) => {
    if (zoomTrue) {
      setZoom(12); // Change the zoom level as per your requirement
    } else {
      setZoom(16); // Change the zoom level as per your requirement
    }
    setSelectedLocation(location);
  };

  useEffect(() => {
    if (itenarayItems?.length > 0) {
      // Debug: Log the first item to see the actual structure
      // console.log("First itinerary item:", itenarayItems[0]);
      setSelectedLocation(itenarayItems[0]);
    }
  }, [itenarayItems]);

  const handleMarkerClick = (location) => {
    setSelectedMarker(location);
    // Add any other logic you need when a marker is clicked
  };

  return (
    <div className="row y-gap-30">
      <div className="col-lg-4">
        <div className="relative">
          <div className="border-test" />
          <div className="accordion -map row y-gap-20" id="itineraryContent">
            <AccordionContent
              itenarayItems={itenarayItems}
              onLocationSelect={handleLocationSelect}
              selectedMarker={selectedMarker}
            />
          </div>
        </div>
      </div>
      {/* End col-lg-4 */}

      <div className="col-lg-8">
        {itenarayItems?.length > 0 && selectedLocation && (
          <LeafletMap
            itenarayItems={itenarayItems}
            selectedLocation={selectedLocation}
            zoom={zoom}
            markerClick={handleMarkerClick}
          />
        )}
      </div>
      {/* End col-lg-8 */}
    </div>
  );
};

export default index;
