import React from "react";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import styles from "../ListingFilter/ListingFilter.module.scss";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import { useSelector } from "react-redux";
const CommonDownloadModel = (props) => {
  const { storeDetails } = useSelector((state) => state.product);
  return (
    <Modal
      show={props?.show}
      onHide={props?.handleClose}
      size={props?.size ?? "xl"}
      //   centered={props.position !== "top"}
      className={"position-absolute"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3">
        <div className="col-12 mt-3">
          <div className="row ps-2">
            {props?.filterColumn?.map((columnData, columnInd) => {
              let dropdownTitle = (
                <span key={"col" + columnInd} className={styles.customTitle}>
                  {`${columnData.title}`}
                  {!columnData?.isHideLabel && (
                    <label>
                      {`${
                        props?.selectedFilterValue[columnData.field]?.[
                          columnData.valueKey
                        ]
                          ? ": " +
                            props?.selectedFilterValue[columnData.field]?.[
                              columnData.valueKey
                            ]
                          : props?.selectedFilterValue[columnData.field]
                          ? ": " + props?.selectedFilterValue[columnData.field]
                          : ""
                      }`}
                    </label>
                  )}
                  {columnData?.isCheckbox ? (
                    props?.selectedFilterValue?.[columnData.field] &&
                    Object.keys(props?.selectedFilterValue[columnData.field])
                      ?.length > 0 ? (
                      <label className="ps-2">
                        {
                          Object.keys(
                            props?.selectedFilterValue[columnData.field]
                          )?.length
                        }
                      </label>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </span>
              );
              if (columnData.field === "date_range") {
                const opened =
                  props?.selectedFilterValue[columnData.field]?.length !== 2;
                return (
                  <>
                    <div
                      key={"columnFilter1" + columnInd}
                      className={`d-flex align-items-center justify-content-between filterBox filterBox-calender ${
                        styles.filterBox
                      } ${
                        props?.selectedFilterValue[columnData.field]?.length ===
                        2
                          ? styles.filterBoxActive
                          : ""
                      } px-2 `}
                    >
                      {/* <div className="text-end d-flex"> */}
                      <label htmlFor="date-picker1" className="my-2">
                        {columnData.title}
                        {!opened ? ":" : ""}
                      </label>
                      <DatePicker
                        id="date-picker1"
                        ref={columnData.ref ?? null}
                        value={props?.selectedFilterValue[columnData.field]}
                        range
                        numberOfMonths={2}
                        currentDate={
                          new DateObject(columnData?.currentDate) ??
                          new DateObject()
                        }
                        onChange={(date) =>
                          props?.onSelectRange(date, columnData)
                        }
                        style={{
                          color: "rgb(32, 33, 73)",
                          background: "white",
                          border: "none",
                          boxShadow: "none",
                          width: opened ? "0" : "",
                        }}
                        format="DD-MM-YYYY"
                        rangeHover={columnData?.rangeHover ?? true}
                        maxDate={columnData.maxDate}
                        minDate={columnData.minDate}
                        plugins={[
                          <Footer
                            key="footer"
                            position="top"
                            names={{
                              from: "From: ",
                              to: "To: ",
                              separator: " - ",
                            }}
                          />,
                        ]}
                      />
                      {/* </div> */}
                      <label htmlFor="date-picker1">
                        <Image
                          src="/assets/table/calendar-active.svg"
                          height={20}
                          width={20}
                          alt="Date Picker"
                        />
                      </label>
                      {props?.selectedFilterValue[columnData.field] && (
                        <div className="ms-1 me-1">
                          <a
                            htmlFor="date-picker1"
                            className={`btn  text-align  d-flex px-2 ${styles.closeBtnCalender}`}
                            onClick={() => props?.clearFilter(columnData)}
                          >
                            <Image
                              src={"/assets/cross_coloured.svg"}
                              width={7}
                              height={22}
                              alt={"close"}
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                );
              } else if (!columnData.isHidden) {
                return (
                  <>
                    {" "}
                    { 
                      <div
                        key={"columnFilter" + columnInd}
                        className={` d-flex ${styles.filterBox} ${
                          props?.selectedFilterValue[columnData.field]
                            ? styles.filterBoxActive
                            : ""
                        } px-0`}
                      >
                        <DropdownButton
                          id="dropdown-item-button"
                          className={`custom-select ${styles.customeSelect}`}
                          title={dropdownTitle}
                        >
                          {columnData.isSearchable ? (
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) =>
                                props?.onChangeSearch(e, columnData)
                              }
                            />
                          ) : null}
                          {props?.valueData &&
                            props?.valueData[columnData.field]?.map(
                              (val, ind) => {
                                return (
                                  <Dropdown.Item
                                    key={"va" + ind}
                                    className="text-dark px-2 mt-1 filter-dropdown"
                                    onClick={() => {
                                      if (props?.onSelectValue) {
                                        props?.onSelectValue(val, columnData);
                                      }
                                    }}
                                  >
                                    <Form.Check
                                      type={"radio"}
                                      id={
                                        columnData.valueKey
                                          ? val[columnData.valueKey]
                                          : val
                                      }
                                      label={
                                        columnData.valueKey
                                          ? val[columnData.valueKey]
                                          : val
                                      }
                                      className={styles.radioButton}
                                      checked={
                                        (columnData.valueKey
                                          ? val[columnData.valueKey]
                                          : val) ==
                                        (props?.selectedFilterValue[
                                          columnData.field
                                        ]
                                          ? props?.selectedFilterValue[
                                              columnData.field
                                            ][columnData.valueKey]
                                          : "")
                                          ? true
                                          : false
                                      }
                                      onChange={() => {}}
                                    />
                                    {/* {columnData.valueKey ? val[columnData.valueKey] : val} */}
                                  </Dropdown.Item>
                                );
                              }
                            )}
                        </DropdownButton>
                        {props?.selectedFilterValue[columnData.field] && (
                          <a
                            className={`btn align-items-center text-align justify-content-center d-flex  ${styles.closeBtn} `}
                            onClick={() => props?.clearFilter(columnData)}
                          >
                            <Image
                              src={"/assets/cross_coloured.svg"}
                              width={7}
                              height={7}
                              alt={"close"}
                            />
                          </a>
                        )}
                      </div>
                    }
                  </>
                );
              }
            })}
            <div className="col-1 align-items-center text-align justify-content-center d-flex p-0">
              <a
                href="!#"
                className={`${styles.clearFilter}`}
                onClick={props?.clearAllFilter}
              >
                Clear Filter
              </a>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button
          variant="light"
          className="cancel-button px-4 me-3"
          onClick={props?.handleClose}
        >
          {props?.buttonCancel ?? "Cancel"}
        </Button> */}
        <Button
          variant="primary"
          className="px-4"
          onClick={() => props?.handleConfirm()}
        >
          {props?.buttonConfirm ?? "Download"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommonDownloadModel;
