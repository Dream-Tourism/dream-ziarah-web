import { GET_CONTENTS_BY_MENU_CONTENT_ID } from "@/constant/constants";

export const singleTourInfo = {
  "Hajj 2024: Embrace the Divine": {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "65",
    languages: "",
    groupSize: "1-42",

    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1zyUakEQI3Oi8hrnipIJ1Hhkl1NtzG4c&ehbc=2E312F",
  },
  Umrah: {
    location: "Mecca, Saudi Arabia",
    numberOfReviews: "57",
    languages: "",
    groupSize: "3-8",
    itinerarySrc:
      "https://www.google.com/maps/d/u/2/embed?mid=1CM8PjQjW7zWc_PpHMpNHHHRYlZU1-cw&ehbc=2E312F",
  },
};
const UmrahHeading = async () => {
  const res = await fetch(`${GET_CONTENTS_BY_MENU_CONTENT_ID}/41`);
  let data;
  if (res.ok) {
    data = await res.json();
  }

  return (
    <div className="col-xl-8">
      <h1 className="text-25 fw-600">{data?.name}</h1>
      <div className="row x-gap-10 y-gap-10 items-center pt-10">
        <div className="col-auto">
          <div className="d-flex items-center">
            <div className="d-flex x-gap-5 items-center">
              <i className="icon-star text-10 text-yellow-1"></i>

              <i className="icon-star text-10 text-yellow-1"></i>

              <i className="icon-star text-10 text-yellow-1"></i>

              <i className="icon-star text-10 text-yellow-1"></i>

              <i className="icon-star text-10 text-yellow-1"></i>
            </div>

            <div className="text-14 text-light-1 ml-10">
              {singleTourInfo[data?.name]?.numberOfReviews} reviews
            </div>
          </div>
        </div>

        <div className="col-auto">
          <div className="row x-gap-10 items-center">
            <div className="col-auto">
              <div className="d-flex x-gap-5 items-center">
                <i className="icon-placeholder text-16 text-light-1"></i>
                <div className="text-15 text-light-1">
                  {singleTourInfo[data?.name]?.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahHeading;
