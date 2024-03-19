import React, { useEffect, useMemo, useRef, useState } from "react";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import ListingComponents from "../../Components/Shared/ListingComponents/ListingComponents";
import { useRouter } from "next/router";
import { convertToModuleName } from "../../commonjs/commonHelpers";
import { tokens } from "../../commonjs/common";
import QueryUtilityFunc from "../../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import {
  getReportDetails,
  getReportDownloadURL,
  resetReportDownloadUrl,
} from "../../redux/actions/reportAction";
import moment from "moment";
import { DateObject } from "react-multi-date-picker";
import {
  citySearch,
  loadingAction,
  storeSearch,
} from "../../redux/actions/userAction";
import { reportExampleJson } from "../../commonJSON/reportExampleJson";

const ReportItem = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const datePickerRef = useRef(null);
  const moduleName = useMemo(() => {
    return convertToModuleName(router?.query ? router?.asPath?.split("/") : "");
  }, [router]);
  const { userDetails } = useSelector((state) => state.user);
  const { storeListData, cityListData } = useSelector((state) => state.user);
  const { reportData } = useSelector((state) => state.report);
  const { reportDownloadURL } = useSelector((state) => state.report);

  const filterColumns = [
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
  ];

  const getSearchColumn = (route) => {
    var res;
    reportExampleJson.map((d) => {
      var list = d.childs.filter((fd) => {
        if (fd.path === "/" + route) {
          return fd;
        }
      });
      if (list?.length) {
        res = list[0].searchColumn;
      }
    });
    return res;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filterInitialValue, setFilterInitialValue] = useState(false);

  const [valueData, setValueData] = useState({});

  const [listData, setListData] = useState([]);
  const [pageMeta, setPageMeta] = useState({});
  const [fieldJSON, setFieldJSON] = useState({});
  const [selectedColumnSearch, setSelectColumnSearch] = useState(
    getSearchColumn(router?.query?.reportname ?? "")
      ? getSearchColumn(router?.query?.reportname ?? "")[0]
      : ""
  );
  console.log("sdxcv", router?.query?.reportname);
  const [reportColumn, setReportColumn] = useState([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState({
    date_range: [
      moment(new Date().setDate(new Date().getDate() - 2)).format("DD-MM-YYYY"),
      moment(new Date()).format("DD-MM-YYYY"),
    ],
    from_date: moment(new Date().setDate(new Date().getDate() - 2)).format(
      "YYYY-MM-DD"
    ),
    to_date: moment(new Date()).format("YYYY-MM-DD"),
    city: { name: "AHMEDABAD" },
  });

  const onDropdownSearch = (e, column) => {
    if (column.field === "store_id") {
      dispatch(storeSearch(`q=${encodeURIComponent(e.target.value)}`));
    }
    if (column.field === "city") {
      dispatch(citySearch(`q=${encodeURIComponent(e.target.value)}`));
    }
  };

  const getShowSearch = (route) => {
    //console.log("reportExampleJson",route);
    var res = false;
    reportExampleJson.map((d) => {
      var list = d.childs.filter((fd) => {
        if (fd.path === "/" + route) {
          return fd;
        }
      });
      //console.log("reportExampleJson","list",list);
      if (list?.length) {
        res = d.showSearch;
      }
    });
    return res ? res?.toString().trim() : false;
  };

  const onQueryChange = (page) => {
    let filterJSON = getFilters();
    const query = QueryUtilityFunc(
      selectedColumnSearch?.field === "report_name" ? searchQuery : "",
      selectedColumnSearch,
      selectedFilterValue,
      null,
      page ?? 1,
      filterJSON ?? []
    );

    if (router?.query?.reportname) {
      dispatch(loadingAction({ isLoading: true }));
      if (query !== "") {
        dispatch(
          getReportDetails(
            `${router?.query?.reportname}?${
              searchQuery
                ? "search=" +
                  searchQuery +
                  `,${selectedColumnSearch?.field}` +
                  "&"
                : ""
            }${
              selectedFilterValue?.date_range
                ? `from_date=${
                    router?.query?.reportname !== "home-delivery-summary" ||
                    router?.query?.reportname !== "stock-transfer-summary"
                      ? selectedFilterValue?.from_date
                      : selectedFilterValue?.date_range[1] -
                          selectedFilterValue?.date_range[0] >
                        7
                      ? moment(
                          new Date(selectedFilterValue?.to_date).setDate(
                            new Date(selectedFilterValue?.to_date).getDate() - 6
                          )
                        ).format("YYYY-MM-DD")
                      : selectedFilterValue?.from_date
                  }&to_date=${selectedFilterValue?.to_date}`
                : ""
            }${
              selectedFilterValue?.city
                ? "&city=" + selectedFilterValue?.city?.name
                : ""
            }${
              selectedFilterValue?.status
                ? "&status=" + selectedFilterValue?.status?.value
                : ""
            }${
              selectedFilterValue?.is_expired
                ? "&is_expired=" + selectedFilterValue?.is_expired?.value
                : ""
            }${
              selectedFilterValue?.store_id
                ? "&store_id=" + selectedFilterValue?.store_id?.id
                : ""
            }${page ? `&page=${page ?? 1}` : ""}&is_download=false`
          )
        );
      } else {
        dispatch(
          getReportDetails(`${router?.query?.reportname}?is_download=false`)
        );
      }
    }
  };

  const getFilters = () => {
    if (fieldJSON?.minDate && filterColumns?.length) {
      filterColumns[0].minDate = fieldJSON?.minDate;
    }
    let filtersJson = fieldJSON?.isMultiDate ? filterColumns : [];
    filtersJson =
      filtersJson?.length > 0
        ? filtersJson.concat(fieldJSON?.filterColumns ?? [])
        : fieldJSON?.filterColumns ?? [];
    return filtersJson;
  };

  const handleDownload = () => {
    dispatch(loadingAction({ isLoading: true }));
    dispatch(
      getReportDownloadURL(
        `${router?.query?.reportname}?${
          selectedFilterValue?.date_range
            ? "from_date=" +
              selectedFilterValue?.from_date +
              "&to_date=" +
              selectedFilterValue?.to_date
            : ""
        }${
          selectedFilterValue?.city
            ? "&city=" + selectedFilterValue?.city?.name
            : ""
        }${
          selectedFilterValue?.status
            ? "&status=" + selectedFilterValue?.status?.value
            : ""
        }${
          selectedFilterValue?.is_expired
            ? "&is_expired=" + selectedFilterValue?.is_expired?.value
            : ""
        }${
          selectedFilterValue?.store_id
            ? "&store_id=" + selectedFilterValue?.store_id?.id
            : ""
        }&is_download=true`
      )
    );
  };

  useEffect(() => {
    if (router?.query?.reportname) {
      const storageItem = tokens.getFilters("filters");
      if (storageItem && storageItem[moduleName]) {
        const filters = storageItem[moduleName];
        console.log("asdvxcb", filters);
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
    }
  }, [moduleName, router]);

  useEffect(() => {
    setValueData({
      ...valueData,
      store_id:
        storeListData && storeListData?.length > 0
          ? storeListData.filter((d, i) => i < 5)
          : [],
    });
  }, [storeListData]);

  useEffect(() => {
    setValueData({
      ...valueData,
      city:
        cityListData && cityListData?.length > 0
          ? cityListData.filter((d, i) => i < 5)
          : [],
    });
  }, [cityListData]);

  useEffect(() => {
    if (router?.query?.reportname) {
      var res = false;
      let field = {};
      reportExampleJson.map((d) => {
        var list = d.childs.filter((fd) => {
          if (fd.path === "/" + router?.query?.reportname) {
            return fd;
          }
        });
        //console.log("reportExampleJson","list",list);
        if (list?.length) {
          res = d.showSearch;
          field = list[0];
        }
      });
      if (field?.filterValues && Object.keys(field?.filterValues)?.length) {
        setValueData({ ...valueData, ...field?.filterValues });
      }
      setFieldJSON({ ...field });
      setSelectColumnSearch(
        getSearchColumn(router?.query?.reportname ?? "")
          ? getSearchColumn(router?.query?.reportname ?? "")[0]
          : ""
      );
      setSelectedFilterValue({
        ...selectedFilterValue,
        date_range:
          router?.query?.reportname === "home-delivery-summary" ||
          router?.query?.reportname === "stock-transfer-summary"
            ? [
                moment(new Date().setDate(new Date().getDate() - 6)).format(
                  "DD-MM-YYYY"
                ),
                moment(new Date()).format("DD-MM-YYYY"),
              ]
            : [
                moment(new Date().setDate(new Date().getDate() - 2)).format(
                  "DD-MM-YYYY"
                ),
                moment(new Date()).format("DD-MM-YYYY"),
              ],
        from_date:
          router?.query?.reportname === "home-delivery-summary" ||
          router?.query?.reportname === "stock-transfer-summary"
            ? moment(new Date().setDate(new Date().getDate() - 6)).format(
                "YYYY-MM-DD"
              )
            : moment(new Date().setDate(new Date().getDate() - 2)).format(
                "YYYY-MM-DD"
              ),
        to_date: moment(new Date()).format("YYYY-MM-DD"),
      });
    }
  }, [router?.query?.reportname]);

  useEffect(() => {
    if (reportData?.report?.length) {
      setListData([...reportData?.report]);
    } else {
      if (reportData?.report && Object.keys(reportData?.report)?.length > 0) {
        setListData({ ...reportData?.report });
      } else {
        setListData([]);
      }
    }
  }, [reportData?.report]);

  useEffect(() => {
    setPageMeta(reportData?.meta);
    setReportColumn(reportData?.headers ?? []);
  }, [reportData]);

  useEffect(() => {
    if (reportDownloadURL && reportDownloadURL !== "") {
      window.open(reportDownloadURL, "_blank");
    }
    return () => {
      dispatch(resetReportDownloadUrl());
    };
  }, [reportDownloadURL]);

  useEffect(() => {
    onQueryChange();

    if (router?.query?.reportname) {
      const moduleFilters = {
        [moduleName]: {
          search: searchQuery,
          filter: selectedFilterValue,
        },
      };
      tokens.setFilters(moduleFilters);
    }
  }, [
    searchQuery,
    dispatch,
    selectedColumnSearch?.field,
    selectedFilterValue,
    router?.query?.reportname,
  ]);

  return (
    <div className="page-content">
      <PageHeader
        customButton={() => {
          return (
            <>
              {userDetails?.is_super_admin || userDetails?.is_asm ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleDownload()}
                >
                  Download
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
              <ListingComponents
                data={listData ?? []}
                column={reportColumn ?? []}
                showSearch={
                  fieldJSON?.showSearch ??
                  getShowSearch(router?.query?.reportname ?? "")
                }
                isDisabledSortBy={true}
                filterInitialValue={filterInitialValue}
                searchDropdownData={
                  getSearchColumn(router?.query?.reportname ?? "") ?? ""
                }
                onChangeSearch={(e) => {
                  setSearchQuery(e.target.value);
                  // setIsDropDownPresent(false);
                }}
                selectedColumnSearch={selectedColumnSearch}
                onSelectColumnSearch={(e) => {
                  setSearchQuery("");
                  setSelectColumnSearch(e);
                }}
                filterColumn={getFilters() ?? []}
                // isDropDownPresent={isDropDownPresent}
                selectedFilterValue={selectedFilterValue}
                onDropdownSearch={onDropdownSearch}
                valueData={valueData ?? []}
                onSelectRange={(val, columnName) => {
                  if (val.length === 2) {
                    setSelectedFilterValue({
                      ...selectedFilterValue,
                      [columnName.field]: val,
                      [columnName.fromField]: moment(new Date(val[0])).format(
                        "YYYY-MM-DD"
                      ),
                      [columnName.toField]: val[1]
                        ? moment(new Date(val[1])).format("YYYY-MM-DD")
                        : "",
                    });
                    datePickerRef.current.closeCalendar();
                  }
                }}
                onSelectValue={(val, column) => {
                  setSelectedFilterValue({
                    ...selectedFilterValue,
                    [column.field]: val,
                  });
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
                clearAllFilter={(e) => {
                  e.preventDefault();
                  setSelectedFilterValue("");
                }}
                paginationData={pageMeta}
                moveTo={(pageNo) => {
                  onQueryChange(pageNo);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;
