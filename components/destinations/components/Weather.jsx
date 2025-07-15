import getTemperatureByLocation from "@/services/weatherService";
import "../../../styles/weather.scss";

const Weather = async ({ slug }) => {
  const temperature = await getTemperatureByLocation(slug);

  const weatherContent = [
    {
      id: 1,
      month: "DEC - FEB",
      highestTemperature: (temperature?.main?.temp_max - 273).toFixed(2) + "°",
      lowestTemperature: (temperature?.main?.temp_min - 273).toFixed(2) + "°",
    },
    {
      id: 2,
      month: "MAR - MAY",
      highestTemperature: (temperature?.main?.temp_max - 273).toFixed(2) + "°",
      lowestTemperature: (temperature?.main?.temp_min - 273).toFixed(2) + "°",
    },
    {
      id: 3,
      month: "JUN - AUG",
      highestTemperature: (temperature?.main?.temp_max - 273).toFixed(2) + "°",
      lowestTemperature: (temperature?.main?.temp_min - 273).toFixed(2) + "°",
    },
    {
      id: 4,
      month: "SEP - NOV",
      highestTemperature: (temperature?.main?.temp_max - 273).toFixed(2) + "°",
      lowestTemperature: (temperature?.main?.temp_min - 273).toFixed(2) + "°",
    },
  ];

  const weatherContentMobile = [
    {
      id: 1,
      month: "DEC - FEB",
      highestTemperature: (temperature?.main?.temp_max - 273).toFixed(2) + "°",
      lowestTemperature: (temperature?.main?.temp_min - 273).toFixed(2) + "°",
    },
    {
      id: 2,
      month: "MAR - MAY",
      highestTemperature: (temperature?.main?.temp_max - 273).toFixed(2) + "°",
      lowestTemperature: (temperature?.main?.temp_min - 273).toFixed(2) + "°",
    },
  ];

  return (
    <>
      {weatherContent.map((item) => (
        <div className="col-xl-3 col-6 mobile" key={item?.id}>
          <div className="text-15 lh-1 fw-600">{item?.date}</div>
          <div className="text-22 fw-600 mt-10">
            {item?.highestTemperature}{" "}
            <span className="text-light-1 ml-15">
              {item?.lowestTemperature}
            </span>
          </div>
        </div>
      ))}

      {weatherContentMobile.map((item) => (
        <div className="col-xl-3 col-6 desktop" key={item?.id}>
          <div className="text-15 lh-1 fw-600">{item?.date}</div>
          <div className="text-22 fw-600 mt-10">
            {item?.highestTemperature}{" "}
            <span className="text-light-1 ml-15">
              {item?.lowestTemperature}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Weather;
