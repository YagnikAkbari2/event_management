import { useState, useRef, useEffect, ChangeEvent } from "react";
import DynamicTable from "../DynamicTable/DynamicTable";
import FilterSection from "../ListingFilter/FilterSection";
import ListingFilter from "../ListingFilter/ListingFilter";
import ListingSearch from "../ListingSearch/ListingSearch";
import PaginationComponents from "../Pagination/Pagination";
import styles from "../../Shared/ListingFilter/ListingFilter.module.scss";
import { Dropdown, DropdownButton, Form, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import DatePicker, { DateObject } from "react-multi-date-picker";
import moment from "moment/moment";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import LoginForm from "../../Auth/LoginForm";

function ListingComponents(props: ListingComponentProps) {
  const { productList, store, storeDetails } = useSelector(
    (state) => (state as any).product
  );
  const [showFilter, setShowFilter] = useState(
    props.filterInitialValue ?? false
  );
  const cursorFocusRef = useRef<any>(null);
  useEffect(() => {
    cursorFocusRef?.current?.focus();
  }, []);
  async function sleep(msec: number) {
    return new Promise((resolve) => setTimeout(resolve, msec));
  }
  useEffect(() => {
    if (props?.filterInitialValue) {
      setShowFilter(props.filterInitialValue);
    }
  }, [props.filterInitialValue]);

  return (
    <div className="">
      <div
        className={`row d-flex ${
          props?.searchhHistory ? "" : "justify-content-between"
        } m-0 mb-2 px-2 py-3`}
      >
        {props.showSearch === false ? (
          <div className="col-12 col-lg-6"></div>
        ) : (
          <div className="col-12 col-lg-6">
            <ListingSearch
              dropdownData={props.searchDropdownData}
              onSelectColumn={(value: object) => {
                if (props?.onSelectColumnSearch) {
                  props.onSelectColumnSearch(value);
                }
              }}
              selectColumnSearch={props.selectedColumnSearch}
              onChangeSearch={props.onChangeSearch}
              searchResults={props?.searchResults ?? []}
              isDisabled={props?.isDisabled ?? false}
              isDropdownPresent={props?.isDropdownPresent ?? false}
              innerSearchValue={props?.innerSearchValue ?? null}
              searchDropdownLabel={props?.searchDropdownLabel}
              onSearchSelect={props?.onSearchSelect}
              customPlaceHolder={props?.customPlaceHolder}
              customFieldDropdown={props?.customFieldDropdown}
              hideSearchDropDownBtn={props?.hideSearchDropDownBtn ?? false}
              handleClickCreateNew={props?.handleClickCreateNew ?? false}
              isCreateNewProduct={props?.isCreateNewProduct ?? false}
            />
          </div>
        )}
        {props?.searchhHistory &&
          props?.filterColumn?.map((columnData, columnInd) => {
            let dropdownTitle = (
              <span key={columnInd} className={styles.customTitle}>
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
                    key={"columnFilter" + columnInd}
                    className={`d-flex align-items-center ps-2 filterBox2 filterBox-calender ${
                      styles.filterBox
                    } ${
                      props?.selectedFilterValue[columnData.field]?.length === 2
                        ? styles.filterBoxActive
                        : ""
                    }  ${
                      props.isMobile
                        ? `mt-3 px-2 ${styles.smallfilterbox}`
                        : "px-2"
                    }`}
                  >
                    {/* <div className="text-end d-flex"> */}
                    <label htmlFor="date-picker" className={`  my-2`}>
                      {columnData.title}
                      {!opened ? ":" : ""}
                    </label>
                    <DatePicker
                      id="date-picker"
                      ref={columnData.ref ?? null}
                      value={props?.selectedFilterValue[columnData.field]}
                      range
                      numberOfMonths={2}
                      currentDate={
                        new DateObject(columnData?.currentDate) ??
                        new DateObject()
                      }
                      onChange={(date) => {
                        if (props?.onSelectRange) {
                          props?.onSelectRange(date, columnData);
                        }
                      }}
                      style={{
                        color: "rgb(32, 33, 73)",
                        background: "white",
                        border: "none",
                        boxShadow: "none",
                        width: opened ? "0" : "",
                        fontSize: props.isMobile ? "12.5px" : "",
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
                    <label
                      htmlFor="date-picker"
                      className={`${props.isMobile ? "ps-0" : "ps-3"} pe-0`}
                    >
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
                          htmlFor="date-picker"
                          className={`btn  text-align  d-flex px-2 ${styles.closeBtnCalender}`}
                          onClick={() => {
                            if (props?.clearFilter)
                              props?.clearFilter(columnData);
                          }}
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
                <div
                  key={"columnFilter" + columnInd}
                  className={` d-flex filterBox2 ${styles.filterBox} ${
                    props.selectedFilterValue[columnData.field]
                      ? styles.filterBoxActive
                      : ""
                  } px-0`}
                >
                  <DropdownButton
                    id="dropdown-item-button"
                    className={`custom-select sorting-section-filter ${styles.customeSelect}`}
                    title={dropdownTitle}
                    onClick={async () => {
                      props?.onClickFilterTitle &&
                        props?.onClickFilterTitle(columnData, columnInd);
                      await sleep(500);
                      let idInput = document.getElementById(
                        "drop-down-input-cursor-active" + columnData?.field
                      );

                      if (idInput) {
                        idInput.focus();
                      }
                    }}
                  >
                    {columnData.isSearchable ? (
                      <>
                        <div className={`input-group ${styles.listingSearch}`}>
                          <div
                            className={`input-group-text ${styles.inputGroupText}`}
                          >
                            <Image
                              width={16}
                              height={16}
                              src="/assets/navbar-menu/Search-icon.svg"
                              alt="search-icon"
                              className=""
                            />
                          </div>
                          <input
                            type="text"
                            id={
                              "drop-down-input-cursor-active" +
                              columnData?.field
                            }
                            className="form-control px-0 "
                            placeholder="Search..."
                            autoComplete="off"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              if (props.onDropdownSearch)
                                props.onDropdownSearch(e, columnData);
                            }}
                            ref={cursorFocusRef}
                          />
                        </div>
                      </>
                    ) : null}

                    {props?.valueData
                      ? props?.valueData[columnData.field] &&
                        props?.valueData[columnData.field]?.length > 0
                        ? props?.valueData[columnData.field]?.map(
                            (val: any, ind: number) => {
                              return (
                                <Dropdown.Item
                                  key={"va" + ind}
                                  className="text-dark px-2 mt-1 filter-dropdown "
                                  onClick={(e) => {
                                    if (props?.onSelectValue) {
                                      props?.onSelectValue(val, columnData, e);
                                    }
                                  }}
                                >
                                  <Form.Check
                                    type={
                                      columnData?.isCheckbox
                                        ? "checkbox"
                                        : "radio"
                                    }
                                    id={
                                      columnData.valueKey
                                        ? val[columnData.valueKey]
                                        : val
                                    }
                                    label={val[columnData.valueKey]}
                                    className={styles.radioButton}
                                    checked={
                                      columnData?.isCheckbox
                                        ? props?.selectedFilterValue[
                                            columnData.field
                                          ]?.[val] ?? false
                                        : (columnData.valueKey
                                            ? val[columnData.valueKey]
                                            : val) ==
                                          (props?.selectedFilterValue[
                                            columnData.field
                                          ]
                                            ? props?.selectedFilterValue[
                                                columnData.field
                                              ][columnData.valueKey] ??
                                              props?.selectedFilterValue[
                                                columnData.field
                                              ]
                                            : props?.selectedFilterValue[
                                                columnData.field
                                              ])
                                        ? true
                                        : false
                                    }
                                    onChange={() => {}}
                                  />
                                </Dropdown.Item>
                              );
                            }
                          )
                        : ""
                      : ""}
                  </DropdownButton>
                  {props?.selectedFilterValue[columnData.field] && (
                    <a
                      className={`btn align-items-center text-align justify-content-center filterBox-closeBtn d-flex ${styles.closeBtn}`}
                      onClick={() => {
                        if (props?.clearFilter) props?.clearFilter(columnData);
                      }}
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
              );
            }
          })}
        {props.showFilter === false ? null : (
          <div className="col-3">
            <ListingFilter
              // filter
              isDisabledFilter={props?.isDisabledFilter}
              showFilter={showFilter}
              setShowFilter={() => {
                setShowFilter(!showFilter);
              }}
              filterColumn={props.filterColumn}
              selectColumnFilter={
                props.filterColumn
                  ? props.filterColumn.length
                    ? props.filterColumn[0]
                    : ""
                  : ""
              }
              //filter
              onSelectFilterColumn={props.onSelectFilterColumn}
              selectColumnValue={props.selectedFilterColumnValue}
              filterValues={props.filterValues}
              onSelectFilterValue={props.onSelectFilterValue ?? (() => {})}
              // sort
              onSelectSortColumn={props.onSelectSortColumn ?? (() => {})}
              onSelectSortType={props.onSelectSortType ?? (() => {})}
              selectedSortType={props.selectedSortType ?? "a"}
              sortingColumnData={props.sortingColumnData ?? ""}
              selectedSortColumn={props.selectedSortColumn ?? ""}
              isDisabledSortBy={props?.isDisabledSortBy ?? false}
            />{" "}
          </div>
        )}
        {showFilter ? (
          <FilterSection
            filterColumn={props.filterColumn}
            onChangeSearch={props.onDropdownSearch ?? (() => {})}
            valueData={props.valueData ?? ""}
            onSelectValue={props.onSelectValue ?? (() => {})}
            selectedFilterValue={props.selectedFilterValue ?? ""}
            clearAllFilter={props.clearAllFilter ?? (() => {})}
            clearFilter={props.clearFilter ?? (() => {})}
            onSelectRange={props.onSelectRange ?? (() => {})}
          />
        ) : null}
      </div>
      <DynamicTable
        column={props?.column ?? []}
        data={props?.data ?? []}
        secondRowCard={props?.secondRowCard ?? false}
        showSecondRowCard={props?.showSecondRowCard ?? false}
        showNoDataCustomBtn={props?.showNoDataCustomBtn ?? false}
        handleNoDataBtnClick={props?.handleNoDataBtnClick ?? (() => {})}
        isShowCustomBarRow={props?.isShowCustomBarRow ?? false}
        showCustomMobileViewRow={props?.showCustomMobileViewRow ?? false}
        customMobileRowComp={props?.customMobileRowComp ?? (() => {})}
        buttons={props?.buttons}
        showActions={props?.showActions}
        selectAll={props.selectAll}
        uncheckAll={props.uncheckAll}
        rowHederClassName={props?.rowHederClassName}
        onClickButton={props?.onClickButton}
      />
      {/* <LoginForm /> */}
      {props?.data && props?.data?.length > 0 && (
        <PaginationComponents
          data={props?.paginationData}
          moveTo={(page: number) => {
            if (props.moveTo) {
              props.moveTo(page);
            }
          }}
        />
      )}
    </div>
  );
}
export default ListingComponents;
