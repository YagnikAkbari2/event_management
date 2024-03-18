import Image from "next/image";
import { email_Regex, mobileNumber_Regex } from "../commonjs/regexGlobal";

export const UserMaster = [
  {
    sectionType: "body",
    labelClassName: "col-3 d-flex justify-content-end align-items-center pe-0",
    inputClassName: "col-9 ps-2",
    suffixClassName: "",
    bodyClassName: "1",
    child: [
      {
        // label: "Salutation",
        // isRequired: false,
        // fieldType: "select",
        // fieldName: "salutation",
        validation: function (data) {
          return { isValid: false };
        },
      },
      {
        label: "First Name *",
        isRequired: true,
        fieldType: "input",
        fieldName: "name",
        validation: function (data) {
          return {
            isValid: data ? (data?.trim().length <= 150 ? false : true) : true,
            message: "First Name is Required.",
          };
        },
      },
      {
        // label: "Last Name",
        // isRequired: false,
        // fieldType: "input",
        // fieldName: "last_name",
        validation: function (data) {
          return {
            isValid: false,
            // message: "Last Name Maximum Length is 150 Characters.",
          };
        },
      },
      {
        label: "Email *",
        isRequired: true,
        fieldType: "input",
        fieldName: "email",
        validation: function (data) {
          return {
            isValid: data ? (email_Regex.test(data) ? false : true) : true,
            message: data
              ? email_Regex.test(data)
                ? ""
                : "Email must be a valid format"
              : "Email is Required.",
          };
        },
      },
      {
        label: "Mobile No*",
        isRequired: false,
        fieldType: "input",
        fieldName: "mobile_number",
        validation: function (data) {
          console.log("dvxcbxvn", data);
          let isValid = !mobileNumber_Regex.test(data) || !data ? true : false;
          if (data && data?.length !== 0 && data?.length !== 10) {
            isValid = true;
          }
          return {
            isValid: isValid,
            message: isValid
              ? "Contact Mobile Must Be 10 Digit, And Should Start with 9 or 8 or 7 or 6."
              : "",
          };
        },
      },
      {},
      {},
      {
        label: "Assign Role *",
        isRequired: true,
        fieldType: "group-fields",
        child: [
          
        ],
      },
      {
        label: " ",
        fieldType: "group-fields",
        child: [
          {
            sectionType: "body",
            bodyClassName: "1",
            rowClassName: "row mb-0",
            child: [
              {
                sectionType: "body",
                bodyClassName: "d-flex justify-content-between w-100 ",
                inputClassName: "w-100 px-0",
                rowClassName: "row mb-0",
                child: [
                  {
                    id: "addButton",
                    label: "Add",
                    isRequired: false,
                    fieldType: "button",
                    className:
                      "btn btn-outline-primary d-flex justify-content-end h-75 align-items-center pb-2",
                    showLabel: false,
                    validation: function (data) {
                      return { isValid: false };
                    },
                  },
                  {
                    id: "clearButton",
                    label: "Clear Section",
                    isRequired: false,
                    fieldType: "button",
                    className: "btn text-primary text-nowrap d-none ",
                    showLabel: false,
                    validation: function (data) {
                      return { isValid: false };
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
export const constantConfig = { salutation: ["Mr", "Ms", "Mrs"] };
