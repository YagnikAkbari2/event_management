import { price_Regex } from "../commonjs/regexGlobal";

export const homeDeliveryForm = [
  {
    sectionType: "body",
    labelClassName:
      "col-3 d-flex align-items-center justify-content-end pe-0",
    inputClassName: "col-9 ps-2",
    suffixClassName: "",
    bodyClassName: "1",

    child: [
      {
        label: "Bill Number *",
        fieldType: "input",
        inputType: "text",
        placeHolder:"hello",
        fieldName: "orderNumber",
        validation: function (data) {
          let isValid =false
          const bill_regex = /^SC\d+/;
          if (data && bill_regex.test(data.trim())) {
          isValid =true
          } 
        return {
                isValid:isValid?false:true,
                message: "Enter valid Bill number, Bill number should start with SC and should contain numeric value.",
              };
        },
      },
      {
        label: "Customer Name*",
        fieldType: "input",
        inputType: "text",
        fieldName: "name",
        validation: function (data) {
            return {
                isValid: data ? false : true,
                message: "Customer name is required.",
              };
        },
      },
      {
        label: "Email ID",
        isRequired: false,
        fieldType: "input",
        fieldName: "email",
        validation: function (data) {
          const email_Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (data && email_Regex.test(data.trim())) {
            return { isValid: false };
          } else if (!data || data.length <= 0) {
            return { isValid: false };
          }
          return {
            isValid: false,
            message: "Enter valid email address.",
          };
        },
      },
      {
        label: "Customer Number*",
        // isRequired: true,
        fieldType: "input",
        inputType: "number",
        fieldName: "phone",
        validation: function (data) {
          let regex= /^\+?[6-9][0-9]{9}$/
          let isValid = true;
          if(data && regex?.test(data)){
           isValid = false;
          }
          
          
           return {
             isValid:isValid,
             message: isValid
             ? "Customer Number Must Be 10 Digit, And Should Start with 9 or 8 or 7 or 6."
             : "",
           };
         },
       
      },
      {
        label: "Employee Code*",
        // isRequired: true,
        fieldType: "input",
        inputType: "text",
        fieldName: "employee_code",
        validation: function (data) {
          return {
            isValid: data ? false : true,
            message: "Employee code is required.",
          };
         },
       
      },
      {
        label: "Bill Amount*",
        // isRequired: true,
        fieldType: "input",
        inputType: "number",
        fieldName: "amount",
        validation: function (data) {
          return {
            isValid: data && data>0 && price_Regex.test(data.toString().trim())? false : true,
            message: data?(data<0? "Bill Amount is should be greater than 0":price_Regex.test(data.toString().trim())? "":"Bill Amount should be max two decimal"):"Bill Amount value is required.",
          };
         },
       
      },
      {
        label: "Payment Mode *",
        isRequired: true,
        fieldType: "select",
        isDisabled: false,
        fieldName: "type",
        optionKey: "key",
        optionValue: "value",
        validation: function (data) {
   
          
          return {
            isValid: data ? false : true,
            message: "Payment mode is required.",
          };
        },
      },
      {
        validation: function (data) {
          return {
            isValid:  false ,
            message: "Pickup address is required.",
          };
        },
      },
      {
        label: "Pickup address*",
        selectLabel: "Select Stores",
        isRequired: true,
        fieldType: "tag-input",
        fieldName: "stores",
        optionKey: "name",
        optionValue: "store_code",
        isMultipleClass: true,
        isMulti:false,
        validation: function (data) {
          return {
            isValid: data ? false : true,
            message: "Pickup address is required.",
          };
        },
      },
      {
        label: "Customer Add / Flat No.*",
        // isRequired: true,
        fieldType: "input",
        inputType: "text",
        fieldName: "address1",
        validation: function (data) {
            return {
                isValid: data ? false : true,
                message: "Customer Address1 is required.",
              };
        },
      },
      {
        label: "Customer Add / Street",
        // isRequired: true,
        fieldType: "input",
        inputType: "text",
        fieldName: "address2",
        validation: function (data) {
            return {
                isValid: false ,
                message: "Customer Address1 is required.",
              };
        },
      },
      {
        label: "Customer Pincode*",
        isRequired: false,
        fieldType: "input",
        inputType: "number",
        fieldName: "pincode",
        parent: "delivery",
        validation: function (data) {
          let isValid = true;
          if (data?.length === 6) {
            isValid = false;
          }
          return {
            isValid: isValid,
            message:
              data && data?.length !== 6
                ? "Pincode must be 6 digit."
                : "Pincode is required.",
          };
        },
      },
      {
        label: "Customer City*",
        // isRequired: true,
        fieldType: "input",
        isDisabled:true,
        inputType: "text",
        fieldName: "city",
        validation: function (data) {
            return {
                isValid: data ? false : true,
                message: "Customer city is required.",
              };
        },
      },
      {
        label: "Customer State*",
        // isRequired: true,
        fieldType: "input",
        inputType: "text",
        fieldName: "state",
        isDisabled:true,
        validation: function (data) {
            return {
                isValid: data ? false : true,
                message: "Customer state is required.",
              };
        },
      },
  
    
    ],
  },
];
