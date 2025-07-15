import { useGetAllContentQuery } from "@/features/content/contentApi";
import { useGetAllCountryQuery } from "@/features/image/imageApi";
import { useSelector } from "react-redux";
const useTour = () => {
  // get all menu item from redux state
  const { menuItems } = useSelector((state) => state.menus);
  const homeId = menuItems.find((menu) => menu.name === "Home")?.id;
  const { data, isSuccess } = useGetAllCountryQuery(homeId);
  const { data: contents, isSuccess: isContentSuccess } =
    useGetAllContentQuery();

  let generatedData = [];
  if (isContentSuccess && isSuccess) {
    let homeContents = contents?.menu_items?.filter(
      (item) => item?.cms_menu?.name === "Home"
    );
    homeContents = homeContents?.filter((item) => {
      if (
        item.name === "Hello2" ||
        item.name === "Title" ||
        item.name === "Our Tour" ||
        item.name === "Our Tour Image" ||
        item.name === "About" ||
        item.name === "Companies"
      ) {
        return false;
      }
      return true;
    });

    generatedData = homeContents?.reduce((accu, curr) => {
      let temp = {
        id: curr.id,
        name: curr.name,
        price: curr.price,
        img: data?.content_images[curr.name],
      };
      accu.push(temp);
      return accu;
    }, []);
  }
  return generatedData;
};

export default useTour;
