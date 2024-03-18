import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar.tsx";
import NavMenuBar from "../NavMenuBar/NavMenuBar";
import { tokens } from "../../commonjs/common";
import { getUserDetails } from "../../redux/actions/userAction";
import { useCallback, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useRouter } from "next/router";
import axios from "axios";
import usePermission from "../../hooks/usePermission";
function Layout({
  children,
  layoutType,
}: {
  children: string | JSX.Element | JSX.Element[] | any;
  layoutType: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => (state as any).user);
  const [token, setToken] = useState<string>();
  const perm: {
    module: string;
    sub_module?: string;
    roles: string[];
    redirectURL: string;
  } = children.type.permission;
  const permission = usePermission();
  const [isAllowed, setIsAllowed] = useState<boolean | null>();
  const { userDetails, currentWarehouse } = useSelector(
    (state) => (state as any).user
  );
  const getToken = useCallback(async () => {
    setToken(await tokens.get());
  }, []);
  useEffect(() => {
    getToken();
  }, [getToken]);
  useEffect(() => {
    if (token) {
      dispatch(getUserDetails());
    }
  }, [token]);
  useEffect(() => {
    if (userDetails) {
      if (perm?.module === "dashboard") {
        setIsAllowed(true);
      } else if (perm) {
        let allowed = null;
        perm.roles?.forEach((ele) => {
          allowed = permission(perm.module, perm.sub_module, ele);
        });
        setIsAllowed(allowed);
      }
    }
  }, [userDetails, children.type.permission]);

  useEffect(() => {
    if (isAllowed === false) {
      // router.push(perm?.redirectURL);
      window.location.href = perm?.redirectURL;
    }
  }, [isAllowed, perm?.redirectURL]);

  return (
    <div className={`main-wrapper `}>
      <div className="horizontal-menu">
        <Navbar layoutType={layoutType} />
        <NavMenuBar details={children.userDetails} layoutType={layoutType} />
      </div>
      {/* TODO : settings-sidebar */}
      <div className="page-wrapper">
        {children}
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
export default Layout;
