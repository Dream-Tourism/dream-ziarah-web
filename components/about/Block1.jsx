import Image from "next/image";
const Block1 = () => {
  return (
    <>
      <div className="col-lg-5">
        <h2 className="text-30 fw-600">About Dream Ziarah</h2>
        <p className="mt-5">Where Journeys Become Spiritual Narratives</p>
        <p className="text-dark-1 mt-30 lg:mt-40 md:mt-20">
          Welcome to Dream Ziarah, your trusted partner for spiritual journeys.
          We specialize in making your pilgrimage comfortable and meaningful.
          Whether it's Ziarah, Hajj, or Umrah, we're here to simplify your
          experience. Our legacy is built on excellence, ensuring every detail
          is taken care of for a hassle-free journey.
          <br />
          <br />
          We prioritize your spiritual well-being, offering cozy accommodations,
          expert guidance, and moments of reflection. Join us for a journey
          where every step is filled with peace and purpose. Dream Ziarah is
          more than a service; it's your companion in turning your spiritual
          dreams into reality.
        </p>
      </div>
      {/* End .col */}

      <div className="col-lg-6">
        <Image
          unoptimized
          width={400}
          height={400}
          src="/img/pages/about/about.webp"
          alt="Hajj, Umrah and Ziarah"
          className="rounded-4 w-100"
        />
      </div>
      {/* End .col */}
    </>
  );
};

export default Block1;
