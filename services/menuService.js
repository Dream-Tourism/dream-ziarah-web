import { GET_MENUS_ALL_NESTED } from "@/constant/constants";
const getAllMenuItem = async () => {
  try {
    const res = await fetch(GET_MENUS_ALL_NESTED);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error('Error fetching menu items:', err);
    return null;
  }
};

export default getAllMenuItem;
