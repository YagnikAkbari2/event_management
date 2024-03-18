import Image from "next/image";
import { Dropdown, DropdownButton } from "react-bootstrap";

import styles from "./ListingSearch.module.scss";
import { useRef, useState, useEffect } from "react";

function ListingSearch({
  dropdownData,
  onSelectColumn,
  selectColumnSearch,
  onChangeSearch,
  isDropdownPresent,
  searchResults,
  onSearchSelect,
  searchDropdownLabel,
  innerSearchValue,
  customPlaceHolder,
  isDisabled,
  customFieldDropdown,
  hideSearchDropDownBtn,
  isCreateNewProduct,
  handleClickCreateNew,
}: ListingSearch) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<any>(null);
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedOptionIndex((index) =>
        index === -1 && searchResults
          ? searchResults?.length - 1
          : Math.max(index - 1, 0)
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedOptionIndex((index: number) => {
        if (searchResults) {
          return index === searchResults?.length - 1
            ? -1
            : Math.min(index + 1, searchResults.length - 1);
        }
        return -1;
      });
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (
        selectedOptionIndex >= 0 &&
        searchResults &&
        selectedOptionIndex < searchResults.length
      ) {
        onSearchSelect && onSearchSelect(searchResults[selectedOptionIndex]);
      }
    }
  }
  useEffect(() => {
    if (selectedOptionIndex !== -1 && dropdownRef.current) {
      const dropdownItems =
        dropdownRef.current.querySelectorAll(".dropdown-item");
      const selectedOptionElement = dropdownItems[selectedOptionIndex];
      selectedOptionElement.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedOptionIndex]);
  return (
    <div className="position-relative">
      <div className={`input-group ${styles.listingSearch} d-flex flex-row`}>
        <div className={`input-group-text ${styles.inputGroupText}`}>
          <Image
            width={20}
            height={20}
            src="/assets/navbar-menu/Search-icon.svg"
            alt="search-icon"
            className=""
          />
        </div>
        <input
          type="text"
          className="w-70 form-control ps-0"
          id="navbarFormList"
          placeholder={customPlaceHolder ?? "Search by..."}
          autoComplete="off"
          value={innerSearchValue ?? searchValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            onChangeSearch && onChangeSearch(e);
            setSearchValue(e.currentTarget.value);
          }}
          disabled={isDisabled ?? false}
          onKeyDown={
            isDropdownPresent && innerSearchValue
              ? (e) => handleKeyDown(e)
              : () => {}
          }
        />
        {!hideSearchDropDownBtn && (
          <DropdownButton
            id="dropdown-item-button"
            className="custom-select mt-2 mt-lg-0"
            title={selectColumnSearch?.title ?? ""}
          >
            {dropdownData
              ? dropdownData.map((d, i) => {
                  return (
                    <Dropdown.Item
                      key={"ddsg" + i}
                      as="button"
                      className={`${d === selectColumnSearch ? "active" : ""}`}
                      onClick={() => {
                        onSelectColumn && onSelectColumn(d);
                      }}
                    >
                      {d.title}
                    </Dropdown.Item>
                  );
                })
              : null}
          </DropdownButton>
        )}
      </div>
      {/* {isDropdownPresent && searchResults?.length > 0 && (
        <div
          className={`position-absolute w-100 top-4 bg-white border`}
          style={{ zIndex: 99 }}
        >
          {searchResults.map((val, i) => {
            return (
              <Dropdown.Item
                key={i}
                className="btn w-100 border-bottom p-2 d-flex justify-content-start"
                onClick={() => onSearchSelect(val)}
              >
                {val?.[searchDropdownLabel] ?? val}
              </Dropdown.Item>
            );
          })}
        </div>
      )} */}
      {isDropdownPresent && innerSearchValue && (
        <div
          className={`listing-search-dropdown position-absolute w-100 top-4 bg-white border`}
          style={{ zIndex: 99 }}
          id="box"
          ref={dropdownRef}
        >
          {searchResults && searchResults?.length > 0 ? (
            searchResults.map((val, i) => {
              return (
                <Dropdown.Item
                  key={i}
                  className={`btn border-bottom p-2 d-flex justify-content-start text-truncate ${
                    selectedOptionIndex === i ? "active" : ""
                  }`}
                  onClick={(e) => {
                    onSearchSelect && onSearchSelect(val);
                  }}
                  active={selectedOptionIndex === i}
                >
                  {customFieldDropdown
                    ? customFieldDropdown(val)
                    : val?.[searchDropdownLabel] ?? ""}
                </Dropdown.Item>
              );
            })
          ) : (
            <Dropdown.Item as="button" className="shadow-sm">
              <div className="d-flex justify-content-center py-2 text-muted">
                No {selectColumnSearch?.title ?? "data"} found.
              </div>
            </Dropdown.Item>
          )}
          {isCreateNewProduct && (
            <Dropdown.Item
              as="button"
              className="shadow-sm"
              onClick={handleClickCreateNew}
            >
              <div className="d-flex justify-content-center py-2 text-primary">
                + Create New Product
              </div>
            </Dropdown.Item>
          )}
        </div>
      )}
    </div>
  );
}
export default ListingSearch;
