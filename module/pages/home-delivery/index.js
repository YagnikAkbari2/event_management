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
const CommonMasterModal = dynamic(
  () => import("../../Components/Shared/CommonModal/CommonMasterModal"),
  { ssr: false }
);
const CommonConfirmationModal = dynamic(
  () => import("../../Components/Shared/CommonModal/CommonConfirmationModal"),
  { ssr: false }
);
const StatusChip = dynamic(
  () => import("../../Components/Shared/Chip/StatusChip"),
  { ssr: false }
);
const PageHeader = dynamic(
  () => import("../../Components/Shared/PageHeader/PageHeader"),
  { ssr: false }
);
import QueryUtilityFunc from "../../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import moment from "moment";
import Link from "next/link";
import useCheckValidation from "../../hooks/useCheckValidation";
import { homeDeliveryForm } from "../../commonJSON/homeDeliveryForm";
import {
  SET_ADDRESS_BY_PINCODE,
  SET_ADDRESS_ERROR,
  createOrderForDelivery,
  getAddressByPincode,
  getHomeDeliveryDownloadLink,
  getHomeDeliveryListing,
  resetDownloadHomeDelivery,
} from "../../redux/actions/homeDeliveryAction";
import { storeSearch } from "../../redux/actions/userAction";
import { tokens } from "../../commonjs/common";
import { convertToModuleName } from "../../commonjs/commonHelpers";
import { useRouter } from "next/router";
import CommonDownloadModel from "../../Components/Shared/CommonModal/CommonDownloadModel";
import { getToaster } from "../../redux/actions/toasterAction";
import { permissions } from "../../commonjs/constants";
import usePermission from "../../hooks/usePermission";
function HomeDelivery() {
  const datePickerRef = useRef();
  const checkValidation = useCheckValidation();
  const router = useRouter();
  const {
    listingHomeDelivery,
    paginationData,
    StoreListSearchDelivery,
    addressByPincode,
    addressError,
    homeDeliveryDownload,
  } = useSelector((state) => state.homeDelivery);
  const { isSuccess } = useSelector((state) => state.ui);
  const { storeDetails } = useSelector((state) => state.product);
  const { userDetails, storeListData, currentStoreData } = useSelector(
    (state) => state.user
  );
  const permission = usePermission();
  const [isCheckValid, setIsCheckValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [show, setShow] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
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
  const [selectedFilterValueDownload, setSelectedFilterValueDownload] =
    useState({});
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
  const [checkPermission, setCheckPermission] = useState({});
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
        title: "Pickup Address",
        field: "from_name",
        isShort: false,
      },
      {
        title: "Customer Name",
        field: "to_name",
        isShort: false,
      },
      {
        title: "Customer Pincode",
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
              {row?.order_status === "IN_PROGRESS" && (
                <StatusChip
                  status={"In Progress"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4AE4B"
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
        title: "Is Delivery Fees Collected",
        field: "is_delivery_charge_collected",
        isShort: false,
        customField: (raw) => {
          return (
            <p>
              {raw?.is_delivery_charge_collected
                ? raw?.is_delivery_charge_collected
                : "Order is greater than or equal to 500"}
            </p>
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
        title: "Customer Name",
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
  const [customValue, setCustomValue] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filterInitialValue, setFilterInitialValue] = useState(false);
  const [homeDeliveryData, setHomeDeliveryData] = useState({});

  const type = [
    { key: "COD", value: "COD" },
    { key: "Prepaid", value: "Prepaid" },
  ];
  const delivery_fees = [
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
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
          return filters?.filter[val] === "" ? false : true;
        });
        setFilterInitialValue(filterShow?.length === 0 ? false : true);
        if (filters?.column?.field !== selectedColumnSearch?.field)
          setSelectColumnSearch(filters.column);
        setSearchQuery(filters?.search);
      }
    }
    // }
  }, [moduleName]);
  console.log("sasdsdsasas", homeDeliveryData, selectedFilterValue);
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
    dispatch(getHomeDeliveryListing(`${query}`));
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
    selectedColumnSearch?.field,
    currentStoreData,
  ]);

  const onOpenModal = async (id) => {
    if (id === null || id === undefined) {
      setShow(true);
      setEdit(false);
      setIsCheckValid(false);
    }
  };

  function utilsFormData() {
    let form = homeDeliveryForm;
    if (homeDeliveryData.amount < 500 && homeDeliveryData.amount > 0) {
      form[0].child[7] = {
        label: "Delivery Fees Collected*",
        isRequired: true,
        fieldType: "select",
        // isDisabled:true,
        fieldName: "delivery_fees",
        optionKey: "key",
        optionValue: "value",
        compareField: "amount",
        validation: function (data, compareField) {
          return {
            isValid: compareField >= 500 ? false : data ? false : true,
            message: "Delivery fees collected is required.",
          };
        },
      };
    } else {
      form[0].child[7] = {
        validation: function (data) {
          return {
            isValid: false,
            message: "Pickup address is required.",
          };
        },
      };
    }

    if (
      addressError &&
      homeDeliveryData?.pincode &&
      homeDeliveryData?.pincode?.length === 6
    ) {
      form[0].child[12].isDisabled = false;
      form[0].child[13].isDisabled = false;
    } else {
      form[0].child[12].isDisabled = true;
      form[0].child[13].isDisabled = true;
    }
    return form;
  }

  const onCloseModel = () => {
    setShowConfirm(false);
    setIsCheckValid(false);
    setHomeDeliveryData({});
    setShow(!show);
    setIsEdited(false);
  };
  const onCloseModelDownload = () => {
    dispatch(loadingAction({ isLoading: true }));
    dispatch(
      getHomeDeliveryDownloadLink(
        `from_date=${selectedFilterValueDownload?.from_date ?? ""}&to_date=${
          selectedFilterValueDownload?.to_date ?? ""
        }&status=${selectedFilterValueDownload?.status?.value ?? ""}&store_id=${
          selectedFilterValueDownload?.store_id?.id ?? ""
        }`
      )
    );

    setSelectedFilterValueDownload("");
  };
  const handleChangeSelect = (e, bodyChild) => {
    let data = homeDeliveryData;

    if (bodyChild.fieldName === "type") {
      data[bodyChild.fieldName] = e.target.value;
    } else if (bodyChild.fieldType === "tag-input") {
      if (bodyChild?.fieldName === "stores") {
        data[bodyChild?.fieldName] = e;
      }
    } else if (bodyChild.fieldName === "delivery_fees") {
      data[bodyChild.fieldName] = e.target.value;
    }
    setHomeDeliveryData({ ...data });
  };
  const handleChangeInput = (e, f) => {
    setIsEdited(true);
    var data = homeDeliveryData;
    if (f?.fieldName === "pincode") {
      data[f?.fieldName] = e.target.value;
      if (data[f?.fieldName].length === 6) {
        dispatch(getAddressByPincode(data[f?.fieldName]));
      }
    } else {
      data[f?.fieldName] = e.target.value;
    }
    setHomeDeliveryData({ ...data });
  };

  const handleSave = async () => {
    setIsCheckValid(true);
    let data = JSON.parse(JSON.stringify(homeDeliveryData));

    if (await checkValidation(utilsFormData(), data)) {
      try {
        if (parseInt(homeDeliveryData?.amount) >= 500) {
          delete homeDeliveryData.delivery_fees;
        }
        let data = {
          orderType: "B2C",
          orderNumber: homeDeliveryData?.orderNumber,
          amount: Math.round(homeDeliveryData?.amount),
          store_name: homeDeliveryData?.stores?.store_name,
          from_store_id: homeDeliveryData?.stores?.id,
          paymentType: homeDeliveryData?.type,
          employee_code: homeDeliveryData?.employee_code,
          is_delivery_charge_collected: homeDeliveryData?.delivery_fees ?? "",
          shippingAddress: {
            name: homeDeliveryData?.name,
            email: homeDeliveryData?.email ?? "",
            phone: homeDeliveryData?.phone,
            address1: homeDeliveryData?.address1,
            address2: homeDeliveryData?.address2 ?? "",
            city: homeDeliveryData?.city,
            state: homeDeliveryData?.state,
            zip: homeDeliveryData?.pincode,
          },
        };

        dispatch(createOrderForDelivery(data));
        dispatch(loadingAction({ isLoading: true }));
        dispatch({ type: SET_ADDRESS_ERROR, payload: "" });
      } catch (err) {
        console.log("asasa", err);
      }

      setIsCheckValid(false);
    }
  };

  const closeModal = () => {
    setShowConfirm(false);
  };

  const closeModalDownload = () => {
    setShowDownload(false);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(loadingAction({ isLoading: false }));
      dispatch(resetUIAction());
      setShow(false);
      setEdit(false);
      setSelectedFilterValue({});
      setHomeDeliveryData({});
      setShowDownload(false);

      // scanTable()
    }
  }, [dispatch, isSuccess]);

  const getConfigData = () => {
    let data = { stores: storeListData };
    data.type = type;
    data.delivery_fees = delivery_fees;
    return data;
  };
  const onClickFilterTitle = (columnData) => {
    console.log("xbcvncxn", columnData);
    if (columnData?.field === "store_id") {
      if (store?.length === 0) {
        dispatch(storeSearch());
      }
    }
  };
  const onDropdownSearch = (e, column) => {
    // if (column.field === "order_placed_by") {
    //     e.target.value?.trim() !== "" &&
    //         dispatch(getUsersList(`search=${e.target.value?.trim()},name`));
    // }
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
  useEffect(() => {
    console.log("addressByPincode", addressByPincode);
    if (addressByPincode && addressByPincode?.city) {
      homeDeliveryData["city"] = addressByPincode?.city;
      homeDeliveryData["state"] = addressByPincode?.state;
      setHomeDeliveryData({ ...homeDeliveryData });
      dispatch({ type: SET_ADDRESS_BY_PINCODE, payload: "" });
      dispatch({ type: SET_ADDRESS_ERROR, payload: "" });
    }
  }, [addressByPincode]);

  const processButtonClick = (url) => {
    if (url) {
      document.getElementById("download_button").href = url;
      document.getElementById("download_button").click();

      // router.reload();
    }
  };

  const handleClickDownload = () => {
    // dispatch(getHomeDeliveryDownloadLink(`from_date=${selectedFilterValue?.from_date ?? ""}&to_date=${selectedFilterValue?.to_date ?? ""}&status=${selectedFilterValue?.status?.value ?? ""}&store_id=${selectedFilterValue?.store_id?.id ?? ""}&search=${(searchQuery+","+selectedColumnSearch?.field)?? ""}`));
    setShowDownload(true);
  };
  useEffect(() => {
    if (homeDeliveryDownload) {
      processButtonClick(homeDeliveryDownload);
    }

    return () => {
      dispatch(resetDownloadHomeDelivery());
    };
  }, [homeDeliveryDownload]);

  useEffect(() => {
    if (
      homeDeliveryData.amount < 500 &&
      homeDeliveryData.amount > 0 &&
      homeDeliveryData?.delivery_fees === "No"
    ) {
      setCustomValue(true);
      dispatch(
        getToaster({
          type: "error",
          message:
            "Delivery fees should be collected if bill amount is less than 500 ",
        })
      );
    } else {
      setCustomValue(false);
    }
  }, [homeDeliveryData]);
  useEffect(() => {
    if (userDetails) {
      let checkedPermission = {};
      permissions.forEach((ele) => {
        checkedPermission[ele] = permission("orders", "store-orders", ele);
      });
      setCheckPermission(checkedPermission);
    }
  }, [userDetails, currentStoreData]);
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
        title="Download Home Delivery Order"
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
        // modelSize={"xl"}
        title={"Add Home Delivery Data"}
        formData={utilsFormData()}
        fieldData={homeDeliveryData}
        configData={getConfigData()}
        handleChangeSelect={handleChangeSelect}
        handleChangeInput={handleChangeInput}
        isCheckValid={isCheckValid}
        onChangeInputTag={(val, bodyChild) => {
          setIsEdited(true);
          if (val !== "") {
            if (bodyChild?.fieldName === "stores") {
              dispatch(storeSearch(`q=${encodeURIComponent(val)}`));
            }
          }
        }}
        handleSave={handleSave}
        handleToggle={() => {
          setShowConfirm(true);
        }}
        customValue={customValue}
        isEdited={isEdited}
      />

      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body p-0">
              <ListingComponents
                data={listingHomeDelivery}
                column={UsersData?.column}
                filterColumn={UsersData?.filterColumn ?? ""}
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
                valueData={filterConstValues}
                //search
                onSelectColumnSearch={(e) => {
                  setSearchQuery("");
                  setSelectColumnSearch(e);
                }}
                onClickFilterTitle={onClickFilterTitle}
                searchResults={searchResults}
                onSearchSelect={{}}
                selectedColumnSearch={selectedColumnSearch}
                innerSearchValue={searchQuery ?? ""}
                isDropdownPresent={isDropdownPresent}
                onChangeSearch={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onDropdownSearch={onDropdownSearch}
                selectedFilterValue={selectedFilterValue}
                onSelectValue={(val, columnname) => {
                  setSelectedFilterValue({
                    ...selectedFilterValue,
                    [columnname.field]: val,
                  });
                }}
                filterInitialValue={filterInitialValue}
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
        title="Cancel Home Delivery Order"
        message="Are you sure you want to cancel?"
        handleConfirm={onCloseModel}
      />
      <div className="d-none">
        <a href="!#" id="download_button" target="_blank" download={true}></a>
      </div>
    </div>
  );
}
HomeDelivery.permission = {
  module: "orders",
  sub_module: "store-orders",
  roles: ["LIST"],
  redirectURL: "/",
};
export default HomeDelivery;
