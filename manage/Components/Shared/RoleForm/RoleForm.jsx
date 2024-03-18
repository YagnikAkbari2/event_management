import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Col,
  Form,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import ListingSearch from "../ListingSearch/ListingSearch";
import CommonConfirmationModal from "../CommonModal/CommonConfirmationModal";

const RoleForm = (props) => {
  const router = useRouter();

  const [eventKey, setEventKey] = useState("");
  const [showClose, setShowClose] = useState(false);

  const renderTooltip = (messages) => (
    <Tooltip id="button-tooltip" className={`${"error-tooltip"}`} {...messages}>
      {(messages = "Role Name is Required.")}
    </Tooltip>
  );

  useEffect(() => {
    setEventKey(props.roleData ? props.roleData[0].id : "");
  }, [props.roleData]);

  const selectAllRoles = (subModules, currentModuleData) => {
    let res = false;
    if (subModules && currentModuleData?.length) {
      // subModules?.permissions.map()
      res = currentModuleData[0].permissions?.length === 5 ? true : false;
    }
    return res;
  };
  return (
    <div className="m-0 py-2 role-master-form">
      <div className="d-flex justify-content-between border-bottom">
        <div className="col-5 align-item-center px-3">
          <h4 className="align-item-center pb-3 pt-1">{props.title}</h4>
        </div>
        <div className="col-5 d-flex justify-content-end px-5 pe-4">
          <button
            onClick={() => {
              props.isEdited
                ? setShowClose(true)
                : router.push("/user-and-roles/role-management");
            }}
            className="btn px-2 pb-3 pt-1 close-button"
          >
            <Image
              width={18}
              height={18}
              src="/assets/close_icon.svg"
              className="icon"
              alt={"close"}
            />
          </button>
        </div>
      </div>
      <div className="top-input-div">
        <div className="row mt-4">
          <div className="col-2 d-flex justify-content-end text-end align-items-center">
            <label>Role Name*</label>
          </div>
          <div className="col-6">
            <div
              className={`input-group input-container ${
                !props.isValid ? "fail-validation" : ""
              }`}
            >
              <input
                type="text"
                name="role_name"
                value={props?.inputData?.role_name}
                placeholder="Role Name*"
                autoComplete="off"
                className="form-control py-2"
                onChange={props.onChangeInput}
              />
              {!props.isValid && (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip(props?.inputData?.role_name)}
                >
                  <Image
                    src={"/assets/error.svg"}
                    className="error-icon"
                    width={18}
                    height={18}
                    alt="error"
                  />
                </OverlayTrigger>
              )}
            </div>
          </div>
        </div>
        {/* {!props?.edit && (
          <div className="row mt-3 mb-4">
            <div className="col-2 d-flex justify-content-end text-end align-items-center">
              <label>Roles for Cloning</label>
            </div>
            <div className="col-6">
              <ListingSearch
                innerSearchValue={props.innerSearchValue}
                onChangeSearch={props.onChangeSearch}
                dropdownData={props.dropdownData}
                selectedColumnSearch={props.selectedColumnSearch}
                selectColumnSearch={props.selectColumnSearch}
                onSelectColumn={() => { }}
                searchResults={props.searchResults}
                searchDropdownLabel="name"
                onSearchSelect={props.onSearchSelect}
                isDropdownPresent={props.isDropdownPresent}
              />
            </div>
          </div>
        )} */}
      </div>

      {/* Permissions */}
      <div className="card m-4">
        <div className="card-body p-0">
          <div className="permission-heading w-100 border-bottom">
            <div className="w-25 pe-5 ">
              <div className=" text-primary ms-2 permission-header-text">
                Permissions
              </div>
            </div>
          </div>
          <Tab.Container id="left-tabs-example" activeKey={eventKey}>
            <Row>
              <Col sm={2} className="pe-0 border-end">
                <Nav variant="pills" className="flex-column">
                  {props.roleData?.map((val, ind) => {
                    if (val?.module_name !== "master-data") {
                      return (
                        <Nav.Item
                          key={val.id}
                          className="mb-2"
                          onClick={() => setEventKey(val.id)}
                        >
                          <Nav.Link
                            eventKey={val?.id}
                            className="py-2 text-dark"
                          >
                            {val?.module_name}
                          </Nav.Link>
                        </Nav.Item>
                      );
                    }
                  })}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content className="p-3">
                  {props?.roleData?.map((val, ind) => {
                    return (
                      <Tab.Pane key={val.id} eventKey={val?.id}>
                        <h4 className="pb-2 fw-bold">{val.module_name}</h4>
                        {val?.sub_module?.map((sub_module, sub_ind) => {
                          let currentModuleData = props.fieldData.filter(
                            (d) => {
                              if (
                                d.module?.toLowerCase() ===
                                  val.module_name?.toLowerCase() &&
                                d.sub_module?.toLowerCase() ===
                                  sub_module.sub_module_name?.toLowerCase()
                              ) {
                                return d;
                              }
                            }
                          );
                          return (
                            <div key={sub_module?.id} className="row my-3">
                              <div className="col-3">
                                <Form.Check
                                  type="checkbox"
                                  id={"mainid" + sub_module?.sub_module_name}
                                  label={sub_module?.sub_module_name}
                                  checked={selectAllRoles(
                                    sub_module ?? [],
                                    currentModuleData
                                  )}
                                  onChange={(e) => {
                                    props.onSelectAllRoles(
                                      e,
                                      val.module_name,
                                      sub_module
                                    );
                                  }}
                                />
                              </div>
                              <div className="col-9">
                                <div className="row">
                                  {sub_module?.permissions.map((d, i) => {
                                    const label =
                                      d.charAt(0).toUpperCase() +
                                      d.slice(1).toLowerCase();
                                    if (
                                      val.module_name.toLowerCase() === "report"
                                    ) {
                                      return "";
                                    } else {
                                      return (
                                        <div className="col" key={"check" + i}>
                                          <div className="row">
                                            <Form.Check
                                              type="checkbox"
                                              id={"id" + label + sub_module?.id}
                                              label={label}
                                              checked={
                                                currentModuleData.length
                                                  ? currentModuleData[0].permissions.filter(
                                                      (permission) => {
                                                        if (
                                                          permission.toLowerCase() ===
                                                          d.toLowerCase()
                                                        ) {
                                                          return d;
                                                        }
                                                      }
                                                    ).length > 0
                                                    ? true
                                                    : ""
                                                  : ""
                                              }
                                              onChange={(e) => {
                                                // console.log("i m change",d,sub_module,val);
                                                try {
                                                  props.onChangePermission(
                                                    e,
                                                    d,
                                                    sub_module,
                                                    val
                                                  );
                                                } catch (error) {
                                                  console.log("error", error);
                                                }
                                              }}
                                            />
                                            {/* <span>{label}</span> */}
                                          </div>
                                        </div>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-2 py-2 d-flex justify-content-end">
        <button
          className="btn cancel-button px-4 me-3"
          onClick={() => {
            props.isEdited
              ? setShowClose(true)
              : router.push("/user-and-roles/role-management");
          }}
        >
          Cancel
        </button>
        <button className="btn btn-primary px-4 me-3" onClick={props.onSubmit}>
          Save
        </button>
      </div>

      {/* Confirmation Modal */}
      <CommonConfirmationModal
        show={showClose}
        size="md"
        handleClose={() => setShowClose(false)}
        title="Are you sure you want to close?"
        message="All the unsaved changes will be lost."
        handleConfirm={() => {
          setShowClose(false);
          router.push("/user-and-roles/role-management");
        }}
      />
    </div>
  );
};

export default RoleForm;
