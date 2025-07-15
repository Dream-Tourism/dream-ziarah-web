"use client";
import Image from "next/image";
import Slider from "react-slick";

const WhyChoose = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/img/featureIcons/3/mone-back.svg",
      title: "Best Price & Money Back Guarantee",
      text: `Unbeatable Value for Your Unforgettable Experience.`,
      delayAnimation: "100",
    },
    {
      id: 2,
      icon: "/img/featureIcons/3/2.svg",
      title: "Easy & Quick Booking",
      text: `Simplified Reservations for Instant Travel Plans.`,
      delayAnimation: "200",
    },
    {
      id: 3,
      icon: "/img/featureIcons/3/3.svg",
      title: "Customer Care 24/7",
      text: `Around-the-Clock Support for Your Peace of Mind.`,
      delayAnimation: "300",
    },
    {
      id: 4,
      icon: "/img/featureIcons/3/5.svg",
      title: "Free cancellation",
      text: `You'll receive a full refund if you cancel at least 24
      hours in advance of most experiences.`,
      delayAnimation: "300",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          autoplay: true, // Enable autoplay
          autoplaySpeed: 3000, // Set autoplay speed in milliseconds
          slidesToScroll: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          autoplay: true, // Enable autoplay
          autoplaySpeed: 5000, // Set autoplay speed in milliseconds
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          autoplay: true, // Enable autoplay
          autoplaySpeed: 5000, // Set autoplay speed in milliseconds
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {blockContent?.map((item) => (
          <div
            className="col-lg-3 col-sm-6"
            key={item.id}
            data-aos="fade"
            data-aos-delay={item.delayAnimation}
          >
            <div className="featureIcon -type-1 ">
              <div className="d-flex justify-center">
                <Image
                  width={70}
                  height={70}
                  src={item.icon}
                  alt="image"
                  className="js-lazy"
                />
              </div>
              <div className="text-center mt-30">
                <h4 className="text-18 fw-600">{item.title}</h4>
                <p className="text-15 mt-10">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default WhyChoose;
