import React, { KeyboardEvent } from "react";

const InputField = ({
  onChangeSearch,
  configData,
  inputValue,
  onPressEnter,
}: {
  onChangeSearch: (e: React.FormEvent<HTMLInputElement>, field: string) => void;
  configData: string;
  inputValue: string;
  onPressEnter: (e?: KeyboardEvent<HTMLInputElement>) => void;
}) => {
  console.log("cvmfdbv", inputValue);
  return (
    <div className={`input-group input-container mt-1`}>
      <input
        type={"number"}
        className="form-control border-custom text-end"
        name={"qty"}
        aria-label={"number"}
        placeholder={""}
        id={"qtyField"}
        autoComplete="off"
        value={inputValue ?? ""}
        onChange={(e) => {
          const regExpr = /^(?=(([0-9]+)|s*)$)(?=([0-9]*[^-+]|s*))/;
          if (regExpr.test(e.target.value) || e.target.value === "") {
            onChangeSearch(e, "qty");
          } else {
            // onChangeSearch(e, "qty")
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        tabIndex={2}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") onPressEnter(event);
        }}
      />
      {configData && configData !== "" ? (
        <div
          className={`p-0 d-flex justify-content-start align-items-center right px-2`}
        >
          <label>{configData}</label>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputField;
