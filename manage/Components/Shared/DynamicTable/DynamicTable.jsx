import Image from "next/image";
import React from "react";
import { Form } from "react-bootstrap";
import StatusChip from "../Chip/StatusChip";

function DynamicTable({
  column,
  data,
  secondRowCard,
  showSecondRowCard,
  showNoDataCustomBtn,
  handleNoDataBtnClick,
  isShowCustomBarRow,
  showCustomMobileViewRow,
  customMobileRowComp,
  buttons,
  showActions,
  rowHederClassName,
  selectAll,
  uncheckAll,
  onClickButton
}) {
  return (
    <div className="overflow-auto">
      <table className="table" style={{ background: "" }}>
        <thead>
          <tr className={`bulk-update-section ${showActions && "active"} `}>
            <th colSpan={column ? column.length : 8} className="col py-1">
              <div className="d-flex bulk-update-button-container">
                <button className={`btn p-0 ms-3`}>
                  <Form.Check
                    type="checkbox"
                    id="id"
                    label=""
                    className="ms-n2"
                    checked={
                      data && data?.length
                        ? data?.filter((val) => {
                          if (!val.checked) {
                            return val;
                          }
                        }).length === 0
                        : false
                    }
                    onChange={(e) => uncheckAll()}
                  />
                </button>
                {buttons?.map((val, ind) => (
                  <button
                    key={`${val?.title}-${ind}`}
                    // className="checkbox-button"
                    className={`${ind < 1 ? "checkbox-button" : "checkbox-buttons"
                      }`}
                    onClick={() => onClickButton(val?.value)}
                  >
                    {val?.title}
                  </button>
                ))}
              </div>
            </th>
          </tr>
          <tr className={`py-2 ${rowHederClassName}`}>
            {column?.map((key, index) => {
              if (key.display !== false && !showCustomMobileViewRow) {
                return (
                  <th
                    scope="col"
                    key={"header" + index}
                    className={` ${index === 0 ? "ps-4" : "ps-2"} py-1  ${key.TheadThClass ?? ""
                      }`}
                  >
                    <div
                      className="d-flex justify-content-start align-items-center"
                      style={{ padding: "5px 0px" }}
                    >
                      {data && data?.length > 0 && key.enabledSelection && (
                        <Form.Check
                          type="checkbox"
                          id="id"
                          className={`me-1 pe-1 d-flex justify-content-center tex-align-center align-items-center mb-0 custom-class`}
                          checked={false}
                          onChange={(e) => selectAll()}
                        />
                      )}
                      <p className={`${key.headerClassName} header `}>
                        {key.title}
                      </p>
                    </div>
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data?.length ? (
            data?.map((rowValue, irow) => {
              return (
                <React.Fragment key={"row" + irow}>
                  {isShowCustomBarRow &&
                    irow !== 0 &&
                    (rowValue?.["task_detail_type"] === "UNARRANGED" ||
                      rowValue?.["task_detail_type"] === "NEW_PRODUCT") &&
                    data?.[irow - 1]["task_detail_type"] === "CSV_UPLOAD" ? (
                    <tr>
                      <td
                        className="bg-info text-primary text-center"
                        colSpan={column?.length}
                      >
                        NEW FOUND PRODUCTS
                      </td>
                    </tr>
                  ) : null}
                  <tr
                    key={"tableRow" + irow}
                    className={`${showCustomMobileViewRow ? "main-table-row" : ""
                      }`}
                  >
                    {column.map((key, ihead) => {
                      if (key.customField) {
                        return (
                          <td
                            key={"d" + ihead}
                            className={key.TbodyClassName + ""}
                            style={{
                              borderStyle: secondRowCard ? "none" : "solid",
                            }}
                          >
                            {key.customField(rowValue, irow)}
                          </td>
                        );
                      } else {
                        if (rowValue[key.isMultiple]) {
                          return (
                            <td key={"d" + ihead} className="">
                              <select className="form-select location-select">
                                {rowValue[key.field].map((d, i) => {
                                  return <option key={"dhv" + i}>{d}</option>;
                                })}
                              </select>
                            </td>
                          );
                        } else {
                          return (
                            <td
                              key={"d" + ihead}
                              className={key.TbodyClassName + ""}
                            >
                              <div
                                className={`d-flex ${"justify-content-" + key.textAlignment ??
                                  "start"
                                  }`}
                              >
                                {key.enabledSelection ? (
                                  <Form.Check
                                    type="checkbox"
                                    id="id"
                                    label=""
                                    checked={false}
                                    onChange={(e) => "CLICKED"}
                                  />
                                ) : null}
                                {rowValue[key.field]}
                              </div>
                            </td>
                          );
                        }
                      }
                    })}
                  </tr>
                  {showCustomMobileViewRow &&
                    (customMobileRowComp(rowValue, column) ?? <></>)}
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={column ? column.length : 5}
                style={{ border: "none" }}
              >
                <div className="no-data-section text-center ">
                  <div className="d-flex w-100 justify-content-center">
                    {/* nodata-table.svg */}
                    <Image
                      src="/assets/table/nodata-table.svg"
                      width={48}
                      height={48}
                      alt="Close Icon"
                      className="m-0 p-0 no-data-img"
                    />
                  </div>
                  <div className="no-data-heading-message">{"No Data"}</div>
                  <div className="no-data-message">
                    {
                      "You do not have any data. Please try again or create add a new."
                    }
                  </div>
                  {showNoDataCustomBtn && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleNoDataBtnClick();
                      }}
                    >
                      Add New Product
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default DynamicTable;
