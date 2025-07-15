import { GET_SLIDERSETTINGS } from "@/constant/constants";
import { useEffect, useState } from "react";
const getSlideimage = async() => {
  const res = await fetch(GET_SLIDERSETTINGS);
  const siteSettings =  await res.json();
  return siteSettings.homepage_sliders;
}
const useSlider = () => {
  const [slideImages, setSlideImages] = useState([]);
  useEffect(async() => {
    const images = await getSlideimage();
    setSlideImages(images);
  }, []);

  return slideImages;
}

export default useSlider;