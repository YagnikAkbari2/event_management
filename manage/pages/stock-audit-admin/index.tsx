import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateObject } from "react-multi-date-picker";
import { loadingAction } from "../../redux/actions/loaderAction";
import { storeSearch } from "../../redux/actions/userAction";
import useCheckValidation from "../../hooks/useCheckValidation";
import { v4 as uuidv4 } from "uuid";
const ListingComponents = dynamic(
  () => import("../../Components/Shared/ListingComponents/ListingComponents"),
  { ssr: false }
);
import { getToaster } from "../../redux/actions/toasterAction";

import QueryUtilityFunc from "../../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import { getStoreList } from "../../redux/actions/productAction";
import moment from "moment";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
const CommonMasterModal = dynamic(
  () => import("../../Components/Shared/CommonModal/CommonMasterModal"),
  { ssr: false }
);
import {
  getAllAuditTasks,
  getNewFoundProductsInTaskAction,
  getQtyMismatchedProductsAction,
} from "../../redux/actions/auditAction";
import { fileUploadForm } from "../../commonJSON/fileUploadForm";
import axios from "axios";
import { resetUIAction, setUIAction } from "../../redux/actions/uiAction";
import StatusChip from "../../Components/Shared/Chip/StatusChip";
import CommonSideDrawer from "../../Components/SideDrawer/CommonSideDrawer";
import { permissions } from "../../commonjs/constants";
import usePermission from "../../hooks/usePermission";
import { Image } from "react-bootstrap";
import CommonConfirmationModal from "../../Components/Shared/CommonModal/CommonConfirmationModal";
import { deleteAuditTask } from "../../redux/actions/stockAuditAction";
import CommonDownloadModel from "../../Components/Shared/CommonModal/CommonDownloadModel";

import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET;

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
} as {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
});

type singleDate = string | DateObject | Date;
type dateRange = (string | DateObject | Date)[];
type stringOrNull = null | string;

interface ISlectedFilters {
  date_range?: dateRange;
  from_date?: singleDate;
  to_date?: singleDate;
}

interface IFinalData {
  csv_import?: string;
  url?: string;
  productLocation?: { label: string }[];
  stores?: { id: number; name: string; store_code: string }[];
}

interface IStockAuditAdminRow {
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
  email: string;
  mobile_number: string;
  name: string;
  type: string;
  employee_code: stringOrNull;
  id: number;
  is_expiry: boolean;
  new_products_count: number;
  mismatched_products_count: number;
  request_location: string;
  started_at: stringOrNull;
  status: string;
  store: {
    name: string;
    ws_alternate_code: stringOrNull;
  };
  total_products: number;
  total_quantity: number;
  total_reviewed_quantity: stringOrNull;
}

interface IQueryRow {
  default_quantity: string;
  id: number;
  mismatched_quantity: number;
  product_code: stringOrNull;
  product_location: string;
  product_name: string;
  quantity_status: string;
  reviewed_quantity: string;
  task_detail_type: string;
}

interface IQtyMismatchedRow {
  default_quantity: string;
  id: number;
  mismatched_quantity: number;
  product_code: stringOrNull;
  product_location: string;
  product_name: string;
  quantity_status: string;
  reviewed_quantity: string;
  task_detail_type: string;
}

interface IFileInput {
  label?: string;
  fileLabel?: string;
  fieldType: string;
  fieldName: string;
  accept?: string;
  inputClassName?: string;
  innerLabelClassName?: string;
  validation: Function;
}

interface StockAuditAdminHeaders extends ICommonHeaders {
  width?: string;
}
interface IQtyMismatchedHeaders extends ICommonHeaders {}
interface IQueriesHeaders extends ICommonHeaders {}

interface IStockAuditTableData {
  column?: StockAuditAdminHeaders[];
  searchColumn?: ISearchColumn[];
  filterColumn?: IfilterColumnObj[];
}
interface IQueriesSideDrawerData {
  columns?: IQtyMismatchedHeaders[];
}
interface IQtyMismatchedDrawerData {
  columns?: IQueriesHeaders[];
}

interface IStoreResObj {
  id: number;
  name: string;
  store_code: string;
}

