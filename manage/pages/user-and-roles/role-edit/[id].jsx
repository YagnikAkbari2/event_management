import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createRoleData,
  getRoleData,
  getSingleRole,
} from "../../../redux/actions/roleAction";
import { resetUIAction } from "../../../redux/actions/uiAction";
import { loadingAction } from "../../../redux/actions/loaderAction";

import RoleForm from "../../../Components/Shared/RoleForm/RoleForm";
import { getToaster } from "../../../redux/actions/toasterAction";
import BreadCrumbs from "../../../Components/Shared/BreadCrumbs/breadCrumbs";
import PageHeader from "../../../Components/Shared/PageHeader/PageHeader";

const EditRolePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { roleData, singleRole } = useSelector((state) => state.roles);
  const { isSuccess } = useSelector((state) => state.ui);

  const [fieldData, setFieldData] = useState([]);
  const [inputData, setInputData] = useState({});
  const [isValid, setIsValid] = useState(true);

  const [isEdited, setIsEdited] = useState(false);

  const onChangeInput = (e) => {
    setIsEdited(true);
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    setIsValid(e.target.value);
  };

  const onChangePermission = (check, permission, sub_module, module) => {
    console.log(
      "onChangePermission",
      check.target.checked,
      permission,
      sub_module,
      module
    );
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

      if (lists?.length > 0) {
        dispatch(loadingAction({ isLoading: true }));
        dispatch(
          createRoleData({
            role_name: inputData?.role_name,
            user_permissions: lists,
            role_id: router?.query?.id,
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

  useEffect(() => {
    dispatch(getRoleData());
    if (router?.query?.id) {
      dispatch(getSingleRole(router?.query?.id));
    }
  }, [dispatch, router?.query.id]);
  useDispatch(() => {}, [roleData]);

  useEffect(() => {
    setInputData({ role_name: singleRole?.name });
    if (singleRole?.user_permissions?.length) {
      setFieldData(singleRole?.user_permissions);
    }
  }, [singleRole]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/user-and-roles/role-management");
      dispatch(loadingAction({ isLoading: false }));
    }
    dispatch(resetUIAction());
  }, [dispatch, router, isSuccess]);

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
                edit={true}
                title="Edit Role"
                closeRedirectUrl="/user-and-roles/role-management"
                roleData={roleData}
                fieldData={[...fieldData]}
                inputData={inputData}
                onChangeInput={onChangeInput}
                onChangePermission={onChangePermission}
                onSubmit={onSubmit}
                isValid={isValid}
                isEdited={isEdited}
                onSelectAllRoles={onSelectAllRoles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
EditRolePage.permission = {
  module: "master",
  sub_module: "user",
  alternateKey: "settingsMaster",
  roles: ["EDIT"],
  redirectURL: "/user-and-roles/role-management",
};
export default EditRolePage;
