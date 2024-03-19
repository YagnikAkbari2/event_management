// import { viewFormate } from "../commonjs/globalDateFormat";
// import moment from "moment/moment";
// import {
//   batchNumber_Regex,
//   integerWithDecimal_Regex,
// } from "../commonjs/regexGlobal";
export const fileUploadForm = [
  {
    sectionType: "body",
    labelClassName:
      "col-3 d-flex align-items-center justify-content-start pe-0",
    inputClassName: "col-9 ps-2 position-relative pe-1",
    suffixClassName: "",
    bodyClassName: "1",

    child: [
 
      {
        label: "Store",
        fileLabel: "Select Stores",
        fieldType: "tag-input",
        fieldName: "stores",
        // inputClassName: "form-input-upload custom-height-fileInput",
        optionKey: "name",
        optionValue: "store_code",
        isMultipleClass: true,
        isMulti:true,
        validation: function (data) {          
          return {
            isValid: data?false:true,
            message: "Store name is Required.",
          };
        },
      }, 

      {
        label: "Product Location",
        fileLabel: "Select Product Location",
        fieldType: "tag-input",
        fieldName: "productLocation",
        optionKey: "label",
        optionValue: "label",
        // inputClassName: "form-input-upload custom-height-fileInput",
        isMultipleClass: true,
        isMulti: true,
        validation: function (data) {          
          return {
            isValid: data?false:true,
            message: "Product Location is Required.",
          };
        },
      },
 
      {
        label: "Select Csv File To Upload",
        fileLabel: "Upload File",
        fieldType: "file-input",
        fieldName: "csv_import",
        accept: ".csv, .xlsx, .xls",
        inputClassName: "form-input-upload custom-height-fileInput",
        // innerLabelClassName: "h-100 py-3 ",
        validation: function (data) {          
          return {
            isValid: data?false:true,
            message: "File is Required.",
          };
        },
      }, 
    ],
  },
];
