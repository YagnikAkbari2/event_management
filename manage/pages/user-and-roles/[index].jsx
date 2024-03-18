import Image from "next/image";
import dynamic from "next/dynamic";
import { viewFormate } from "../../commonjs/globalDateFormat";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const ListingComponents = dynamic(
  () => import("../../Components/Shared/ListingComponents/ListingComponents"),
  { ssr: false }
);
import { ADD_TOASTER, getToaster } from "../../redux/actions/toasterAction";
import CommonMasterModal from "../../Components/Shared/CommonModal/CommonMasterModal";
import {
  getUsersList,
  getUser,
  updateUserDetails,
  addUserDetails,
  updateUserStatus,
  deleteUser,
  changePassword,
  storeSearch,
  changePasswordUser,
  resetUserData,
} from "../../redux/actions/userAction";
// import { getProductLocationMasterData } from "../../redux/actions/locationAction";
import moment from "moment/moment";
import { Form, Tab, Tabs } from "react-bootstrap";
import ExpandComponent from "../../Components/Shared/ExpandComponent/ExpandComponent";
// import { getWarehouseList } from "../../redux/actions/warehouseAction";
import { bulkUpdateRole, getRoleList } from "../../redux/actions/roleAction";
import { useRouter } from "next/router";
import CommonConfirmationModal from "../../Components/Shared/CommonModal/CommonConfirmationModal";
import { resetUIAction } from "../../redux/actions/uiAction";
import { loadingAction } from "../../redux/actions/loaderAction";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import QueryUtilityFunc from "Components/Shared/QueryUtilityFunc/QueryUtilityFunc";

import usePermission from "../../hooks/usePermission";
import { permissions } from "../../commonjs/constants";

