import { useEffect, useState } from "react";

const useWeather = (location = "") => {
  const [temperature, setTemperature] = useState({});
  useEffect(() => {
    const apiKey = "8ec65fcca805707c99e46bf466be466f";
    // const endDate = Math.floor(Date.now() / 1000);
    // const startDate = endDate - 15552000;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      location === "makkah" ? "makka" : location
    },Saudi Arabia&APPID=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTemperature(data);
      })
      .catch((_error) => {});
  }, []);
  return temperature;
};

export default useWeather;
