import TestimonialSingleTour from "@/components/testimonial/TestimonialSingleTour";
import React from "react";

const TestimonialSectionSingleTour = ({ title }) => {
  return (
    <div>
      <section className="layout-pt-lg layout-pb-lg">
        <div className="row">
          <div className="col-auto">
            <div className="">
              <h2 className="text-22 sm:text-18 fw-600 mb-40">{title}</h2>
            </div>
          </div>
        </div>

        <div className="overflow-hidden js-section-slider">
          <div className="item_gap-x30">
            <TestimonialSingleTour />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSectionSingleTour;
