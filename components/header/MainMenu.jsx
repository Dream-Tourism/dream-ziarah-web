"use client";

import useMenus from "@/hooks/useMenus";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch, useSelector } from "react-redux";

const MainMenu = ({ style = "" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const menuItems = useMenus(); // uses useSelector internally

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   router.push("/");
  // };

  const currentPathName =
    pathname.split("/")[1] === "destinations"
      ? "/destinations"
      : pathname.split("/")[1] === "blog-details"
      ? "/blog"
      : pathname;

  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        {menuItems?.map((menu) => (
          <li
            key={menu.id}
            className={`${
              isActiveLink(menu?.routePath, currentPathName) ? "current" : ""
            } menu-item-has-children`}
          >
            {menu?.children?.length > 0 ? (
              <a href="#">
                <span className="mr-10 fw-500">{menu.name}</span>
                <i className="icon icon-chevron-sm-down" />
              </a>
            ) : (
              <Link href={menu?.routePath}>
                <span className="mr-10 fw-500">{menu.name}</span>
              </Link>
            )}
            {menu.children.length > 0 && (
              <ul className="subnav">
                {menu.children.map((item) => (
                  <li
                    key={item.id}
                    className={`${
                      isActiveLink(item.routePath, pathname) ? "current" : ""
                    } menu-item-has-children fw-500`}
                  >
                    <Link href={item.routePath}>
                      {item.name == "Jedda"
                        ? "Jeddah"
                        : item.name == "Medina"
                        ? "Madina"
                        : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li className="mr-10 fw-500">
          {isAuthenticated ? (
            <button className="btn btn-sm btn-dark">
              Logout ({user?.name})
            </button>
          ) : (
            <Link href="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
          )}
        </li>
        {isAuthenticated && (
          <li>
            <Link href="/dashboard" className="btn btn-sm btn-primary">
              Show Orders
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainMenu;
