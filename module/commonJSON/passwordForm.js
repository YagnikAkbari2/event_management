

export const PasswordForm = [
  {
    sectionType: "body",
    labelClassName: "col-3 d-flex justify-content-end align-items-center pe-0",
    inputClassName: "col-9 ps-2",
    suffixClassName: "",
    bodyClassName: "1",
    child: [
      {
        label: "Email *",
        isRequired: true,
        fieldType: "input",
        fieldName: "email",
        validation: function (data) {
          return {
            isValid: false,
          };
        },
      },
      {
        label: "Password *",
        isRequired: true,
        fieldType: "input",
        inputType: "password",
        fieldName: "password",
        passWordVisible:true,
        validation: function (data) {

          return {
            isValid: !data || data?.length < 6 ? true : false,
            message: !data
              ? "Password is required"
              : data?.length < 6
              ? "Password should be minimum of 6 digits"
              : "",
          };
        },
      },
      {
        label: "Confirm Password *",
        isRequired: true,
        fieldType: "input",
        inputType: "password",
        fieldName: "password_confirmation",
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
    ],
  },
];
export const constantConfig = { salutation: ["Mr", "Ms", "Mrs"] };
