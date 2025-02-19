"use client";
import DestinationSkeleton from "@/components/skeleton/DestinationSkeleton";
import { useGetImagesByMenuNameQuery } from "@/features/image/imageApi";
import Image from "next/image";
// import { useSelector } from "react-redux";

const Banner = ({ slug }) => {
  const { isSuccess, data, isLoading } = useGetImagesByMenuNameQuery(slug);

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
        <div className="absolute z-2 px-50 py-30 md:py-20 md:px-30">
          <h1
            className="text-50 fw-600 text-white lg:text-40 md:text-30"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Explore{" "}
            {slug == "medina"
              ? "Madina"
              : slug == "jedda"
              ? "Jeddah"
              : slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h1>
          <div
            className="text-white"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Explore deals, travel guides and things to do in{" "}
            {slug == "medina"
              ? "Madina"
              : slug == "jedda"
              ? "Jeddah"
              : slug.charAt(0).toUpperCase() + slug.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
