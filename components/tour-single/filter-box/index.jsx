import GuestSearch from "./GuestSearch";
// import DateSearch from "./DateSearch";

const index = ({setIsShowBokun}) => {
  return (
    <>

      <div className="col-12">
        <GuestSearch />
        {/* End guest */}
      </div>
      {/* End .col-12 */}

      <div className="col-12">
        <button
          onClick={() => setIsShowBokun(true)}
          className="button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white"
        >
          Proceed
        </button>
      </div>
      {/* End .col-12 */}
    </>
  );
};

export default index;
