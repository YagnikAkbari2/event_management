import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styles from "./Dropdown.module.css";

const CDropdown = ({
  dOptions,
  onChange,
  width = "w-[250px]",
  label,
  labelClassName,
}) => {
  const defaultOption = dOptions && dOptions.length && dOptions[0];
  return (
    <div>
      {dOptions && label && (
        <p className={`${labelClassName ? labelClassName : "text-white pb-3"}`}>
          {label}
        </p>
      )}
      {dOptions && dOptions.length ? (
        <div className={`${styles.dropdown} flex ${width}`}>
          <Dropdown
            options={dOptions}
            onChange={onChange}
            value={defaultOption}
            placeholder="Select an option"
            className={`${styles.dropdownw} ${width}`}
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/down_arrow.svg`}
            alt="down arrow"
            className=""
          />
        </div>
      ) : (
        []
      )}
    </div>
  );
};

export default CDropdown;
