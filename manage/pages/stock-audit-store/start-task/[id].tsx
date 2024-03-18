import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateObject } from "react-multi-date-picker";
import { loadingAction } from "../../../redux/actions/loaderAction";
const ListingComponents = dynamic(
  () =>
    import("../../../Components/Shared/ListingComponents/ListingComponents"),
  { ssr: false }
);

// import usePermission from "../../hooks/usePermission";
// import { permissions } from "../../commonjs/constants";

import QueryUtilityFunc from "../../../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import {
  getProductList,
  getStoreDetails,
  getStoreList,
} from "../../../redux/actions/productAction";
import { getReports } from "../../../redux/actions/reportAction";
import moment from "moment";
import PageHeader from "../../../Components/Shared/PageHeader/PageHeader";
import CommonMasterModal from "../../../Components/Shared/CommonModal/CommonMasterModal";
import {
  addNewProductInTask,
  completeTask,
  getStoreAuditTaskDetails,
  resetStockAuditDetails,
  saveAsDraftTask,
  saveEmployeeCodeInTask,
} from "../../../redux/actions/auditAction";
import { resetUIAction } from "../../../redux/actions/uiAction";
import { getToaster } from "../../../redux/actions/toasterAction";
import { permissions } from "../../../commonjs/constants";
import usePermission from "../../../hooks/usePermission";
import EmployeeCodeModal from "../../../Components/Shared/CommonModal/EmployeeCodeModal";

type singleDate = string | DateObject | Date;
type dateRange = (string | DateObject | Date)[];

interface IProductCheckAvailable {
  content: string;
  id: number;
  images: any[];
  is_banned: boolean;
  is_discontinued: boolean;
  mrp: number;
  name: string;
  package_size: number;
  package_type: string;
  sales_price: number;
  ws_code: number;
}

interface StockAuditStoreRow {
  id: number;
  product_code: number;
  product_location: string;
  product_name: string;
  reviewed_quantity: string;
  task_detail_type: string;
  task_details_id?: number;
  searchedIdx?: number;
  isSearchedProduct?: boolean;
  employee_code?: string;
}

interface ISlectedFilters {
  date_range?: dateRange;
  from_date?: singleDate;
  to_date?: singleDate;
}

interface IStockAuditDetails {
  task_products?: StockAuditStoreRow[];
  audit_number?: string;
  employee_code?: string;
  task_status?: string;
}

