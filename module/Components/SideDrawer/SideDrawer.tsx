import Image from "next/image";
import React, { useState } from "react";
import { backedFormate } from "../../../commonjs/globalDateFormat";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import ListingComponents from "../ListingComponents/ListingComponents";
import QueryUtilityFunc from "../QueryUtilityFunc/QueryUtilityFunc";
import { getIndentDetailsList } from "../../../redux/actions/indentAction";
import { searchStoreData } from "../../../redux/actions/commonAction";
import moment from "moment";

interface SideDrawer {
  showValue: boolean;
  setShow: Function;
  indentListID: any;
  soType: string;
}
function ({ showValue, setShow, indentListID, soType }: SideDrawer) {
  const indentData: {
    column?: any[];
    sortingColumn?: any[];
    filterColumn?: IfilterColumnObj[];
    searchColumn?: ISearchColumn[];
  } = {
    column: [
      //indent
      {
        title: "Type",
        field: "type",
        isShort: false,
      },
      {
        title: "Wondersoft Store Code",
        field: "store_code",
        isShort: false,
        customField: (row) => {
          return <p>{row?.store?.ws_store_code}</p>;
        },
      },
      {
        title: "Store Name",
        field: "store_name",
        isShort: false,
        customField: (row) => {
          return <p>{row?.store?.name}</p>;
        },
      },
      {
        title: "Qty",
        field: "quantity",
        isShort: false,
        TbodyTdClass: "number-list-align-table",
        TheadThClass: "listing-thead-th ",
        customField: (row, ind) => {
          return <p className="text-end pe-0 ">{row?.quantity}</p>;
        },
      },
      {
        title: "Pending Qty",
        field: "pending_quantity",
        isShort: false,
        TbodyTdClass: "number-list-align-table",
        TheadThClass: "listing-thead-th ",
        customField: (row, ind) => {
          return <p className="text-end pe-0 ">{row?.pending_quantity}</p>;
        },
      },
      {
        title: "Fullfilled Qty",
        field: "fulfill_quantity",
        isShort: false,
        TbodyTdClass: "number-list-align-table",
        TheadThClass: "listing-thead-th",
        customField: (row, ind) => {
          return <p className="text-end pe-0 ">{row?.fulfill_quantity}</p>;
        },
      },
    ],
    searchColumn: [
      {
        title: "Store",
        field: "store",
      },
    ],
    sortingColumn: [
      {
        title: "Qty",
        field: "quantity",
      },
      {
        title: "Pending Qty",
        field: "pending_qty",
      },
      {
        title: "Fulfilled Qty",
        field: "fulfill_qty",
      },
      {
        title: "Created At",
        field: "created",
      },
      {
        title: "Updated At",
        field: "modified",
      },
    ],
  };
  const customFieldDropdown = (val) => {
    return (
      <div className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <span className="me-2 px-2 bg-lightGray rounded text-dark">
            {val?.ws_store_id ?? "-"}
          </span>
        </div>
        <span className="ms-2 px-2">{val?.store_name ?? ""}</span>
      </div>
    );
  };
  const { indentDetailsList, indentDetailsListMeta } = useSelector(
    (state) => (state as any).indentReducer
  );
  // const { storeList } = useSelector((state) => (state as any).store);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownPresent, setIsDropDownPresent] = useState(false);
  const [selectedColumnSearch, setSelectColumnSearch] = useState<ISearchColumn>(
    indentData?.searchColumn ? indentData?.searchColumn[0] : {}
  );
  const { storeDetails } = useSelector((state) => (state as any).common);
  const [selectedSortValue, setSelectedSortValue] = useState({
    val: "quantity",
    type: "d",
  });
  const [searchQuery, setSearchQuery] = useState("");
  // const [show, setShow] = useState(showValue);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [indentTableData, setIndentTableData] = useState<{
    column?: any[];
    sortingColumn?: any[];
    filterColumn?: IfilterColumnObj[];
    searchColumn?: ISearchColumn[];
  }>(indentData);
  const [storeID, setStoreID] = useState<string>("");
  const onQueryChange = (pageNo?: number) => {
    const query = QueryUtilityFunc(
      "",
      selectedColumnSearch,
      "",
      selectedSortValue,
      pageNo ?? 1,
      ""
    );
    if (searchQuery === "") {
      if (indentListID?.product_id !== "" && soType === "Store") {
        dispatch(
          getIndentDetailsList({
            product_id: indentListID.product_id,
            date: indentListID.date
              ? moment(indentListID.date).format(backedFormate)
              : moment().format(backedFormate),
            so_type: indentListID.so_type,
            indent_id: indentListID.indent_id,
            query: query,
          })
        );
      } else if (indentListID?.product_id !== "" && soType === "All") {
        dispatch(
          getIndentDetailsList({
            product_id: indentListID.product_id,
            date: indentListID.date
              ? moment(indentListID.date).format(backedFormate)
              : moment().format(backedFormate),
            so_type: indentListID.so_type,
            indent_id: indentListID.indent_id,
            query: "",
          })
        );
      }
    } else if (storeID !== "") {
      // console.log("storeIDstoreID", storeID);

      dispatch(
        getIndentDetailsList({
          product_id: indentListID.product_id,
          date: indentListID.date
            ? moment(indentListID.date).format(backedFormate)
            : moment().format(backedFormate),
          so_type: indentListID.so_type,
          indent_id: indentListID.indent_id,
          store: storeID,
          query,
        })
      );
    } else {
      dispatch(searchStoreData(searchQuery));
    }
  };

  const onSearchSelect = (val: {store_name: string, id: string }) => {
    setSearchQuery(val?.store_name);
    setIsDropDownPresent(false);
    setStoreID(val?.id);
  };
  useEffect(() => {
    setShow(showValue);
  }, [showValue]);
  useEffect(() => {
    setSearchResults(storeDetails ?? []);
  }, [storeDetails]);
  useEffect(() => {
    if (indentListID?.so_type === "All") {
      let data = indentTableData;
      data.column && data.column.map((val) => {
        if (val?.field === "product_name" || val?.field === "type") {
          val["display"] = true;
        }
        if (
          val?.field === "store_code" ||
          val?.field === "alternate_store_code" ||
          val?.field === "store_name"
        ) {
          val["display"] = false;
        }
      });
      setIndentTableData(data);
    } else if (indentListID?.so_type === "Store") {
      let data = indentTableData;
      data.column && data.column.map((val) => {
        if (
          val?.field === "product_name" ||
          val?.field === "store_code" ||
          val?.field === "alternate_store_code" ||
          val?.field === "store_name"
        ) {
          val["display"] = true;
          val["TheadThClass"] = "ps-4";
          val["TbodyTdClass"] = "ps-4";
        }
        if (val?.field === "type") {
          val["display"] = false;
        }
      });
      setIndentTableData(data);
    }
    onQueryChange();
  }, [indentListID]);

  useEffect(() => {
    onQueryChange();
  }, [dispatch, searchQuery, selectedColumnSearch, selectedSortValue, storeID]);
  useEffect(() => {
    window.addEventListener("click", (e: Event) => {
      if ((e.target as HTMLAnchorElement).id === "navbarForm") {
        setIsDropDownPresent(true);
      } else {
        setIsDropDownPresent(false);
      }
    });
    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);
  useEffect(() => {
    setSearchQuery("");
  }, [showValue]);
  return (
    <>
      <Modal
        show={showValue}
        onHide={handleClose}
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
          onClick={handleClose}
        >
          <Image
            src="/assets/slider_close_icon.svg"
            width={32}
            height={32}
            alt="Close Icon"
            className="m-0 p-0"
          />
        </button>
        <Modal.Header>
          <div className="ps-2 "> {indentListID?.product_name}</div>
        </Modal.Header>
        <Modal.Body>
          <ListingComponents
            data={indentDetailsList ?? []}
            column={indentTableData?.column ?? []}
            searchDropdownData={indentTableData?.searchColumn ?? []}
            onSelectColumnSearch={(e: object) => {
              setSearchQuery("");
              setSelectColumnSearch(e);
            }}
            selectedColumnSearch={selectedColumnSearch}
            //search
            showSearch={
              indentListID && (indentListID?.so_type === "All" ? false : true)
            }
            onChangeSearch={(e: Event) => {
              setIsDropDownPresent(true);
              setSearchQuery((e.target as HTMLInputElement).value);
              if (storeID !== "") {
                setStoreID("");
              }
            }}
            customFieldDropdown={customFieldDropdown}
            onSearchSelect={onSearchSelect}
            innerSearchValue={searchQuery}
            customPlaceHolder={"Search By Store"}
            searchResults={searchResults ?? []}
            searchDropdownLabel="store_name"
            isDropdownPresent={isDropdownPresent}
            //filter
            filterColumn={indentTableData?.filterColumn ?? []}
            onSelectFilterColumn={() => {}}
            filterValues={[]}
            selectedFilterColumnValue={""}
            onSelectFilterValue={() => {}}
            isDisabledFilter={true}
            //sort
            showSorting={
              indentListID && (indentListID?.so_type === "All" ? false : true)
            }
            sortingColumnData={indentTableData?.sortingColumn ?? ""}
            onSelectSortColumn={(val: { title: string; field: string }) => {
              setSelectedSortValue({
                ...selectedSortValue,
                ["val"]: val.field,
                ["type"]: selectedSortValue.type ?? "a",
              });
            }}
            onSelectSortType={(sortType     : string) => {
              setSelectedSortValue({
                ...selectedSortValue,
                ["type"]: sortType,
              });
            }}
            selectedSortColumn={selectedSortValue.val ?? ""}
            selectedSortType={selectedSortValue.type ?? "a"}
            // page change
            paginationData={indentDetailsListMeta}
            moveTo={(pageNo: number) => {
              onQueryChange(pageNo);
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SideDrawer;
