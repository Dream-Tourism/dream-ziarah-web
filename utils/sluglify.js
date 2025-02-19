// utils/slugify.js
export const slugify = (title) => {
  return title
    .toString()
    ?.replace(/[,.-]/g, "")
    ?.toLowerCase()
    ?.split(" ")
    ?.join("-");
};
