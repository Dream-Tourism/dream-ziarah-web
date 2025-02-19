import { singleTourInfo } from "@/hooks/useTours";
import { useSelector } from "react-redux";
const TourSnapShot = ({ hajj, umrah }) => {
  const { tourItem } = useSelector((state) => state.tour);

  return (
    <div className="row y-gap-30 justify-between pt-20">
      <div className="col-md-3 col-6">
        <div className="d-flex">
          <i className="icon-clock text-22 text-blue-1 mr-10"></i>
          <div className="text-15 lh-15">
            {hajj || umrah ? (
              <span>Performance Duration: {tourItem?.duration}</span>
            ) : (
              <span>
                Duration:
                {` ${tourItem?.duration} hours`}
              </span>
            )}
            {/* Duration:
            {tourItem?.duration}h */}
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-md-3 col-6">
        <div className="d-flex">
          <i className="icon-customer text-22 text-blue-1 mr-10"></i>
          <div className="text-15 lh-15">
            {hajj ? (
              <span>
                {` Group size: ${singleTourInfo["Hajj 2024: Embrace the Divine"]?.groupSize}`}
              </span>
            ) : (
              <span>
                {`Group size: ${singleTourInfo[tourItem?.name]?.groupSize}`}
              </span>
            )}
            {/* Group size:
            {singleTourInfo[tourItem?.name]?.groupSize} */}
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-md-3 col-6">
        <div className="d-flex">
          <i className="icon-route text-22 text-blue-1 mr-10"></i>
          <div className="text-15 lh-15">
            {hajj ? (
              <>
                24-day or
                <br />
                14-day options
              </>
            ) : (
              <> Near public transportation</>
            )}
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-md-3 col-6">
        <div className="d-flex">
          <i className="icon-access-denied text-22 text-blue-1 mr-10"></i>
          <div className="text-15 lh-15">
            Free cancellation
            <br />
            {hajj ? "until March 30th" : ""}
            {/* <a href="#" className="text-blue-1 underline">
              Learn more
            </a> */}
          </div>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default TourSnapShot;