import useCheckValidation from "../../hooks/useCheckValidation";
import { UserMaster, constantConfig } from "../../commonJSON/usersMasterForm";
import { searchDebounce2 } from "../../commonjs/searchDebounce";
import { PasswordForm } from "../../commonJSON/passwordForm";
moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1 s",
    ss: "%ss",
    m: "1 m",
    mm: "%dm",
    h: "1 h",
    hh: "%dh",
    d: "1 D",
    dd: "%dD",
    M: "1 M",
    MM: "%dM",
    y: "1 Y",
    yy: "%dY",
  },
});
const dataNewRolesRow = {
  sectionType: "body",
  rowClassName: "row mb-0",
  bodyClassName: "col-lg-12",
  inputClassName: "row col-12",
  groupClassName: "col-5 p-0 mb-3",
  lastChildClassName:
    "col-2 d-flex justify-content-end ps-0 align-items-end mb-3",
  child: [
    {
      sectionType: "body",
      rowClassName: "row mb-0",
      inputClassName: "col-12",
      bodyClassName: "col-12",
      labelClassName: "col-12 p-0 fs-7 ps-3 text-muted justify-content-start",
      parent: "permissions",
      child: [
        {
          label: "Role",
          isRequired: true,
          rowClassName: "row mb-0",
          fieldType: "tag-input",
          className: "col-12",
          fieldName: "role",
          optionKey: "name",
          optionValue: "id",
          isMulti: false,
          validation: function (data) {
            return { isValid: false };
          },
        },
      ],
    },
    {
      sectionType: "body",
      rowClassName: "row mb-0",
      inputClassName: "col-12",
      bodyClassName: "col-12 pe-2",
      labelClassName: "col-12 p-0 fs-7 ps-3 text-muted justify-content-start",
      parent: "permissions",
      child: [
        {
          fieldName: "store",
          rowClassName: "row mb-0",
          label: "Store",
          isRequired: true,
          fieldType: "tag-input",
          className: "col-12",
          optionKey: "name",
          optionValue: "id",
          isMulti: false,
          validation: function (data) {
            return { isValid: false };
          },
        },
      ],
    },

    {
      sectionType: "body",
      rowClassName: "row mb-0",
      bodyClassName:
        "d-flex justify-content-center align-items-center h-100 w-100 mb-0",
      child: [
        {
          id: "removeButton",
          label: "X",
          rowClassName: "row mb-0",
          fieldType: "button",
          fieldName: "permissions",
          className:
            "btn d-flex justify-content-center align-items-center border",
          showLabel: false,
          buttonChild: () => {
            return (
              <Image
                width={15}
                height={20}
                src="/assets/close_icon.svg"
                className="icon "
                alt="password"
              />
            );
          },
          validation: function (data) {
            return { isValid: false };
          },
        },
      ],
    },
  ],
};
function UsersMasterList() {
  const [checkPermission, setCheckPermission] = useState({});
  const {
    usersList,
    user,
    userListMeta,
    userDetails,
    currentWarehouse,
    storeListData,
  } = useSelector((state) => state?.user);
  const onEditClick = (id) => {
    let formJson = UserMaster;
    setFormUserData(formJson);
    dispatch(getUser(id));
    setShow(true);
    setEdit(true);
  };
  const [showPassword, setPasswordShow] = useState(false);

  const onPasswordChangeClick = (id) => {
    setFormUserData(PasswordForm);
    dispatch(getUser(id));
    setPasswordShow(true);
    setEdit(true);
    setIsChangePasswordModel(true);
  };

  const usersMasterData = {
    column: [
      {
        title: "Full Name",
        field: "",
        isShort: false,
        enabledSelection: checkPermission["EDIT"],
        customField: (row) => {
          return (
            <>
              <div className="d-flex">
                {checkPermission["EDIT"] && (
                  <Form.Check
                    type="checkbox"
                    id="id"
                    label=""
                    disabled={userDetails.id === row.id}
                    checked={row["checked"]}
                    onChange={(e) => handleUserCheck(e, "single", row)}
                  />
                )}
                <p>{row.name ?? "" + " " + row.last_name ?? ""}</p>
              </div>
            </>
          );
        },
      },
      {
        title: "Email",
        field: "email",
        isShort: false,
      },
      {
        title: "Role",
        field: "",
        isShort: false,
        customField: (row) => {
          return (
            <ExpandComponent
              controlClick={(rowVal, idx) => controlClick(rowVal, idx)}
              data={row.permissions ?? ""}
              rowValue={row}
              list={true}
              objectName={"role_name"}
            />
          );
        },
      },
      {
        title: "Store",
        field: "",
        isShort: false,
        customField: (row) => {
          return (
            <ExpandComponent
              controlClick={(rowVal, idx) => controlClick(rowVal, idx)}
              data={row.permissions ?? ""}
              list={true}
              rowValue={row}
              objectName={"store_name"}
            />
          );
        },
      },
      {
        title: "Last Login",
        field: "",
        isShort: false,
        customField: (row, ind) => {
          const time = moment(row.last_login).fromNow(true);
          return <p>{time === "Invalid date" ? "Unknown" : time}</p>;
        },
      },
      {
        title: "Status",
        field: "status",
        isShort: false,
        customField: (row, ind) => {
          return row.status === "Verified" ? (
            <Form.Check
              type="switch"
              disabled={!checkPermission["EDIT"] || userDetails.id === row.id}
              checked={row.is_active}
              onChange={(e) => {
                handleUpdateStatus(row);
              }}
            />
          ) : (
            <span className={"chip chip_active"}>
              <span className={"chip_point chip_point_active"}> • </span>
              {"Invited"}
            </span>
          );
        },
      },
      {
        title: "",
        field: "",
        isShort: false,
        TbodyTdClass: "user-double-action-column",
        display:
          (checkPermission["EDIT"] === true ||
            checkPermission["DELETE"] === true ||
            checkPermission["APPROVE"]) ??
          false,
        customField: (row, ind) => {
          return (
            <div className="d-flex justify-content-end pe-1">
              {checkPermission["APPROVE"] && (
                <button
                  id="btn-edit"
                  className="btn p-0 me-2"
                  onClick={() => onPasswordChangeClick(row.id)}
                >
                  <Image
                    width={15}
                    height={15}
                    src="/assets/table/password_change.svg"
                    alt="Edit-button-icon"
                    className=""
                  />
                </button>
              )}
              {checkPermission["EDIT"] && (
                <button
                  id="btn-edit"
                  className="btn p-0 me-2"
                  onClick={() => onEditClick(row.id)}
                >
                  <Image
                    width={15}
                    height={15}
                    src="/assets/table/Edit-button.svg"
                    alt="Edit-button-icon"
                    className=""
                  />
                </button>
              )}
              {checkPermission["DELETE"] && (
                <button
                  id="delete-item"
                  className="btn p-0"
                  onClick={() => {
                    if (userDetails.id !== row.id) {
                      showUserDeleteModal(row?.id);
                    }
                  }}
                  style={{
                    opacity: userDetails.id === row.id ? 0.5 : 1,
                    cursor: userDetails.id === row.id ? "auto" : "pointer",
                  }}
                >
                  <Image
                    src="/assets/table/delete_icon.svg"
                    alt="delete-button-icon"
                    className=""
                    width={15}
                    height={15}
                  />
                </button>
              )}
            </div>
          );
        },
      },
    ],
    searchColumn: [
      {
        title: "Name",
        field: "name",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Role",
        field: "role",
      },
    ],
    filterColumn: [
      {
        title: "Role",
        field: "role",
        valueKey: "name",
        isSearchable: true,
        selectValue: "id",
      },
      {
        title: "Status",
        field: "status",
      },
    ],
    sortingColumn: [
      {
        title: "Full Name",
        field: "name",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Created By",
        field: "created",
      },
      {
        title: "Updated By",
        field: "modified",
      },
    ],
    userButtons: [
      { title: "Active", value: "ACTIVE" },
      { title: "Inactive", value: "INACTIVE" },
      { title: "Send Verification Mail", value: "VERIFY_LINK" },
    ],
  };

  const roleMasterData = {
    column: [
      {
        title: "Role Name",
        field: "name",
        isShort: false,
        enabledSelection: checkPermission["EDIT"],
        customField: (row) => {
          return (
            <>
              <div className="d-flex">
                {checkPermission["EDIT"] && (
                  <Form.Check
                    type="checkbox"
                    id="id"
                    label=""
                    disabled={userDetails.id === row.id}
                    checked={row["checked"]}
                    onChange={(e) => handleRoleCheck(e, "single", row)}
                  />
                )}
                <p>{row.name ?? "" + " " + row.last_name ?? ""}</p>
              </div>
            </>
          );
        },
      },
      {
        title: "No of Users",
        field: "no_of_users",
        isShort: false,
        TbodyTdClass: "number-list-align-table",
        TheadThClass: "listing-thead-th",
      },
      {
        title: "Created by",
        field: "created_by",
        isShort: false,
        customField: (row, ind) => {
          try {
            return (
              <div className="custom-group-label">
                {row.created_by ?? ""}
                <span>
                  &nbsp;
                  {`(${
                    row?.created_at
                      ? moment(
                          row?.created_at?.slice(1, row?.created_at.length - 1)
                        ).format(`${viewFormate} h:mm A`) ?? "-"
                      : "-"
                  })`}
                </span>
              </div>
            );
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "Updated by",
        field: "updated_by",
        isShort: false,
        customField: (row, ind) => {
          try {
            return (
              <div className="custom-group-label">
                {row.updated_by ?? ""}
                <span>
                  &nbsp;
                  {`(${
                    row?.updated_at
                      ? moment(
                          row?.updated_at?.slice(1, row?.updated_at.length - 1)
                        ).format(`${viewFormate} h:mm A`) ?? "-"
                      : "-"
                  })`}
                </span>
              </div>
            );
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        title: "Status",
        field: "status",
        isShort: false,
        customField: (row, ind) => {
          return (
            <Form.Check
              type="switch"
              disabled={!checkPermission["EDIT"]}
              checked={row.is_active}
              onChange={(e) => {
                onSwitchRole(row.id, row.is_active ? "INACTIVE" : "ACTIVE");
              }}
            />
          );
        },
      },
      {
        title: "",
        field: "",
        isShort: false,
        TbodyTdClass: "double-action-column",
        display:
          (checkPermission["EDIT"] === true ||
            checkPermission["DELETE"] === true) ??
          false,
        customField: (row, ind) => {
          return (
            <div className="d-flex justify-content-end pe-2">
              {checkPermission["EDIT"] && (
                <button
                  id="btn-edit"
                  className="btn p-0 me-1"
                  onClick={() =>
                    router.push(`/user-and-roles/role-edit/${row.id}`)
                  }
                >
                  <Image
                    width={10}
                    height={10}
                    src="/assets/table/Edit-button.svg"
                    alt="Edit-button-icon"
                    className=""
                  />
                </button>
              )}
              {checkPermission["DELETE"] && (
                <button
                  id="delete-item"
                  className="btn p-0"
                  onClick={() => showModal(row?.id)}
                >
                  <Image
                    src="/assets/table/delete_icon.svg"
                    alt="delete-button-icon"
                    className=""
                    width={10}
                    height={10}
                  />
                </button>
              )}
            </div>
          );
        },
      },
    ],
    searchColumn: [
      {
        title: "Role Name",
        field: "name",
      },
    ],
    filterColumn: [
      {
        title: "Status",
        field: "status",
      },
    ],
    sortingColumn: [
      {
        title: "Role Name",
        field: "name",
      },
      {
        title: "Created By",
        field: "created",
      },
      {
        title: "Updated By",
        field: "modified",
      },
    ],
    roleButtons: [
      { title: "Active", value: "ACTIVE" },
      { title: "Inactive", value: "INACTIVE" },
    ],
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const permission = usePermission();
  const checkValidation = useCheckValidation();
  const { roleList, roleListMeta } = useSelector((state) => state.roles);

  const [formUserData, setFormUserData] = useState(UserMaster ?? []);
  const [usersListData, setUsersListData] = useState([]);
  const [roleListData, setRoleListData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(
    router?.query?.index ?? "user-management"
  );
  const [selectedColumnSearch, setSelectColumnSearch] = useState(
    selectedTab == "role-management"
      ? roleMasterData.searchColumn[0] ?? ""
      : usersMasterData.searchColumn[0]
  );
  const { isSuccess } = useSelector((state) => state.ui);
  const [valueDataUser, setValueDataUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRoleQuery, setSearchRoleQuery] = useState("");
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({ permissions: [{}] });
  const [isEdit, setEdit] = useState(false);

  const [selectedSortValue, setSelectedSortValue] = useState({
    val: "created",
    type: "d",
  });
  const [selectedFilterValue, setSelectedFilterValue] = useState({});
  const [valueData, setValueData] = useState({
    status: ["Active", "Inactive"],
  });
  const [showDelete, setShowDelete] = useState(false);
  const [showUserDelete, setShowUserDelete] = useState(false);
  const [isCheckValid, setIsCheckValid] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showRoleActions, setShowRoleActions] = useState(false);
  const [showUserActions, setShowUserActions] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [passwordData, setPasswordData] = useState({});
  const [userBulkButtons, setUserBulkButtons] = useState(
    usersMasterData?.userButtons
  );
  const [roleBulkButtons, setRoleBulkButtons] = useState(
    roleMasterData.roleButtons
  );
  const [isChangePasswordModel, setIsChangePasswordModel] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const onAdd = async () => {
    if (selectedTab === "user-management") {
      setEditData({ permissions: [{}] });
      setFormUserData([...UserMaster]);
      setShow(true);
    } else {
      router.push("/user-and-roles/add-role");
    }
  };
  useEffect(() => {
    dispatch(storeSearch());
  }, []);
  const controlClick = (row, showMore) => {
    let data = usersListData;
    data?.map((val, idx) => {
      if (val?.id === row?.id) {
        val["showMore"] = showMore;
      }
    });
    setUsersListData([...data]);
  };
  useEffect(() => {}, [usersListData]);
  useEffect(() => {
    selectedTab === "role-management"
      ? setSelectColumnSearch(roleMasterData.searchColumn[0] ?? "")
      : setSelectColumnSearch(usersMasterData.searchColumn[0]);
    setSelectedSortValue({
      val: "created",
      type: "d",
    });
    setSelectedFilterValue("");
    setSearchQuery("");
    setSearchRoleQuery("");
  }, [selectedTab]);

  useEffect(() => {
    setValueDataUser({
      ...valueDataUser,
      status: ["Active", "Inactive"],
    });
  }, []);
  const userFormControl = (isDisabled) => {
    let data = formUserData;
    if (formUserData && formUserData?.length) {
      formUserData[0].child.map((d, i) => {
        if (data[0].child[i].fieldType === "group-fields") {
          data[0].child[i].child[0];
        }
      });
    }
  };
  useEffect(() => {
    if (user?.permissions) {
      let newUserData = formUserData;
      if (newUserData[0]?.child[7]) {
        newUserData[0].child[7].child = [];
      }
      user?.permissions.map((d, i) => {
        if (i < user?.permissions?.length) {
          let dataNewRolesRowD = dataNewRolesRow;
          newUserData[0]?.child[7]?.child.push(dataNewRolesRowD);
          if (newUserData[0]?.child[8]?.child[0]?.child[0]?.child[1])
            newUserData[0].child[8].child[0].child[0].child[1].className =
              "btn text-primary text-nowrap d-block pt-0";
        }
      });
      let permissions = [];
      user?.permissions?.forEach((val) => {
        permissions.push({
          role: { name: val.role_name, id: val.role },
          store: { name: val.store_name, id: val.store },
        });
      });
      if (user?.id === userDetails?.id) {
        userFormControl(true);
      } else if (isChangePasswordModel) {
        let data = PasswordForm;
        data[0].child[0].isDisabled = true;
      } else {
      }
      setEditData({ ...user, permissions: permissions });
    }
  }, [user]);
  useEffect(() => {
    return () => {
      dispatch(resetUserData());
    };
  }, []);
  const handleChangeInputPassword = (e, f) => {
    var data = passwordData;
    data[f?.fieldName] = e.target.value;
    setEditData({ ...data });
  };
  useEffect(() => {
    setShowUserActions(false);
    setUsersListData([...usersList]);
  }, [usersList]);

  useEffect(() => {
    onQueryChange();
  }, [
    dispatch,
    searchQuery,
    selectedColumnSearch?.field,
    selectedSortValue,
    selectedFilterValue,
    searchRoleQuery,
  ]);

  const onDropdownSearch = (e, column) => {
    if (column.field === "store") {
      let data = [];
      if (!storeListData?.length > 0) {
        dispatch(storeSearch());
      }
      storeListData?.map((d) => {
        if (d.name.toLowerCase().includes(e.target.value.toLowerCase()))
          if (data.length < 5) return data.push({ id: d.id, name: d.name });
      });

      setValueDataUser({ ...valueDataUser, [column.field]: data });
    } else if (column.field === "role") {
      dispatch(getRoleList(`search=${e.target.value},name`));
    } else if (column.fieldName) {
      if (column.fieldName === "role")
        e.target.value.trim() !== "" &&
          dispatch(getRoleList(`search=${e.target.value},name`));
      else
        e.target.value.trim() !== "" &&
          dispatch(storeSearch(`q=${e.target.value}`));
    }
  };

  const handleChangeInput = (e, field) => {
    setIsEdited(true);
    if (field.fieldName === "mobile_number") {
      if (show && e.target.value.length <= 10) {
        setEditData({ ...editData, [field.fieldName]: e.target.value });
      }
    } else {
      if (show) {
        setEditData({ ...editData, [field.fieldName]: e.target.value });
      }
    }
  };

  useEffect(() => {
    if (!show && isEdit) {
      setEditData("");
      setEdit(false);
    }
  }, [show, isEdit]);

  const handleUpdateStatus = (row) => {
    dispatch(
      updateUserStatus({
        users: [row.id],
        action: row.is_active ? "INACTIVE" : "ACTIVE",
      })
    );
  };

  const showUserDeleteModal = (id) => {
    setDeleteId(id);
    setShowUserDelete(true);
  };

  const onDeleteUser = async () => {
    if (deleteId) {
      dispatch(deleteUser(deleteId));
    }
  };

  const handleSave = async () => {
    if (isChangePasswordModel) {
      let userdata = editData;
      if (
        checkPasswordValidation("password")?.isValid &&
        checkPasswordValidation("confirmPassword")?.isValid
      ) {
        dispatch(changePasswordUser({ id: user?.id, userDetails: editData }));
        setPasswordData({});
      }
    } else if (editData?.id !== userDetails?.id) {
      setIsCheckValid(true);
      if (isEdit) {
        let apiData = await utilDataForPassApi(editData);
        if (await checkValidation(UserMaster, apiData)) {
          let valid = true;
          if (apiData?.permissions && apiData?.permissions?.length > 0) {
            apiData?.permissions?.map((d) => {
              if (d?.role_id === 1) {
                valid = true;
              } else if (
                d.role_id === undefined ||
                d.role_id === null ||
                d.store_id === undefined ||
                d.store_id === null
              ) {
                valid = false;
              }
            });
          } else {
            valid = false;
          }
          if (valid) {
            dispatch(loadingAction({ isLoading: true }));
            dispatch(updateUserDetails(apiData));
          } else
            dispatch(
              getToaster({
                type: "error",
                message: "Role And Store Both Must Be Assigned.",
              })
            );
          setIsCheckValid(false);
        }
      } else {
        let apiData = await utilDataForPassApi(editData);
        if (await checkValidation(UserMaster, apiData)) {
          let valid = true;
          console.log("xcvxcb", apiData?.permissions);
          if (apiData?.permissions && apiData?.permissions?.length > 0) {
            apiData?.permissions?.map((d) => {
              if (d?.role_id === 1) {
                valid = true;
              } else if (
                d.role_id === undefined ||
                d.role_id === null ||
                d.store_id === undefined ||
                d.store_id === null
              ) {
                valid = false;
              }
            });
          } else {
            valid = false;
          }
          if (valid) {
            dispatch(loadingAction({ isLoading: true }));
            dispatch(addUserDetails(apiData));
          } else
            dispatch(
              getToaster({
                type: "error",
                message: "Role And Store Both Must Be Assigned.",
              })
            );
          setIsCheckValid(false);
        }
      }
    }
  };
  const handleChangeSelect = (e, field, index) => {
    setIsEdited(true);
    if (field.fieldName !== "salutation") {
      let permissions = editData?.permissions ?? [];
      if (index >= 0 && permissions) {
        if (permissions) {
          if (permissions.length === index) {
            permissions[index] = {};
          }
        }
        permissions[index][field.fieldName] = e;
        if (field?.fieldName === "role" && e?.name === "ADMIN") {
          delete permissions[index]["store"];
        }
      } else {
        permissions.push({
          [field.fieldName]: e,
        });
      }
      setEditData({ ...editData, permissions });
    } else {
      setEditData({ ...editData, [field.fieldName]: e.target.value });
    }
  };

  const onClickButton = (id, f, ind) => {
    if (editData?.id !== userDetails?.id) {
      if (id === "addButton") {
        let newUserData = formUserData;
        newUserData[0].child[8].child[0].child[0].child[1].className =
          "btn text-primary text-nowrap d-block text-end px-0 pt-0";
        let perm = editData?.permissions ?? [];
        perm.push({});
        setEditData({ ...editData, permissions: perm });
      } else if (id === "clearButton") {
        let newUserData = formUserData;
        newUserData[0].child[7].child = [dataNewRolesRow];
        newUserData[0].child[8].child[0].child[0].child[1].className =
          "btn text-primary text-nowrap d-none";
        let permissions = [{}];
        setEditData({ ...editData, permissions });
      } else if (id === "removeButton") {
        if (editData?.permissions?.length > 1) {
          let eData = editData.permissions;

          let newPermissions = eData?.filter((val, i) => {
            if (i !== ind) {
              return val;
            }
          });

          setEditData({ ...editData, permissions: newPermissions });
        }
      }
    }
  };

  const utilDataForPassApi = async (data) => {
    if (data) {
      let permissionsList = await data?.permissions?.map((d) => {
        return {
          role_id: d?.role?.id ?? d?.role,
          store_id: d?.store?.id ?? d?.store,
        };
      });
      let responseData = {
        salutation: data?.salutation ?? "",
        name: data?.name ?? "",
        last_name: data?.last_name ?? "",
        mobile_number: data?.mobile_number ?? "",
        password: data?.password ?? "",
        password_confirmation: data?.password_confirmation ?? "",
        email: data?.email ?? "",
        permissions: permissionsList ?? [],
      };
      if (data?.id) {
        responseData.id = data?.id;
      }
      return responseData;
    }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(loadingAction({ isLoading: false }));
      onQueryChange(1);
      setShow(false);
      setShowDelete(false);
      setShowUserDelete(false);
      setIsChangePasswordModel(false);
      setPasswordShow(false);
      let userMas = UserMaster;
      userMas[0].child[7].child = [userMas[0].child[7].child[0]];
      dispatch(resetUserData());
      setEditData({});
      setIsCheckValid(false);
    }
    dispatch(resetUIAction());
  }, [dispatch, isSuccess]);

  // Role Management
  const onQueryChange = (pageNo) => {
    dispatch(loadingAction({ isLoading: true }));
    if (selectedTab === "user-management") {
      const query = QueryUtilityFunc(
        searchQuery,
        selectedColumnSearch,
        selectedFilterValue,
        selectedSortValue,
        pageNo ?? 1,
        usersMasterData.filterColumn
      );
      dispatch(getUsersList(query));
    } else {
      const query = QueryUtilityFunc(
        searchRoleQuery,
        selectedColumnSearch,
        selectedFilterValue,
        selectedSortValue,
        pageNo ?? 1,
        roleMasterData.filterColumn
      );
      dispatch(getRoleList(query));
    }
  };

  const controlBulkButtonRole = async () => {
    let buttons = roleMasterData.roleButtons;
    let data = roleList;
    let is_active = [];
    is_active = await data?.filter((e) => {
      if (e?.checked && e?.is_active) {
        return e;
      }
    });
    let is_in_active = await data?.filter((e) => {
      if (e?.checked && !e?.is_active) {
        return e;
      }
    });
    if (is_in_active.length) {
      buttons = [...[{ title: "Active", value: "ACTIVE" }]];
    }
    if (is_active.length) {
      buttons = [...[{ title: "Inactive", value: "INACTIVE" }]];
    }
    if (is_active.length && is_in_active.length) {
      buttons = [...[]];
    }
    setRoleBulkButtons([...buttons]);
  };

  const uncheckAll = () => {
    let data = roleList;
    let val =
      data.filter((val) => {
        if (!val.checked) {
          return val;
        }
      }).length === 0;

    data.forEach((ele) => {
      ele["checked"] = !val;
    });
    setRoleListData([...data]);
    setShowRoleActions(!val);
    controlBulkButtonRole();
  };

  const selectAll = () => {
    let data = roleList;

    data.forEach((ele) => {
      ele["checked"] = true;
    });
    setRoleListData(data);
    setShowRoleActions(true);
    controlBulkButtonRole();
  };

  const handleRoleCheck = (e, type, rowValue) => {
    let data = roleListData.map((ele) => {
      if (ele?.id === rowValue?.id) {
        ele["checked"] = !ele["checked"];
      }
      return ele;
    });
    if (
      data.filter((val) => {
        if (val.checked) {
          return val;
        }
      }).length === 0
    ) {
      setShowRoleActions(false);
    } else {
      setShowRoleActions(true);
    }
    setRoleListData(data);
    controlBulkButtonRole();
  };

  const controlBulkButtonUser = async () => {
    let buttons = usersMasterData?.userButtons;
    let data = usersList;
    let is_active = [];
    let is_invited = [];
    is_active = await data?.filter((e) => {
      if (e?.checked && e?.is_active) {
        return e;
      }
    });
    is_invited = await data?.filter((e) => {
      if (e?.checked && e?.status === "Invited") {
        return e;
      }
    });
    let is_in_active = await data?.filter((e) => {
      if (e?.checked && !e?.is_active && e?.status === "Verified") {
        return e;
      }
    });

    if (is_active?.length && is_in_active?.length === 0) {
      buttons = [...[{ title: "Inactive", value: "INACTIVE" }]];
    }
    if (
      is_invited?.length &&
      is_active?.length === 0 &&
      is_in_active?.length === 0
    ) {
      buttons = [
        ...[
          { title: "Send Verification Mail", value: "VERIFY_LINK" },
          { title: "Active", value: "ACTIVE" },
        ],
      ];
    }
    if (
      is_in_active?.length &&
      is_active?.length === 0 &&
      is_invited?.length === 0
    ) {
      buttons = [...[{ title: "Active", value: "ACTIVE" }]];
    }
    if (is_in_active?.length && is_invited?.length) {
      buttons = [...[]];
    }
    if (is_active?.length && is_invited?.length) {
      buttons = [...[]];
    }
    if (is_active?.length && is_in_active?.length) {
      buttons = [...[]];
    }
    if (is_active?.length && is_in_active?.length && is_invited?.length) {
      buttons = [...[]];
    }

    setUserBulkButtons([...buttons]);
  };

  const selectAllUsers = () => {
    let data = usersList;
    data.forEach((ele) => {
      if (userDetails.id !== ele.id) {
        ele["checked"] = true;
      }
    });
    controlBulkButtonUser();

    setUsersListData(data);
    setShowUserActions(true);
  };

  const handleUserCheck = async (e, type, rowValue) => {
    let data = await usersList.map((ele) => {
      if (ele?.id === rowValue?.id) {
        ele["checked"] = !ele["checked"];
      }
      return ele;
    });

    if (
      data.filter((val) => {
        if (val.checked) {
          return val;
        }
      }).length === 0
    ) {
      setShowUserActions(false);
    } else {
      setShowUserActions(true);
    }
    controlBulkButtonUser();
    setUsersListData(data);
  };

  const uncheckAllUsers = () => {
    let data1 = usersList.filter((d) => {
      if (userDetails.id !== d.id) {
        return d;
      }
    });
    let data = usersList;
    let val =
      data1.filter((val) => {
        if (!val.checked) {
          return val;
        }
      }).length === 0;

    data.forEach((ele) => {
      if (userDetails.id !== ele.id) {
        ele["checked"] = !val;
      }
    });

    setUsersListData(data);
    setShowUserActions(!val);
    controlBulkButtonUser();
  };

  const onBulkButtonClickUser = (action) => {
    let lstIds = [];
    usersList.forEach((ele) => {
      if (ele?.checked === true) {
        lstIds.push(ele?.id);
      }
    });

    dispatch(
      updateUserStatus({
        users: lstIds,
        action: action,
      })
    );
    setShowUserActions(false);
  };

  const onBulkButtonClick = (action) => {
    let lstIds = [];
    roleListData.forEach((ele) => {
      if (ele?.checked === true) {
        lstIds.push(ele?.id);
      }
    });

    dispatch(
      bulkUpdateRole({
        roles: lstIds,
        action: action,
      })
    );
    setShowRoleActions(false);
  };

  const onSwitchRole = async (id, action) => {
    dispatch(
      bulkUpdateRole({
        roles: [id],
        action: action,
      })
    );
    setShowRoleActions(false);
  };

  const showModal = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const closeModal = () => {
    setShowDelete(false);
    setShowUserDelete(false);
    setDeleteId(null);
  };

  const onDelete = async () => {
    if (deleteId) {
      dispatch(bulkUpdateRole({ roles: [deleteId], action: "DELETE" }));
      setShowDelete(false);
    }
  };
  const checkPasswordValidation = (type) => {
    setIsCheckValid(true);
    if (type === "confirmPassword") {
      if (!editData?.password_confirmation) {
        return { isValid: false, message: "Confirm Password is required." };
      }
      if (editData?.password_confirmation?.length < 6) {
        return {
          isValid: false,
          message: "Minimum 6 digit Password require..",
        };
      }
      if (editData?.password !== editData?.password_confirmation) {
        dispatch({
          type: ADD_TOASTER,
          payload: {
            type: "error",
            message: "Password and Confirm Password should be same",
          },
        });
        return { isValid: false, message: "Password does not match." };
      }
      return { isValid: true, message: "" };
    }
    if (type === "password") {
      if (!editData?.password) {
        return { isValid: false, message: "Password is required." };
      }
      if (editData?.password?.length < 6) {
        return { isValid: false, message: "Minimum 6 digit Password require." };
      }
      // if (!password_regex.test(password)) {
      //     return { isValid: !password ? true : false, message: "Password must be Alphanumbric" }
      // }
      return { isValid: true, message: "" };
    }
  };
  useEffect(() => {
    setShowRoleActions(false);
    setRoleListData(roleList);
    setValueDataUser({
      ...valueDataUser,
      role: roleList,
      status: ["Active", "Inactive"],
    });
  }, [roleList]);

  // Check Permission
  useEffect(() => {
    if (userDetails) {
      let checkedPermission = {};
      permissions.forEach((ele) => {
        checkedPermission[ele] = permission("master", "user", ele);
      });
      if (!checkedPermission["LIST"]) {
        router.push("/");
      }
      setCheckPermission(checkedPermission);
    }
  }, [router, userDetails]);

  const utilFormData = () => {
    let fdata = formUserData;
    if (isEdit) {
      fdata[0].child[5] = {
        validation: function (data) {
          return { isValid: false };
        },
      };
      fdata[0].child[6] = {
        validation: function (data) {
          return { isValid: false };
        },
      };
    } else {
      fdata[0].child[5] = {
        label: "Password*",
        isRequired: true,
        fieldType: "input",
        inputType: "password",
        passWordVisible: true,
        fieldName: "password",
        validation: function (data) {
          return {
            isValid: !data || data?.length < 6 ? true : false,
            message: !data
              ? "Password is required"
              : data?.length < 6
              ? "Password should be minimum of 6 digits"
              : "",
          };
        },
      };

      fdata[0].child[6] = {
        label: "Confirmation Password*",
        isRequired: true,
        fieldType: "input",
        inputType: "password",
        fieldName: "password_confirmation",
        compareField: "password",

        validation: function (data, compareField) {
          return {
            isValid: compareField !== data ? true : false,
            message: "Password Not Matched.",
          };
        },
      };
    }
    fdata[0].child[7].child = [];
    editData?.permissions?.map((val, idx) => {
      let dataNewRole = {
        sectionType: "body",
        rowClassName: "row mb-0",
        bodyClassName: "col-lg-12",
        inputClassName: "row col-12",
        groupClassName: "col-5 p-0 mb-3",
        lastChildClassName:
          "col-2 d-flex justify-content-center ps-0 align-items-end mb-3",
        child: [
          {
            sectionType: "body",
            rowClassName: "row mb-0",
            inputClassName: "col-12",
            bodyClassName: "col-12",
            labelClassName:
              "col-12 p-0 fs-7 ps-3 text-muted justify-content-start",
            parent: "permissions",
            child: [
              {
                label: "Role",
                isRequired: true,
                rowClassName: "row mb-0",
                fieldType: "tag-input",
                className: "col-12",
                fieldName: "role",
                optionKey: "name",
                optionValue: "id",
                isMulti: false,
                validation: function (data) {
                  return { isValid: false };
                },
              },
            ],
          },
          {
            sectionType: "body",
            rowClassName: "row mb-0",
            inputClassName: "col-12",
            bodyClassName: "col-12 pe-2",
            labelClassName:
              "col-12 p-0 fs-7 ps-3 text-muted justify-content-start",
            parent: "permissions",
            child: [
              {
                fieldName: "store",
                rowClassName: "row mb-0",
                label: "Store",
                isRequired: true,
                fieldType: "tag-input",
                className: "col-12",
                optionKey: "name",
                optionValue: "id",
                isMulti: false,
                isDisabled: val?.role?.name === "ADMIN",
                validation: function (data) {
                  return { isValid: false };
                },
              },
            ],
          },

          {
            sectionType: "body",
            rowClassName: "row mb-0",
            bodyClassName:
              "d-flex justify-content-center align-items-center h-100 w-100 mb-0",
            child: [
              {
                id: "removeButton",
                label: "X",
                rowClassName: "row mb-0",
                fieldType: "button",
                fieldName: "permissions",
                className:
                  "btn d-flex justify-content-center align-items-center border",
                showLabel: false,
                buttonChild: () => {
                  return (
                    <Image
                      width={15}
                      height={20}
                      src="/assets/close_icon.svg"
                      className="icon "
                      alt="password"
                    />
                  );
                },
                validation: function (data) {
                  return { isValid: false };
                },
              },
            ],
          },
        ],
      };
      // dataNewRolesRow.child[1].child[0].isDisabled =
      val?.role?.name === "ADMIN";
      fdata[0].child[7].child.push({ ...dataNewRole });
    });
    return fdata;
  };
  const utilsPasswordFormData = () => {
    let form = PasswordForm;
    return form;
  };
  const onCLickPassword = () => {
    setVisible(!isVisible);
  };
  return (
    <>
      <div className="page-content">
        <PageHeader
          isAdd={checkPermission["ADD"] ?? false}
          onButtonClick={() => onAdd()}
        />
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body p-0">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={selectedTab}
                  onSelect={(k) => {
                    setSelectedTab(k);
                    router.push(`/user-and-roles/${k}`);
                  }}
                  className="d-flex justify-content-start custom_tabs_mk listing_page_tabs"
                >
                  <Tab
                    eventKey={"user-management"}
                    className={``}
                    title={"User Management"}
                  >
                    <ListingComponents
                      data={[...usersListData]}
                      column={usersMasterData?.column}
                      searchDropdownData={usersMasterData?.searchColumn ?? ""}
                      selectedColumnSearch={
                        selectedColumnSearch ?? usersMasterData?.searchColumn[0]
                      }
                      onSelectColumnSearch={(e) => {
                        setSelectColumnSearch(e);
                      }}
                      onChangeSearch={(e) => {
                        setSearchQuery(e.target.value?.trim());
                      }}
                      //filter
                      filterColumn={usersMasterData?.filterColumn ?? ""}
                      onSelectFilterColumn={(e) => {}}
                      filterValues={[]}
                      selectedFilterColumnValue={""}
                      onSelectFilterValue={() => {}}
                      onDropdownSearch={onDropdownSearch}
                      selectedFilterValue={selectedFilterValue}
                      valueData={valueDataUser ?? ""}
                      onSelectValue={(val, columnname) => {
                        setSelectedFilterValue({
                          ...selectedFilterValue,
                          [columnname.field]: val,
                        });
                      }}
                      clearAllFilter={(e) => {
                        e.preventDefault();
                        setSelectedFilterValue("");
                        setValueDataUser({
                          status: ["Active", "Inactive"],
                        });
                      }}
                      clearFilter={(columnData) => {
                        if (columnData?.field) {
                          if (
                            columnData?.field === "warehouse" ||
                            columnData?.field === "role"
                          ) {
                            setValueDataUser({
                              ...valueDataUser,
                              [columnData.field]: [],
                            });
                          }
                          setSelectedFilterValue({
                            ...selectedFilterValue,
                            [columnData.field]: "",
                          });
                        }
                      }}
                      // Sorting
                      sortingColumnData={usersMasterData?.sortingColumn ?? ""}
                      onSelectSortColumn={(val) => {
                        setSelectedSortValue({
                          ...selectedSortValue,
                          ["val"]: val.field,
                          ["type"]: selectedSortValue.type ?? "a",
                        });
                      }}
                      onSelectSortType={(sortType) => {
                        setSelectedSortValue({
                          ...selectedSortValue,
                          ["type"]: sortType,
                        });
                      }}
                      selectedSortColumn={selectedSortValue.val ?? ""}
                      selectedSortType={selectedSortValue.type ?? "a"}
                      paginationData={userListMeta}
                      showActions={showUserActions}
                      selectAll={selectAllUsers}
                      handleCheck={handleUserCheck}
                      uncheckAll={uncheckAllUsers}
                      searchQuery={searchQuery}
                      onClickButton={onBulkButtonClickUser}
                      buttons={userBulkButtons}
                      moveTo={(page) => {
                        onQueryChange(page);
                      }}
                      innerSearchValue={searchQuery ?? ""}
                    />
                  </Tab>
                  <Tab
                    eventKey={"role-management"}
                    className={``}
                    title={"Role Management"}
                  >
                    <ListingComponents
                      data={roleListData}
                      column={roleMasterData?.column}
                      searchDropdownData={roleMasterData?.searchColumn ?? ""}
                      selectedColumnSearch={
                        selectedColumnSearch ?? roleMasterData?.searchColumn[0]
                      }
                      onSelectColumnSearch={(e) => {
                        setSelectColumnSearch(e);
                      }}
                      onChangeSearch={(e) => {
                        setSearchRoleQuery(e.target.value?.trim());
                      }}
                      filterColumn={roleMasterData?.filterColumn ?? ""}
                      onSelectFilterColumn={(e) => {}}
                      filterValues={[]}
                      selectedFilterColumnValue={""}
                      onSelectFilterValue={() => {}}
                      selectedFilterValue={selectedFilterValue}
                      searchQuery={searchQuery}
                      valueData={valueData ?? ""}
                      onSelectValue={(val, columnname) => {
                        setSelectedFilterValue({
                          ...selectedFilterValue,
                          [columnname.field]: val,
                        });
                      }}
                      clearAllFilter={(e) => {
                        e.preventDefault();
                        setSelectedFilterValue("");
                      }}
                      clearFilter={(columnData) => {
                        if (columnData?.field) {
                          setSelectedFilterValue({
                            ...selectedFilterValue,
                            [columnData.field]: "",
                          });
                        }
                      }}
                      // Sorting
                      sortingColumnData={roleMasterData?.sortingColumn ?? ""}
                      onSelectSortColumn={(val) => {
                        setSelectedSortValue({
                          ...selectedSortValue,
                          ["val"]: val.field,
                          ["type"]: selectedSortValue.type ?? "a",
                        });
                      }}
                      onSelectSortType={(sortType) => {
                        console.log("xcvbcv", sortType);
                        setSelectedSortValue({
                          ...selectedSortValue,
                          ["type"]: sortType,
                        });
                      }}
                      selectedSortColumn={selectedSortValue.val ?? ""}
                      selectedSortType={selectedSortValue.type ?? "a"}
                      // Pagination
                      paginationData={roleListMeta}
                      moveTo={(page) => {
                        onQueryChange(page);
                      }}
                      // Check Box
                      selectAll={selectAll}
                      uncheckAll={uncheckAll}
                      handleCheck={handleRoleCheck}
                      onClickButton={onBulkButtonClick}
                      showActions={showRoleActions}
                      buttons={roleBulkButtons}
                      innerSearchValue={searchRoleQuery ?? ""}
                    />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <CommonMasterModal
          show={show}
          title={isEdit ? "Update User" : "New User"}
          formData={utilFormData()}
          fieldData={editData ?? ""}
          handleChangeInput={handleChangeInput}
          handleChangeSelect={handleChangeSelect}
          handleToggle={() => {
            if (show) {
              setIsChangePasswordModel(false);
            }
            setFormUserData([...UserMaster]);
            setEditData({});
            setShow(!show);
            setIsEdited(false);
            setIsCheckValid(false);
          }}
          isVisible={isVisible}
          onCLickPassword={onCLickPassword}
          onChangeInputTag={(e, field) => {
            if (e?.trim()) {
              if (field.fieldName === "store") {
                dispatch(storeSearch(`q=${e?.trim()}`));
              } else if (field.fieldName === "role") {
                dispatch(getRoleList(`search=${e?.trim()},name`));
              }
            }
          }}
          handleSave={handleSave}
          configData={{
            salutation: constantConfig.salutation,
            store: storeListData ?? [],
            role: roleList ?? [],
          }}
          onClickAddField={onClickButton}
          isCheckValid={isCheckValid}
          isEdited={isEdited}
        />
      )}
      <CommonMasterModal
        show={showPassword}
        title={"Change Password"}
        formData={utilsPasswordFormData()}
        fieldData={editData ?? {}}
        configData={""}
        handleChangeSelect={""}
        handleChangeInput={handleChangeInputPassword}
        isCheckValid={isCheckValid}
        onChangeInputTag={""}
        handleSave={handleSave}
        isEdited={""}
        isVisible={isVisible}
        onCLickPassword={onCLickPassword}
        handleToggle={() => {
          let data = editData;
          delete data?.password_confirmation;
          delete data?.password;
          setEditData({ ...data });
          if (showPassword) {
            setIsChangePasswordModel(false);
          }
          setPasswordShow(!showPassword);
          setIsCheckValid(false);
          setPasswordData({});
        }}
        onSearchSelect={(e) => {
          //   if (e?.is_active && !e?.is_discontinued) {
          //     setIsEdited(true);
          //     setMrpPtrData({ ...mrpPtrData, products: e });
          //   }
        }}
        onChangeSearch={(e) => {
          // if (!edit && e.target.value.trim() !== "") {
          //   dispatch(getProductsDetails(e.target.value));
          // }
        }}
      />
      {/* Delete Modal */}
      <CommonConfirmationModal
        show={showDelete}
        size="md"
        handleClose={closeModal}
        title="Delete Role"
        message="Are you sure you want to delete this role?"
        handleConfirm={onDelete}
      />
      {/* Delete User Modal */}
      <CommonConfirmationModal
        show={showUserDelete}
        size="md"
        handleClose={closeModal}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        handleConfirm={onDeleteUser}
      />
    </>
  );
}

UsersMasterList.permission = {
  module: "master",
  sub_module: "user",
  alternateKey: "settingsMaster",
  roles: ["LIST"],
  redirectURL: "/",
};
export default UsersMasterList;
