const TourSnapShot = ({ tour }) => {
  // Use tour prop if available, otherwise fallback to tourItem from redux
  const currentTour = tour;

  return (
    <div className="row y-gap-30 justify-between pt-20">
      <div className="col-md-3 col-6">
        <div className="d-flex">
          <i className="icon-clock text-22 text-blue-1 mr-10"></i>
          <div className="text-15 lh-15">
            <span>Duration: {currentTour?.duration || "N/A"}</span>
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-md-3 col-6">
        <div className="d-flex">
          <i className="icon-customer text-22 text-blue-1 mr-10"></i>
          <div className="text-15 lh-15">
            <span>Group size: {currentTour?.group_size || "N/A"}</span>
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-md-3 col-6">
        <div className="d-flex">
          <i className="icon-route text-22 text-blue-1 mr-10"></i>
          <div className="text-15 lh-15">Near public transportation</div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-md-3 col-6">
        <div className="d-flex">
          <i className="icon-access-denied text-22 text-blue-1 mr-10"></i>
          <div className="text-15 lh-15">Free cancellation</div>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default TourSnapShot;
