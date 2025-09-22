"use client";
import Image from "next/image";
import { slightContent } from "@/data/desinations";
import { useGetAllContentQuery } from "@/features/content/contentApi";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import { useState, useEffect } from "react";

const Slights = ({ slug }) => {
  const [isMobile, setIsMobile] = useState(false);

  const { menuItems } = useSelector((state) => state.menus);
  const destinationId = menuItems
    ?.find((item) => item.name === "Destinations")
    ?.children?.find((item) => item.name.toLowerCase() === slug)?.id;

  const { data: data2, isSuccess: isSuccess2 } =
    useGetAllContentQuery(destinationId);

  let spots = "";
  if (isSuccess2) {
    spots = data2[0]?.exclusion;
  }

  console.log(spots, "description in spots");

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parse spots data to extract individual items
  const parseSpots = (spotsHtml) => {
    if (!spotsHtml) return [];

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = spotsHtml;

    // Get all list items (including both p elements and direct text)
    const listItems = tempDiv.querySelectorAll("li");

    return Array.from(listItems).map((item, index) => {
      // Try to get text from p element first, then from li directly
      const pElement = item.querySelector('p[role="presentation"]');
      const text = pElement
        ? pElement.textContent || pElement.innerText
        : item.textContent || item.innerText;

      // Extract title from the text (everything before the colon)
      const colonIndex = text.indexOf(":");
      const title =
        colonIndex > 0
          ? text.substring(0, colonIndex).trim()
          : `Tour ${index + 1}`;
      const description =
        colonIndex > 0 ? text.substring(colonIndex + 1).trim() : text;

      return {
        id: index + 1,
        title: title,
        text: description,
        img:
          slightContent[slug]?.items?.[index]?.img ||
          slightContent[slug]?.items?.[0]?.img ||
          "/default-image.jpg",
        delayAnimation: (index + 1) * 100,
      };
    });
  };

  const spotsData = parseSpots(spots);

  // Use original slightContent if spots data is not available
  const displayData =
    spotsData.length > 0 ? spotsData : slightContent[slug]?.items || [];

  const SlightItem = ({ item, idx, totalItems }) => {
    // Determine column class based on number of items and position
    let colClass = "col-lg-6 col-12";
    if (totalItems === 3 && idx === 2) {
      colClass = "col-lg-6 col-12 offset-lg-3"; // Center the third item
    }

    return (
      <div
        className={colClass}
        key={item.id}
        data-aos="fade"
        data-aos-delay={item.delayAnimation}
      >
        <div className="rounded-4 border-light">
          <div className="d-flex flex-lg-row flex-column">
            <div className="d-flex justify-content-center align-items-center flex-shrink-0">
              <div
                className="ratio ratio-1x1"
                style={{ width: "150px", height: "150px" }}
              >
                <Image
                  width={150}
                  height={150}
                  src={item?.img}
                  alt="slights"
                  className="img-fluid rounded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex flex-column justify-content-center h-100 px-3 py-lg-0 py-3">
                <h3 className="text-lg-start text-center text-16 fw-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-13 mb-0">{item.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile ? (
        <div className="w-100">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
            className="slights-swiper"
          >
            {displayData.map((item, idx) => (
              <SwiperSlide key={item.id}>
                <SlightItem
                  item={item}
                  idx={idx}
                  totalItems={displayData.length}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="row g-4">
          {displayData.map((item, idx) => (
            <SlightItem
              key={item.id}
              item={item}
              idx={idx}
              totalItems={displayData.length}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Slights;
