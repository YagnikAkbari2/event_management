import Image from "next/image";
import { useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import styles from "./ListingFilter.module.scss";

function ListingFilter(props: ListingFilter) {
  const {
    showFilter,
    setShowFilter,
    filterColumn,
    selectColumnFilter,
    onSelectFilterColumn,
    selectColumnValue,
    filterValues,
    onSelectFilterValue,
    sortingColumnData,
    onSelectSortColumn,
    selectedSortColumn,
    onSelectSortType,
    selectedSortType,
    isDisabledSortBy,
    isDisabledFilter,
  }: ListingFilter = props;

  return (
    <div className={`d-flex justify-content-end ${styles.filterSorting}`}>
      {isDisabledFilter ? null : (
        <div className={`${styles.dropdown}`}>
          <button
            id="dropdown-basic"
            className="btn btn-success"
            onClick={setShowFilter}
          >
            <Image
              width={16}
              height={16}
              src="/assets/table/filterIcon.svg"
              alt="filterIcon-icon"
              className="me-1"
            />
            Filter
          </button>
        </div>
      )}
      {/* <Dropdown className={`${styles.dropdown}`}  >
                <Dropdown.Toggle key={"dadSS"} variant="success" id="dropdown-basic" >
                
                    <Image
                        width={16}
                        height={16}
                        src="/assets/table/filterIcon.svg"
                        alt="filterIcon-icon"
                        className="me-1"
                    />
                    Filter
                </Dropdown.Toggle>

                <Dropdown.Menu className="p-2" >
                    <div className={`${styles.optionTitle}`}>No filter applied</div>
                    <div className={`row mt-2 ${styles.filterMenuContainer}`} >
                        <div className="col-6">
                            <DropdownButton id="dropdown-item-button" className="custom-select" title={selectColumnFilter?.title??""}>
                                {
                                    filterColumn?
                                        filterColumn.map((d,i)=>{
                                            return <Dropdown.Item as="a" key={"sds"+i} className={`${d===selectColumnFilter?"active":""}`} onClick={()=>{ onSelectFilterColumn(d) }}>{d.title}</Dropdown.Item>
                                        })
                                    :null
                                }
                            </DropdownButton>
                        </div>
                        <div className="col-6">
                            <DropdownButton id="dropdown-item-button" className="custom-select" title={selectColumnValue?.title??""}>
                                {
                                    filterValues?
                                        filterValues.map((d,i)=>{
                                            return <Dropdown.Item as="a"key={"sdds"+i} className={`${d===selectColumnValue?"active":""}`} onClick={()=>{ onSelectFilterValue(d) }}>{d.title}</Dropdown.Item>
                                        })
                                    :null
                                }
                            </DropdownButton>
                        </div>
                    </div>
                    
                </Dropdown.Menu>
            </Dropdown> */}
      {!isDisabledSortBy && (
        <Dropdown className={`${styles.dropdown}`}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className={`${styles.borderRight}`}
          >
            <Image
              width={18}
              height={16}
              src="/assets/table/sortIcon.svg"
              alt="sortIcon-icon"
              className="me-1"
            />
            Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.sortMenu}>
            {sortingColumnData
              ? sortingColumnData.map((d, i) => {
                  return (
                    <div key={"formchecked" + i} className="py-1 px-2">
                      <Form.Check
                        type="radio"
                        id={d.field}
                        label={d.title}
                        className={styles.radioButton}
                        checked={d.field === selectedSortColumn}
                        onChange={(e) => {
                          onSelectSortColumn && onSelectSortColumn(d);
                        }}
                      />
                    </div>
                  );
                })
              : null}
            <div className={styles.sortMenufooter}>
              <div
                className={`d-flex cursor-pointer`}
                style={{
                  color: selectedSortType === "a" ? "rgb(32, 33, 73)" : "#000",
                }}
                onClick={() => onSelectSortType("a")}
              >
                <Image
                  width={16}
                  height={16}
                  src="/assets/table/ArrowUp.svg"
                  alt="sortIcon-icon"
                  className="me-1"
                />
                Ascending
              </div>
              <div
                className={`d-flex py-1 cursor-pointer`}
                style={{
                  color: selectedSortType === "d" ? "rgb(32, 33, 73)" : "#000",
                }}
                onClick={() => onSelectSortType("d")}
              >
                <Image
                  width={16}
                  height={16}
                  src="/assets/table/ArrowDown.svg"
                  alt="sortIcon-icon"
                  className="me-1"
                />
                Descending
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}
export default ListingFilter;
