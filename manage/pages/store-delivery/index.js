import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateObject } from "react-multi-date-picker";
import { loadingAction } from "../../redux/actions/loaderAction";
import { resetUIAction } from "../../redux/actions/uiAction";
const ListingComponents = dynamic(
  () => import("../../Components/Shared/ListingComponents/ListingComponents"),
  { ssr: false }
);
const CommonConfirmationModal = dynamic(
  () => import("../../Components/Shared/CommonModal/CommonConfirmationModal"),
  { ssr: false }
);
const PageHeader = dynamic(
  () => import("../../Components/Shared/PageHeader/PageHeader"),
  { ssr: false }
);
const CommonMasterModal = dynamic(
  () => import("../../Components/Shared/CommonModal/CommonMasterModal"),
  { ssr: false }
);
import QueryUtilityFunc from "../../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import moment from "moment";
import Link from "next/link";
import useCheckValidation from "../../hooks/useCheckValidation";

import {
  createOrderForDeliveryStore,
  getStoreDeliveryListing,
  getStoreDeliveryDownloadLink,
  resetDownloadStoreDelivery,
} from "../../redux/actions/storeDeliveryAction";
import { storeSearchForDelivery } from "../../redux/actions/homeDeliveryAction";
import { storeDeliveryForm } from "../../commonJSON/storeDeliveryForm";
import StatusChip from "../../Components/Shared/Chip/StatusChip";
import { tokens } from "../../commonjs/common";
import { convertToModuleName } from "../../commonjs/commonHelpers";
import { useRouter } from "next/router";
import CommonDownloadModel from "../../Components/Shared/CommonModal/CommonDownloadModel";
import { permissions } from "../../commonjs/constants";
import usePermission from "../../hooks/usePermission";
import { storeSearch } from "../../redux/actions/userAction";
function StoreDelivery() {
  const datePickerRef = useRef();
  const router = useRouter();
  const checkValidation = useCheckValidation();
  const { listingStoreDelivery, paginationData, storeDeliveryDownload } =
    useSelector((state) => state.storeDelivery);
  const { StoreListSearchDelivery } = useSelector(
    (state) => state.homeDelivery
  );
  const permission = usePermission();
  const { isSuccess } = useSelector((state) => state.ui);
  const { storeDetails } = useSelector((state) => state.product);
  const { userDetails, storeListData, currentStoreData } = useSelector(
    (state) => state.user
  );
  const [isCheckValid, setIsCheckValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState({
    date_range: [
      moment(new Date().setDate(new Date().getDate() - 2)).format("DD-MM-YYYY"),
      moment(new Date()).format("DD-MM-YYYY"),
    ],
    from_date: moment(new Date().setDate(new Date().getDate() - 2)).format(
      "YYYY-MM-DD"
    ),
    to_date: moment(new Date()).format("YYYY-MM-DD"),
  });
  const [filterConstValues, setFilterConstValues] = useState({
    status: [
      { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
      { label: "RTO", value: "RTO" },
      { label: "Picked Up", value: "PICKED_UP" },
      { label: "Delivered", value: "DELIVERED" },
      { label: "Cancelled By Shipper", value: "CANCELLED_BY_SHIPPER" },
      { label: "Received", value: "RECEIVED" },
    ],
    payment_status: [
      { label: "Paid", value: "PAID" },
      { label: "Pending", value: "PENDING" },
    ],
    payment_status: [
      { label: "Paid", value: "PAID" },
      { label: "Pending", value: "PENDING" },
    ],
  });
  const UsersData = {
    column: [
      {
        title: "AWB Number",
        field: "awb_number",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.awb_number ?? "-"}</p>;
        },
      },
      {
        title: "Order Number",
        field: "invoice_number",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.invoice_number ?? "-"}</p>;
        },
      },
      {
        title: "Order Date & Time",
        field: "order_time",
        isShort: false,
        customField: (raw) => {
          return (
            <p>
              {raw?.order_time
                ? moment(raw?.order_time, "DD-MMM hh:mm A")?.format(
                    "DD-MM-YY hh:mm a"
                  )
                : "-"}
            </p>
          );
        },
      },
      {
        title: "From Store",
        field: "from_name",
        isShort: false,
      },
      {
        title: "To Store",
        field: "to_name",
        isShort: false,
      },
      {
        title: "To Store Pincode",
        field: "to_pincode",
        isShort: false,
      },
      {
        title: "Bill Amount (in Rs.)",
        field: "amount",
        isShort: false,
      },
      {
        title: "Order Status",
        field: "order_status",
        isShort: false,
        customField: (row) => {
          return (
            <>
              {row?.order_status === "RECEIVED" && (
                <StatusChip
                  status={"Received"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "PICKED_UP" && (
                <StatusChip
                  status={"Picked Up"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "DELIVERED" && (
                <StatusChip
                  status={"Delivered"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "OUT_FOR_DELIVERY" && (
                <StatusChip
                  status={"Out For Delivery"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "READY_FOR_DELIVERY" && (
                <StatusChip
                  status={"Ready For Delivery"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4AE4B"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "ARRIVED_FOR_PICKUP" && (
                <StatusChip
                  status={"Arrived For Pickup"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4AE4B"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "RTO_INITIATED" && (
                <StatusChip
                  status={"RTO Initiated"}
                  bgColor="#EBEEF0"
                  bulletColor="#C0C0C0"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "RTO" && (
                <StatusChip
                  status={"RTO"}
                  bgColor="#EBEEF0"
                  bulletColor="#C0C0C0"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "CANCELLED_BY_CUSTOMER" && (
                <StatusChip
                  status={"Cancelled By Customer"}
                  bgColor="#FED3D1"
                  bulletColor="#D72C0D"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "CANCELLED_BY_SHIPPER" && (
                <StatusChip
                  status={"Cancelled By Shipper"}
                  bgColor="#FED3D1"
                  bulletColor="#D72C0D"
                  textColor="#202223"
                />
              )}
              {row?.order_status === "ERROR_ORDER" && (
                <StatusChip
                  status={"Error Order"}
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
        title: "Payment Status",
        field: "payment_status",
        isShort: false,
        customField: (row) => {
          return (
            <>
              {row?.payment_status === "PAID" && (
                <StatusChip
                  status={"Paid"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.payment_status === "PENDING" && (
                <StatusChip
                  status={"Pending"}
                  bgColor="#FFF2B9"
                  bulletColor="#E4AE4B"
                  textColor="#202223"
                />
              )}
            </>
          );
        },
      },
      {
        title: "Pickup Time",
        field: "pickup_time",
        isShort: false,
        customField: (raw) => {
          return (
            <p>
              {raw?.pickup_time
                ? moment(raw?.pickup_time, "DD-MMM hh:mm A")?.format(
                    "DD-MM-YY hh:mm a"
                  )
                : "-"}
            </p>
          );
        },
      },

      {
        title: "Delivered Time",
        field: "delivered_time",
        isShort: false,
        customField: (raw) => {
          return (
            <p>
              {raw?.delivered_time
                ? moment(raw?.delivered_time, "DD-MMM hh:mm A")?.format(
                    "DD-MM-YY hh:mm a"
                  )
                : "-"}
            </p>
          );
        },
      },
    ],
    searchColumn: [
      {
        title: "Order Number",
        field: "order_number",
      },
      {
        title: "To Store Name",
        field: "to_name",
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
        title: "Order Status",
        field: "status",
        valueKey: "label",
        selectValue: "value",
      },
      {
        title: "Store",
        field: "store_id",
        isSearchable: true,
        valueKey: "name",
        selectValue: "id",
      },
      {
        title: "Payment Status",
        field: "payment_status",
        valueKey: "label",
        selectValue: "value",
      },
    ],
  };
  const Download = {
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
        title: "Order Status",
        field: "status",
        valueKey: "label",
        selectValue: "value",
      },
      {
        title: "Store",
        field: "store_id",
        isSearchable: true,
        valueKey: "name",
        selectValue: "id",
      },
    ],
  };
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedColumnSearch, setSelectColumnSearch] = useState(
    UsersData?.searchColumn ? UsersData?.searchColumn[0] : ""
  );
  const [isDropdownPresent, setIsDropDownPresent] = useState(false);
  const [selectedFilterValueDownload, setSelectedFilterValueDownload] =
    useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [filterInitialValue, setFilterInitialValue] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [storeDeliveryData, setStoreDeliveryData] = useState({});
  const [checkPermission, setCheckPermission] = useState({});
  const type = [
    { key: "COD", value: "COD" },
    { key: "Online", value: "ONLINE" },
  ];
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

  const onQueryChange = (page) => {
    dispatch(loadingAction({ isLoading: true }));
    const query = QueryUtilityFunc(
      selectedColumnSearch?.field === "to_name" ||
        selectedColumnSearch?.field === "order_number"
        ? searchQuery
        : "", //change this as per column fields
      selectedColumnSearch,
      selectedFilterValue,
      null,
      page ?? 1,
      UsersData.filterColumn
    );

    dispatch(getStoreDeliveryListing(`${query}`));
  };

  const onOpenModal = async (id) => {
    if (id === null || id === undefined) {
      setShow(true);
      setEdit(false);
      setIsCheckValid(false);
    }
  };

  // useEffect(() => {
  //   onQueryChange();
  // }, [searchQuery,selectedFilterValue]);
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
    selectedColumnSearch?.field,
    currentStoreData,
  ]);
  function utilsFormData() {
    let form = storeDeliveryForm;

    return form;
  }
  const onCloseModel = () => {
    setShowConfirm(false);
    setIsCheckValid(false);
    setStoreDeliveryData({});
    setShow(!show);
    setIsEdited(false);
  };

  const handleChangeInput = (e, f) => {
    setIsEdited(true);
    var data = storeDeliveryData;
    data[f?.fieldName] = e.target.value;

    setStoreDeliveryData({ ...data });
  };
  const handleChangeSelect = (e, bodyChild) => {
    let data = storeDeliveryData;

    if (bodyChild.fieldName === "type") {
      data[bodyChild.fieldName] = e.target.value;
    } else if (bodyChild.fieldType === "tag-input") {
      if (bodyChild?.fieldName === "stores") {
        data[bodyChild?.fieldName] = e;
      } else if (bodyChild?.fieldName === "delivery_stores") {
        data[bodyChild?.fieldName] = e;
      }
    }
    setStoreDeliveryData({ ...data });
  };

  const handleSave = async () => {
    console.log("saasas", storeDeliveryData?.amount);
    setIsCheckValid(true);
    let data = JSON.parse(JSON.stringify(storeDeliveryData));
    if (await checkValidation(utilsFormData(), data)) {
      try {
        let data = {
          orderType: "B2B",
          orderNumber: storeDeliveryData?.orderNumber,
          amount: Math.round(storeDeliveryData?.amount),
          from_store_id: storeDeliveryData?.stores?.id,
          to_store_id: storeDeliveryData?.delivery_stores?.id,
          customer_number: storeDeliveryData?.phone,
          employee_code: storeDeliveryData?.employee_code,
        };

        dispatch(createOrderForDeliveryStore(data));
        dispatch(loadingAction({ isLoading: true }));
      } catch (err) {
        console.log("asasa", err);
      }

      setIsCheckValid(false);
    }
  };

  const closeModal = () => {
    setShowConfirm(false);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(loadingAction({ isLoading: false }));
      dispatch(resetUIAction());
      setShow(false);
      setEdit(false);
      setSelectedFilterValue({});
      setStoreDeliveryData({});
      setShowDownload(false);
    }
  }, [dispatch, isSuccess]);

  const getConfigData = () => {
    let data = {
      stores: storeListData,
      delivery_stores: storeListData,
    };
    data.type = type;
    return data;
  };
  const onClickFilterTitle = (columnData) => {
    if (columnData?.field === "store_id") {
      if (store?.length === 0) {
        dispatch(storeSearch());
      }
    }
  };
  const onDropdownSearch = (e, column) => {
    if (column.field === "store_id") {
      dispatch(storeSearch(`q=${encodeURIComponent(e.target.value)}`));
    }
  };
  useEffect(() => {
    setFilterConstValues({
      ...filterConstValues,
      store_id:
        storeListData && storeListData?.length > 0
          ? storeListData.filter((d, i) => i < 5)
          : [],
    });
  }, [storeListData]);

  const processButtonClick = (url) => {
    if (url) {
      document.getElementById("download_button").href = url;
      document.getElementById("download_button").click();

      // router.reload();
    }
  };
  const onCloseModelDownload = () => {
    dispatch(loadingAction({ isLoading: true }));
    dispatch(
      getStoreDeliveryDownloadLink(
        `from_date=${selectedFilterValueDownload?.from_date ?? ""}&to_date=${
          selectedFilterValueDownload?.to_date ?? ""
        }&status=${selectedFilterValueDownload?.status?.value ?? ""}&store_id=${
          selectedFilterValueDownload?.store_id?.id ?? ""
        }`
      )
    );
    // setShowDownload(false)
    setSelectedFilterValueDownload("");
  };
  const handleClickDownload = () => {
    setShowDownload(true);
    // dispatch(getStoreDeliveryDownloadLink(`from_date=${selectedFilterValue?.from_date??""}&to_date=${selectedFilterValue?.to_date ?? ""}&status=${selectedFilterValue?.status?.value ?? ""}&store_id=${selectedFilterValue?.store_id?.id ?? ""}&search=${searchQuery+","+selectedColumnSearch?.field ?? ""}`));
  };
  useEffect(() => {
    if (storeDeliveryDownload) {
      processButtonClick(storeDeliveryDownload);
    }

    return () => {
      dispatch(resetDownloadStoreDelivery());
    };
  }, [storeDeliveryDownload]);
  useEffect(() => {
    if (userDetails) {
      let checkedPermission = {};
      permissions.forEach((ele) => {
        checkedPermission[ele] = permission("orders", "store-orders", ele);
      });
      setCheckPermission(checkedPermission);
    }
  }, [userDetails, currentStoreData]);
  const closeModalDownload = () => {
    setShowDownload(false);
  };
  return (
    <div className="page-content">
      <PageHeader
        customButton={() => {
          return (
            <>
              {userDetails?.is_super_admin ? (
                <button
                  onClick={() => {
                    handleClickDownload();
                  }}
                  className="btn btn-primary border-primary me-2 header-add-button"
                >
                  Download
                </button>
              ) : (
                ""
              )}
              {checkPermission?.["ADD"] && (
                <Link href={``}>
                  {" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenModal(null);
                    }}
                    className=" btn btn-primary border-primary ps-3 pe-3 header-add-button"
                  >
                    + Add
                  </button>{" "}
                </Link>
              )}
            </>
          );
        }}
      />
      <CommonDownloadModel
        show={showDownload}
        title="Download Stock Transfer Order"
        filterColumn={Download?.filterColumn ?? ""}
        selectedFilterValue={selectedFilterValueDownload}
        onSelectRange={(val, columnName) => {
          if (val.length === 2) {
            setSelectedFilterValueDownload({
              ...selectedFilterValueDownload,
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
        onSelectValue={(val, columnname) => {
          setSelectedFilterValueDownload({
            ...selectedFilterValueDownload,
            [columnname.field]: val,
          });
        }}
        clearAllFilter={(e) => {
          e.preventDefault();
          setSelectedFilterValueDownload("");
        }}
        clearFilter={(columnData) => {
          if (columnData?.field) {
            if (columnData.field === "date_range") {
              setSelectedFilterValueDownload({
                ...selectedFilterValueDownload,
                [columnData.field]: "",
                from_date: "",
                to_date: "",
              });
            } else
              setSelectedFilterValueDownload({
                ...selectedFilterValueDownload,
                [columnData.field]: "",
              });
          }
        }}
        valueData={filterConstValues ?? ""}
        handleConfirm={onCloseModelDownload}
        handleClose={closeModalDownload}
        onChangeSearch={onDropdownSearch}
      />
      <CommonMasterModal
        show={show}
        title={"Add Stock Transfer Data"}
        formData={utilsFormData()}
        fieldData={storeDeliveryData}
        configData={getConfigData()}
        handleChangeSelect={handleChangeSelect}
        handleChangeInput={handleChangeInput}
        isCheckValid={isCheckValid}
        onChangeInputTag={(val, bodyChild) => {
          setIsEdited(true);
          if (val !== "") {
            if (
              bodyChild?.fieldName === "stores" ||
              bodyChild?.fieldName === "delivery_stores"
            ) {
              dispatch(storeSearch(`q=${encodeURIComponent(val)}`));
            }
          }
        }}
        handleSave={handleSave}
        handleToggle={() => {
          setShowConfirm(true);
        }}
        isEdited={isEdited}
      />

      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body p-0">
              <ListingComponents
                data={listingStoreDelivery}
                column={UsersData?.column}
                filterColumn={UsersData?.filterColumn ?? ""}
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
                searchDropdownData={UsersData?.searchColumn ?? ""}
                paginationData={paginationData}
                moveTo={(pageNo) => {
                  setCurrentPage(pageNo);
                  onQueryChange(pageNo);
                }}
                filterInitialValue={filterInitialValue}
                //search
                onSelectColumnSearch={(e) => {
                  setSearchQuery("");
                  setSelectColumnSearch(e);
                }}
                searchResults={searchResults}
                onSearchSelect={{}}
                selectedColumnSearch={selectedColumnSearch}
                innerSearchValue={searchQuery ?? ""}
                isDropdownPresent={isDropdownPresent}
                onChangeSearch={(e) => {
                  setSearchQuery(e.target.value);
                }}
                valueData={filterConstValues}
                selectedFilterValue={selectedFilterValue}
                onSelectValue={(val, columnname) => {
                  setSelectedFilterValue({
                    ...selectedFilterValue,
                    [columnname.field]: val,
                  });
                }}
                onDropdownSearch={onDropdownSearch}
                onClickFilterTitle={onClickFilterTitle}
                clearAllFilter={(e) => {
                  e.preventDefault();
                  setSelectedFilterValue("");
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
                isDisabledSortBy={true}
              />
            </div>
          </div>
        </div>
      </div>

      <CommonConfirmationModal
        show={showConfirm}
        size="md"
        position="top"
        handleClose={closeModal}
        title="Cancel Stock Transfer Order"
        message="Are you sure you want to cancel?"
        handleConfirm={onCloseModel}
      />
      <div className="d-none">
        <a href="!#" id="download_button" target="_blank" download={true}></a>
      </div>
    </div>
  );
}
StoreDelivery.permission = {
  module: "orders",
  sub_module: "store-orders",
  roles: ["LIST"],
  redirectURL: "/",
};
export default StoreDelivery;
