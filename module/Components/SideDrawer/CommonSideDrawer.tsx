import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import ListingComponents from "../Shared/ListingComponents/ListingComponents";
import QueryUtilityFunc from "../Shared/QueryUtilityFunc/QueryUtilityFunc";

interface CommonSideDrawer {
  fieldData?: any[];
  showDrawer?: boolean;
  handleShowDrawer?: () => void;
  handleConfirmDrawer?: () => void;
  formData?: {
    columns?: any[];
    sortingColumn?: any[];
    filterColumn?: IfilterColumnObj[];
    searchColumn?: ISearchColumn[];
  };
  showTotalItems?: boolean;
  paginationData?: IPaginationData | {};
  handleCommonDrawerQueryChange?: Function;
  totalItemsData?: { totalItems?: number; totalQuantity?: number };
  isDisabledFilter?: boolean;
  isDateField?: boolean;
  modelHeader?: string;
  onClickFilterTitle?: (
    columnData: IfilterColumnObj,
    columnInd: number
  ) => void;
  showSorting?: boolean;
  isMilliSearch?: boolean;
  isDropdownPresent?: boolean;
  milliSearchLabel?: any;
  milliSearchDependencies?: any;
  onSearchSelect?: Function;
  milliSearchResults?: any[];
  milliSearchQuery?: string;
  onChangeMilliSearch?: (e?: Event, ...res: any) => void;
  setMilliSearchQuery?: Function;
  customFieldDropdown?: (val: any) => void;
  hidePagination?: boolean;
  showFooterItems?: boolean;
  showPartialProducts?: boolean;
  partialProductsData?: any[];
  partialProductsColumns?: any[];
  isSorting?: boolean;
  showSearch?: boolean;
  footerBtns?: boolean;
}
export default function CommonSideDrawer({
  fieldData,
  showDrawer,
  handleShowDrawer,
  handleConfirmDrawer,
  formData,
  showTotalItems,
  paginationData,
  handleCommonDrawerQueryChange,
  totalItemsData,
  isDisabledFilter,
  isDateField,
  modelHeader,
  onClickFilterTitle,
  showSorting,
  isMilliSearch,
  isDropdownPresent,
  milliSearchLabel,
  milliSearchDependencies,
  onSearchSelect,
  milliSearchResults,
  milliSearchQuery,
  onChangeMilliSearch,
  setMilliSearchQuery,
  customFieldDropdown,
  hidePagination,
  showFooterItems,
  showPartialProducts,
  partialProductsData,
  partialProductsColumns,
  isSorting,
  showSearch,
  footerBtns,
}: CommonSideDrawer) {
  const [selectedColumnSearch, setSelectColumnSearch] = useState<ISearchColumn>(
    formData?.searchColumn?.[0] ?? {}
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilterValue, setSelectedFilterValue] = useState("");
  const [selectedSortValue, setSelectedSortValue] = useState({
    ["val"]:
      formData?.sortingColumn?.[0]?.field === "vendor_name"
        ? "created"
        : formData?.sortingColumn?.[0]?.field,
    ["type"]: "a",
  });
  const [date, setDate] = useState(new Date());
  const onQueryChange = (pageNo?: number) => {
    const query = QueryUtilityFunc(
      isMilliSearch
        ? milliSearchLabel?.[selectedColumnSearch?.field]
          ? ""
          : milliSearchQuery
        : searchQuery,
      selectedColumnSearch,
      selectedFilterValue,
      isSorting ? selectedSortValue : "",
      pageNo ?? 1,
      formData?.filterColumn ?? ""
    );
    if (handleCommonDrawerQueryChange) {
      handleCommonDrawerQueryChange(
        query,
        date,
        milliSearchQuery,
        selectedColumnSearch,
        pageNo
      );
    }
  };
  useEffect(() => {
    if (showDrawer) {
      onQueryChange();
    }
  }, [
    selectedColumnSearch,
    selectedFilterValue,
    selectedSortValue,
    searchQuery,
    showDrawer,
    date,
    milliSearchDependencies,
    milliSearchQuery,
  ]);
  useEffect(() => {
    setSearchQuery("");
    if (isMilliSearch && setMilliSearchQuery) setMilliSearchQuery("");
  }, [showDrawer]);
  const getCustomPlaceHolder = () => {
    let search = "Search by...";
    if (isMilliSearch && Object.keys(milliSearchLabel).length > 0) {
      Object.keys(milliSearchLabel).filter((sQ) => {
        if (selectedColumnSearch.field === sQ) {
          search = selectedColumnSearch?.customLabel ?? search;
        }
      });
    }
    return search;
  };
  return (
    <>
      <Modal
        show={showDrawer}
        onHide={() => {
          handleShowDrawer ? handleShowDrawer() : () => {};
        }}
        size="xl"
        className="right-modal"
      >
        <button
          className="position-absolute"
          style={{
            top: "-1px",
            left: "-32px",
            backgroundColor: "white",
            padding: "0px",
            border: "none",
          }}
          onClick={() => {
            handleShowDrawer ? handleShowDrawer() : () => {};
          }}
        >
          <Image
            src="/assets/slider_close_icon.svg"
            width={32}
            height={32}
            alt="Close Icon"
            className="m-0 p-0"
          />
        </button>
        <Modal.Header>{modelHeader ? modelHeader : ""}</Modal.Header>
        <Modal.Body style={{ overflowY: "auto" }}>
          <ListingComponents
            data={fieldData ?? []}
            column={formData?.columns ?? []}
            hidePagination={
              typeof hidePagination !== "undefined" ? hidePagination : true
            }
            showFilter={false}
            showSorting={showSorting ?? true}
            showSearch={showSearch ?? true}
            //search
            searchDropdownData={formData?.searchColumn ?? []}
            selectedColumnSearch={selectedColumnSearch}
            onSelectColumnSearch={(e) => {
              if (setMilliSearchQuery) {
                setMilliSearchQuery("");
              }
              setSelectColumnSearch(e);
            }}
            onChangeSearch={(e) => {
              if (e && e.target) {
                if (isMilliSearch && onChangeMilliSearch) {
                  onChangeMilliSearch(e?.target?.value, selectedColumnSearch);
                } else {
                  setSearchQuery(e?.target?.value);
                }
              }
            }}
            customPlaceHolder={getCustomPlaceHolder()}
            onSearchSelect={
              onSearchSelect
                ? (val: any) => onSearchSelect(val, selectedColumnSearch)
                : () => {}
            }
            searchDropdownLabel={
              isMilliSearch &&
              selectedColumnSearch &&
              selectedColumnSearch?.field &&
              milliSearchLabel[selectedColumnSearch?.field]
            }
            isDropdownPresent={isMilliSearch ? isDropdownPresent : false}
            innerSearchValue={isMilliSearch ? milliSearchQuery : searchQuery}
            searchResults={milliSearchResults ?? []}
            customFieldDropdown={customFieldDropdown}
            //filter
            filterColumn={formData?.filterColumn ?? []}
            onSelectFilterColumn={() => {}}
            filterValues={[]}
            selectedFilterColumnValue={""}
            onSelectFilterValue={() => {}}
            isDisabledFilter={isDisabledFilter ?? false}
            //sorting
            sortingColumnData={formData?.sortingColumn ?? []}
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
            paginationData={paginationData ?? {}}
            moveTo={(pageNo) => {
              onQueryChange(pageNo);
            }}
            //date
            selectedDate={date}
            isDateField={isDateField}
            onSelectedDate={(d: Date) => {
              setDate(d);
            }}
            tabs={true}
            tabKey="pickwave"
            onClickFilterTitle={onClickFilterTitle}
            showFooterItems={showFooterItems ?? false}
          />
          {showTotalItems ? (
            <div className="sideDrawerTotalMain">
              <p className="drawerTotalItem">{`Total Items :${totalItemsData?.totalItems}`}</p>
              <p className="drawerTotalItem">{`Total Qty : ${totalItemsData?.totalQuantity}`}</p>
            </div>
          ) : (
            ""
          )}
          {showPartialProducts ? (
            <>
              <p className="text-center fs-5">Pending Products</p>
              <ListingComponents
                data={partialProductsData ?? []}
                column={partialProductsColumns ?? []}
                hidePagination={true}
                showFilter={false}
                showSorting={false}
                showSearch={false}
              />
            </>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          {footerBtns ? (
            <div className="px-2 py-2 d-flex justify-content-end">
              <button
                className="btn btn-primary me-2 px-3 mb-2"
                onClick={() => handleConfirmDrawer && handleConfirmDrawer()}
              >
                Confirm and Proceed
              </button>
            </div>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
