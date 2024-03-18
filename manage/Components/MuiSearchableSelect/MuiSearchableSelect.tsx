import Image from "next/image";
import { SyntheticEvent, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, TextField } from "@mui/material";
import { OverlayTrigger } from "react-bootstrap";
import { useSelector } from "react-redux";

interface MuiSearchableSelect {
  onChangeSearch: (
    e: {
      target: {
        value: string;
      };
    },
    field?: string,
    ...rest: any
  ) => void;
  onSearchSelect?: (
    newValue: NonNullable<string | IProducts>,
    ...rest: any
  ) => void;
  data?: IProducts[];
  field?: {
    customField?: (val: IProducts, option?: any) => void;
    customValue?: (val: IProducts | string, field?: any) => string;
    validation?: Function;
    optionKey: string;
    optionValue: string;
    fieldName?: string;
  };
  isCheckValid?: boolean;
  messageForValidation?: Function;
  optionKey: string;
  optionValue?: string;
  itemKey?: string;
  value: IProducts;
  inputPlaceHolder?: string;
  isDisabled?: boolean;
  disabledOptions?: Function;

  // not used in this component
  groupChildIndex?: any;
  configData?: any;
  onOpenAddCustomerModal?: any;
  onCheck?: any;
  onClickSearch?: any;
  customNoDataMessage?: any;
  perents?: any;
  onClearSelection?: any;
}

function MuiSearchableSelect({
  onChangeSearch,
  onSearchSelect,
  data,
  field,
  groupChildIndex,
  configData,
  onOpenAddCustomerModal,
  isCheckValid,
  onCheck,
  messageForValidation,
  onClickSearch,
  customNoDataMessage,
  optionKey,
  optionValue,
  itemKey,
  perents,
  value,
  inputPlaceHolder,
  isDisabled,
  onClearSelection,
  disabledOptions,
}: MuiSearchableSelect) {
  const [isClearDisable, setIsClearDisable] = useState(true);
  const { isLoading } = useSelector((state) => (state as any).product);
  useEffect(() => {
    if (value && value[optionKey]) {
      setIsClearDisable(false);
    } else {
      setIsClearDisable(true);
    }
  }, [value]);
  return (
    <div className="miui_select mt-1">
      <Autocomplete
        key={"dfgd" + itemKey}
        // disablePortal
        disablePortal
        // autoSelect={false}
        disableClearable
        autoSelect={false}
        freeSolo={true}
        // freeSolo={true}
        className={`miui_searchable_select ${isDisabled ? "disabled" : ""}`}
        id={"custom-input-demo"}
        options={data ?? []}
        value={value}
        // getOptionSelected={(option) => optionKey ? option[optionKey] : option}
        getOptionLabel={(option) =>
          field?.customValue
            ? field?.customValue(option, field)
            : optionKey
            ? option[optionKey] ?? ""
            : option ?? ""
        }
        getOptionValue={(option) =>
          optionValue ? option[optionValue] ?? "" : option ?? ""
        }
        disabled={isDisabled}
        title={
          value
            ? field?.customValue
              ? field?.customValue(value, field)
              : value?.[optionKey]
            : ""
        }
        renderInput={(params) => (
          // <TextField {...params} label="" placeholder={inputPlaceHolder??"Search..."} />
          <div ref={params.InputProps.ref}>
            <input
              type="text"
              {...params.inputProps}
              className="text-truncate"
              placeholder={inputPlaceHolder ?? "Search..."}
            />
            <span className="">
              {isCheckValid &&
              field?.validation &&
              field?.validation(
                value && value[field?.fieldName]
                  ? value[field?.fieldName]
                  : value
              ).isValid ? (
                <span
                  className="position-absolute"
                  style={{
                    top: "48%",
                    right: "50px",
                    transform: "translateY(-50%)",
                  }}
                >
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      messageForValidation
                        ? messageForValidation(
                            field?.validation(
                              value &&
                                field?.fieldName &&
                                value[field?.fieldName]
                                ? value[field?.fieldName]
                                : value
                            )?.message
                          )
                        : ""
                    }
                  >
                    <Image
                      src={"/assets/error.svg"}
                      className="error-icon search-double "
                      width={16}
                      height={16}
                      alt="error"
                    />
                  </OverlayTrigger>
                </span>
              ) : (
                ""
              )}
            </span>
          </div>
        )}
        // inputValue={searchInputValue}
        onInputChange={(
          e: SyntheticEvent<Element, Event>,
          newInputValue: string,
          reason: string
        ) => {
          onChangeSearch(
            {
              target: {
                value: e?.target?.value,
              },
            },
            field?.fieldName
          );
        }}
        onChange={(
          event,
          newValue: NonNullable<string | IProducts>,
          reason
        ) => {
          console.log("xcvbvn", newValue, reason);
          if (reason === "clear" && !isClearDisable) {
            // onClearSelection()
          } else {
            if (onSearchSelect) {
              onSearchSelect(newValue, field);
            }
          }
          // setValue(newValue);
        }}
        renderOption={(props, option) => (
          // isLoading ? <div className="loader mb-4"></div> :
          <Box component="li" className="mui-product-option" {...props}>
            {field?.customField
              ? field?.customField(option, field)
              : optionKey
              ? option[optionKey]
              : option}
          </Box>
        )}
        getOptionDisabled={(option) =>
          disabledOptions ? disabledOptions(option) : false
        }
      />
    </div>
  );
}
export default MuiSearchableSelect;
