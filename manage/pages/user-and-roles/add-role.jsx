import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createRoleData,
  getRoleData,
  getRoleList,
  getSingleRole,
} from "../../redux/actions/roleAction";
import { resetUIAction } from "../../redux/actions/uiAction";
import { loadingAction } from "../../redux/actions/loaderAction";

import RoleForm from "../../Components/Shared/RoleForm/RoleForm";
import { getToaster } from "../../redux/actions/toasterAction";
import BreadCrumbs from "../../Components/Shared/BreadCrumbs/breadCrumbs";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";

const AddRolePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { roleData, roleList, singleRole } = useSelector(
    (state) => state.roles
  );
  const { isSuccess } = useSelector((state) => state.ui);
  const [fieldData, setFieldData] = useState([]);
  const [inputData, setInputData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isDropdownPresent, setIsDropdownPresent] = useState(false);

  const [isEdited, setIsEdited] = useState(false);

  const onChangeInput = (e) => {
    setIsEdited(true);
    if (e.target.name) {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
      setIsValid(e.target.value);
    } else {
      setSearchText(e.target.value);
    }
  };

  const onChangePermission = (check, permission, sub_module, module) => {
    console.log("onChangePermission", check, permission, sub_module, module);
    setIsEdited(true);
    let da = fieldData;
    let flag = false;

    da?.map((ele) => {
      if (
        ele?.module.toLowerCase() === module?.module_name.toLowerCase() &&
        ele?.sub_module.toLowerCase() ===
          sub_module?.sub_module_name.toLowerCase()
      ) {
        if (check.target.checked) {
          ele?.permissions?.push(permission);
        } else {
          var index = ele?.permissions?.indexOf(permission);
          if (index !== -1) {
            ele?.permissions?.splice(index, 1);
          }
        }
        flag = true;
      }
    });

    if (flag === false) {
      da.push({
        module: module?.module_name,
        sub_module: sub_module?.sub_module_name,
        permissions: [permission],
      });
    }
    setFieldData([...da]);
  };

  const onSelectAllRoles = (e, module, sub_module) => {
    console.log("onSelectAllRoles", e, module, sub_module);
    let da = fieldData;
    if (e.target.checked) {
      let kk = da.filter((d) => {
        if (
          d.module === module &&
          d?.sub_module === sub_module?.sub_module_name
        ) {
          return d;
        }
      });
      if (kk && kk?.length) {
        da[da.indexOf(kk[0])].permissions = [
          "LIST",
          "DELETE",
          "APPROVE",
          "ADD",
          "EDIT",
        ];
      } else {
        da.push({
          module: module,
          sub_module: sub_module?.sub_module_name,
          permissions: ["LIST", "DELETE", "APPROVE", "ADD", "EDIT"],
        });
      }
    } else {
      let kk = da.filter((d) => {
        if (
          d.module === module &&
          d?.sub_module === sub_module?.sub_module_name
        ) {
          return d;
        }
      });
      if (kk && kk?.length) {
        da.splice(da.indexOf(kk[0]), 1);
      }
    }
    setFieldData([...da]);
  };

  const onSubmit = () => {
    if (inputData?.role_name) {
      const lists = fieldData.filter((e) => {
        if (e.permissions.length > 0) {
          return e;
        }
      });
      console.log("listslist", lists);
      if (lists?.length > 0) {
        dispatch(loadingAction({ isLoading: true }));
        console.log("sdsdds", {
          name: inputData?.role_name,
          user_permissions: lists,
        });
        dispatch(
          createRoleData({
            role_name: inputData?.role_name,
            user_permissions: lists,
          })
        );
      } else {
        dispatch(
          getToaster({
            type: "error",
            message: "At Least One Permission is Required.",
          })
        );
      }
    } else {
      setIsValid(inputData?.role_name);
    }
  };

  const onSearchSelect = (val) => {
    setIsEdited(true);
    setSearchText("");
    setInputData({ ...inputData, search: val?.name });
    setIsDropdownPresent(false);

    if (val.id) {
      dispatch(getSingleRole(val?.id));
    }
  };

  useEffect(() => {
    dispatch(getRoleData());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/user-and-roles/role-management");
      dispatch(loadingAction({ isLoading: false }));
    }
    dispatch(resetUIAction());
  }, [dispatch, router, isSuccess]);

  useEffect(() => {
    if (searchText?.length > 0) {
      dispatch(getRoleList(`search=${searchText},name`));
      setIsDropdownPresent(true);
    } else {
      setIsDropdownPresent(false);
      setInputData({ ...inputData, search: "" });
    }
  }, [dispatch, searchText]);

  useEffect(() => {
    if (singleRole?.user_permissions?.length) {
      setFieldData(singleRole?.user_permissions);
    }
  }, [singleRole]);

  return (
    <div className="page-content">
      <div className="row d-flex justify-content-between">
        <PageHeader />
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body p-0">
              <RoleForm
                title="New Role"
                closeRedirectUrl="/user-and-roles/role-management"
                roleData={roleData}
                fieldData={[...fieldData]}
                inputData={inputData}
                onChangeInput={onChangeInput}
                onChangePermission={onChangePermission}
                onSubmit={onSubmit}
                innerSearchValue={searchText || inputData?.search}
                onSelectAllRoles={onSelectAllRoles}
                onChangeSearch={onChangeInput}
                isValid={isValid}
                dropdownData={[
                  {
                    title: "Role Name",
                    field: "name",
                  },
                ]}
                selectColumnSearch={{
                  title: "Role Name",
                  field: "name",
                }}
                onSearchSelect={onSearchSelect}
                searchResults={roleList}
                isDropdownPresent={isDropdownPresent}
                isEdited={isEdited}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
AddRolePage.permission = {
  module: "master",
  sub_module: "user",
  alternateKey: "settingsMaster",
  roles: ["ADD"],
  redirectURL: "/user-and-roles/role-management",
};
export default AddRolePage;
