import { useRouter } from "next/router";

type singleDate = string | DateObject | Date;
type dateRange = (string | DateObject | Date)[];
type stringOrNull = null | string;

interface StockAuditStoreRow {
  audit_number: string;
  completed_at: stringOrNull;
  completion_percentage: string;
  created_at: string;
  created_by: {
    name: string;
    email: string;
    mobile_number: string;
    type: string;
  };
  employee_code: stringOrNull;
  id: number;
  is_expiry: boolean;
  new_products_count: number;
  request_location: string;
  started_at: stringOrNull;
  status: string;
  total_products: number;
  total_quantity: number;
  total_reviewed_quantity: stringOrNull;
}
interface StockAuditStoreHeaders extends ICommonHeaders {
  width?: string;
}

interface IStockAuditTableData {
  column?: StockAuditStoreHeaders[];
  searchColumn?: ISearchColumn[];
  filterColumn?: IfilterColumnObj[];
}

interface ISlectedFilters {
  date_range?: dateRange;
  from_date?: singleDate;
  to_date?: singleDate;
}

interface IProductRow {
  id: number;
  ws_code: number;
  name: string;
}

import dynamic from "next/dynamic";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateObject } from "react-multi-date-picker";
import { loadingAction } from "../../redux/actions/loaderAction";
const ListingComponents = dynamic(
  () => import("../../Components/Shared/ListingComponents/ListingComponents"),
  { ssr: false }
);

import QueryUtilityFunc from "../../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import { getStoreList } from "../../redux/actions/productAction";
import moment from "moment";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import { getAllAuditTasks } from "../../redux/actions/auditAction";
import StatusChip from "../../Components/Shared/Chip/StatusChip";
import { permissions } from "../../commonjs/constants";
import usePermission from "../../hooks/usePermission";