function StockAuditList() {
  const datePickerRef = useRef<any>();
  const dispatch = useDispatch();

  const { store } = useSelector((state) => (state as any).product);
  const { isSuccess } = useSelector((state) => (state as any).ui);
  const {
    auditTasksAll,
    auditTasksAllMetaData,
    newFoundProductsTask,
    qtyMismatchedProducts,
  } = useSelector((state) => (state as any).audit);

  const permission: Function = usePermission();
  const [checkPermission, setCheckPermission] = useState<any>({});
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { storeListData } = useSelector((state) => (state as any).user);
  // const [storeDeliveryData, setStoreDeliveryData] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const showModal = (id: number): void => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const closeModal = (): void => {
    setDeleteId(null);
    setShowDeleteModal(false);
  };

  const type = [
    { key: "COD", value: "COD" },
    { key: "Online", value: "ONLINE" },
  ];

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
        title: "Assign Date",
        field: "created_at",
        isShort: false,
        customField: (row: IStockAuditAdminRow) => {
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
        title: "Store name",
        field: "store_name",
        isShort: false,
        customField: (row: IStockAuditAdminRow) => {
          return <p>{row?.store?.name}</p>;
        },
      },
      {
        title: "Audit Number",
        field: "audit_number",
        isShort: false,
        customField: (row: IStockAuditAdminRow) => {
          return <p>{row?.audit_number}</p>;
        },
      },
      {
        title: "Store Code",
        field: "store_code",
        isShort: false,
        customField: (row: IStockAuditAdminRow) => {
          return <p>{row?.store?.ws_alternate_code}</p>;
        },
      },
      {
        title: "Total Products",
        field: "total_products",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
          return <p>{row?.total_products ?? ""}</p>;
        },
      },
      {
        title: "Started At",
        field: "started_at",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
          return (
            <p>
              {row?.started_at
                ? moment(row?.started_at, "DD-MM-YYYY hh:mm:ss a")?.format(
                    "DD-MM-YY hh:mm a"
                  )
                : "-"}
            </p>
          );
        },
      },
      {
        title: "Completed At",
        field: "completed_at",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
          return (
            <p>
              {row?.completed_at
                ? moment(row?.completed_at, "DD-MM-YYYY hh:mm:ss a")?.format(
                    "DD-MM-YY hh:mm a"
                  )
                : "-"}
            </p>
          );
        },
      },

      {
        title: "No of Queries",
        field: "new_products_count",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
          return (
            <p
              className="text-primary cursor-pointer"
              onClick={() => {
                if (
                  row?.new_products_count > 0 &&
                  row?.status === "COMPLETED"
                ) {
                  dispatch(getNewFoundProductsInTaskAction(`/${row?.id}`));
                  setShowQueriesDrawer(true);
                }
              }}
            >
              {row?.new_products_count ?? "-"}
            </p>
          );
        },
      },
      {
        title: "Product Qty Mismatched",
        field: "mismatched_products_count",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
          return (
            <p
              className="text-danger cursor-pointer"
              onClick={() => {
                if (
                  row?.mismatched_products_count >= 0 &&
                  row?.status === "COMPLETED"
                ) {
                  dispatch(getQtyMismatchedProductsAction(`/${row?.id}`));
                  setShowQtyMismatchDrawer(true);
                }
              }}
            >
              {row?.mismatched_products_count ?? "-"}
            </p>
          );
        },
      },

      {
        title: "Completion Percentage",
        field: "completion_percentage",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
          return <p>{parseInt(row?.completion_percentage ?? 0)}%</p>;
        },
      },
      {
        title: "Expiry Status",
        field: "is_expiry",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
          return (
            <>
              {row.is_expiry ? (
                <StatusChip
                  status={"Expired"}
                  bgColor="#FED3D1"
                  bulletColor="#D72C0D"
                  textColor="#202223"
                />
              ) : (
                "-"
              )}
            </>
          );
        },
      },
      {
        title: "Status",
        field: "status",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
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
        title: "Action",
        field: "action",
        isShort: false,
        isMultiple: true,
        customField: (row: IStockAuditAdminRow) => {
          return checkPermission["DELETE"] && row?.status === "PENDING" ? (
            <button
              id="delete-item"
              className="btn p-0"
              onClick={() => {
                showModal(row?.id);
              }}
            >
              <Image
                width={10}
                height={10}
                src="/assets/table/delete_icon.svg"
                alt="delete-button-icon"
              />
            </button>
          ) : (
            ""
          );
        },
      },
    ],
    searchColumn: [
      {
        title: "Store",
        field: "store",
      },
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
      {
        title: "Order Status",
        field: "status",
        valueKey: "label",
        selectValue: "value",
      },
      {
        title: "Expiry Status",
        field: "is_expiry",
        valueKey: "label",
        selectValue: "value",
      },
    ],
  };

  const QueriesSideDrawerData: IQueriesSideDrawerData = {
    columns: [
      {
        title: "Product Name",
        field: "product_name",
        isShort: false,
      },
      {
        title: "Location",
        field: "product_location",
        isShort: false,
      },
      {
        title: "Found Qty",
        field: "reviewed_quantity",
        isShort: false,
      },
      {
        title: "Type",
        field: "task_detail_type",
        isShort: false,
        isMultiple: true,
        customField: (row: IQueryRow) => {
          return (
            <>
              {row?.task_detail_type === "UNARRANGED" && (
                <StatusChip
                  status={"Unarranged"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.task_detail_type === "NEW_PRODUCT" && (
                <StatusChip
                  status={"New Product"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4824B"
                  textColor="#202223"
                />
              )}
            </>
          );
        },
      },
    ],
  };
  const qtyMismatchedDrawerData: IQtyMismatchedDrawerData = {
    columns: [
      {
        title: "Product Name",
        field: "product_name",
        isShort: false,
      },
      {
        title: "Location",
        field: "product_location",
        isShort: false,
      },
      {
        title: "Stock",
        field: "default_quantity",
        isShort: false,
      },
      {
        title: "Found Qty",
        field: "reviewed_quantity",
        isShort: false,
      },
      {
        title: "Qty Status",
        field: "qty_status",
        isShort: false,
        isMultiple: true,
        customField: (row: IQtyMismatchedRow) => {
          return (
            <>
              {row?.quantity_status === "MORE" && (
                <StatusChip
                  status={"More"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.quantity_status === "LESS" && (
                <StatusChip
                  status={"Less"}
                  bgColor="#FED3D1"
                  bulletColor="#D72C0D"
                  textColor="#202223"
                />
              )}
            </>
          );
        },
      },
    ],
  };

  const [storeID, setStoreID] = useState<stringOrNull>("");
  // const [mrpListData, setMrpListData] = useState([]);

  const { usersList, userDetails, currentWarehouse, currentStoreData } =
    useSelector((state) => (state as any)?.user);

  // const { reportList, mrpPtrListMeta } = useSelector(
  //   (state) => (state as any).report
  // );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [valueData, setValueData] = useState<any>("");

  // const [currentPage, setCurrentPage] = useState(1);

  const [selectedColumnSearch, setSelectColumnSearch] = useState<ISearchColumn>(
    stockAuditTableData?.searchColumn
      ? stockAuditTableData?.searchColumn[0]
      : {}
  );
  const [isDropdownPresent, setIsDropDownPresent] = useState(false);
  const checkValidation = useCheckValidation();

  const [searchResults, setSearchResults] = useState([]);

  const [isCheckValid, setIsCheckValid] = useState(false);
  const [stockAuditData, setStockAuditData] = useState([]);
  const [show, setShow] = useState(false);
  const [fileUploadFormData, setFileUploadFormData] = useState({});
  const [fileUploadData, setFileUploadData] = useState<IFinalData>({});
  console.log("xvcvb", fileUploadData);
  const [showQueriesDrawer, setShowQueriesDrawer] = useState(false);
  const [showQtyMismatchDrawer, setShowQtyMismatchDrawer] = useState(false);
  const [qtyMismatchProductsData, setQtyMismatchProductsData] = useState([]);
  const [newProductsFoundData, setNewProductsFoundData] = useState([]);
  function utilsFormData() {
    let form = fileUploadForm;
    return form;
  }

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: IFileInput
  ) => {
    console.log("xcbcvb", field);
    const uuid = uuidv4();
    const short = require("short-uuid");

    if (field?.fieldName === "csv_import") {
      dispatch(loadingAction({ isLoading: true }));
      let Body: any, fileName;
      try {
        if (e.target.files) {
          Body = await e.target.files[0].arrayBuffer();
          fileName = e.target.files[0].name;

          if (fileName && !fileName.endsWith(".csv")) {
            throw new Error("Invalid file type. Please select a CSV file.");
          }
          const uuid = uuidv4();
          const translator = short(short.constants.uuid);
          const shortUuid = translator.new();
          const filename = `Store_Audit_Task_${shortUuid}.csv`;
          const response = await s3.send(
            new PutObjectCommand({
              Bucket,
              Key: filename,
              Body,
              ACL: "public-read",
            })
          );
          const fileUrl = `${process.env.NEXT_PUBLIC_AWS_URL}${filename}`;

          setFileUploadData({
            ...(fileUploadData ?? {}),
            url: fileUrl,
            [field?.fieldName]: e.target.files[0],
          });
        }
        dispatch(loadingAction({ isLoading: false }));
      } catch (error) {
        dispatch(loadingAction({ isLoading: false }));
        console.log("AWS error:", error);
      }
    }
  };
  const handleClearFileUpload = (field: IFileInput) => {
    // setFileUploadData({});
    setFileUploadData({ ...fileUploadData, [field?.fieldName]: "" });
    var input = document.getElementById(
      "file_upload_Select Csv File To Upload"
    ) as HTMLInputElement | null;
    if (input) {
      input.value = "";
    }
  };

  const onDelete = async () => {
    if (deleteId) {
      dispatch(loadingAction({ isLoading: true }));
      dispatch(deleteAuditTask(deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };
  const handleSave = async () => {
    const NEXT_PUBLIC_BASE_URL_AUDIT =
      process.env.NEXT_PUBLIC_BASE_URL_STORE_OPS ||
      "https://opsapi-v2.mkart.dev/api/v1";
    setIsCheckValid(true);
    let finaldata: IFinalData = JSON.parse(JSON.stringify(fileUploadData));

    if (await checkValidation(utilsFormData(), finaldata)) {
      var storeStr = "";
      var locStr = "";

      if (finaldata?.stores) {
        let storeArr: number[] = [];
        finaldata?.stores?.map((val) => {
          storeArr.push(val?.id);
        });
        storeStr = storeArr.join(",");
      }

      if (finaldata?.productLocation) {
        let productLocArr: string[] = [];
        finaldata?.productLocation?.map((val) => {
          productLocArr.push(val?.label);
        });
        locStr = productLocArr.join(",");
      }

      dispatch(loadingAction({ isLoading: true }));
      var FormData = require("form-data");
      var data = new FormData();
      var token = await localStorage.getItem("token");
      data.append("file", fileUploadData?.csv_import);
      data.append("module_name", "AUDIT_TASK");
      data.append("operation", "ADD");
      data.append("store", storeStr);
      data.append("location", locStr);

      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${NEXT_PUBLIC_BASE_URL_AUDIT}/file-generation/task`,

        headers: {
          Authorization: `Bearer ${token}`,
          location: localStorage.getItem("active_store_id"),
        },
        data: {
          url: fileUploadData?.url ?? "",
          store: storeStr,
          location: locStr,
        },
      };

      axios(config)
        .then(function (response) {
          if (response) {
            dispatch(
              getToaster({ type: "success", message: response?.data?.message })
            );
          }

          dispatch(setUIAction());
          setFileUploadData({});
          dispatch(loadingAction({ isLoading: false }));
          setShow(false);
          setIsCheckValid(false);
        })
        .catch(function (error) {
          dispatch(
            getToaster({
              type: "error",
              message: error?.response?.data?.message,
            })
          );
          dispatch(loadingAction({ isLoading: false }));
        });

      setIsCheckValid(false);
    }
  };

  const onQueryChange = (page?: number) => {
    const query = QueryUtilityFunc(
      selectedColumnSearch?.field !== "store" ? searchQuery : "", //change this as per column fields
      selectedColumnSearch,
      selectedFilterValue,
      null,
      page ?? 1,
      stockAuditTableData?.filterColumn ?? []
    );
    if (searchQuery === "" || selectedColumnSearch?.field === "audit_number") {
      dispatch(getAllAuditTasks({ query, isAdmin: true }));
    } else if (storeID !== "") {
      dispatch(
        getAllAuditTasks({
          query: `${query}&store_code=${storeID}`,
          isAdmin: true,
        })
      );
    } else {
      dispatch(getStoreList(`q=${searchQuery}`));
    }
    dispatch(loadingAction({ isLoading: true }));
  };

  const onSearchSelect = (val: IStoreResObj) => {
    setSearchQuery(`${val?.name} / ${val?.store_code}`);
    setStoreID(val?.store_code);
    setIsDropDownPresent(false);
  };

  const onDropdownSearch = (
    e: React.FormEvent<HTMLInputElement>,
    column: ISearchColumn
  ) => {
    if (column.field === "store_id") {
      if (e.currentTarget && e.currentTarget.value) {
        dispatch(storeSearch(`q=${encodeURIComponent(e.currentTarget.value)}`));
      }
    }
  };
  const customFieldDropdown = (val: IStoreResObj) => {
    return (
      <div className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <span className="px-2 bg-lightGray rounded text-dark">
            {val?.store_code}
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

  useEffect(() => {
    if (store) setSearchResults(store);
  }, [store]);

  useEffect(() => {
    window.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as HTMLInputElement).id === "navbarFormList") {
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
    if (isSuccess) {
      onQueryChange();
    }
    dispatch(resetUIAction());
  }, [isSuccess]);
  useEffect(() => {
    if (newFoundProductsTask && newFoundProductsTask?.length) {
      setNewProductsFoundData(newFoundProductsTask);
    }
  }, [newFoundProductsTask]);
  useEffect(() => {
    if (qtyMismatchedProducts && qtyMismatchedProducts?.length) {
      setQtyMismatchProductsData(qtyMismatchedProducts);
    }
  }, [qtyMismatchedProducts]);
  useEffect(() => {
    if (userDetails) {
      let checkedPermission: any = {};
      permissions.forEach((ele) => {
        checkedPermission[ele] = permission("inventory", "admin-audit", ele);
      });
      setCheckPermission(checkedPermission);
    }
  }, [userDetails, currentStoreData]);
  useEffect(() => {
    let taskStatus = [
      {
        label: "In Progress",
        value: "IN_PROGRESS",
      },
      {
        label: "Pending",
        value: "PENDING",
      },
      {
        label: "Completed",
        value: "COMPLETED",
      },
    ];
    let expiryStatus = [
      {
        label: "Expired",
        value: true,
      },
      {
        label: "Non-Expired",
        value: false,
      },
    ];
    setValueData({
      status: taskStatus,
      is_expiry: expiryStatus,
    });
  }, []);

  const handleChangeInput = (
    e: React.FormEvent<HTMLInputElement>,
    f: IBodyChild
  ) => {
    console.log("ccvn", f);
    var data: any = fileUploadData;
    data[f?.fieldName] = e.currentTarget.value;
    setFileUploadData({ ...data });
  };

  const handleChangeSelect = (
    e: { label: string }[],
    bodyChild: IBodyChild,
    field: any
  ) => {
    console.log("bvcv", e, field);
    if (bodyChild) {
      setFileUploadData({
        ...fileUploadData,
        [bodyChild?.fieldName]: e,
      });
    }
  };

  const getConfigData = () => {
    let data: {
      type?: { key: string; value: string }[];
      productLocation: { label: string }[];
      stores: { id: number; name: string; store_code: string }[] | [];
      delivery_stores: { id: number; name: string; store_code: string }[] | [];
    } = {
      stores: storeListData,
      delivery_stores: storeListData,
      productLocation: [
        { label: "A" },
        { label: "B" },
        { label: "C" },
        { label: "D" },
        { label: "E" },
        { label: "F" },
        { label: "G" },
        { label: "H " },
        { label: "I" },
        { label: "J" },
        { label: "K" },
        { label: "L" },
        { label: "M" },
        { label: "N" },
        { label: "O" },
        { label: "P " },
        { label: "Q" },
        { label: "R" },
        { label: "S" },
        { label: "T" },
        { label: "U" },
        { label: "V" },
        { label: "W" },
        { label: "X" },
        { label: "Y" },
        { label: "Z" },
      ],
    };

    data.type = type;
    return data;
  };

  console.log("xcvbg", getConfigData());

  return (
    <div className="page-content">
      <CommonSideDrawer
        fieldData={newProductsFoundData}
        showDrawer={showQueriesDrawer}
        formData={QueriesSideDrawerData}
        handleShowDrawer={() => setShowQueriesDrawer(!showQueriesDrawer)}
        showSearch={false}
        showSorting={false}
        modelHeader={"New Found Products"}
      />
      <CommonSideDrawer
        fieldData={qtyMismatchProductsData}
        showDrawer={showQtyMismatchDrawer}
        formData={qtyMismatchedDrawerData}
        handleShowDrawer={() =>
          setShowQtyMismatchDrawer(!showQtyMismatchDrawer)
        }
        showSearch={false}
        showSorting={false}
        modelHeader={"Quantity Mismatched Products"}
      />

      <PageHeader
        customButton={() => {
          return (
            <>
              {userDetails?.is_super_admin || userDetails?.is_asm ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  {" "}
                  Upload File
                </button>
              ) : (
                ""
              )}
            </>
          );
        }}
      />

      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body p-0">
              <CommonMasterModal
                show={show}
                title={"File Upload for Create task"}
                formData={utilsFormData()}
                fieldData={fileUploadData}
                // fieldData={fileData}
                // fileData={fileData}
                // configData={getConfigData()}
                handleChangeFile={handleFileChange}
                handleChangeInput={handleChangeInput}
                configData={getConfigData()}
                isCheckValid={isCheckValid}
                onChangeInputTag={(val: string, bodyChild: IBodyChild) => {
                  console.log("xvcbcn", val, bodyChild);
                  if (val !== "") {
                    if (bodyChild?.fieldName === "stores") {
                      dispatch(storeSearch(`q=${encodeURIComponent(val)}`));
                    }
                  }
                }}
                handleChangeSelect={handleChangeSelect}
                handleSave={handleSave}
                // isEdited={isEdited}
                // handleClickDownload={handleClickDownload}
                handleToggle={() => {
                  setShow(!show);
                  setIsCheckValid(false);
                  setFileUploadData({});
                  // setIsEdited(false);
                }}
                // configData={getConfigData()}
                // handleChangeSelect={handleChangeSelect}
                // onSearchSelect={(e) => {}}
                // onChangeSearch={(e) => {
                //   // if (!edit && e.target.value.trim() !== "") {
                //   // }
                // }}
                handleClearFileUpload={handleClearFileUpload}
              />

              <ListingComponents
                data={auditTasksAll ?? []}
                column={stockAuditTableData?.column ?? []}
                //search

                // customFieldDropdown={() => {}}
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
                searchResults={searchResults}
                onSearchSelect={onSearchSelect}
                selectedColumnSearch={selectedColumnSearch}
                innerSearchValue={searchQuery ?? ""}
                isDropdownPresent={isDropdownPresent}
                customFieldDropdown={customFieldDropdown}
                onChangeSearch={(e: React.FormEvent<HTMLInputElement>) => {
                  setSearchQuery(e.currentTarget.value);
                  if (
                    e.currentTarget.value !== "" &&
                    selectedColumnSearch?.field !== "store"
                  ) {
                    setIsDropDownPresent(false);
                  } else {
                    setIsDropDownPresent(true);
                    if (storeID !== "") {
                      setStoreID("");
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
                // isDisabledFilter={true}
                isDisabledSortBy={true}
              />
              <CommonConfirmationModal
                show={showDeleteModal}
                size="md"
                handleClose={closeModal}
                title={deleteId ? "Delete" : ""}
                message={deleteId ? "Are you sure you want to delete?" : ""}
                handleConfirm={deleteId ? onDelete : ""}
              />
              <CommonDownloadModel onChangeSearch={onDropdownSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
StockAuditList.permission = {
  module: "inventory",
  sub_module: "admin-audit",
  roles: ["LIST"],
  redirectURL: "/",
};
export default StockAuditList;
