import { Interweave } from "interweave";
import { useSelector } from "react-redux";

const ImportantInfo = ({ hajj, umrah, departure }) => {
  const { tourItem } = useSelector((state) => state.tour);

  return (
    <div className="row x-gap-40 y-gap-40 justify-between pt-20">
      <div className="col-lg-4 col-md-6">
        <div className="fw-600 mb-10">Inclusions</div>
        <Interweave
          allowAttributes
          allowElements
          disableLineBreaks={false}
          content={tourItem?.inclution}
        />
        {/* <ul className="list-disc">
          <li>Superior Coach, Wi-Fi and USB Charging On-board</li>
          <li>Expert guide</li>
          <li>Admission to Windsor Castle (if option selected)</li>
          <li>Admission to Stonehenge</li>
        </ul> */}
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="fw-600 mb-10">Departure details</div>
        <div className="text-15">
          {hajj ? (
            <>
              Package Duration Options: Select from two distinctive packages: a
              comprehensive 24-day journey or a condensed 14-day option.
              Performance of Hajj rituals focused on the pivotal 6th day.
              Booking Deadline: Secure your reservation by booking before 30th
              January. Departure Calendar Dates: For the 24-day package, choose
              departure on 4th June. For the 14-day package, select departure on
              10th June. Departure Airports: Departure options available from
              Milano, Rome, and Venice. Cancellation Policy: Last date for
              cancellation: 30th March. Cancellation fee: €200, with the
              remainder promptly refunded. Experience this sacred pilgrimage
              with confidence, ensuring a seamless departure tailored to your
              chosen package and schedule.
            </>
          ) : umrah ? (
            <>
              Check-out: Complete the check-out process from your respective
              hotel on the last day of the tour.Transfer to Airport: Enjoy a
              comfortable transfer from your accommodation to the airport for
              your departure.Flight Information: Board your scheduled flight,
              reaching your destination with the memories of a spiritually
              fulfilling journey.Farewell: Bid farewell to the sacred cities of
              Makkah and Madinah, carrying the essence of this pilgrimage with
              you.
            </>
          ) : (
            <>{departure?.departure}</>
          )}
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="fw-600 mb-10">Know before you go</div>
        <ul className="list-disc">
          <li>Duration: {tourItem?.duration}</li>
          <li>Mobile tickets accepted</li>
          <li>Instant confirmation</li>
        </ul>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="fw-600 mb-10">Exclusions</div>
        {/* <ul className="list-disc">
          <li>Hotel pick-up and drop-off</li>
          <li>Gratuities</li>
          <li>Lunch</li>
        </ul> */}
        <Interweave
          allowAttributes
          allowElements
          disableLineBreaks={false}
          content={tourItem?.exclusion}
        />
      </div>

      <div className="col-12">
        <div className="fw-600 mb-10">Additional information</div>
        <ul className="list-disc">
          <li>
            <span className="text-dark fw-600">Confirmation:</span> You will
            receive a confirmation at the time of booking.
          </li>
          <li>
            <span className="text-dark fw-600">Participant Suitability:</span>{" "}
            Most travelers can participate.
          </li>
          <li>
            <span className="text-dark fw-600">Weather Consideration:</span>{" "}
            Weather-dependent experience. In case of poor weather, you'll be
            offered an alternative date or a full refund.
          </li>
          {/* <li>
          <span className="text-dark fw-600">Private Experience:</span> This is a private tour/activity. Your group will be the sole participants.
          </li> */}
          <li>
            <span className="text-dark fw-600">Refund Window:</span>{" "}
            {hajj ? (
              <>To receive a full refund, please cancel it before 30th March.</>
            ) : umrah ? (
              <>
                To receive a full refund, please cancel it before 7 days before
                the tour.
              </>
            ) : (
              <>
                To receive a full refund, please cancel at least 24 hours before
                the experience start date.
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImportantInfo;
