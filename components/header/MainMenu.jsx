"use client";

import useMenus from "@/hooks/useMenus";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, logoutUserThunk } from "@/features/auth/authSlice";

const MainMenu = ({ style = "" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const menuItems = useMenus(); // uses useSelector internally

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    router.push("/login");
  };

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
        <li className="me-3 fw-500 dropdown">
          {isAuthenticated ? (
            <>
              <button
                className="btn btn-sm btn-dark dropdown-toggle d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="icon-user text-14"></i>
                {user?.first_name}
              </button>
              <ul className="dropdown-menu mt-2 shadow-sm border-0 rounded-3">
                <li>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                    <i className="icon-route text-14"></i>
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                    <i className="icon-route text-14"></i>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <Link
              href="/login"
              className="btn btn-sm btn-primary d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
            >
              <i className="icon-login text-14"></i>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
