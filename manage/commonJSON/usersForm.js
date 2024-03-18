// import { viewFormate } from "../commonjs/globalDateFormat";
import moment from "moment/moment";
// import {
//   batchNumber_Regex,
//   integerWithDecimal_Regex,
// } from "../commonjs/regexGlobal";
export const usersForm = [
  {
    sectionType: "body",
    labelClassName:
      "col-3 d-flex align-items-center justify-content-end pe-0",
    inputClassName: "col-9 ps-2",
    suffixClassName: "",
    bodyClassName: "1",

    child: [
        {
            label: "Type *",
            isRequired: true,
            fieldType: "select",
            isDisabled: false,
            fieldName: "type",
            optionKey: "key",
            optionValue: "value",
            validation: function (data) {
              
              
              return {
                isValid: data ? false : true,
                message: "Type is Required.",
              };
            },
          },
      {
        label: "Name *",
      
        fieldType: "input",
        inputType: "text",

        fieldName: "store_name",
        validation: function (data) {
            return {
                isValid: data ? false : true,
                message: "Name is Required.",
              };
        },
      },
      {
        label: "Email*",
        // isRequired: true,
        fieldType: "input",
        inputType: "text",
        fieldName: "email",
        validation: function (data) {
          let regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          let isValid = true;
          if(data && regex?.test(data)){
           isValid = false;
          }
          
          
           return {
             isValid:isValid,
             message:data ? isValid?"Invalid Email":"":"email is required",
           };
         },
      },
    
      {
        label: "Create Password*",

        // isRequired: true,
        fieldType: "input",
        inputType: "text",
        inputType:"password",
        fieldName: "password",
        passWordVisible:true,
        validation: function (data) {
          let regex= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/
          let isValid = true;
          if(data && regex.test(data)){
           isValid = false;
          }
        
          
           return {
             isValid:isValid,
             message:isValid?"Minimum eight characters, at least one letter, one number and one special character:":"",
           };
         },
      },
      {
        label: "Confirm Password*",
        // isRequired: true,
        passWordVisible:true,
        fieldType: "input",
        inputType: "text",
        inputType:"password",
        fieldName: "confirm_password",
        compareField: "password",
        validation: function (data, compareField) {
     
          return {
            isValid:compareField!==data
                  ? true
                  : false,
            message:"Password Not Matched.",
          };
        
        },
      },
     
      {
        label: "Stores*",
        selectLabel: "Select Stores",
        isRequired: true,
        fieldType: "tag-input",
        fieldName: "stores",
        optionKey: "name",
        optionValue: "store_code",
        isMultipleClass: true,
      
        validation: function (data) {
          return {
            isValid: data ? false : true,
            message: "Minimum 1 Value Required.",
          };
        },
      },
      {
        label: "Mobile Number*",
        // isRequired: true,
        fieldType: "input",
        inputType: "number",
        fieldName: "mobile_number",
        validation: function (data) {
          let regex= /^\+?[6-9][0-9]{9}$/
          let isValid = true;
          if(data && regex?.test(data)){
           isValid = false;
          }
          
          
           return {
             isValid:isValid,
             message: isValid
             ? "Contact Mobile Must Be 10 Digit, And Should Start with 9 or 8 or 7 or 6."
             : "",
           };
         },
       
      }
    
    ],
  },
];
