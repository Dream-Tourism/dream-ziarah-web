"use client";

import Image from "next/image";

const DestinationSkeleton = () => {
  // localStorage.clear();
  return (
    <div className="col-12 skeleton">
      <div className="relative d-flex">
        <Image
          src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/6b16b61e-0e45-4631-85a9-c9058ed0bf00/public"
          alt="image"
          className="col-12 rounded-4 destination_banner_img"
          height={860}
          width={1920}
          // style={{maxHeight: "448px", maxWidth:"1120px"}}
        />
      </div>
    </div>
  );
};

export default DestinationSkeleton;
