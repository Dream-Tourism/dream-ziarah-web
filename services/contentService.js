import { GET_CONTENTS_WITH_URL_BY_MENU_ID } from "@/constant/constants";
const getAllContentByMenuId = async (menuId) => {
  try {
    const res = await fetch(`${GET_CONTENTS_WITH_URL_BY_MENU_ID}/${menuId}`);
    return res.json();
  } catch (_err) {}
};

export default getAllContentByMenuId;
