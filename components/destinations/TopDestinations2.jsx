"use client";
import { useGetImagesByMenuIdQuery } from "@/features/image/imageApi";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const TopDestinations2 = ({ slug }) => {
  const { menuItems } = useSelector((state) => state.menus);
  const destinationId = menuItems.find(
    (item) => item.name === "Destinations"
  )?.id;
  const { isSuccess, data } = useGetImagesByMenuIdQuery(destinationId);
  console.log(data, "data in top destination");

  // Function to get nearby destinations based on current location
  const getNearbyDestinations = (location) => {
    const locationName = location.toLowerCase();

    switch (locationName) {
      case "makkah":
        return [
          {
            name: "Madinah",
            distance: "400km",
            description:
              "visit the Prophet's Mosque with a guided ziyarat tour in Saudi Arabia",
          },
          {
            name: "Taif",
            distance: "150km",
            description:
              "see Taif ziyarat places like Abdullah Ibn Abbas Mosque",
          },
          {
            name: "Jeddah",
            distance: "70km",
            description: "check ziyarat in the holy places",
          },
        ];
      case "madinah":
        return [
          {
            name: "Makkah",
            distance: "400km",
            description:
              "visit the Makkah Haram Sharif with guided ziyarat tours in Saudi Arabia",
          },
          {
            name: "Taif",
            distance: "600km",
            description:
              "see Taif ziyarat places like the Abdullah Ibn Abbas Mosque",
          },
          {
            name: "Jeddah",
            distance: "330km",
            description: "check Ziyarat in Jeddah holy places",
          },
        ];
      case "jeddah":
        return [
          {
            name: "Makkah",
            distance: "70km",
            description:
              "visit the Makkah Haram Sharif with guided ziyarat tours in Saudi Arabia",
          },
          {
            name: "Madinah",
            distance: "330km",
            description: "see the Prophet's Mosque",
          },
          {
            name: "Taif",
            distance: "150km",
            description: "check Taif ziyarat places",
          },
        ];
      case "taif":
        return [
          {
            name: "Makkah",
            distance: "150km",
            description:
              "visit the Makkah Haram Sharif with guided ziyarat tours in Saudi Arabia",
          },
          {
            name: "Madinah",
            distance: "600km",
            description: "see the Prophet's Mosque",
          },
          {
            name: "Jeddah",
            distance: "150km",
            description: "check ziyarat in Jeddah's holy places",
          },
        ];
      default:
        return [];
    }
  };

  let destinations = [];
  if (isSuccess) {
    destinations = menuItems
      .find((item) => item.name === "Destinations")
      ?.children?.filter((subItem) => subItem.name.toLowerCase() !== slug)
      ?.map((item) => ({
        id: item.id,
        img: `${data?.content_images[item?.name]}`,
        location: item.name,
        properties: "4,090",
        delayAnimation: "0",
        nearbyDestinations: getNearbyDestinations(item.name),
      }));
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2.09,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const placeholderImg = "/images/placeholder.jpg";
  console.log(destinations, "destinations");
  return (
    <>
      <Slider {...settings}>
        {destinations?.map((item) => (
          <div
            className={`${item.colClass} top_destination_width px-5`}
            key={item.id}
            data-aos="fade"
            data-aos-delay={item.delayAnimation}
          >
            <Link
              href={`/destinations/${item?.location?.toLowerCase()}`}
              className="citiesCard -type-3 d-block h-full rounded-4 "
            >
              <div className="citiesCard__image ratio ratio-3:2">
                <Image
                  className="col-12 js-lazy"
                  src={item?.img || placeholderImg}
                  width={800}
                  height={600}
                  quality={100}
                  priority
                  alt={item?.name}
                />
              </div>
              <div className="citiesCard__content d-flex flex-column justify-content-center align-items-center p-3">
                <h4 className="text-26 fw-600 text-white text-capitalize mb-2">
                  {item.location}
                </h4>

                {/* Nearby Destinations */}
                {item.nearbyDestinations &&
                  item.nearbyDestinations.length > 0 && (
                    <div
                      className="nearby-destinations text-center"
                      style={{ fontSize: "9px" }}
                    >
                      {item.nearbyDestinations.map((nearby, index) => (
                        <div
                          key={index}
                          className="text-white mb-1"
                          style={{ lineHeight: "1.3" }}
                        >
                          <strong>{nearby.name}</strong>: {nearby.distance}{" "}
                          away, {nearby.description}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default TopDestinations2;