function StockAuditList() {
  const datePickerRef = useRef<any>();
  const { customPayload } = useSelector((state) => (state as any).ui);
  const { productList, store, storeDetails } = useSelector(
    (state) => (state as any).product
  );
  const { auditTaskDetails } = useSelector((state) => (state as any).audit);
  const { userDetails, currentStoreData } = useSelector(
    (state) => (state as any)?.user
  );

  const permission = usePermission();
  const [checkPermission, setCheckPermission] = useState({});
  const [selectedFilterValue, setSelectedFilterValue] =
    useState<ISlectedFilters>({
      date_range: [new DateObject(), new DateObject()],
      from_date: moment(new Date()).format("YYYY-MM-DD"),
      to_date: moment(new Date()).format("YYYY-MM-DD"),
    });
  const [draftMap, setDraftsMap] = useState<any>({});
  const onClickFilterTitle = (columnData: IfilterColumnObj): void => {
    if (columnData?.field === "store") {
      if (store?.length === 0) {
        dispatch(getStoreList());
      }
    }
  };

  const FoundNewProductFormData = [
    {
      sectionType: "body",
      labelClassName:
        "col-3 d-flex align-items-center justify-content-start pe-0 px-0",
      inputClassName: "col-9 ps-2",
      suffixClassName: "",
      bodyClassName: "px-0",

      child: [
        {
          label: "Product Name *",
          fieldType: "input",
          inputType: "text",
          fieldName: "product_name",
          disabled: false,
          validation: function (data: string) {
            return {
              isValid: data ? false : true,
              message: "Name is Required.",
            };
          },
        },
        {
          label: "Qty Found *",
          fieldType: "input",
          inputType: "text",
          fieldName: "reviewed_quantity",
          validation: function (data: string) {
            return {
              isValid: data ? false : true,
              message: "Quantity is Required.",
            };
          },
        },
        {
          label: "Location *",
          fieldType: "input",
          inputType: "text",
          fieldName: "product_location",
          validation: function (data: string) {
            return {
              isValid: data ? false : true,
              message: "Location is Required.",
            };
          },
        },
      ],
    },
  ];
  const stockAuditTableData = {
    column: [
      {
        title: "Sr No.",
        field: "index",
        width: "10%",
        customField: (row: StockAuditStoreRow, idx: number) => {
          console.log("zcxvcvb", row);
          return <span className="text-primary">{idx + 1}</span>;
        },
      },
      {
        title: "Product Name",
        field: "product_name",
        width: "20%",
        customField: (row: StockAuditStoreRow) => {
          return <p className="text-wrap text-break">{row?.product_name}</p>;
        },
      },
      {
        title: "Location",
        field: "location",
        isShort: false,
        customField: (row: StockAuditStoreRow) => {
          return <p>{row?.product_location}</p>;
        },
      },
      {
        title: "Found Qty",
        field: "reviewed_quantity",
        isShort: false,
        type: "text",
        customField: (row: StockAuditStoreRow, ind: number) => {
          return (
            <input
              type="number"
              value={row?.reviewed_quantity ?? ""}
              className="form-control"
              disabled={
                row?.task_detail_type === "UNARRANGED" ||
                row?.task_detail_type === "NEW_PRODUCT"
              }
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                let reg = /^[0-9]+$/;
                if (
                  reg.test(e.currentTarget.value) ||
                  e.currentTarget.value === ""
                ) {
                  let data: StockAuditStoreRow[] = stockAuditData;
                  data[row?.searchedIdx ?? ind]["reviewed_quantity"] =
                    e.currentTarget.value;
                  setStockAuditData([...data]);
                  if (parseFloat(e.currentTarget.value) >= 0) {
                    setDraftsMap({
                      ...draftMap,
                      [row?.id]: e.currentTarget.value,
                    });
                  }
                } else {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              onBlur={() => {
                if (row?.isSearchedProduct) {
                  if (draftMap && Object.keys(draftMap)?.length) {
                    let data: any = [];
                    Object.keys(draftMap)?.map((val, idx) => {
                      data.push({
                        task_details_id: val,
                        reviewed_quantity: draftMap[val],
                      });
                    });
                    console.log("Zxxvb", data);
                    dispatch(
                      saveAsDraftTask({
                        task_id: router?.query?.id,
                        products: data,
                        employee_code: stockAuditDetails?.employee_code,
                      })
                    );
                  }
                } else {
                  if (draftMap && Object.keys(draftMap)?.length === 5) {
                    let data: any = [];
                    console.log("xcbvcvn", data);
                    Object.keys(draftMap)?.map((val, idx) => {
                      data.push({
                        task_details_id: val,
                        reviewed_quantity: draftMap[val],
                      });
                    });
                    dispatch(
                      saveAsDraftTask({
                        task_id: router?.query?.id,
                        products: data,
                        employee_code: stockAuditDetails?.employee_code,
                      })
                    );
                  }
                }
              }}
            />
          );
        },
      },
    ],
    searchColumn: [
      {
        title: "Product",
        field: "product",
      },
    ],
    filterColumn: [],
  };
  const router = useRouter();
  //   const permission = usePermission();
  const dispatch = useDispatch();

  const [productID, setProductID] = useState<number | undefined>();

  const [searchQuery, setSearchQuery] = useState("");
  const [valueData, setValueData] = useState<any>("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedColumnSearch, setSelectColumnSearch] = useState<ISearchColumn>(
    stockAuditTableData?.searchColumn
      ? stockAuditTableData?.searchColumn[0]
      : {}
  );
  const [isDropdownPresent, setIsDropDownPresent] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [stockAuditData, setStockAuditData] = useState<StockAuditStoreRow[]>(
    []
  );
  const [stockAuditDetails, setStockAuditDetails] =
    useState<IStockAuditDetails>({});
  console.log("bcvnbn", stockAuditDetails);
  const [showAddProductModel, setShowAddProductModel] = useState(false);
  const [addNewProductData, setAddNewProductData] = useState<
    | {
        product_code: number;
        product_location: string;
        product_name: string;
        reviewed_quantity: string;
      }
    | {}
  >({});
  const [isCheckValid, setIsCheckValid] = useState(false);
  const [showEmployeeCodeModal, setShowEmployeeCodeModal] = useState(false);
  const onQueryChange = (page?: number) => {
    const query = QueryUtilityFunc(
      selectedColumnSearch?.field !== "product" ? searchQuery : "", //change this as per column fields
      selectedColumnSearch,
      selectedFilterValue,
      null,
      page ?? 1,
      []
    );
    if (searchQuery === "") {
      dispatch(getStoreAuditTaskDetails({ id: router?.query?.id }));
    } else {
      dispatch(getProductList(searchQuery));
    }

    // dispatch(loadingAction({ isLoading: true }));
  };
  const handleChangeInput = (
    e: React.FormEvent<HTMLInputElement>,
    field: IBodyChild
  ) => {
    let data: {
      product_code?: number;
      product_location?: string;
      product_name?: string;
      reviewed_quantity?: string;
    } = addNewProductData;
    if (field?.fieldName === "reviewed_quantity") {
      if (
        parseFloat(e.currentTarget.value) >= 0 ||
        e.currentTarget.value === ""
      ) {
        data[field?.fieldName] = e.currentTarget.value;
      } else {
        data[field?.fieldName] = "";
      }
    } else {
      data[field?.fieldName] = e.currentTarget.value;
    }
    setAddNewProductData({ ...data });
  };
  const handleSaveNewProductData = (
    e: React.FormEvent<HTMLInputElement>,
    field: IBodyChild
  ) => {
    setIsCheckValid(true);
    let data: {
      product_code?: number;
      product_location?: string;
      product_name?: string;
      reviewed_quantity?: string;
    } = addNewProductData;
    if (
      data?.reviewed_quantity &&
      parseFloat(data?.reviewed_quantity) >= 0 &&
      data?.product_location &&
      data?.product_name
    ) {
      if (draftMap && Object.keys(draftMap)?.length) {
        let data: any = [];
        Object.keys(draftMap)?.map((val, idx) => {
          data.push({
            task_details_id: val,
            reviewed_quantity: draftMap[val],
          });
        });
        dispatch(
          saveAsDraftTask({
            task_id: router?.query?.id,
            products: data,
          })
        );
      }
      dispatch(
        addNewProductInTask({
          task_id: router?.query?.id,
          ...data,
          task_detail_type: data?.product_code ? "UNARRANGED" : "NEW_PRODUCT",
        })
      );
    }
  };
  const onSearchSelect = (val: IProductCheckAvailable) => {
    if (draftMap && Object.keys(draftMap)?.length) {
      let data: { task_details_id: string; reviewed_quantity: string }[] = [];
      Object.keys(draftMap)?.map((val, idx) => {
        data.push({
          task_details_id: val,
          reviewed_quantity: draftMap[val],
        });
      });
      console.log("xcvcbn", data);
      dispatch(
        saveAsDraftTask({
          task_id: router?.query?.id,
          products: data,
        })
      );
    }
    setSearchQuery(`${val?.name} / ${val?.ws_code}`);
    setProductID(val?.ws_code);
    setAddNewProductData({
      product_name: val?.name,
      product_code: val?.ws_code,
    });
    setIsDropDownPresent(false);
  };
  const getSearchedProduct = () => {
    let data: StockAuditStoreRow[] = stockAuditData;
    let searchedProducts: Array<
      StockAuditStoreRow & {
        searchedIdx: number;
        isSearchedProduct: boolean;
        reviewed_quantity: string;
      }
    > = [];
    data?.map((val: StockAuditStoreRow, idx: number) => {
      if (
        val.product_code == productID &&
        val?.task_detail_type === "CSV_UPLOAD"
      ) {
        searchedProducts.push({
          ...val,
          searchedIdx: idx,
          isSearchedProduct: true,
          reviewed_quantity: val?.reviewed_quantity ?? null,
        });
      }
    });
    return searchedProducts;
  };

  useEffect(() => {
    let searchData =
      selectedColumnSearch?.field === "product" ? productList : [];
    setSearchResults(searchData);
  }, [productList]);
  useEffect(() => {
    if (productID) {
    }
  }, [productID]);
  //   const getConfigData = () => {
  //     let data = {};

  //     data.vendor = vendorList ? vendorList : [];

  //     data.products = productList ?? [];
  //     return data;
  //   };
  const customFieldDropdown = (val: IProductCheckAvailable) => {
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
  const handleNoDataBtnClick = () => {
    setShowAddProductModel(true);
  };

  const onDropdownSearch = (
    e: React.FormEvent<HTMLInputElement>,
    column: ISearchColumn
  ) => {
    if (column.field === "store") {
      dispatch(getStoreList(`q=${encodeURIComponent(e.currentTarget.value)}`));
    }
  };

  const handleCompleteTask = async () => {
    let data: StockAuditStoreRow[] = stockAuditData;
    let errors: any = {};
    await data?.map((val, idx) => {
      val["task_details_id"] = val?.id;
      if (!val?.reviewed_quantity && parseFloat(val?.reviewed_quantity) !== 0) {
        console.log("errrrrrr");
        errors[val?.product_code] = [
          `Product ${val?.product_name} is not reviewed`,
        ];
      }
      return val;
    });
    if (Object.keys(errors)?.length) {
      if (Object.keys(errors)?.length > 5) {
        dispatch(
          getToaster({
            type: "error",
            message: `There are ${
              Object.keys(errors)?.length
            } are left to review.`,
          })
        );
      } else if (Object.keys(errors)?.length < 5) {
        dispatch(
          getToaster({
            type: "error",
            message: { errors },
          })
        );
      }
    } else {
      dispatch(
        completeTask({
          task_id: router?.query?.id,
          products: data,
          employee_code: stockAuditDetails?.employee_code,
        })
      );
    }
  };
  const handleSaveAsDraft = () => {
    let data: StockAuditStoreRow[] = stockAuditData;
    data?.map((val, idx) => {
      val.task_details_id = val?.id;
      return val;
    });
    dispatch(
      saveAsDraftTask({
        task_id: router?.query?.id,
        products: data,
        isManualSaveDraft: true,
        employee_code: stockAuditDetails?.employee_code,
      })
    );
  };
  // const handleSaveDraft = () => {
  //   let data =
  // }
  useEffect(() => {
    setValueData({
      ...valueData,
      store:
        store && store?.length > 0
          ? store.filter((d: any, i: number) => i < 5)
          : [],
    });
  }, [store]);

  useEffect(() => {
    window.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as HTMLElement).id === "navbarFormList") {
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
    if (router?.query?.id) {
      onQueryChange();
    }
  }, [router?.query, searchQuery, selectedFilterValue]);
  useEffect(() => {
    if (auditTaskDetails && Object.keys(auditTaskDetails)?.length) {
      let data = auditTaskDetails;
      setStockAuditData(data?.task_products ?? []);
      setStockAuditDetails(data);
      if (!auditTaskDetails?.employee_code) {
        setShowEmployeeCodeModal(true);
      } else {
        setShowEmployeeCodeModal(false);
      }
    }
  }, [auditTaskDetails]);
  useEffect(() => {
    if (customPayload?.isAddNewProductSuccess) {
      setShowAddProductModel(false);
      setSearchQuery("");
      setProductID(undefined);
      onQueryChange();
      setAddNewProductData({});
    } else if (customPayload?.saveAsDraftAuto) {
      setDraftsMap({});
      dispatch(loadingAction({ isLoading: false }));
    } else if (
      customPayload?.completeTaskSuccess ||
      customPayload?.saveAsDraftManual
    ) {
      router.push("/stock-audit-store");
    } else if (customPayload?.isEmployeeCodeAddSuccess) {
      setShowEmployeeCodeModal(false);
      onQueryChange();
    }
    dispatch(resetUIAction());
    setIsCheckValid(false);
  }, [customPayload, router?.query]);
  useEffect(() => {
    return () => {
      dispatch(resetStockAuditDetails());
    };
  }, []);
  useEffect(() => {
    if (userDetails && Object.keys(userDetails)?.length) {
      let checkedPermission: any = {};
      permissions.forEach((ele) => {
        checkedPermission[ele] = permission("inventory", "admin-audit", ele);
      });
      setCheckPermission(checkedPermission);
    }
  }, [userDetails, currentStoreData]);
  return (
    <div className="page-content">
      <div className="fixed-bottom d-flex flex-row w-100 justify-content-center bg-light py-2">
        <button
          id="save_draft"
          className="btn btn-outline-primary me-2"
          onClick={() => handleSaveAsDraft()}
        >
          Save As Draft
        </button>
        <button
          id="save"
          className="btn btn-primary"
          onClick={async () => await handleCompleteTask()}
        >
          Complete Task
        </button>
      </div>
      <PageHeader
        customButton={() => {
          return (
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                router.push("/stock-audit-store");
              }}
            >
              Back To Listing
            </button>
          );
        }}
        customButtonParentClass="col-12 d-flex justify-content-start mt-2"
      />
      <div className="row mt-3">
        <div className="col-md-12">
          <CommonMasterModal
            isCheckValid={isCheckValid}
            title={"Add New Product"}
            show={showAddProductModel}
            formData={FoundNewProductFormData}
            modalBodyClassName="px-4"
            handleChangeInput={handleChangeInput}
            fieldData={addNewProductData}
            handleSave={handleSaveNewProductData}
            handleToggle={() => {
              setIsCheckValid(false);
              setShowAddProductModel(!showAddProductModel);
              if (productID) {
                setAddNewProductData({});
              }
            }}
          />
          <EmployeeCodeModal
            // stockAuditDetails={stockAuditDetails}
            show={showEmployeeCodeModal}
            handleClose={() => {
              router.push("/stock-audit-store");
            }}
            handleSave={(code: string) => {
              if (!code || code === "") {
                dispatch(
                  getToaster({
                    type: "error",
                    message: "Employee Code is required",
                  })
                );
              } else {
                dispatch(
                  saveEmployeeCodeInTask({
                    task_id: router?.query?.id,
                    employeeData: {
                      employee_code: code,
                    },
                  })
                );
              }
            }}
          />
          <div className="card">
            <div className="card-body p-0">
              <ListingComponents
                data={productID ? getSearchedProduct() : stockAuditData}
                searchhHistory={true}
                column={stockAuditTableData?.column}
                //search

                // customFieldDropdown={() => {}}
                //filter
                //sort
                filterColumn={stockAuditTableData?.filterColumn ?? ""}
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
                searchDropdownData={stockAuditTableData?.searchColumn ?? ""}
                paginationData={{}}
                moveTo={(pageNo: number) => {
                  setCurrentPage(pageNo);
                  onQueryChange(pageNo);
                }}
                onClickFilterTitle={onClickFilterTitle}
                //search
                onSelectColumnSearch={(e: ISearchColumn) => {
                  setSearchQuery("");
                  setSelectColumnSearch(e);
                }}
                searchResults={searchResults}
                onSearchSelect={onSearchSelect}
                selectedColumnSearch={selectedColumnSearch}
                innerSearchValue={searchQuery ?? ""}
                isDropdownPresent={isDropdownPresent}
                customFieldDropdown={customFieldDropdown}
                onChangeSearch={(e: React.FormEvent<HTMLInputElement>) => {
                  setSearchQuery(e.currentTarget.value);
                  if (
                    searchQuery !== "" &&
                    selectedColumnSearch?.field !== "product"
                  ) {
                    setIsDropDownPresent(false);
                  } else {
                    setIsDropDownPresent(true);
                    if (productID) {
                      setProductID(undefined);
                    }
                  }
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
                  if (columnData?.field) {
                    setSelectedFilterValue({
                      ...selectedFilterValue,
                      [columnData.field]: "",
                    });
                  }
                }}
                // handleCellClick={(rowValue) => {

                //   handleSalesOrderDetails(rowValue);
                // }}
                // isDateField={true}
                // isDateField={true}
                isDisabledFilter={true}
                isDisabledSortBy={true}
                showNoDataCustomBtn={
                  productID
                    ? getSearchedProduct()?.length
                      ? false
                      : true
                    : false
                }
                handleNoDataBtnClick={handleNoDataBtnClick}
                hideSearchDropDownBtn={true}
                customPlaceHolder={"Search By Product Name"}
                handleClickCreateNew={() => {
                  setAddNewProductData({});
                  setShowAddProductModel(true);
                }}
                isCreateNewProduct={true}
                isShowCustomBarRow={true}
                isCheckValid={isCheckValid}
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
  roles: ["ADD"],
  redirectURL: "/stock-audit-store",
};
export default StockAuditList;
