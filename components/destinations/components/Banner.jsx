"use client";
import DestinationSkeleton from "@/components/skeleton/DestinationSkeleton";
import { useGetAllContentQuery } from "@/features/content/contentApi";
import { useGetImagesByMenuNameQuery } from "@/features/image/imageApi";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Interweave } from "interweave";

const Banner = ({ slug }) => {
  const { isSuccess, data, isLoading } = useGetImagesByMenuNameQuery(slug);
  const { menuItems } = useSelector((state) => state.menus);
  const destinationId = menuItems
    ?.find((item) => item.name === "Destinations")
    ?.children?.find((item) => item.name.toLowerCase() === slug)?.id;
  const { data: data2, isSuccess: isSuccess2 } =
    useGetAllContentQuery(destinationId);

  let description = "";
  if (isSuccess2) {
    description = data2[0]?.value;
  }

  // console.log(data2, "description in banner");

  let bannerUrl = "";
  if (isSuccess) {
    bannerUrl = `${
      data?.content_images[slug.charAt(0).toUpperCase() + slug.slice(1)]
    }`;
    localStorage.clear();
  }

  return isLoading ? (
    <DestinationSkeleton />
  ) : (
    <div className="col-12">
      <div className="relative d-flex">
        <Image
          src={bannerUrl}
          alt="banner"
          className="col-12 rounded-4 destination_banner_img"
          // loading="lazy"
          height={860}
          width={1920}
          priority={true}
          style={{ maxHeight: "448px" }}
        />
        {description && (
          <div className="absolute z-2 px-50 py-30 md:py-20 md:px-30 text-white">
            <div
              className="destination_content "
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                color: "white !important",
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
