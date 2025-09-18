import React from "react";
import Testimonial from "./Testimonials";
import Counter from "./Counter";
import Brand from "./Brand";

const TestimonialSection = () => {
  return (
    <div>
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto"></div>
        </div>

        <div className="overflow-hidden js-section-slider">
          <div className="item_gap-x30">
            <Testimonial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
