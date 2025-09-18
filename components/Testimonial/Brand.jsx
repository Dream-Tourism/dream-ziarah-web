import Image from "next/image";
const Brand = () => {
  const brandImages = ["bokun", "TripAdvisor_Logo", "viator"];
  return (
    <>
      {brandImages.map((item, i) => (
        <div className="col-4 col-md-auto " key={i}>
          <div className="d-flex justify-center">
            <Image
              width={130}
              height={26}
              src={`/img/clients/${item}.svg`}
              alt="image"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Brand;
