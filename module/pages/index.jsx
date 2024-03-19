import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { tokens } from "../commonjs/common";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  getProductDetails,
  loadingProduct,
  storeSearchLog,
} from "../redux/actions/productAction";
import { loadingAction } from "../redux/actions/userAction";
import { searchDebounce } from "../commonjs/debounce";
import MuiSearchableSelect from "../Components/MuiSearchableSelect/MuiSearchableSelect";
const Table = dynamic(() => import("../Components/Table/Table"), {
  ssr: false,
});
const InputField = dynamic(
  () => import("../Components/InputField/InputField"),
  { ssr: false }
);
const SearchableSelect = dynamic(
  () => import("../Components/SearchableSelect/SearchableSelect"),
  { ssr: false }
);
function Dashboard() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState({
    product: "",
    qty: "",
  });
  console.log("xcvbcn", selectedProduct);
  const [tableData, setTableData] = useState([]);
  const { productList, productDetails, message } = useSelector(
    (state) => state.product
  );
  const [configData, setConfigData] = useState({ product: [], qty: "" });
  const [isValid, setIsCheckValid] = useState(false);
  const [response, setResponse] = useState("");
  const [logData, setLogData] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState({});
  const storeData = (reqData) => {
    if (storeName && storeName !== "") {
      dispatch(storeSearchLog(reqData));
    }
  };
  const onSearchSelect = (e, action, searchValue) => {
    setResponse("");

    setConfigData({ ...configData, qty: e?.package_type ?? "" });

    setSelectedProduct({ ...selectedProduct, product: e });

    document.getElementById("qtyField").focus();
  };

  useEffect(() => {
    document.getElementById("search")?.focus();
    if (productDetails?.Availability || productDetails?.Product) {
      let oldData = tableData;
      let newData = productDetails?.Product;
      let productExists = false;
      let productExistsIdx = "";
      tableData?.length &&
        tableData.filter((data, idx) => {
          if (data?.id === newData?.id) {
            productExists = true;
            productExistsIdx = idx;
          }
        });
      if (!productExists && newData) {
        let content = newData?.content?.toString()?.toLowerCase();
        content = content?.charAt(0)?.toUpperCase() + content.slice(1);
        const description = `${newData.package_type} of ${newData.package_size} ${content}.`;
        newData = {
          id: newData.id,
          name: newData.name,
          desc: description,
          warehouse: productDetails?.Availability?.wsRes
            ? "Available at Warehouse"
            : "",
          vendor: productDetails?.Availability?.pharmaRes
            ? "Available at Vendor"
            : "",
          status: newData?.is_discontinued
            ? "discontinued"
            : productDetails?.Availability?.wsRes &&
              productDetails?.Availability?.pharmaRes
            ? "both"
            : productDetails?.Availability?.wsRes
            ? "wh"
            : productDetails?.Availability?.pharmaRes
            ? "vendor"
            : "none",
          tat: newData?.is_discontinued
            ? "-"
            : productDetails?.Availability?.wsRes
            ? "1 Day"
            : productDetails?.Availability?.pharmaRes
            ? "T + 1 Day"
            : "Check with Purchase Dept (+919099933818)",
          qty: productDetails?.Availability?.wsQuantity,
          image_url:
            newData?.images?.length > 0
              ? newData?.images[0].url
              : "/assets/common_icon.svg",
          mrp: newData?.mrp,
          package_type: newData?.package_type,
        };
        let newdata2 = [newData].concat(oldData);
        // oldData?.push(newData);
        setTableData([...newdata2]);
      } else if (productExists && productExistsIdx !== "") {
        let content = newData?.content?.toString()?.toLowerCase();
        content = content?.charAt(0)?.toUpperCase() + content.slice(1);
        const description = `${newData.package_type} of ${newData.package_size} ${content}.`;
        newData = {
          id: newData.id,
          name: newData.name,
          desc: description,
          warehouse: productDetails?.Availability?.wsRes
            ? "Available at Warehouse"
            : "",
          vendor: productDetails?.Availability?.pharmaRes
            ? "Available at Vendor"
            : "",
          status: newData?.is_discontinued
            ? "discontinued"
            : productDetails?.Availability?.wsRes &&
              productDetails?.Availability?.pharmaRes
            ? "both"
            : productDetails?.Availability?.wsRes
            ? "wh"
            : productDetails?.Availability?.pharmaRes
            ? "vendor"
            : "none",
          tat: newData?.is_discontinued
            ? "-"
            : productDetails?.Availability?.wsRes
            ? "1 Day"
            : productDetails?.Availability?.pharmaRes
            ? "T + 1 Day"
            : "Check with Purchase Dept (+919099933818)",
          qty: productDetails?.Availability?.wsQuantity,
          image_url:
            newData?.images?.length > 0
              ? newData?.images[0].url
              : "/assets/common_icon.svg",
          mrp: newData?.mrp,
          package_type: newData?.package_type,
        };
        oldData[productExistsIdx] = newData;
        setTableData([...oldData]);
      }
    }
  }, [productDetails]);

  const onPressEnter = (e) => {
    if (
      selectedProduct?.product &&
      selectedProduct?.product?.ws_code &&
      selectedProduct?.qty
    ) {
      dispatch(loadingAction({ isLoading: true }));
      dispatch(
        getProductDetails(
          `ws_code=${selectedProduct?.product?.ws_code}&quantity=${selectedProduct?.qty}&search_keyword=${searchKeyword?.keyword}`
        )
      );
      setSelectedProduct({ product: "", qty: "" });
      setConfigData({ product: [], qty: "" });
      setSearchKeyword({});
    }
  };
  useEffect(() => {
    setResponse(message?.length === 0 ? "" : message);
  }, [message]);
  useEffect(() => {
    if (tableData?.length === 0) {
      setResponse("");
    }
  }, [tableData]);

  const onKeyDownInput = (e, searchValue) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      searchValue?.toString()?.trim() !== ""
    ) {
      // storeData({ "storeName": storeName, "searchKeyword": searchValue, "selectedValue": "" })
    }
  };

  const onChangeSearch = (e, field, isSearched) => {
    if (field === "qty") {
      setSelectedProduct({ ...selectedProduct, qty: e.target.value });
      setSearchKeyword({ ...searchKeyword, qty: e.target.value });
    } else if (field === "product") {
      setResponse("");
      dispatch(loadingProduct(true));
      if (e.target.value) {
        dispatch(getProductList(e.target.value));
        setSearchKeyword({ ...searchKeyword, keyword: e.target.value });
      }
    }
  };
  useEffect(() => {
    setStoreName(tokens.getStore());
  }, [tokens]);
  useEffect(() => {
    // if (productList?.length > 0) {

    setConfigData({ ...configData, product: productList ?? [] });
    // }
  }, [productList]);
  const handleRemove = (idx, data) => {
    let table = data;
    table.splice(idx, 1);
    setTableData([...table]);
  };
  return (
    <div className={`page-content`}>
      <div className="card">
        <div
          className="card-body p-0"
          style={{ minHeight: "700px", color: "#202223" }}
        >
          <div className="row common-form-header m-0 d-flex justify-content-between border-bottom px-3 py-2">
            <div className="px-0 col-12 col-md-5 d-flex justify-content-start align-item-center">
              <h3
                className={`d-flex justify-content-start align-item-center py-2 custom-header`}
                style={{ fontSize: "18px !important" }}
              >
                {"Check Medicine Availibility"}
              </h3>
            </div>
          </div>
          <div className="col-12 px-3 mt-3 d-flex flex-row flex-wrap">
            {/* <div className="col-12"> */}
            <div className="col-12 me-0 pe-3" style={{ maxWidth: "370px" }}>
              <label>Product Name</label>
              {/* <SearchableSelect onPressEnter={onPressEnter} onChangeSearch={searchDebounce(onChangeSearch)} onKeyDownInput={onKeyDownInput} selectedProduct={selectedProduct?.product} onSearchSelect={onSearchSelect} configData={configData?.product} /> */}
              <MuiSearchableSelect
                field={{
                  customField: (val) => {
                    return (
                      <div className="d-flex flex-row">
                        <div
                          className="me-2 my-auto bg-lightGray rounded text-dark text-center"
                          style={{ width: "68px" }}
                        >
                          {val?.ws_code}
                        </div>
                        <div>{val?.name}</div>
                      </div>
                    );
                  },
                  customValue: (val) => {
                    return val?.name ?? "";
                  },
                  optionKey: "name",
                  optionValue: "ws_code",
                  fieldName: "product",
                }}
                optionKey={"name"}
                onPressEnter={onPressEnter}
                onChangeSearch={searchDebounce(onChangeSearch)}
                onKeyDownInput={onKeyDownInput}
                value={selectedProduct?.product}
                onSearchSelect={onSearchSelect}
                data={configData?.product}
              />
            </div>
            <div className="mt-1 mt-md-0 me-3 px-0">
              <label>Required Qty</label>
              <InputField
                onChangeSearch={onChangeSearch}
                inputValue={selectedProduct?.qty}
                configData={configData?.qty}
                onPressEnter={onPressEnter}
              />
            </div>
            <div className="mt-3 d-flex align-items-end">
              <button
                className={`btn btn-primary py-1 px-4 align-items-center`}
                onClick={(e) => {
                  setIsCheckValid(true);
                  onPressEnter(e);
                }}
                tabIndex={3}
              >
                {"Search"}
              </button>
            </div>
            {/* </div> */}
          </div>
          <div className="col-12 px-3 row mt-1">
            {response && response !== "" ? (
              <label className="text-danger">
                {response?.charAt(0)?.toUpperCase() + response.slice(1)}
              </label>
            ) : (
              ""
            )}
          </div>
          <div className="col-12 ps-3 pe-0 my-3 row">
            {tableData?.length ? (
              <>
                <Table data={tableData} handleRemove={handleRemove} />
                <div className="d-flex justify-content-end flex-row pe-1">
                  <button
                    className={`btn btn-primary-out-line px-3 py-1`}
                    onClick={() => {
                      // handleSubmit(footerData);
                      setTableData([]);
                    }}
                  >
                    {"Clear All"}
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
