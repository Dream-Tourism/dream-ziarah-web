import { Interweave } from "interweave";

const ImportantInfo = ({ tour }) => {
  // console.log("importantinfo", tour);
  return (
    <div className="row x-gap-40 y-gap-40 justify-between pt-20">
      <div className="col-lg-4 col-md-6 description-content">
        {/* <div className="fw-600 mb-10">Inclusions</div> */}
        <Interweave
          allowAttributes
          allowElements
          disableLineBreaks={false}
          content={tour?.inclution}
        />
      </div>

      <div className="col-lg-4 col-md-6">
        {/* <div className="fw-600 mb-10">Departure details</div> */}
        <div className="text-15 description-content">
          <Interweave
            className="description-content"
            allowAttributes
            allowElements
            disableLineBreaks={false}
            content={tour?.overview}
          />
        </div>
      </div>

      <div className="col-lg-4 col-md-6 description-content">
        {/* <div className="fw-600 mb-10">Know before you go</div> */}
        <Interweave
          allowAttributes
          allowElements
          disableLineBreaks={false}
          content={tour?.know_before_you_go}
        />
      </div>

      <div className="col-lg-8 col-md-6 description-content">
        {/* <div className="fw-600 mb-10">Exclusions</div> */}
        <Interweave
          allowAttributes
          allowElements
          disableLineBreaks={false}
          content={tour?.additional_info}
        />
      </div>

      <div className="col-lg-4 col-md-6 description-content">
        {/* <div className="fw-600 mb-10">Additional information</div> */}
        <Interweave
          allowAttributes
          allowElements
          disableLineBreaks={false}
          content={tour?.exclusion}
        />
      </div>
    </div>
  );
};

export default ImportantInfo;
