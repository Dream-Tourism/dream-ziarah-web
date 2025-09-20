import { GET_CONTENTS_WITH_URL_BY_MENU_ID } from "@/constant/constants";
const getAllContentByMenuId = async (menuId) => {
  try {
    const res = await fetch(`${GET_CONTENTS_WITH_URL_BY_MENU_ID}/${menuId}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error('Error fetching content by menu ID:', err);
    return null;
  }
};

export default getAllContentByMenuId;
