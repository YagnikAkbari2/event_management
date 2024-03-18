import React, { MouseEvent, useEffect, useState } from "react";
import { Dropdown, OverlayTrigger } from "react-bootstrap";

interface SearchableSelect {
  onChangeSearch: Function;
  onSearchSelect: Function;
  configData: IProducts[];
  selectedProduct: IProducts;
  onPressEnter: Function;
  onKeyDownInput: Function;
}
import { useSelector } from "react-redux";
const SearchableSelect = ({
  onChangeSearch,
  onSearchSelect,
  configData,
  selectedProduct,
  onPressEnter,
  onKeyDownInput,
}: SearchableSelect) => {
  const [search, setSearch] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  const { isLoading } = useSelector((state) => (state as any).product);
  const renderValue = () => {
    return searchFlag
      ? search
      : selectedProduct && Object.keys(selectedProduct).length
      ? selectedProduct.name
      : "";
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onClick = (event: MouseEvent<HTMLAnchorElement> | MouseEvent) => {
      if ((event.target as HTMLAnchorElement).id !== "dropDownMenuField") {
        setShow(false);
        if ((event.target as HTMLAnchorElement).id === "search") {
          if (selectedProduct && Object.keys(selectedProduct).length)
            setSearch("");
        }
      }
    };

    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);
  return (
    <div className={`mt-1`}>
      <Dropdown
        drop="down"
        className={` custom-select searchable-dropdown-button `}
      >
        <Dropdown.Toggle
          className="pe-0 custom-select searchable-select-button"
          // style={{ scrollbarWidth: configData?.length <= 0 ? "0px" : "" }}
        >
          <div className={`d-flex w-100 input-wrapper `}>
            <input
              type="text"
              id="search"
              tabIndex={1}
              className={`form-control border-custom`}
              value={renderValue()}
              defaultValue={""}
              autoComplete="off"
              placeholder={"Search by Product Name"}
              onChange={(e) => {
                setSearch(e.target.value);
                onChangeSearch(e, "product");
                setSearchFlag(true);
                setShow(true);
              }}
              onKeyDown={(e) => {
                onKeyDownInput(e, renderValue());
              }}
              // onFocus={(e) => {
              //     setShow(true);
              // }}
              onBlur={() => {
                setShow(false);
              }}
            />
            <span
              className="position-absolute"
              style={{
                right: "32px",
                height: "36px",
                borderLeft: "1px solid hsl(0deg, 0%, 85%)",
              }}
            ></span>
          </div>
        </Dropdown.Toggle>
        {/* {configData.length > 0 && ( */}
        <Dropdown.Menu
          className={`searchable-menu ${show === true ? "show" : ""}`}
          id={"dropDownMenuField"}
          style={{
            height: isLoading ? "80px" : "",
            overflowX: isLoading ? "unset" : "",
          }}
        >
          {configData?.length <= 0 ? (
            <Dropdown.Header>
              {" "}
              <div className="d-flex justify-content-center align-items-center">
                {search === "" && !isLoading
                  ? "Please type to search"
                  : !isLoading && "No data"}
              </div>
            </Dropdown.Header>
          ) : (
            ""
          )}
          {isLoading ? (
            <div className="loader mb-4"></div>
          ) : (
            <div
              style={{
                maxHeight: "260px",
                overflowY: configData?.length > 0 ? "scroll" : "",
                minWidth: "inherit",
              }}
            >
              {
                configData?.length
                  ? configData?.map((val: IProducts, i: number) => {
                      return (
                        <Dropdown.Item
                          key={i}
                          className="w-100 pe-0 d-flex justify-content-start text-capitalize dropdown-item-table my-1"
                          onClick={() => {
                            setSearchFlag(false);
                            onSearchSelect(val, "product", search);
                            setShow(false);
                            setSearch("");
                          }}
                        >
                          <div className="d-flex flex-row">
                            <div
                              className="me-2 my-auto bg-lightGray rounded text-dark text-center"
                              style={{ width: "68px" }}
                            >
                              {val?.ws_code}
                            </div>
                            <div>{val?.name}</div>
                          </div>
                        </Dropdown.Item>
                      );
                    })
                  : ""
                // <Dropdown.Item
                //     onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                //     className=""
                //     style={{ color: "#202223" }}
                // >
                //     <div className="d-flex justify-content-center align-items-center">{"No data"}</div>
                // </Dropdown.Item>
              }
            </div>
          )}
        </Dropdown.Menu>
        {/* )} */}
      </Dropdown>
    </div>
  );
};

export default SearchableSelect;
