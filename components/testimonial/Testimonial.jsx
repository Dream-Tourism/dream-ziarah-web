"use client";

import Image from "next/image";
import { useEffect } from "react";
import Slider from "react-slick";
import { testimonial1, testimonial2 } from "../../data/testimonialData";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {testimonial1.slice(0, 6).map((item) => (
          <div
            className="testimonials  -type-1 bg-white rounded-4 pt-40 pb-30 px-40"
            key={item.id}
            data-aos="fade"
            data-aos-delay={item.dealyAnimation}
          >
            <div className="row x-gap-20 y-gap-20 items-center">
              <div className="col-auto">
                <Image
                  unoptimized
                  width={60}
                  height={60}
                  src={item.avatar}
                  alt={item?.text}
                  className="size-60"
                />
              </div>
              <div className="col-auto">
                <div className="text-15 fw-600 lh-14">{item.name}</div>
                {/* <div className="text-14 lh-14 text-light-1 mt-5">
                    {item.designation}
                  </div> */}
              </div>
            </div>

            <h4 className="text-16 fw-600 text-blue-1 mb-20 ">{item.meta}</h4>
            <p
              // style={{ height: "140px" }}
              className="testimonials__text lh-17 fw-400 text-dark-1 text-14 border-top-light"
            >
              {item.text.slice(0, 120)}
            </p>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
