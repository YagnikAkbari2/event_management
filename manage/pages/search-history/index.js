import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateObject } from "react-multi-date-picker";
import { loadingAction } from "../../redux/actions/loaderAction";
const ListingComponents = dynamic(
  () => import("../../Components/Shared/ListingComponents/ListingComponents"),
  { ssr: false }
);

// import usePermission from "../../hooks/usePermission";
// import { permissions } from "../../commonjs/constants";

import QueryUtilityFunc from "../../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import {
  getProductList,
  getStoreDetails,
  getStoreList,
} from "../../redux/actions/productAction";
import { getReports } from "../../redux/actions/reportAction";
import moment from "moment";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import { permissions } from "../../commonjs/constants";
import usePermission from "../../hooks/usePermission";
function SearchHistory() {
  const datePickerRef = useRef();
  const { productList, store, storeDetails } = useSelector(
    (state) => state.product
  );
  const permission = usePermission();
  const [checkPermission, setCheckPermission] = useState({});
  const [selectedFilterValue, setSelectedFilterValue] = useState({
    date_range: [new DateObject(), new DateObject()],
    from_date: moment(new Date()).format("YYYY-MM-DD"),
    to_date: moment(new Date()).format("YYYY-MM-DD"),
  });
  const onClickFilterTitle = (columnData) => {
    if (columnData?.field === "store") {
      if (store?.length === 0) {
        dispatch(getStoreList());
      }
    }
  };

  // useEffect(()=>{
  //   dispatch(getStoreDetails())
  //     },[])
  const MrpPtrData = {
    column: [
      {
        title: "Date",
        field: "date",
        isShort: false,
      },
      {
        title: "Product Name",
        field: "product_name",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.product_name}</p>;
        },
      },
      {
        title: "Store name",
        field: "store_name",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.store_name}</p>;
        },
      },
      {
        title: "Store Code",
        field: "store_code",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.store_code}</p>;
        },
      },

      {
        title: "Package type",
        field: "package_type",
        isShort: false,
        isMultiple: true,
        customField: (row, ind) => {
          return <p>{row?.package_type}</p>;
        },
      },
      {
        title: "Package Size",
        field: "package_size",
        isShort: false,
        isMultiple: true,
        customField: (row, ind) => {
          return <p>{row?.package_size}</p>;
        },
      },
      {
        title: "Search keyword",
        field: "search_keyword",
        isShort: false,
        isMultiple: true,
        customField: (row, ind) => {
          return <p>{row?.search_keyword}</p>;
        },
      },
      {
        title: "Available at vendor",
        field: "available_at_vendor",
        isShort: false,
        isMultiple: true,
        customField: (row, ind) => {
          return <p>{row?.available_at_vendor}</p>;
        },
      },
      {
        title: "Available at warehouse",
        field: "available_at_warehouse",
        isShort: false,
        isMultiple: true,
        customField: (row, ind) => {
          return <p>{row?.available_at_warehouse}</p>;
        },
      },
      {
        title: "Available qty",
        field: "available_qty",
        isShort: false,
        isMultiple: true,
        customField: (row, ind) => {
          return <p>{row?.available_qty}</p>;
        },
      },
      {
        title: "Searched qty",
        field: "searched_qty",
        isShort: false,
        isMultiple: true,
        customField: (row, ind) => {
          return <p>{row?.searched_qty}</p>;
        },
      },

      {
        title: "MRP",
        field: "mrp",
        TbodyTdClass: "number-list-align-table",
        TheadThClass: "listing-thead-th pe-4",
        customField: (row, ind) => {
          return <p className="text-end">{row?.mrp ? `₹${row?.mrp}` : ""}</p>;
        },
      },
      {
        title: "TAT",
        field: "tat",
        isShort: false,
        isMultiple: true,
        customField: (row, ind) => {
          return <p>{row?.tat}</p>;
        },
      },
    ],
    searchColumn: [
      {
        title: "Product",
        field: "product",
      },
    ],
    filterColumn: [
      {
        title: "Store",
        field: "store",
        isSearchable: true,
        valueKey: "name",
        selectValue: "name",
      },
      {
        title: "Date",
        field: "date_range",
        maxDate: new Date(),
        fromField: "from_date",
        toField: "to_date",
        rangeHover: true,
        ref: datePickerRef,
        currentDate: new DateObject()
          .add(0, "days")
          .subtract(1, "month")
          .format(),
      },
      {
        field: "from_date",
        isHidden: true,
      },
      {
        field: "to_date",
        isHidden: true,
      },
    ],
  };

  const router = useRouter();
  //   const permission = usePermission();
  const dispatch = useDispatch();

  const [productID, setProductID] = useState("");
  const [mrpListData, setMrpListData] = useState([]);

  const { usersList, userDetails, currentWarehouse } = useSelector(
    (state) => state?.user
  );

  const { reportList, mrpPtrListMeta } = useSelector((state) => state.report);
  const [searchQuery, setSearchQuery] = useState("");
  const [valueData, setValueData] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedColumnSearch, setSelectColumnSearch] = useState(
    MrpPtrData?.searchColumn ? MrpPtrData?.searchColumn[0] : ""
  );
  const [isDropdownPresent, setIsDropDownPresent] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [reportListData, setReportListData] = useState([]);

  const onQueryChange = (page) => {
    dispatch(loadingAction({ isLoading: true }));
    const query = QueryUtilityFunc(
      selectedColumnSearch?.field !== "product" ? searchQuery : "", //change this as per column fields
      selectedColumnSearch,
      selectedFilterValue,
      null,
      page ?? 1,
      []
    );

    if (searchQuery === "") {
      dispatch(
        getReports(
          `${query}&store_code=${
            selectedFilterValue?.store?.store_code
              ? selectedFilterValue?.store?.store_code
              : ""
          }&from_date=${
            selectedFilterValue?.from_date ? selectedFilterValue?.from_date : ""
          }&to_date=${
            selectedFilterValue?.to_date ? selectedFilterValue?.to_date : ""
          }`
        )
      );
    } else if (productID !== "") {
      dispatch(
        getReports(
          `${query}&product=${productID}&from_date=${
            selectedFilterValue?.from_date ? selectedFilterValue?.from_date : ""
          }&to_date=${
            selectedFilterValue?.to_date ? selectedFilterValue?.to_date : ""
          }&store_code=${
            selectedFilterValue?.store?.store_code
              ? selectedFilterValue?.store?.store_code
              : ""
          }`
        )
      );
    } else {
      dispatch(getProductList(searchQuery));
    }
    // dispatch(loadingAction({ isLoading: true }));
  };

  const onSearchSelect = (val) => {
    setSearchQuery(`${val?.name} / ${val?.ws_code}`);
    setProductID(val?.ws_code);
    setIsDropDownPresent(false);
  };

  useEffect(() => {
    setReportListData(reportList);
  }, [reportList]);

  useEffect(() => {
    let searchData =
      selectedColumnSearch?.field === "product" ? productList : [];
    setSearchResults(searchData);
  }, [productList]);

  //   const getConfigData = () => {
  //     let data = {};

  //     data.vendor = vendorList ? vendorList : [];

  //     data.products = productList ?? [];
  //     return data;
  //   };
  const customFieldDropdown = (val) => {
    return (
      <div className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <span className="px-2 bg-lightGray rounded text-dark">
            {val?.ws_code}
          </span>
          <span className="me-2 px-2 ">{val?.name}</span>
        </div>
        {/* <span className="ms-2 px-2">{val?.product_name}</span> */}
      </div>
    );
  };

  useEffect(() => {
    onQueryChange();
  }, [searchQuery, selectedFilterValue]);
  const onDropdownSearch = (e, column) => {
    if (column.field === "store") {
      dispatch(getStoreList(`q=${encodeURIComponent(e.target.value)}`));
    }
  };
  useEffect(() => {
    setValueData({
      ...valueData,
      store: store && store?.length > 0 ? store.filter((d, i) => i < 5) : [],
    });
  }, [store]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.id === "navbarFormList") {
        if (searchQuery !== "" && selectedColumnSearch?.field === "product") {
          setIsDropDownPresent(true);
        } else {
          setIsDropDownPresent(false);
        }
      } else {
        setIsDropDownPresent(false);
      }
    });
    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);
  useEffect(() => {
    if (userDetails) {
      let checkedPermission = {};
      permissions.forEach((ele) => {
        checkedPermission[ele] = permission("search", "search-history", ele);
      });
      setCheckPermission(checkedPermission);
    }
  }, [userDetails]);
  return (
    <div className="page-content">
      <PageHeader />

      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body p-0">
              <ListingComponents
                data={reportListData}
                searchhHistory={true}
                column={MrpPtrData?.column}
                //search

                // customFieldDropdown={() => {}}
                //filter
                //sort
                filterColumn={MrpPtrData?.filterColumn ?? ""}
                //page change
                searchDropdownLabel="name"
                onSelectRange={(val, columnName) => {
                  if (val.length === 2) {
                    setSelectedFilterValue({
                      ...selectedFilterValue,
                      [columnName.field]: val,
                      [columnName.fromField]: moment(new Date(val[0])).format(
                        "YYYY-MM-DD"
                      ),
                      [columnName.toField]: moment(new Date(val[1])).format(
                        "YYYY-MM-DD"
                      ),
                    });
                    datePickerRef.current.closeCalendar();
                  }
                }}
                searchDropdownData={MrpPtrData?.searchColumn ?? ""}
                paginationData={mrpPtrListMeta}
                moveTo={(pageNo) => {
                  setCurrentPage(pageNo);
                  onQueryChange(pageNo);
                }}
                onClickFilterTitle={onClickFilterTitle}
                //search
                onSelectColumnSearch={(e) => {
                  setSearchQuery("");
                  setSelectColumnSearch(e);
                }}
                searchResults={searchResults}
                onSearchSelect={onSearchSelect}
                selectedColumnSearch={selectedColumnSearch}
                innerSearchValue={searchQuery ?? ""}
                isDropdownPresent={isDropdownPresent}
                customFieldDropdown={customFieldDropdown}
                onChangeSearch={(e) => {
                  setSearchQuery(e.target.value);
                  if (
                    searchQuery !== "" &&
                    selectedColumnSearch?.field !== "product"
                  ) {
                    setIsDropDownPresent(false);
                  } else {
                    setIsDropDownPresent(true);
                    if (productID !== "") {
                      setProductID("");
                    }
                  }
                }}
                valueData={valueData ?? ""}
                selectedFilterValue={selectedFilterValue}
                onSelectValue={(val, columnname) => {
                  setSelectedFilterValue({
                    ...selectedFilterValue,
                    [columnname.field]: val,
                  });
                }}
                onDropdownSearch={onDropdownSearch}
                clearAllFilter={(e) => {
                  e.preventDefault();
                  setSelectedFilterValue("");
                }}
                clearFilter={(columnData) => {
                  if (columnData.field === "date_range") {
                    setSelectedFilterValue({
                      ...selectedFilterValue,
                      [columnData.field]: "",
                      from_date: "",
                      to_date: "",
                    });
                  } else
                    setSelectedFilterValue({
                      ...selectedFilterValue,
                      [columnData.field]: "",
                    });
                }}
                // handleCellClick={(rowValue) => {

                //   handleSalesOrderDetails(rowValue);
                // }}
                // isDateField={true}
                // isDateField={true}
                isDisabledFilter={true}
                isDisabledSortBy={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
SearchHistory.permission = {
  module: "search",
  sub_module: "search-history",
  roles: ["LIST"],
  redirectURL: "/",
};
export default SearchHistory;
