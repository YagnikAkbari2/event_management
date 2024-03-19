import { useRouter } from "next/router";
import { tokens } from "../../commonjs/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { changePasswordForm } from "../../commonJSON/changePasswordForm";
import CommonMasterModal from "../Shared/CommonModal/CommonMasterModal";
import CommonConfirmationModal from "../Shared/CommonModal/CommonConfirmationModal";
import useCheckValidation from "../../hooks/useCheckValidation";
import { changePassword } from "../../redux/actions/productAction";
import {
  loadingAction,
  setCurrentStoreData,
} from "../../redux/actions/userAction";
import { resetUIAction } from "../../redux/actions/uiAction";
import Image from "next/image";
function Navbar({ layoutType }: { layoutType: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkValidation = useCheckValidation();
  const [storeName, setStoreName] = useState("");
  const { isSuccess } = useSelector((state) => (state as any).ui);
  const { userDetails, currentStoreData } = useSelector(
    (state) => (state as any).user
  );
  const [show, setShow] = useState(false);
  const [passwordData, setPasswordData] = useState({});
  const [isCheckValid, setIsCheckValid] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [currentStore, setCurrentStore] = useState<{
    id: number | null;
    name?: string;
  }>({ id: null });
  const [allowedStores, setAllowedStores] = useState([]);
  const [showChangeStoreModal, setShowChangeStoreModal] = useState(false);
  const [confirmStoreChangeData, setConfirmStoreChangeData] = useState<{
    id?: string;
    name?: string;
  }>({});
  const [isMobile, setIsMobile] = useState(false);
  const handleMenu = () => {
    var menu = document.getElementById("main-menu");
    if (menu) {
      menu.classList.toggle("header-toggled");
    }
  };
  const onCLickPassword = () => {
    setVisible(!isVisible);
  };
  useEffect(() => {
    if (userDetails) {
      setStoreName(userDetails?.name ?? "");
    }
  }, [userDetails]);
  const onLogout = async (e: Event) => {
    e.preventDefault();
    tokens.remove();
    localStorage.clear();
    router.push("/login");
  };
  const handleChangeInput = (
    e: React.FormEvent<HTMLInputElement>,
    f: { fieldName: string }
  ) => {
    var data = passwordData;
    data[f?.fieldName] = e.currentTarget.value;
    setPasswordData({ ...data });
  };
  const utilsFormData = () => {
    let form = changePasswordForm;

    return form;
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(loadingAction({ isLoading: false }));
      dispatch(resetUIAction());
      setShow(false);
      setPasswordData({});
    }
  }, [dispatch, isSuccess]);
  const handleSave = async () => {
    setIsCheckValid(true);
    let data = JSON.parse(JSON.stringify(passwordData));

    if (await checkValidation(utilsFormData(), data)) {
      if (passwordData) {
        dispatch(changePassword({ ...data }));
      }
      setIsCheckValid(false);
      setPasswordData({});
    }
  };
  // const handleCurrentStoreChange = (val) => {
  //   dispatch(
  //     setCurrentStoreData({
  //       id: val?.store_id,
  //       name: val?.store_name,
  //     })
  //   );
  // };
  useEffect(() => {
    let activeStoreID = currentStoreData?.id;
    let activeStoreName = currentStoreData?.name;
    console.log("outoutsall", activeStoreID);
    if (activeStoreID) {
      if (activeStoreID !== currentStore?.id) {
        setCurrentStore({ id: activeStoreID, name: activeStoreName });
        let totalStores = userDetails?.permissions ?? [];
        totalStores = totalStores?.filter(
          (val: { store_id: string }, idx: number) =>
            parseInt(val?.store_id) !== parseInt(activeStoreID)
        );
        setAllowedStores(totalStores);
      }
    }
  }, [currentStoreData, userDetails]);
  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
  }, []);
  return (
    <nav className="navbar top-navbar">
      <div className="container">
        <div className="navbar-content">
          <a className="navbar-brand me-0">
            <Image
              width={130}
              height={28}
              src="/assets/medcart-logo.svg"
              alt="makrt-logo"
              className=""
              style={{ marginBottom: "-5px" }}
            />
            <span className="text-light fs-5 ps-3">MK Retail Excellence</span>
          </a>
          <ul className="navbar-nav">
            {userDetails && !userDetails?.is_super_admin && !isMobile && (
              <Dropdown className="d-flex align-items-center">
                <Dropdown.Toggle className="bg-light text-primary navbar-custom-dropdown">
                  {currentStore?.name && currentStore?.name !== ""
                    ? currentStore?.name
                    : `Store ${currentStore?.id}`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allowedStores?.length > 0 &&
                    allowedStores?.map(
                      (
                        val: { store_id?: string; store_name?: string },
                        idx
                      ) => {
                        return (
                          <Dropdown.Item
                            onClick={() => {
                              setShowChangeStoreModal(true);
                              setConfirmStoreChangeData({
                                id: val?.store_id,
                                name: val?.store_name,
                              });
                            }}
                            key={"idx" + idx}
                          >
                            <span>
                              {val?.store_name && val?.store_name !== ""
                                ? val?.store_name
                                : `Store ${val?.store_id}`}
                            </span>
                          </Dropdown.Item>
                        );
                      }
                    )}
                </Dropdown.Menu>
              </Dropdown>
            )}

            <div
              className="d-flex justify-content-center align-items-center navbar-user-name ms-3"
              id="profile-toggle"
            >
              <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex" style={{ color: "#fff" }}>
                  <span>
                    {(storeName ? storeName.toUpperCase() : "") ?? "Medkrt"}
                  </span>
                </div>
              </div>
              <div className="vr mx-2 ms-3" style={{ color: "#fff" }}></div>
            </div>
            {userDetails && !userDetails?.is_super_admin && isMobile && (
              <Dropdown
                as="li"
                drop="down"
                className="nav-item nav-item-stores"
              >
                <Dropdown.Toggle
                  as="a"
                  className="nav-link"
                  id="profile-toggle"
                >
                  {currentStore?.name && (
                    <div
                      className="d-flex justify-content-center align-items-center text-primary  cursor-pointer user-profile"
                      style={{ fontSize: 12 }}
                    >
                      <div className="d-flex">
                        <span>
                          {currentStore?.name?.substring(0, 1)?.toUpperCase()}
                        </span>
                        {/* <span>{userDetails?.last_name?.substring(0, 1)}</span> */}
                      </div>
                    </div>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  as="div"
                  className="dropdown-menu"
                  style={{
                    right: "0px !important",
                    inset: "0px 0px 0px 0px",
                    width: "calc(100%)",
                    marginTop: "50px",
                  }}
                >
                  <ul className="list-unstyled new-list p-1">
                    <Dropdown.Item
                      className={"border-bottom border-dark py-2 my-1"}
                      onClick={() => {
                        setShowChangeStoreModal(true);
                        setConfirmStoreChangeData({
                          id: val?.store_id,
                          name: val?.store_name,
                        });
                      }}
                      disabled={true}
                    >
                      <span>{currentStore?.name}</span>
                    </Dropdown.Item>
                    {allowedStores?.length > 0 &&
                      allowedStores?.map(
                        (
                          val: { store_id?: string; store_name?: string },
                          idx: number
                        ) => {
                          return (
                            <Dropdown.Item
                              // className={` ${idx !== allowedStores?.length - 1 ? "border-bottom border-dark" : ""}`}
                              onClick={() => {
                                setShowChangeStoreModal(true);
                                setConfirmStoreChangeData({
                                  id: val?.store_id,
                                  name: val?.store_name,
                                });
                              }}
                              key={"idx" + idx}
                            >
                              <span>
                                {val?.store_name && val?.store_name !== ""
                                  ? val?.store_name
                                  : `Store ${val?.store_id}`}
                              </span>
                            </Dropdown.Item>
                          );
                        }
                      )}
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Dropdown as="li" drop="down" className="nav-item">
              <Dropdown.Toggle
                as="a"
                className="nav-link rounded-circle"
                id="profile-toggle"
              >
                {storeName && (
                  <div
                    className="d-flex justify-content-center align-items-center rounded-circle text-primary  cursor-pointer user-profile"
                    style={{ fontSize: 12 }}
                  >
                    <div className="d-flex">
                      <span>{storeName?.substring(0, 1)?.toUpperCase()}</span>
                      {/* <span>{userDetails?.last_name?.substring(0, 1)}</span> */}
                    </div>
                  </div>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu as="div" className="dropdown-menu p-0">
                <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
                  <div className="my-3">
                    {storeName && (
                      <div
                        className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-light fs-2 cursor-pointer"
                        style={{ height: "64px", width: "64px" }}
                      >
                        <div>
                          <span>
                            {storeName.substring(0, 1)?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="tx-16 fw-bolder">{`${
                      storeName ? storeName?.toUpperCase() : ""
                    }`}</p>
                    <p className="tx-12 text-muted">{userDetails?.email}</p>
                  </div>
                </div>
                <ul className="list-unstyled p-1">
                  {/* <Dropdown.Item as="li" className="py-2 cursor-pointer">
                    <i className="me-2 icon-md" data-feather="user"></i>
                    <Link href={``}>
                      {" "}
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          // setIsDropdownPresent(false);
                        }}
                      >
                        Change passsword
                      </span>{" "}
                    </Link>
                  </Dropdown.Item> */}
                  <Dropdown.Item as="li" className="py-2 cursor-pointer">
                    <a onClick={(e: Event) => onLogout(e)} className="d-flex">
                      <i className="me-2 icon-md" data-feather="log-out"></i>
                      <span>Log Out</span>
                    </a>
                  </Dropdown.Item>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <div className="vr d-lg-none"></div>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            onClick={() => handleMenu()}
            type="button"
            data-toggle="horizontal-menu-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <CommonMasterModal
          show={show}
          title={"Change Password"}
          formData={utilsFormData()}
          fieldData={passwordData}
          configData={""}
          handleChangeSelect={""}
          handleChangeInput={handleChangeInput}
          isCheckValid={isCheckValid}
          onChangeInputTag={""}
          handleSave={handleSave}
          isEdited={""}
          isVisible={isVisible}
          onCLickPassword={onCLickPassword}
          handleToggle={() => {
            setShow(!show);
            setIsCheckValid(false);
            //   setMrpPtrData({});
            //   setIsEdited(false);
          }}
          onSearchSelect={() => {
            //   if (e?.is_active && !e?.is_discontinued) {
            //     setIsEdited(true);
            //     setMrpPtrData({ ...mrpPtrData, products: e });
            //   }
          }}
          onChangeSearch={() => {
            // if (!edit && e.target.value.trim() !== "") {
            //   dispatch(getProductsDetails(e.target.value));
            // }
          }}
        />
        <CommonConfirmationModal
          show={showChangeStoreModal}
          title="Are You Sure?"
          message="This will change the complete layout as you are changing the Current Store Value"
          handleClose={() => {
            setShowChangeStoreModal(false);
            setConfirmStoreChangeData({});
          }}
          handleConfirm={() => {
            dispatch(
              setCurrentStoreData({
                id: confirmStoreChangeData?.id,
                name: confirmStoreChangeData?.name,
              })
            );
            window.location.replace("/");
            setConfirmStoreChangeData({});
            setShowChangeStoreModal(false);
          }}
        />
      </div>
    </nav>
  );
}
export default Navbar;
