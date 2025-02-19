const getTemperatureByLocation = async (location = "") => {
  try {
    const apiKey = "8ec65fcca805707c99e46bf466be466f";
    // const endDate = Math.floor(Date.now() / 1000);
    // const startDate = endDate - 15552000;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      location === "makkah" ? "makka" : location
    },Saudi Arabia&APPID=${apiKey}`;
    const res = await fetch(url);
    return res.json();
  } catch (_err) {}
};

export default getTemperatureByLocation;
