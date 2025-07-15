import { useGetAllContentQuery } from "@/features/content/contentApi";
import { useGetImagesByMenuIdQuery } from "@/features/image/imageApi";
import getMonthDayYear from "@/utils/date";
import { useSelector } from "react-redux";

const useBlogs = () => {
    const {menuItems} = useSelector(state => state.menus);
    const blogId = menuItems.find((item) => item.name === "Blog")?.id;
    const {isSuccess: isContentSuccess, data : contentItems, isLoading: isBlogContentLoading} = useGetAllContentQuery(blogId);
    const {isSuccess, data, isLoading} = useGetImagesByMenuIdQuery(blogId);
   
    let blogPosts = [];
    if(isContentSuccess && isSuccess){
      blogPosts = contentItems?.map((item) => ({
        id: item.id,
        img: data.content_images[item.name],
        title: item.name,
        date: getMonthDayYear(item?.created_at),
        delayAnimation: "100",
        details: item.value,
        tag: "art",
        tags: ["adventure_travel", "food_drink"],
        created_at : item?.created_at,
        category : item?.category,
      }))
      
    }
    return blogPosts;
};

export default useBlogs;