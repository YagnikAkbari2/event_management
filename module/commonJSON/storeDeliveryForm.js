import { price_Regex } from "../commonjs/regexGlobal";

export const storeDeliveryForm = [
  {
    sectionType: "body",
    labelClassName:
      "col-3 d-flex align-items-center justify-content-end pe-0",
    inputClassName: "col-9 ps-2",
    suffixClassName: "",
    bodyClassName: "1",

    child: [

      {
        label: "TO Number*",
        fieldType: "input",
        inputType: "text",
        fieldName: "orderNumber",
        validation: function (data) {
          let isValid =false
          const bill_regex = /^TO\d+/;
          if (data && bill_regex.test(data.trim())) {
          isValid =true
          } 
        return {
                isValid:isValid?false:true,
                message: "Enter valid TO number, TO number should start with TO and should contain numeric value.",
              };
        },
      },  {
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
        label: "TO Amount*",
        // isRequired: true,
        fieldType: "input",
        inputType: "number",
        fieldName: "amount",
        validation: function (data) {
          return {
            isValid: data >=500 &&  price_Regex.test(data.toString().trim())? false : true,
            message:data ?( data<500  ? "TO Amount has to be greater than 500 ":price_Regex.test(data.toString().trim())? "":"TO Amount should be max two decimal"):"TO Amount is required.",
          };
         },
       
      },
    //   {
    //     label: "Payment Mode *",
    //     isRequired: true,
    //     fieldType: "select",
    //     isDisabled: false,
    //     fieldName: "type",
    //     optionKey: "key",
    //     optionValue: "value",
    //     validation: function (data) {
    //       console.log("data");
          
    //       return {
    //         isValid: data ? false : true,
    //         message: "Payment Mode is Required.",
    //       };
    //     },
    //   },
      {
        label: "From Store*",
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
            message: "From Store is required.",
          };
        },
      },
      {
        label: "To Store*",
        selectLabel: "Select Stores",
        isRequired: true,
        fieldType: "tag-input",
        fieldName: "delivery_stores",
        optionKey: "name",
        optionValue: "store_code",
        isMultipleClass: true,
        isMulti:false,
        validation: function (data) {
          return {
            isValid: data ? false : true,
            message: "To Store is required.",
          };
        },
      },
    
    
    
    ],
  },
];
