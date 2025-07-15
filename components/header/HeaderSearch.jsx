"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const HeaderSearch = () => {
  const [searchText, setSearchText] = useState("");
  const { menuItems } = useSelector((state) => state.menus);
  const destinations = menuItems.find(
    (item) => item.name === "Destinations"
  )?.children;

  const router = useRouter();
  const handleSubmit = () => {
    if (searchText) {
      const isLocation = destinations.find((item) =>
        item.name.toLowerCase().includes(searchText)
      );
      if (isLocation) {
        router.push(`/destinations/${isLocation?.name?.toLowerCase()}`);
      } else {
        // alert("Your Location is not found!")
        toast("Your Location is not found!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="single-field relative d-flex items-center xl:d-none mr-20">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <input
        value={searchText}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        onChange={(e) => setSearchText(e.target.value)}
        className="pl-50 border-light text-dark-1 h-50 rounded-8"
        type="text"
        required
        placeholder="Destination, attraction, hotel, etc"
      />
      <button
        onClick={handleSubmit}
        type="submit"
        className="absolute d-flex items-center h-full"
      >
        <i className="icon-search text-20 px-15 text-dark-1" />
      </button>
    </div>

    // <>
    //   <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
    //     <div
    //       data-bs-toggle="dropdown"
    //       data-bs-auto-close="true"
    //       data-bs-offset="0,22"
    //     >
    //        <div className="single-field  d-flex items-center xl:d-none mr-20">
    //   <input
    //     value={searchValue}
    //     onChange={(e) => setSearchValue(e.target.value)}
    //     className="pl-50 border-light text-dark-1 h-50 rounded-8"
    //     type="text"
    //     required
    //     placeholder="Destination, attraction, hotel, etc"
    //   />
    //   <button onClick={handleSubmit} type="submit" className="absolute d-flex items-center h-full">
    //     <i className="icon-search text-20 px-15 text-dark-1" />
    //   </button>
    // </div>
    //     </div>

    //     <div className="shadow-2 dropdown-menu min-width-400">
    //       <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
    //         <ul className="y-gap-5 js-results">
    //           {locationSearchContent.map((item) => (
    //             <li
    //               className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
    //                 selectedItem && selectedItem.id === item.id ? "active" : ""
    //               }`}
    //               key={item.id}
    //               role="button"
    //               onClick={() => handleOptionClick(item)}
    //             >
    //               <div className="d-flex">
    //                 <div className="icon-location-2 text-light-1 text-20 pt-4" />
    //                 <div className="ml-10">
    //                   <div className="text-15 lh-12 fw-600 js-search-option-target">
    //                     {item.name}
    //                   </div>
    //                   <div className="text-14 lh-12 text-light-1 mt-5">
    //                     {item.address}
    //                   </div>
    //                 </div>
    //               </div>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default HeaderSearch;