function StockAuditList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const datePickerRef = useRef<any>();

  const permission: Function = usePermission();

  const { store } = useSelector((state) => (state as any).product);
  const { auditTasksAll, auditTasksAllMetaData } = useSelector(
    (state) => (state as any).audit
  );
  const { reportList } = useSelector((state) => (state as any).report);
  const { userDetails, currentStoreData } = useSelector(
    (state) => (state as any)?.user
  );

  const [checkPermission, setCheckPermission] = useState<any>({});
  const [selectedFilterValue, setSelectedFilterValue] =
    useState<ISlectedFilters>({
      date_range: [new DateObject(), new DateObject()],
      from_date: moment(new Date()).format("YYYY-MM-DD"),
      to_date: moment(new Date()).format("YYYY-MM-DD"),
    });

  const onClickFilterTitle = (columnData: IfilterColumnObj): void => {
    if (columnData?.field === "store") {
      if (store?.length === 0) {
        dispatch(getStoreList());
      }
    }
  };

  const stockAuditTableData: IStockAuditTableData = {
    column: [
      {
        title: "Assigned Date",
        field: "date",
        width: "10%",
        customField: (row: StockAuditStoreRow) => {
          return (
            <p>
              {row?.created_at
                ? moment(row?.created_at, "DD-MM-YYYY hh:mm:ss a")?.format(
                    "DD-MM-YY hh:mm a"
                  )
                : ""}
            </p>
          );
        },
      },
      {
        title: "Audit Number",
        field: "audit_number",
        width: "20%",
        customField: (row: StockAuditStoreRow) => {
          return <p>{row?.audit_number}</p>;
        },
      },
      {
        title: "Status",
        field: "status",
        isShort: false,
        isMultiple: true,
        customField: (row: StockAuditStoreRow) => {
          return (
            <>
              {row?.status === "COMPLETED" && (
                <StatusChip
                  status={"Completed"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.status === "PENDING" && (
                <StatusChip
                  status={"Pending"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4824B"
                  textColor="#202223"
                />
              )}
              {row?.status === "IN_PROGRESS" && (
                <StatusChip
                  status={"In Progress"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4824B"
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
            </>
          );
        },
      },
      {
        title: "",
        field: "",
        isShort: false,
        isMultiple: true,
        customField: (row: StockAuditStoreRow) => {
          return !row.is_expiry ? (
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleStartTask(row)}
              disabled={
                checkPermission?.["ADD"] ? row?.status === "COMPLETED" : true
              }
            >
              Start Task
            </button>
          ) : (
            ""
          );
        },
      },
    ],
    searchColumn: [
      {
        title: "Audit Number",
        field: "audit_number",
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
    ],
  };
  const handleStartTask = (rowValue: StockAuditStoreRow): void => {
    router.push(`/stock-audit-store/start-task/${rowValue?.id}`);
  };

  // const [productID, setProductID] = useState<string | "">("");
  // const [mrpListData, setMrpListData] = useState([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [valueData, setValueData] = useState<any>("");
  // const [currentPage, setCurrentPage] = useState(1);

  const [selectedColumnSearch, setSelectColumnSearch] = useState<ISearchColumn>(
    stockAuditTableData?.searchColumn
      ? stockAuditTableData?.searchColumn[0]
      : {}
  );
  // const [isDropdownPresent, setIsDropDownPresent] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // const [stockAuditData, setStockAuditData] = useState([]);

  const onQueryChange = (page?: number): void => {
    dispatch(loadingAction({ isLoading: true }));
    const query = QueryUtilityFunc(
      searchQuery,
      selectedColumnSearch,
      selectedFilterValue,
      null,
      page ?? 1,
      stockAuditTableData?.filterColumn ?? []
    );
    dispatch(getAllAuditTasks({ query, isAdmin: false }));
    // dispatch(loadingAction({ isLoading: true }));
  };

  // const onSearchSelect = (val: IProductRow) => {
  //   setSearchQuery(`${val?.name} / ${val?.ws_code}`);
  //   setProductID(val?.ws_code);
  //   setIsDropDownPresent(false);
  // };

  // useEffect(() => {
  //   setStockAuditData(reportList);
  // }, [reportList]);
  // useEffect(() => {
  //   let searchData =
  //     selectedColumnSearch?.field === "product" ? productList : [];
  //   setSearchResults(searchData);
  // }, [productList]);

  const customFieldDropdown = (val: IProductRow) => {
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
  const customMobileRowComp = (
    row: StockAuditStoreRow,
    column: object[]
  ): any => {
    return (
      <tr className="p-2 table-mobile-view-row" style={{ display: "none" }}>
        <td style={{ background: "#F7F7F9" }} colSpan={column?.length ?? "5"}>
          <div className="py-4 px-1 row d-flex flex-row align-items-center">
            <div className="col-7 text-wrap px-0">
              <p className="mb-1 text-primary">
                {row?.created_at
                  ? moment(row?.created_at, "DD-MM-YYYY hh:mm:ss a")?.format(
                      "DD-MM-YY hh:mm a"
                    )
                  : ""}
              </p>
              <p className="mb-2">{row?.audit_number}</p>
              <StatusChip
                status={row?.status}
                bgColor="#FFDBB9"
                bulletColor="#E4AE4B"
                textColor="#202223"
              />
            </div>
            <div className="col-5 d-flex justify-content-end px-0">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleStartTask(row)}
                disabled={
                  checkPermission["ADD"] ? row?.status === "COMPLETED" : true
                }
              >
                Start Task
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };
  useEffect(() => {
    onQueryChange();
  }, [searchQuery, selectedFilterValue, currentStoreData]);
  const onDropdownSearch = (
    e: React.FormEvent<HTMLInputElement>,
    column: ISearchColumn
  ) => {
    if (column.field === "store") {
      dispatch(
        getStoreList(`q=${encodeURIComponent(e?.currentTarget?.value ?? "")}`)
      );
    }
  };

  useEffect(() => {
    setValueData({
      ...valueData,
      store:
        store && store?.length > 0
          ? store.filter((d: any, i: number) => i < 5)
          : [],
    });
  }, [store]);

  // useEffect(() => {
  //   window.addEventListener("click", (e: MouseEvent) => {
  //     if (
  //       e.target instanceof HTMLAnchorElement &&
  //       e?.currentTarget?.id === "navbarFormList"
  //     ) {
  //       if (searchQuery !== "" && selectedColumnSearch?.field === "product") {
  //         setIsDropDownPresent(true);
  //       } else {
  //         setIsDropDownPresent(false);
  //       // }
  //     } else {
  //       setIsDropDownPresent(false);
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("click", () => {});
  //   };
  // }, []);

  useEffect(() => {
    if (userDetails) {
      let checkedPermission: any = {};
      permissions.forEach((ele) => {
        checkedPermission[ele] = permission("inventory", "store-audit", ele);
      });
      setCheckPermission(checkedPermission);
    }
  }, [userDetails, currentStoreData]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
  }, []);

  return (
    <div className="page-content">
      <PageHeader />

      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body p-0">
              <ListingComponents
                data={auditTasksAll ?? []}
                searchhHistory={true}
                column={stockAuditTableData?.column ?? []}
                //search

                //filter
                //sort
                filterColumn={stockAuditTableData?.filterColumn ?? []}
                //page change
                searchDropdownLabel="name"
                onSelectRange={(
                  val: dateRange,
                  columnName: IfilterColumnObj
                ) => {
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
                searchDropdownData={stockAuditTableData?.searchColumn ?? []}
                paginationData={auditTasksAllMetaData ?? {}}
                moveTo={(pageNo: number) => {
                  // setCurrentPage(pageNo);
                  onQueryChange(pageNo);
                }}
                onClickFilterTitle={onClickFilterTitle}
                //search
                onSelectColumnSearch={(e: ISearchColumn) => {
                  setSearchQuery("");
                  setSelectColumnSearch(e);
                }}
                // searchResults={searchResults}
                // onSearchSelect={onSearchSelect}
                selectedColumnSearch={selectedColumnSearch}
                innerSearchValue={searchQuery ?? ""}
                // isDropdownPresent={isDropdownPresent}
                customFieldDropdown={customFieldDropdown}
                onChangeSearch={(e: React.FormEvent<HTMLInputElement>) => {
                  setSearchQuery(e.currentTarget.value);
                  // if (
                  //   e.currentTarget.value !== "" &&
                  //   selectedColumnSearch?.field !== "product"
                  // ) {
                  //   setIsDropDownPresent(false);
                  // } else {
                  //   setIsDropDownPresent(true);
                  //   if (productID !== "") {
                  //     setProductID("");
                  //   }
                  // }
                }}
                valueData={valueData ?? ""}
                selectedFilterValue={selectedFilterValue}
                onSelectValue={(
                  val: IFilterConstValue,
                  columnname: IfilterColumnObj
                ) => {
                  setSelectedFilterValue({
                    ...selectedFilterValue,
                    [columnname.field]: val,
                  });
                }}
                onDropdownSearch={onDropdownSearch}
                clearAllFilter={(e: Event) => {
                  e.preventDefault();
                  setSelectedFilterValue({});
                }}
                clearFilter={(columnData: IfilterColumnObj) => {
                  if (columnData.field === "date_range") {
                    setSelectedFilterValue({
                      ...selectedFilterValue,
                      [columnData.field]: [],
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
                hideSearchDropDownBtn={true}
                customPlaceHolder={"Search By Audit Number"}
                isMobile={isMobile ? true : false}
                showCustomMobileViewRow={isMobile ? true : false}
                customMobileRowComp={customMobileRowComp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
StockAuditList.permission = {
  module: "inventory",
  sub_module: "store-audit",
  roles: ["LIST"],
  redirectURL: "/",
};
export default StockAuditList;
