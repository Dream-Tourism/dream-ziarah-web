"use client";
import { useGetAllMenuQuery } from "@/features/menu/menuApi";
import { addMenuItems } from "@/features/menu/menuSlice";
import { useGetLogoUrlQuery } from "@/features/site-setting/siteSettingApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
import MainMenu from "../MainMenu";
import MobileCurrencyMenu from "../MobileCurrencyMenu";
import MobileMenu from "../MobileMenu";

const Header = () => {
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
        <header className={`header bg-white ${navbar ? "is-sticky" : ""}`}>
          <div className="header__container px-30 sm:px-20">
            <div className="row justify-between items-center">
              <div className="col-auto header_logo_left_space">
                <div className="d-flex items-center">
                  <Link href="/" className="header-logo mr-20">
                    <Image
                      unoptimized
                      quality={100}
                      style={{ width: "60px", height: "60px" }}
                      src={logoLoading ? "/img/logo_loading.webp" : logoUrl}
                      width={128}
                      height={128}
                      alt="Hajj, Umrah and Ziarah"
                    />
                  </Link>
                  <div className="header-menu">
                    <div className="header-menu__content">
                      <MainMenu style="text-dark-1" />
                    </div>
                  </div>
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
                  <div className="row x-gap-20 items-center xxl:d-none">
                    <CurrenctyMegaMenu textClass="text-dark-1" />
                    <div className="col-auto">
                      <div className="w-1 h-20 bg-white-20" />
                    </div>
                  </div>
                  <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-dark-1">
                    <div>
                      <MobileCurrencyMenu />
                    </div>
                    <div>
                      <button
                        className="d-flex items-center icon-menu text-inherit text-20"
                        data-bs-toggle="offcanvas"
                        aria-controls="mobile-sidebar_menu"
                        data-bs-target="#mobile-sidebar_menu"
                      />
                      <div
                        className="offcanvas offcanvas-start  mobile_menu-contnet"
                        tabIndex="-1"
                        id="mobile-sidebar_menu"
                        aria-labelledby="offcanvasMenuLabel"
                        data-bs-scroll="true"
                      >
                        <MobileMenu />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
