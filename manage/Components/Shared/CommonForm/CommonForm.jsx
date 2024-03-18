import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Form, OverlayTrigger, Tab, Tabs, Tooltip } from "react-bootstrap";
import { TagsInput } from "react-tag-input-component";
import ListingSearch from "../ListingSearch/ListingSearch";
import Select from "react-select";
import style from "../../../styles/auth/Login.module.scss";
function CommonMasterForm({
  formJson,
  fieldData,
  configData,
  onClickField,
  handleChangeInput,
  handleChangeSelect,
  handleSubmit,
  onSelectColumnSearch,
  onChangeSearch,
  onChangeInputTag,
  isCheckValid,
  searchDropdownData,
  handleChangeFile,
  selectColumnSearch,
  searchResults,
  searchDropdownLabel,
  onSearchSelect,
  isDropdownPresent,
  innerSearchValue,
  groupChildIndex,
  onCLickPassword,
  isVisible,
  handleClearFileUpload,
}) {
  const [selected, setSelected] = useState(["papaya"]);
  const renderTooltip = (messages) => (
    <Tooltip id="button-tooltip" className={`${"error-tooltip"}`} {...messages}>
      {messages}
    </Tooltip>
  );
  return (
    <>
      {formJson?.map((data, i) => {
        return (
          <div key={"dsf" + i}>
            {data.sectionType === "header" ? (
              <div className="row m-0 d-flex justify-content-between border-bottom px-3 py-2">
                <div className="col-5  d-flex justify-content-start align-item-center">
                  <h4 className={`d-flex justify-content-start align-item-center py-2 ${data.className ?? "custom-header"
                    }`}>
                    {fieldData ? data.fieldName : data.title}
                  </h4>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <Link href={data.closeRedirectUrl} className="px-2 py-2">
                    <Image
                      width={18}
                      height={18}
                      src="/assets/close_icon.svg"
                      className="icon"
                      alt={"close"}
                    />
                  </Link>
                </div>
              </div>
            ) : null}
            {data.sectionType === "body" ? (
              <div className={`${data?.bodyClassName ?? "border-bottom"} pt-3`}>
                {data?.child?.map((bodyChild, bodyInd) => {
                  return (
                    <div
                      key={"bodyInd" + bodyInd}
                      className={`${bodyChild?.label ? "row mb-3" : ""}`}
                    >
                      <div
                        className={`${data?.labelClassName ??
                          "col-2 d-flex justify-content-end align-items-center text-end p-0"
                          }`}
                      >
                        <label>
                          {bodyChild?.showLabel === false
                            ? ""
                            : bodyChild?.label ?? ""}
                        </label>
                      </div>
                      <div className={`${data?.inputClassName ?? "col-6"}`}>
                        {bodyChild?.fieldType === "input" ? (
                          <div className=" d-flex">
                            <div className="input-group input-container ">
                              <input
                                type={isVisible ? "text" : bodyChild?.inputType}
                                className="form-control"
                                name={bodyChild?.label ?? ""}
                                disabled={bodyChild?.isDisabled}
                                aria-label={bodyChild?.inputType ?? "text"}
                                placeholder={bodyChild?.label ?? ""}
                                value={
                                  fieldData
                                    ? fieldData[bodyChild?.fieldName]
                                    : ""
                                }
                                onChange={(e) =>
                                  handleChangeInput(e, bodyChild)
                                }
                              />
                              {bodyChild?.passWordVisible ? (
                                <div
                                  className={`input-group-text px-1 ${style.inputGroupTextEnd}`}
                                  onClick={onCLickPassword}
                                >
                                  <Image
                                    width={19}
                                    height={19}
                                    src={"/assets/open_eye.svg"}
                                    className={`icon ${!isVisible
                                        ? style.iconShow
                                        : style.iconHide
                                      }  `}
                                    alt="password"
                                  />
                                  <Image
                                    width={19}
                                    height={19}
                                    src={"/assets/close_eye.svg"}
                                    className={`icon  ${isVisible
                                        ? style.iconShow
                                        : style.iconHide
                                      }`}
                                    alt="password"
                                  />
                                  {/* <label className={style.showPassword}>
                              {!isVisible ? "Show" : "Hide"}
                               </label> */}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div>
                              {" "}
                              {isCheckValid &&
                                bodyChild?.validation(
                                  fieldData
                                    ? fieldData[bodyChild.parent]
                                      ? fieldData[bodyChild.parent][
                                      bodyChild?.fieldName
                                      ]
                                      : fieldData[bodyChild?.fieldName]
                                    : "",
                                  bodyChild?.compareField
                                    ? fieldData[bodyChild?.compareField]
                                    : ""
                                )?.isValid ? (
                                <OverlayTrigger
                                  placement="bottom"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltip(
                                    bodyChild?.validation(
                                      fieldData
                                        ? fieldData[bodyChild.parent]
                                          ? fieldData[bodyChild.parent][
                                          bodyChild?.fieldName
                                          ]
                                          : fieldData[bodyChild?.fieldName]
                                        : "",
                                      bodyChild?.compareField
                                        ? fieldData[bodyChild?.compareField]
                                        : ""
                                    )?.message ?? ""
                                  )}
                                >
                                  <Image
                                    src={"/assets/error.svg"}
                                    className="error-icon"
                                    width={18}
                                    height={18}
                                    alt="error"
                                  />
                                </OverlayTrigger>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ) : bodyChild?.fieldType === "select" ? (
                          <div className="input-group input-container ">
                            <select
                              className="form-select"
                              disabled={bodyChild?.isDisabled}
                              value={
                                fieldData
                                  ? typeof fieldData[bodyChild?.fieldName] ===
                                    "boolean"
                                    ? `${fieldData[bodyChild?.fieldName]}`
                                    : fieldData[bodyChild?.fieldName]
                                  : ""
                              }
                              defaultValue=""
                              onChange={(e) =>
                                handleChangeSelect(
                                  e,
                                  bodyChild,
                                  groupChildIndex ?? ""
                                )
                              }
                            >
                              <option disabled></option>
                              {bodyChild?.fieldName && configData
                                ? configData[bodyChild?.fieldName]?.map(
                                  (fieldSelect, iSelect) => {
                                    return (
                                      <option
                                        id={fieldSelect.id ?? ""}
                                        key={"op" + iSelect}
                                        value={`${bodyChild?.optionValue
                                            ? fieldSelect[
                                            bodyChild?.optionValue
                                            ]
                                            : fieldSelect
                                          }`}
                                        
                                      >
                                        {bodyChild?.optionKey
                                          ? fieldSelect[bodyChild?.optionKey]
                                          : fieldSelect}
                                      </option>
                                    );
                                  }
                                )
                                : null}
                            </select>
                            {isCheckValid &&
                              bodyChild?.validation(
                                fieldData
                                  ? fieldData[bodyChild.parent]
                                    ? fieldData[bodyChild.parent][
                                    bodyChild?.fieldName
                                    ]
                                    : fieldData[bodyChild?.fieldName]
                                  : "",
                                bodyChild?.compareField
                                  ? fieldData[bodyChild?.compareField]
                                  : ""
                              )?.isValid ? (
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip(
                                  bodyChild?.validation(
                                    fieldData
                                      ? fieldData[bodyChild.parent]
                                        ? fieldData[bodyChild.parent][
                                        bodyChild?.fieldName
                                        ]
                                        : fieldData[bodyChild?.fieldName]
                                      : "",
                                    bodyChild?.compareField
                                      ? fieldData[bodyChild?.compareField]
                                      : ""
                                  )?.message ?? ""
                                )}
                              >
                                <Image
                                  src={"/assets/error.svg"}
                                  className="error-icon"
                                  width={18}
                                  height={18}
                                  alt="error"
                                />
                              </OverlayTrigger>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : bodyChild?.fieldType === "check-box" ? (
                          <Form.Check
                            type="switch"
                            checked={
                              fieldData
                                ? fieldData[bodyChild?.fieldName]
                                : false
                            }
                            onChange={(e) => handleChangeInput(e, bodyChild)}
                          />
                        ) : bodyChild?.fieldType === "radio" ? (
                          <Form.Check
                            type="radio"
                            checked={
                              fieldData
                                ? fieldData[bodyChild?.fieldName]
                                : false
                            }
                            onChange={(e) => handleChangeInput(e, bodyChild)}
                          />
                        ) : bodyChild?.fieldType === "search-column-input" ? (
                          <ListingSearch
                            dropdownData={searchDropdownData}
                            searchResults={searchResults}
                            searchDropdownLabel={searchDropdownLabel}
                            onSearchSelect={onSearchSelect}
                            isDropdownPresent={isDropdownPresent}
                            innerSearchValue={innerSearchValue}
                            onSelectColumn={(value) => {
                              onSelectColumnSearch(value);
                            }}
                            selectColumnSearch={selectColumnSearch}
                            onChangeSearch={(e) => onChangeSearch(e, bodyChild)}
                          />
                        ) : bodyChild?.fieldType === "file-input" ? (
                          <>

                            <label
                              htmlFor={`file_upload_${bodyChild?.label}`}
                              className={`file_upload_label cursor-pointer ${bodyChild?.validation(
                                fieldData[bodyChild?.fieldName]
                              )?.isValid && isCheckValid
                                  ? "fail-validation"
                                  : ""
                                } ${bodyChild?.innerLabelClassName ?? ""}`}
                            >
                              <>
                                <div className="d-flex align-items-center">
                                  {fieldData[bodyChild?.fieldName]?.name ??
                                    bodyChild?.fileLabel}
                                </div>
                              </>
                            </label>
                            <input
                              id={`file_upload_${bodyChild?.label}`}
                              type={bodyChild?.inputType ?? "file"}
                              className="form-control file-input-box"
                              name={bodyChild?.label ?? ""}
                              accept={bodyChild?.accept ?? "*"}
                              disabled={bodyChild?.isDisabled}
                              aria-label={bodyChild?.inputType ?? "file"}
                              placeholder={bodyChild?.label ?? ""}
                              onChange={(e) => handleChangeFile(e, bodyChild)}
                            />
                            <div
                              className=" position-absolute top-0 translate-middle"
                              style={{ right: "-5px" }}
                            >
                              <button
                                className="btn btn-light fs-5 bg-transparent border-0 p-0"
                                onClick={() => {
                                  handleClearFileUpload
                                    ? handleClearFileUpload(bodyChild)
                                    : () => { };
                                }}
                              >
                                X
                              </button>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div style={{ color: "#d82c0d" }} >
                                {bodyChild?.validation(
                                  fieldData[bodyChild?.fieldName]
                                )?.isValid && isCheckValid
                                  ? bodyChild?.validation(
                                    fieldData[bodyChild?.fieldName]
                                  )?.message ?? ""
                                  : ""}
                              </div>

                              <div>
                                <a href="https://wms-mkart-uat.s3.ap-south-1.amazonaws.com/store_audit/Audit_task_sample.csv" className="text-primary cursor-pointer">
                                  sample file download
                                </a>
                              </div>
                            </div>
                          </>
                        ) : bodyChild?.fieldType === "button" ? (
                          <button
                            key={bodyChild?.id ?? ""}
                            id={bodyChild?.id ?? ""}
                            className={bodyChild?.className ?? ""}
                            name={bodyChild?.label ?? ""}
                            aria-label={bodyChild?.inputType ?? "text"}
                            onClick={() => {
                              onClickField(bodyChild?.id ?? "", fieldData[bodyChild?.fieldName],
                                groupChildIndex);
                            }}
                          >
                            {bodyChild?.label ?? ""}
                          </button>
                        ) : bodyChild?.fieldType === "tag-input" ? (
                          <div
                            className={`input-group input-container ${isCheckValid &&
                                bodyChild?.validation(
                                  fieldData ? fieldData[bodyChild?.fieldName] : ""
                                )?.isValid
                                ? "fail-validation"
                                : ""
                              }`}
                          >
                            <Select
                              options={configData[bodyChild?.fieldName] ?? []}
                              isMulti={bodyChild?.isMulti ?? true}
                              isSearchable={bodyChild?.isSearchable ?? true}
                              onChange={(e, actionMeta) => {
                                console.log('eeeee', e)
                                handleChangeSelect(
                                  e,
                                  bodyChild,
                                  groupChildIndex,
                                  actionMeta
                                );
                              }}
                              placeholder={bodyChild?.selectLabel ?? ""}
                              onInputChange={(e) => {
                                onChangeInputTag(e, bodyChild);
                              }}
                              getOptionLabel={(option) =>
                                bodyChild?.optionKey
                                  ? option[bodyChild?.optionKey]
                                  : option
                              }
                              classNamePrefix={`${bodyChild?.isMultipleClass
                                  ? ""
                                  : "react-tag-input"
                                }`}
                              getOptionValue={(option) =>
                                bodyChild?.optionValue
                                  ? option[bodyChild?.optionValue]
                                  : option
                              }
                              value={
                                fieldData
                                  ? fieldData[bodyChild?.fieldName] ?? []
                                  : []
                              }
                              isOptionDisabled={(option) =>
                                bodyChild?.disabledOptionKey
                                  ? !option[bodyChild?.disabledOptionKey]
                                  : false
                              }
                              isDisabled={bodyChild?.isDisabled}
                              styles={{ width: "100% !important" }}
                            />
                            {isCheckValid &&
                              bodyChild?.validation(
                                fieldData
                                  ? fieldData[bodyChild.parent]
                                    ? fieldData[bodyChild.parent][
                                    bodyChild?.fieldName
                                    ]
                                    : fieldData[bodyChild?.fieldName]
                                  : "",
                                bodyChild?.compareField
                                  ? fieldData[bodyChild?.compareField]
                                  : ""
                              )?.isValid ? (
                              <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip(
                                  bodyChild?.validation(
                                    fieldData
                                      ? fieldData[bodyChild.parent]
                                        ? fieldData[bodyChild.parent][
                                        bodyChild?.fieldName
                                        ]
                                        : fieldData[bodyChild?.fieldName]
                                      : "",
                                    bodyChild?.compareField
                                      ? fieldData[bodyChild?.compareField]
                                      : ""
                                  )?.message ?? ""
                                )}
                              >
                                <Image
                                  src={"/assets/error.svg"}
                                  className="error-icon"
                                  width={18}
                                  height={18}
                                  alt="error"
                                />
                              </OverlayTrigger>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : bodyChild?.fieldType === "group-fields" ? (
                          <div className="input-group ">
                            {bodyChild?.child.map((data, gI) => {
                              return (
                                <div key={"gI" + gI} className="row m-0 w-100">
                                  {data?.child.map((groupChild, bI) => {
                                    return (
                                      <div key={"sdf" + bI} className={
                                        data?.child.length - 1 === bI
                                          ? data?.lastChildClassName
                                            ? data?.lastChildClassName
                                            : data?.groupClassName
                                          : data?.groupClassName ?? "col p-0"
                                      }>
                                        <CommonMasterForm
                                          formJson={[groupChild]}
                                          onClickField={onClickField}
                                          configData={configData}
                                          handleChangeSelect={
                                            handleChangeSelect
                                          }
                                          fieldData={
                                            groupChild.parent
                                              ? fieldData[groupChild.parent]
                                                ?.length
                                                ? fieldData[groupChild.parent][
                                                gI
                                                ]
                                                : fieldData[groupChild.parent]
                                              : fieldData
                                          }
                                          groupChildIndex={gI}
                                          onChangeInputTag={onChangeInputTag}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                      {bodyChild.suffix ? (
                        <div
                          className={`${data?.suffixClassName ?? "col-2"
                            } p-0 d-flex justify-content-start align-items-center`}
                        >
                          <label>{bodyChild.suffix}</label>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
            {data.sectionType === "tabs" ? (
              <div className="border-bottom">
                <Tabs
                  id="controlled-tab-example"
                  // activeKey={key}
                  // onSelect={(k) => setKey(k)}
                  className="d-flex justify-content-between custom_tabs_mk"
                >
                  {data?.child?.map((tabsData, tabInd) => {
                    let fieldDataTabs = fieldData
                      ? fieldData[tabsData.eventKey]
                      : "";
                    if (
                      typeof fieldDataTabs === "undefined" &&
                      tabsData?.child?.length > 0 &&
                      tabsData?.isNonObject
                    ) {
                      tabsData?.child.map((childD, index) => {
                        if (childD?.child) {
                          fieldDataTabs = {};
                          childD?.child.map((subChild, subInd) => {
                            fieldDataTabs[subChild?.fieldName] =
                              fieldData[subChild?.fieldName];
                          });
                        }
                      });
                    }
                    return (
                      <Tab
                        key={"tabInd" + tabInd}
                        eventKey={tabsData.eventKey}
                        className={``}
                        title={tabsData.label}
                      >
                        <CommonMasterForm
                          formJson={tabsData.child}
                          fieldData={fieldDataTabs}
                          configData={configData}
                          handleChangeSelect={handleChangeSelect}
                          handleChangeInput={handleChangeInput}
                          handleChangeFile={handleChangeFile}
                        />
                      </Tab>
                    );
                  })}
                </Tabs>
              </div>
            ) : null}
            {data.sectionType === "footer" ? (
              <div className="border-bottom px-2 py-2 d-flex justify-content-end">
                {data?.child?.map((footerData, footerInd) => {
                  if (footerData.fieldType === "button") {
                    // console.log("footerData.label",footerData);
                    return (
                      <button
                        key={"footerButton" + footerInd}
                        className={`btn ${footerData.className}`}
                        onClick={() => {
                          handleSubmit(footerData);
                        }}
                      >
                        {footerData.label}
                      </button>
                    );
                  }
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
export default CommonMasterForm;
