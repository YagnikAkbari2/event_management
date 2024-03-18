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
import { getStoreList } from "../../redux/actions/productAction";

import moment from "moment";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";

import { getImportHistory } from "../../redux/actions/auditAction";
import { fileUploadForm } from "../../commonJSON/fileUploadForm";
import StatusChip from "../../Components/Shared/Chip/StatusChip";
import Image from "next/image";
function ImportHistory() {
  const datePickerRef = useRef();

  const { importHistory, importHistoryMetaData } = useSelector(
    (state) => state.audit
  );
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
  const importHistoryTableData = {
    column: [
      {
        title: "Uploaded At/Created by",
        field: "created_at",
        isShort: false,
        customField: (row, ind) => {
          return (
            <p>
              <span className="text-secondary">
                {row?.created_at
                  ? moment(row?.created_at, "DD-MM-YYYY hh:mm:ss a")?.format(
                      "DD-MM-YY hh:mm a"
                    )
                  : ""}
              </span>
              {row?.created_by ? `(${row?.created_by})` : "-"}
            </p>
          );
        },
      },
      {
        title: "File Type",
        field: "file_type",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.file_type}</p>;
        },
      },
      {
        title: "Module",
        field: "module",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.module}</p>;
        },
      },
      {
        title: "Operation",
        field: "operation",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.operation}</p>;
        },
      },
      {
        title: "Records Created",
        field: "records_created",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.records_created}</p>;
        },
      },
      {
        title: "Records Errored",
        field: "records_errored",
        isShort: false,
        customField: (row, ind) => {
          return <p>{row?.records_errored}</p>;
        },
      },
      {
        title: "Status",
        field: "status",
        isShort: false,
        isMultiple: true,
        customField: (row) => {
          return (
            <>
              {row?.status === "PROCESSED" && (
                <StatusChip
                  status={"Processed"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.status === "INIT" && (
                <StatusChip
                  status={"Init"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.status === "VALIDATED" && (
                <StatusChip
                  status={"Validated"}
                  bgColor="#BAF0DA"
                  bulletColor="#007F5F"
                  textColor="#202223"
                />
              )}
              {row?.status === "VALIDATING" && (
                <StatusChip
                  status={"Validating"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4AE4B"
                  textColor="#202223"
                />
              )}
              {row?.status === "PROCESSING" && (
                <StatusChip
                  status={"Processing"}
                  bgColor="#FFDBB9"
                  bulletColor="#E4AE4B"
                  textColor="#202223"
                />
              )}
              {row?.status === "PENDING" && (
                <StatusChip
                  status={"Pending"}
                  bgColor="#EBEEF0"
                  bulletColor="#C0C0C0"
                  textColor="#202223"
                />
              )}
              {row?.status === "FAILED" && (
                <StatusChip
                  status={"Failed"}
                  bgColor="#FED3D1"
                  bulletColor="#D72C0D"
                  textColor="#202223"
                />
              )}
              {row?.status === "CANCELED" && (
                <StatusChip
                  status={"Canceled"}
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
        customField: (row, ind) => {
          let href = row?.raw_file_path;
          if (row?.status === "PROCESSED") {
            href = row?.final_path;
          } else if (row?.status === "VALIDATED") {
            href = row?.validated_path;
          }
          return (
            <a
              href={href}
              download
              target="_blank"
              rel="noreferrer"
              style={{ width: "30px", height: "30px" }}
            >
              <Image
                src={"/assets/table/download_icon.svg"}
                width={30}
                height={30}
              />
            </a>
          );
        },
      },
    ],
    searchColumn: [
      {
        title: "Module",
        field: "module",
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

  const router = useRouter();
  //   const permission = usePermission();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [valueData, setValueData] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedColumnSearch, setSelectColumnSearch] = useState(
    importHistoryTableData?.searchColumn
      ? importHistoryTableData?.searchColumn[0]
      : ""
  );

  function utilsFormData() {
    let form = fileUploadForm;

    return form;
  }

  const onQueryChange = (page) => {
    const query = QueryUtilityFunc(
      searchQuery, //change this as per column fields
      selectedColumnSearch,
      selectedFilterValue,
      null,
      page ?? 1,
      importHistoryTableData?.filterColumn ?? []
    );
    dispatch(getImportHistory(query));
    dispatch(loadingAction({ isLoading: true }));
  };

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
            {val?.store_code}
          </span>
          <span className="me-2 px-2 ">{val?.name}</span>
        </div>
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

  return (
    <div className="page-content">
      <PageHeader />

      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body p-0">
              <ListingComponents
                data={importHistory ?? []}
                searchhHistory={true}
                column={importHistoryTableData?.column}
                //search

                // customFieldDropdown={() => {}}
                //filter
                //sort
                filterColumn={importHistoryTableData?.filterColumn ?? ""}
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
                searchDropdownData={importHistoryTableData?.searchColumn ?? ""}
                paginationData={importHistoryMetaData ?? {}}
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
                selectedColumnSearch={selectedColumnSearch}
                innerSearchValue={searchQuery ?? ""}
                onChangeSearch={(e) => {
                  setSearchQuery(e.target.value);
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
// SalesOrderList.permission = {
//   module: "master",
//   sub_module: "mrp-ptr-ratio",
//   roles: ["LIST"],
//   redirectURL: "/mrp-ptr-ratio",
// };
ImportHistory.layoutType = "AUDIT";
export default ImportHistory;
