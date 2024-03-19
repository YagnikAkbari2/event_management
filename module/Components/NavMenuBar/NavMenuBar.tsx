import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mainMenu } from "../../commonJSON/mainMenu.ts";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import usePermission from "../../hooks/usePermission.js";

function NavMenuBar({
  details,
  layoutType,
}: {
  details: any;
  layoutType: string;
}) {
  // let storeMap = {
  //   "002": true,
  //   "005": true,
  //   "006": true,
  //   "007": true,
  //   "009": true,
  //   "011": true,
  //   "012": true,
  //   "010": true,
  //   "013": true,
  //   "022": true,
  //   "023": true,
  //   "024": true,
  //   "029": true,
  //   "034": true,
  //   "040": true,
  //   "050": true,
  //   "052": true,
  //   "053": true,
  //   "065": true,
  //   "067": true,
  //   "069": true,
  //   "072": true,
  //   "004": true,
  //   "074": true,
  //   "003": true,
  //   "018": true,
  //   "077": true,
  //   // "005": true,
  //   // 105: true,
  //   // 123: true,
  //   "066": true,
  //   "035": true,
  //   "036": true,
  //   "038": true,
  //   "046": true,
  //   "047": true,
  //   "048": true,
  //   "037": true,
  //   // 104: true,
  //   "081": true,
  //   "075": true,
  //   "076": true,
  //   "080": true,
  //   "015": true,
  //   "016": true,
  //   "017": true,
  //   "019": true,
  //   "020": true,
  //   "021": true,
  //   "025": true,
  //   "026": true,
  //   "027": true,
  //   "028": true,
  //   "030": true,
  //   "031": true,
  //   "032": true,
  //   "033": true,
  //   "039": true,
  //   "043": true,
  //   "044": true,
  //   "051": true,
  //   "073": true,
  //   "014": true,
  //   "083": true,
  //   "084": true,
  // };
  const router = useRouter();
  const { userDetails, currentStoreData } = useSelector(
    (state) => (state as any).user
  );
  // const { storeDetails } = useSelector((state) => (state as any).product);
  // const { stockAuditLoginData } = useSelector((state) => (state as any)?.audit);
  // const { activeMenuField } = "";
  const { activeMenuField } = useSelector((state) => (state as any).ui);
  const [menus, setMenus] = useState<mainMenu[]>([]);
  const permission = usePermission();
  const [isMobile, setIsMobile] = useState(false);
  const checkPermissions = () => {
    if (userDetails?.is_super_admin) {
      setMenus([...mainMenu]);
    } else if (isMobile) {
      let allowedModules: mainMenu[] = [];
      mainMenu.map((ele) => {
        if (ele?.fieldKey === "search" || ele?.fieldKey === "inventory") {
          let sub_mod: mainMenu[] = [];
          let isAllowed = false;
          if (ele?.child && ele?.child?.length) {
            ele?.child?.map((sub_menu) => {
              isAllowed = permission(ele?.fieldKey, sub_menu?.fieldKey, null);
              if (isAllowed) {
                sub_mod.push(sub_menu);
              }
            });
            if (sub_mod?.length > 0) {
              allowedModules.push({
                title: ele.title,
                fieldKey: ele.fieldKey,
                imageUrl: ele.imageUrl,
                child: sub_mod,
                redirectUrl: ele?.redirectUrl ?? "",
                alternateFieldKey: ele?.alternateFieldKey ?? "",
              });
            }
          }
        }
      });
      setMenus(allowedModules);
    } else {
      let allowedModules: mainMenu[] = [];
      mainMenu.map((ele) => {
        let sub_mod: mainMenu[] = [];
        let isAllowed = false;
        if (ele?.child && ele?.child?.length) {
          ele?.child?.map((sub_menu) => {
            isAllowed = permission(ele?.fieldKey, sub_menu?.fieldKey, null);
            if (isAllowed) {
              sub_mod.push(sub_menu);
            }
          });
          if (sub_mod?.length > 0) {
            allowedModules.push({
              title: ele.title,
              fieldKey: ele.fieldKey,
              imageUrl: ele.imageUrl,
              child: sub_mod,
              redirectUrl: ele?.redirectUrl ?? "",
              alternateFieldKey: ele?.alternateFieldKey ?? "",
            });
          }
        } else {
          isAllowed = permission(ele?.fieldKey, ele?.fieldSubKey, null);
          if (isAllowed) {
            allowedModules.push({
              title: ele.title,
              fieldKey: ele.fieldKey,
              imageUrl: ele.imageUrl,
              child: [],
              redirectUrl: ele?.redirectUrl ?? "",
              alternateFieldKey: ele?.alternateFieldKey ?? "",
            });
          }
        }
      });
      console.log("asdbxcbv", allowedModules);
      setMenus(allowedModules);
    }
  };
  const handleHideToggleMenu = () => {
    var menu = document.getElementById("main-menu");
    if (menu) {
      menu.classList.toggle("header-toggled");
    }
  };
  useEffect(() => {
    checkPermissions();
  }, [userDetails, currentStoreData, isMobile]);
  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
  }, []);
  return (
    <nav id="main-menu" className="bottom-navbar">
      <div className="container px-3">
        <ul className="nav page-navigation">
          {menus?.map((ele, i) => {
            return (
              <li key={"mainli" + i} className="nav-item">
                {ele.child && ele?.child?.length ? (
                  <>
                    <a
                      className="nav-link"
                      style={
                        (
                          ele?.alternateFieldKey
                            ? ele?.alternateFieldKey === activeMenuField
                            : ele?.fieldKey === router?.asPath
                        )
                          ? {
                              borderBottom: "2px solid rgb(32, 33, 73)",
                            }
                          : {}
                      }
                    >
                      {/* TODO: change images to icon */}
                      <Image
                        width={24}
                        height={24}
                        src={ele.imageUrl}
                        alt="menu-icon"
                        className="me-2"
                      />
                      <span className="menu-title">{ele.title}</span>
                      <Image
                        width={14}
                        height={14}
                        src="/assets/navbar-menu/dropdown-arrow.svg"
                        alt="menu-icon"
                        className="link-arrow"
                      />
                    </a>
                    {ele?.child?.length > 0 && (
                      <div className="submenu">
                        <ul className="submenu-item">
                          {ele?.child?.map((item) => {
                            return (
                              <li
                                key={item.title + "123"}
                                className="category-heading"
                              >
                                <Link
                                  className={
                                    item?.redirectUrl &&
                                    router?.asPath?.includes(item?.redirectUrl)
                                      ? "active-navmenu"
                                      : ""
                                  }
                                  href={item.redirectUrl}
                                  onClick={() => {
                                    handleHideToggleMenu();
                                  }}
                                >
                                  <span className="ms-0">{item.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    className="nav-link"
                    href={ele.redirectUrl ?? "/"}
                    onClick={() => {
                      handleHideToggleMenu();
                    }}
                    style={
                      (
                        ele?.alternateFieldKey
                          ? ele?.alternateFieldKey === activeMenuField
                          : ele?.redirectUrl === router?.pathname
                      )
                        ? {
                            borderBottom: "2px solid rgb(32, 33, 73)",
                          }
                        : {}
                    }
                  >
                    {/* TODO: change images to icon */}
                    <Image
                      width={24}
                      height={24}
                      src={ele.imageUrl}
                      alt="menu-icon"
                      className="me-2"
                    />
                    <span className="menu-title">{ele.title}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
export default NavMenuBar;
