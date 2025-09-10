import { Interweave } from "interweave";
import { useState } from "react";

const Overview = ({ tour }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Use tour prop if available, otherwise fallback to tourItem from redux
  const currentTour = tour;

  // Function to toggle between showing full description or half of it
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Function to clean description for mobile - removes empty paragraph tags
  const cleanDescriptionForMobile = (description) => {
    return description?.replace(/<p>&nbsp;<\/p>/g, "");
  };

  // Calculate the length for displaying half of the description
  const cleanedDescription = cleanDescriptionForMobile(
    currentTour?.description
  );
  const halfLength = Math.ceil((cleanedDescription?.length || 0) / 2);

  return (
    <>
      <div className="row x-gap-40 y-gap-40">
        <div className="col-12 text-dark-1 text-15">
          <h3 className="text-22 fw-600 pb-15">Overview</h3>
          {cleanedDescription && (
            <>
              <div className="description-content mobile-optimized">
                <Interweave
                  allowAttributes
                  allowElements
                  disableLineBreaks={true}
                  content={
                    showFullDescription
                      ? cleanedDescription
                      : cleanedDescription.slice(0, halfLength)
                  }
                />
              </div>

              <button
                className="d-block lh-15 text-14 text-blue-1 underline fw-600 mt-5"
                onClick={toggleDescription}
              >
                {showFullDescription ? "See Less" : "See More"}
              </button>
            </>
          )}
        </div>

        {currentTour?.languages && (
          <div className="col-md-6">
            <h5 className="text-16 fw-600">Available languages</h5>
            <div className="text-15 mt-10">{currentTour.languages}</div>
          </div>
        )}

        <div className="col-md-6">
          <h5 className="text-16 fw-600">Cancellation policy</h5>
          <div className="text-15 mt-10">
            {currentTour?.cancellation ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: currentTour.cancellation,
                }}
              />
            ) : (
              <ul className="list-disc">
                <li>
                  We will charge a cancellation fee of 100% if booking is
                  cancelled 1 day or less before the event.
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Only apply gap reduction on mobile devices */
        @media (max-width: 768px) {
          .mobile-gap-fix :global(p:empty),
          .mobile-gap-fix :global(p):has(:global(&nbsp;):only-child) {
            display: none !important;
          }

          .mobile-gap-fix :global(p) {
            margin-bottom: 0.75rem !important;
          }
        }

        /* Preserve desktop spacing */
        @media (min-width: 769px) {
          .mobile-gap-fix :global(p) {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Overview;
