const Counter = () => {
  return (
    <div className="row y-gap-30 text-dark-1">
      <div className="col-sm-5 col-6 d-flex flex-column justify-content-center align-items-center align-items-sm-start justify-content-sm-start">
        <div className="text-30 lh-15 fw-500">100K+</div>
        <div className="lh-15">Happy People</div>
      </div>
      {/* End .col */}

      <div className="col-sm-5 col-6 d-flex flex-column justify-content-center align-items-center align-items-sm-start justify-content-sm-start">
        <div className="text-30 lh-15 fw-500">4.88</div>
        <div className="lh-15">Overall rating</div>
        <div className="d-flex x-gap-5 items-center pt-10">
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
          <div className="icon-star text-dark-1 text-10" />
        </div>
      </div>
    </div>
  );
};

export default Counter;
