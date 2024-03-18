import Image from "next/image";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import styles from "./ListingFilter.module.scss";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import { useSelector } from "react-redux";

function FilterSection({
  filterColumn,
  clearAllFilter,
  clearFilter,
  isSearchable,
  onChangeSearch,
  selectedFilterValue,
  onSelectValue,
  valueData,
  onSelectRange,
}: IFilterSection) {
  const { userDetails } = useSelector((state) => (state as any).user);
  return (
    <div className="col-12 mt-3">
      <div className="row ps-2">
        {filterColumn?.map((columnData, columnInd) => {
          let dropdownTitle = (
            <span key={"col" + columnInd} className={styles.customTitle}>
              {`${columnData.title}`}
              {!columnData?.isHideLabel && (
                <label>
                  {`${
                    selectedFilterValue[columnData.field]?.[columnData.valueKey]
                      ? ": " +
                        selectedFilterValue[columnData.field]?.[
                          columnData.valueKey
                        ]
                      : selectedFilterValue[columnData.field]
                      ? ": " + selectedFilterValue[columnData.field]
                      : ""
                  }`}
                </label>
              )}
              {columnData?.isCheckbox ? (
                selectedFilterValue?.[columnData.field] &&
                Object.keys(selectedFilterValue[columnData.field])?.length >
                  0 ? (
                  <label className="ps-2">
                    {Object.keys(selectedFilterValue[columnData.field])?.length}
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
            const opened = selectedFilterValue[columnData.field]?.length !== 2;
            return (
              <>
                <div
                  key={"columnFilter" + columnInd}
                  className={`d-flex align-items-center justify-content-between filterBox filterBox-calender ${
                    styles.filterBox
                  } ${
                    selectedFilterValue[columnData.field]?.length === 2
                      ? styles.filterBoxActive
                      : ""
                  } px-2 `}
                >
                  {/* <div className="text-end d-flex"> */}
                  <label htmlFor="date-picker" className="my-2">
                    {columnData.title}
                    {!opened ? ":" : ""}
                  </label>
                  <DatePicker
                    id="date-picker"
                    ref={columnData.ref ?? null}
                    value={selectedFilterValue[columnData.field]}
                    range
                    numberOfMonths={2}
                    currentDate={
                      new DateObject(columnData?.currentDate) ??
                      new DateObject()
                    }
                    onChange={(date) =>
                      onSelectRange && onSelectRange(date, columnData)
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
                        names={{ from: "From: ", to: "To: ", separator: " - " }}
                      />,
                    ]}
                  />
                  {/* </div> */}
                  <label htmlFor="date-picker">
                    <Image
                      src="/assets/table/calendar-active.svg"
                      height={20}
                      width={20}
                      alt="Date Picker"
                    />
                  </label>
                  {selectedFilterValue[columnData.field] && (
                    <div className="ms-1 me-1">
                      <a
                        htmlFor="date-picker"
                        className={`btn  text-align  d-flex px-2 ${styles.closeBtnCalender}`}
                        onClick={() => clearFilter && clearFilter(columnData)}
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
              // userDetails?.is_super_Admin || userDetails?.is_asm && columnData?.field==="store_id" ||columnData?.field==="store_code" ?null
              <>
                {userDetails &&
                !userDetails?.is_super_admin &&
                !userDetails?.is_asm &&
                (columnData?.field === "store_id" ||
                  columnData?.field === "store_code") ? null : (
                  <div
                    key={"columnFilter" + columnInd}
                    className={` d-flex ${styles.filterBox} ${
                      selectedFilterValue[columnData.field]
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
                            onChangeSearch && onChangeSearch(e, columnData)
                          }
                        />
                      ) : null}
                      {valueData &&
                        valueData[columnData?.field]?.map(
                          (val: any, ind: number) => {
                            return (
                              <Dropdown.Item
                                key={"va" + ind}
                                className="text-dark px-2 mt-1 filter-dropdown"
                                onClick={() => {
                                  if (onSelectValue) {
                                    onSelectValue(val, columnData);
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
                                    (selectedFilterValue[columnData.field]
                                      ? columnData?.valueKey
                                        ? selectedFilterValue[columnData.field][
                                            columnData.valueKey
                                          ]
                                        : selectedFilterValue[columnData.field]
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
                    {selectedFilterValue[columnData.field] && (
                      <a
                        className={`btn align-items-center text-align justify-content-center d-flex  ${styles.closeBtn} `}
                        onClick={() => clearFilter && clearFilter(columnData)}
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
                )}
              </>
            );
          }
        })}
        <div className="col-1 align-items-center text-align justify-content-center d-flex p-0">
          <a
            href="!#"
            className={`${styles.clearFilter}`}
            onClick={clearAllFilter}
          >
            Clear Filter
          </a>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
