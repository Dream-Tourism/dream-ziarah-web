import { GET_SITESETTINGS } from "@/constant/constants";
const useLogo = async () => {
  const res = await fetch(GET_SITESETTINGS);
  const siteSettings = await res.json();
  const logoUrl = `${siteSettings.general_settings[0].cloudflare_logo}`;
  return logoUrl;
};

export default useLogo;
