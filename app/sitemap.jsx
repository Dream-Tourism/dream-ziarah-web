import {
  // GET_CMS_BLOGS,
  GET_CONTENTS_WITH_URL_BY_MENU_ID,
  GET_MENUS_ALL_NESTED,
} from "@/constant/constants";
import { slugify } from "@/utils/sluglify";

const BASE_URL = "https://dreamziarah.com";

export default async function Sitemap() {
  try {
    // Perform all fetch requests in parallel
    const [
      contentRes,
      //  blogRes,
      desRes,
    ] = await Promise.all([
      fetch(`${GET_CONTENTS_WITH_URL_BY_MENU_ID}/1`),
      // fetch(`${GET_CMS_BLOGS}`),
      fetch(`${GET_MENUS_ALL_NESTED}`),
    ]);

    // Check if all fetch requests were successful
    if (!contentRes.ok || !desRes.ok) {
      throw new Error(
        `Failed to fetch data: ${contentRes.status} ${contentRes.statusText}, ${desRes.status} ${desRes.statusText}`
      );
    }

    const [contentData, destinationData] = await Promise.all([
      contentRes.json(),
      // blogRes.json(),
      desRes.json(),
    ]);

    // Validate the fetched data
    if (!Array.isArray(contentData)) {
      throw new TypeError("Content data is not an array");
    }
    // if (!Array.isArray(blogsData.blogs)) {
    //   throw new TypeError("Blogs data is not an array");
    // }
    if (!Array.isArray(destinationData?.menus)) {
      throw new TypeError("Destination data is not an array");
    }

    // // Generate sitemap URLs
    // const blogsXml = blogsData.blogs.map((item) => ({
    //   url: `${BASE_URL}/blog-details/${encodeURIComponent(item.title)}`,
    //   lastModified: new Date(item.updated_at).toISOString(),
    //   changeFrequency: "yearly",
    //   priority: 1,
    // }));

    const excludedCountries = [
      "Makkah",
      "Medina",
      "Jedda",
      "Taif",
      "makkah",
      "medina",
      "taif",
      "jedda",
    ];
    const contentsXml = contentData
      .filter((item) => !excludedCountries.includes(item.name))
      .map((item) => ({
        url: `${BASE_URL}/tour/${encodeURIComponent(slugify(item.name))}`,
        lastModified: new Date(item.updated_at).toISOString(),
        changeFrequency: "yearly",
        priority: 1,
      }));

    const destinationsXml = destinationData.menus
      .filter((item) => item.name === "Destinations")
      .flatMap((item) =>
        item.children
          .filter((child) => child.name !== "United States")
          .map((child) => ({
            url: `${BASE_URL}/destinations/${encodeURIComponent(
              child.name.toLowerCase()
            )}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "yearly",
            priority: 1,
          }))
      );

    const otherXml = [
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: "yearly",
        priority: 1,
      },
      // {
      //   url: `${BASE_URL}/blogs`,
      //   lastModified: new Date().toISOString(),
      //   changeFrequency: "yearly",
      //   priority: 1,
      // },
      {
        url: `${BASE_URL}/terms?type=privacy_policy`,
        lastModified: new Date().toISOString(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${BASE_URL}/terms?type=general_terms_of_use`,
        lastModified: new Date().toISOString(),
        changeFrequency: "yearly",
        priority: 1,
      },
    ];

    const combinedXml = [
      ...contentsXml,
      // ...blogsXml,
      ...destinationsXml,
      ...otherXml,
    ];

    return combinedXml;
  } catch (error) {
    throw error;
  }
}
