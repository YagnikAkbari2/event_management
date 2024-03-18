import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ListingComponents from "../Components/Shared/ListingComponents/ListingComponents";
import {
  getProductDetails,
  getProductList,
  getSalesOrderProducts,
  getStoreDetails,
  getStoreList,
  loadingProduct,
} from "../../mk-products-check/redux/actions/productAction";
import { loadingAction } from "../redux/actions/loaderAction";
import { useDispatch, useSelector } from "react-redux";
import QueryUtilityFunc from "../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import { DateObject } from "react-multi-date-picker";
import StatusChip from "../Components/Shared/Chip/StatusChip";
import { convertToModuleName } from "../commonjs/commonHelpers";
import { tokens } from "../commonjs/common";
import { useMemo } from "react";
import { useRouter } from "next/router";
import PageHeader from "../Components/Shared/PageHeader/PageHeader";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const datePickerRef = useRef();
  const router = useRouter();

  const { userDetails, currentStoreData } = useSelector((state) => state.user);
  const productsTableData = {
    column: [
      {
        title: "Product Name",
        field: "product_name",
        isShort: false,
        TheadThClass: "pe-0",
        customField: (row) => {
          return (
            <div className="d-flex pe-0 align-items-center">
              <p
                className="d-inline-block text-break text-break-white-space pe-0"
                title={row?.product_name}
              >
                {row?.product_name}
              </p>
            </div>
          );
        },
      },
      {
        title:
          userDetails?.is_super_admin || userDetails?.is_asm
            ? "Store Name"
            : "",
        field:
          userDetails?.is_super_admin || userDetails?.is_asm
            ? "store_name"
            : "",
        isShort: false,
      },
      {
        title: "SO No.",
        field: "so_number",
        isShort: false,
      },
      {
        title: "SO date",
        field: "so_date",
        isShort: false,
        customField: (row) => {
          return (
            <p>
              {moment(row?.so_date).format("DD MMM") +
                " " +
                moment(row?.so_created_at).format("hh:mm a")}
            </p>
          );
        },
      },
      {
        title: "Doc No.",
        field: "doc_number",
        isShort: false,
      },
      {
        title: "Ordered Qty",
        field: "ordered_quantity",
        isShort: false,
        textAlignment: "end",
      },
      {
        title: "Fulfilled Qty",
        field: "fulfilled_quantity",
        isShort: false,
        textAlignment: "end",
      },

      {
        title: "Status",
        field: "status",
        isShort: false,
        customField: (row) => {
          return (
            <>
              {row?.status === "ACCEPTED" && (
                <StatusChip
                  status={"Accepted"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.status === "FULFILLED" && (
                <StatusChip
                  status={"Fulfilled"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}

              {row?.status === "CANCELLED" && (
                <StatusChip
                  status={"Cancelled"}
                  bgColor="#FED3D1"
                  bulletColor="#D72C0D"
                  textColor="#202223"
                />
              )}
              {row?.status === "PARTIALLY_FULFILLED" && (
                <StatusChip
                  status={"Partially Fulfilled"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4824B"
                  textColor="#202223"
                />
              )}
              {row?.status === "UNAVAILABLE" && (
                <StatusChip
                  status={"Unavailable"}
                  bgColor="#FED3D1"
                  bulletColor="#D72C0D"
                  textColor="#202223"
                />
              )}
            </>
          );
        },
      },
      {
        title: "Remarks",
        field: "remark",
        isShort: false,
        TbodyClassName: "ps-0",
        customField: (val) => {
          const remarkMsgs = val?.remark
            ? val?.remark?.split(",") ?? ["-"]
            : ["-"];

          return (
            <ul>
              {remarkMsgs.map((rm, idx) => {
                return <li key={"idxR" + idx}>{rm?.toString()?.trim()}</li>;
              })}
            </ul>
          );
        },
      },
    ],
    searchColumn: [
      {
        title: "Product",
        field: "product",
      },
      {
        title: "SO Number",
        field: "so_number",
      },
    ],
    filterColumn: [
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
      {
        title: "Status",
        field: "status",
        valueKey: "label",
        selectValue: "value",
      },
      {
        title: "Store",
        field: "store_code",
        isSearchable: true,
        valueKey: "name",
        selectValue: "store_code",
      },
    ],
  };

  const { store, salesOrderProducts, salesOrderProductsMeta, productList } =
    useSelector((state) => state.product);
  const [productsListData, setProductsListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColumnSearch, setSelectColumnSearch] = useState(
    productsTableData?.searchColumn[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState({
    date_range: [
      moment(new Date().setDate(new Date().getDate() - 1)).format("DD-MM-YYYY"),
      moment(new Date()).format("DD-MM-YYYY"),
    ],
    from_date: moment(new Date().setDate(new Date().getDate() - 1)).format(
      "YYYY-MM-DD"
    ),
    to_date: moment(new Date()).format("YYYY-MM-DD"),
  });
  const [filterInitialValue, setFilterInitialValue] = useState(false);
  // const [selectedSortValue, setSelectedSortValue] = useState({
  //   val: "created",
  //   type: "d",
  // });
  const [isDropdownPresent, setIsDropDownPresent] = useState(false);
  const [productWSCode, setProductWSCode] = useState("");
  const [filterConstValues, setFilterConstValues] = useState({
    status: [
      { label: "Accepted", value: "ACCEPTED" },
      { label: "Fulfilled", value: "FULFILLED" },
      { label: "Cancelled", value: "CANCELLED" },
      { label: "Partially Fulfilled", value: "PARTIALLY_FULFILLED" },
      { label: "Unavailable", value: "UNAVAILABLE" },
    ],
  });
  const moduleName = useMemo(() => {
    return convertToModuleName(router?.asPath?.split("/") ?? "");
  }, [router]);
  useEffect(() => {
    // if (!storageItems) {
    const storageItem = tokens.getFilters("filters");
    if (storageItem && storageItem[moduleName]) {
      const filters = storageItem[moduleName];
      if (filters && Object.keys(filters)?.length > 0) {
        // setSearchQuery(filters.search);
        let filterShow = Object.keys(filters?.filter)?.filter((val, idx) => {
          //return val !== "date" ? (filters?.filter[val] === "" || !filters?.filter[val]) ? false : true : false
          return filters?.filter[val] === "" ? false : true;
        });
        // if (filterShow?.length > 0) {
        //   setSelectedFilterValue(filters.filter);
        // }
        setFilterInitialValue(filterShow?.length === 0 ? false : true);
        if (filters?.column?.field !== selectedColumnSearch?.field)
          setSelectColumnSearch(filters.column);
        setSearchQuery(filters?.search);
      }
    }
    // }
  }, [moduleName]);

  const onQueryChange = (pageNo) => {
    dispatch(loadingProduct(true));

    const query = QueryUtilityFunc(
      selectedColumnSearch?.field === "so_number" ? searchQuery : "",
      selectedColumnSearch,
      selectedFilterValue,
      null,
      pageNo ?? 1,
      productsTableData?.filterColumn
    );

    if (searchQuery === "" || selectedColumnSearch?.field === "so_number") {
      dispatch(getSalesOrderProducts(query));
    } else if (productWSCode !== "") {
      dispatch(getSalesOrderProducts(`${query}&ws_code=${productWSCode}`));
    } else {
      dispatch(getProductList(searchQuery));
    }
  };
  const onSearchSelect = (val) => {
    setSearchQuery(val?.name);
    setIsDropDownPresent(false);
    setProductWSCode(val?.ws_code);
  };
  const customFieldDropdown = (val) => {
    return (
      <div className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <span className="px-2 bg-lightGray rounded text-dark">
            {val?.ws_code}
          </span>
        </div>
        <span className="ms-2 px-2">{val?.name}</span>
      </div>
    );
  };
  useEffect(() => {
    onQueryChange();
    const moduleFilters = {
      [moduleName]: {
        filter: selectedFilterValue,
        column: selectedColumnSearch,
        search: searchQuery,
      },
    };
    tokens.setFilters(moduleFilters);
  }, [
    searchQuery,
    dispatch,
    selectedFilterValue,
    productWSCode,
    selectedColumnSearch?.field,
    currentStoreData,
  ]);
  useEffect(() => {
    dispatch(loadingProduct(false));
    let data = salesOrderProducts ?? [];
    setProductsListData([...data]);
  }, [salesOrderProducts]);
  useEffect(() => {
    let data = productList ?? [];
    setSearchResults([...data]);
  }, [productList]);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.id === "navbarFormList") {
        if (selectedColumnSearch?.field === "product") {
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
  const onClickFilterTitle = (columnData) => {
    if (columnData?.field === "store_code") {
      if (store?.length === 0) {
        dispatch(getStoreList());
      }
    }
  };
  const onDropdownSearch = (e, column) => {
    // if (column.field === "order_placed_by") {
    //     e.target.value?.trim() !== "" &&
    //         dispatch(getUsersList(`search=${e.target.value?.trim()},name`));
    // }
    if (column.field === "store_code") {
      dispatch(getStoreList(`q=${encodeURIComponent(e.target.value)}`));
    }
  };
  useEffect(() => {
    setFilterConstValues({
      ...filterConstValues,
      store_code:
        store && store?.length > 0 ? store.filter((d, i) => i < 5) : [],
    });
  }, [store]);
  // useEffect(()=>{
  //   dispatch(getStoreDetails())
  //     },[])
  return (
    <div className={`page-content`}>
      <PageHeader />
      <div className="card">
        <div
          className="card-body p-0"
          style={{ minHeight: "700px", color: "#202223" }}
        >
          <ListingComponents
            data={productsListData ?? []}
            column={productsTableData?.column}
            // searchhHistory={true}
            searchDropdownData={productsTableData?.searchColumn ?? ""}
            onSelectColumnSearch={(e) => {
              setSearchQuery("");
              setSelectColumnSearch(e);
            }}
            filterInitialValue={filterInitialValue}
            onClickFilterTitle={onClickFilterTitle}
            onSearchSelect={onSearchSelect}
            innerSearchValue={searchQuery ?? ""}
            customPlaceHolder={
              selectedColumnSearch?.field !== "so_number"
                ? "Search By Product Name"
                : "Search By SO Number"
            }
            searchResults={searchResults}
            searchDropdownLabel="name"
            isDropdownPresent={isDropdownPresent}
            customFieldDropdown={customFieldDropdown}
            selectedColumnSearch={selectedColumnSearch}
            onDropdownSearch={onDropdownSearch}
            onChangeSearch={(e) => {
              setSearchQuery(e.target.value);
              if (
                e.target.value === "" ||
                selectedColumnSearch?.field === "so_number"
              ) {
                setIsDropDownPresent(false);
                setProductWSCode("");
              } else {
                setIsDropDownPresent(true);
                if (productWSCode !== "") {
                  setProductWSCode("");
                }
              }
            }}
            filterColumn={productsTableData?.filterColumn ?? ""}
            onSelectFilterColumn={(e) => {}}
            filterValues={[]}
            valueData={filterConstValues ?? []}
            selectedFilterColumnValue={""}
            onSelectFilterValue={() => {}}
            selectedFilterValue={selectedFilterValue}
            onSelectValue={(val, columnName) => {
              setSelectedFilterValue({
                ...selectedFilterValue,
                [columnName.field]: val,
              });
            }}
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
            clearAllFilter={(e) => {
              e.preventDefault();
              setSelectedFilterValue({});
            }}
            clearFilter={(columnData) => {
              if (columnData?.field) {
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
              }
            }}
            paginationData={salesOrderProductsMeta ?? {}}
            moveTo={(pageNo) => {
              setCurrentPage(pageNo);
              onQueryChange(pageNo);
            }}
            isDisabledSortBy={true}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
