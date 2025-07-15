"use client";
import Image from "next/image";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonial1 } from "../../../data/testimonialData";

const Testimonial = () => {
  return (
    <>
      <Swiper
        scrollbar={{
          el: ".js-scrollbar",
          draggable: true,
        }}
        modules={[Scrollbar]}
      >
        {testimonial1.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="row items-center x-gap-15 y-gap-20">
              <div className="col-auto">
                <Image
                  unoptimized
                  width={80}
                  height={80}
                  src={item.avatar}
                  alt={item?.text}
                  className="js-lazy rounded-circle"
                />
              </div>
              <div className="col-auto">
                <h5 className="text-16 fw-600">{item.name}</h5>
              </div>
            </div>
            <p className="text-18 fw-600 text-dark-1 mt-30 sm:mt-20">
              {item.text}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="d-flex items-center mt-60 sm:mt-20 js-testimonials-slider-pag">
        <div className="text-dark-1 fw-600 js-current">01</div>
        <div className="slider-scrollbar bg-border ml-20 mr-20 w-max-300 js-scrollbar" />
        <div className="text-dark-1 fw-600 js-all">03</div>
      </div>
    </>
  );
};

export default Testimonial;
