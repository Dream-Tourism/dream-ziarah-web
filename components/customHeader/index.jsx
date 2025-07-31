"use client";
import { useGetAllMenuQuery } from "@/features/menu/menuApi";
import { addMenuItems } from "@/features/menu/menuSlice";
import { useGetLogoUrlQuery } from "@/features/site-setting/siteSettingApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Customheader = () => {
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);

  const {
    data,
    isSuccess: logoSuccess,
    isLoading: logoLoading,
  } = useGetLogoUrlQuery(null);
  const { data: menuData, isSuccess: menuSuccess } = useGetAllMenuQuery(null);

  useEffect(() => {
    const changeBackground = () => {
      setNavbar(window.scrollY >= 10);
    };
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    if (menuSuccess) {
      dispatch(addMenuItems(menuData?.menus));
    }
  }, [dispatch, menuSuccess, menuData]);

  const logoUrl = logoSuccess
    ? data?.general_settings[0].cloudflare_favicon
    : "";

  return (
    <>
      {!logoLoading && (
        <header
          className={`customheader bg-white ${navbar ? "is-sticky" : ""}`}
        >
          <div className="header__container px-120 sm:px-80">
            <div className="row justify-between items-center">
              <div className="col-auto customheader_logo_left_space ">
                <div className="d-flex items-center">
                  <Link href="/" className="header-logo mr-20">
                    <Image
                      unoptimized
                      quality={100}
                      style={{ width: "120px", height: "120px" }}
                      src={logoLoading ? "/img/logo_loading.webp" : logoUrl}
                      width={128}
                      height={128}
                      alt="Hajj, Umrah and Ziarah"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-auto">
                <div className="d-flex">
                  <a
                    className="btn-whatsapp-pulse whatsapp_icon"
                    href="https://api.whatsapp.com/send/?phone=966548037409&amp;text=Hi DreamZiarah, I need assistance&amp;type=phone_number&amp;lang=en"
                    target="_blank"
                  >
                    <Image
                      style={{ cursor: "pointer" }}
                      src="/img/whatsapp.svg"
                      width={30}
                      height={30}
                      alt="images"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Customheader;
