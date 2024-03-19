// import { viewFormate } from "../commonjs/globalDateFormat";
import moment from "moment/moment";
// import {
//   batchNumber_Regex,
//   integerWithDecimal_Regex,
// } from "../commonjs/regexGlobal";
export const changePasswordForm = [
  {
    sectionType: "body",
    labelClassName:
      "col-3 d-flex align-items-center justify-content-start pe-0",
    inputClassName: "col-9 ps-2",
    suffixClassName: "",
    bodyClassName: "1",

    child: [
      // {
      //   label: "Name",
      //   // isRequired: true,
      //   fieldType: "input",
      //   inputType: "text",
      //   fieldName: "name",
      //   validation: function (data) {
      //     return {
      //       isValid: false,
      //     };
      //   },
      // },
      // {
      //   label: "Email",
      //   // isRequired: true,
      //   fieldType: "input",
      //   inputType: "text",
      //   fieldName: "email",
      //   validation: function (data) {
      //     return {
      //       isValid: false,
      //     };
      //   },
      // },
      {
        label: "Old Password*",
        // isRequired: true,
        fieldType: "input",
        inputType:"password",
        // inputType: "text",
        fieldName: "old_password",
        passWordVisible:true,
        validation: function (data) {
          return {
            isValid: data?false:true,
            message: "Old Password is Required.",
          };
        },
      },
      {
        label: "New Password*",
        // isRequired: true,
        fieldType: "input",
        inputType: "text",
        inputType:"password",
        fieldName: "new_password",
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
        fieldType: "input",
        inputType: "text",
        inputType:"password",
        fieldName: "confirm_password",
        compareField: "new_password",
        validation: function (data, compareField) {
        
          
          return {
            isValid:compareField!==data
                  ? true
                  : false,
            message:"Password Not Matched.",
          };
        
        },
      },
     
   
    
    ],
  },
];
