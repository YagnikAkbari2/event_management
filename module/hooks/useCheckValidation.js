import { useState } from "react";
import { useSelector } from "react-redux";
let tabsValid = [];
const useCheckValidation = (tabsValidation) => {
  const checkTabsValidation = async (jsonData, valueData) => {
    let isTabsValidation = [];
    isTabsValidation = await jsonData?.child?.map(async (tabData, i) => {
      let fieldDataTabs = valueData ? valueData[tabData.eventKey] : "";
      if (
        typeof fieldDataTabs === "undefined" &&
        tabData?.child?.length > 0 &&
        tabData?.isNonObject
      ) {
        tabData?.child.map((childD, index) => {
          if (childD?.child) {
            fieldDataTabs = {};
            childD?.child.map((subChild, subInd) => {
              fieldDataTabs[subChild?.fieldName] =
                valueData[subChild?.fieldName];
            });
          }
        });
      }
      console.log("fieldDataTabs", fieldDataTabs);
      return await checkBodyValidation(tabData?.child[0], fieldDataTabs);
    });
    isTabsValidation = await Promise.all(isTabsValidation);
    tabsValid = [...isTabsValidation];
    if (
      isTabsValidation.filter((x) => {
        if (x) {
          return x;
        }
      }).length !== isTabsValidation?.length
    ) {
      return false;
    }
    return true;
  };
  const checkGroupFieldValidation = async (jsonData, valueData) => {
    let isGroupValidation = [];
    if (jsonData?.child?.length) {
      isGroupValidation = await jsonData?.child?.map(async (GroupChild) => {
        let isSubChildValidation = [];
        isSubChildValidation = await GroupChild?.child.map(async (subChild) => {
          return await checkBodyValidation(subChild, valueData);
        });
        isSubChildValidation = await Promise.all(isSubChildValidation);
        if (
          isSubChildValidation.filter((d) => {
            return d;
          })?.length !== isSubChildValidation?.length
        ) {
          return false;
        }
        return true;
      });
    }
    isGroupValidation = await Promise.all(isGroupValidation);
    if (
      isGroupValidation.filter((d) => {
        return d;
      })?.length !== isGroupValidation?.length
    ) {
      return false;
    }
    return true;
  };

  const checkBodyValidation = async (jsonData, valueData) => {
    console.log("asdgbxcv", jsonData?.child, valueData);
    let isBodyValidation = [];
    isBodyValidation = await jsonData.child.map((childData) => {
      if (
        childData?.fieldType !== "group-fields" &&
        childData.fieldType !== "accordion" &&
        childData?.fieldType !== "grid-table"
      ) {
        if (!childData.isDisabled) {
          if (
            childData?.validation(
              valueData && childData?.parent
                ? valueData[childData?.parent]
                  ? valueData[childData?.parent][childData.fieldName]
                  : valueData?.[childData.fieldName]
                : valueData?.[childData.fieldName],
              childData?.compareField
                ? childData?.parent
                  ? valueData[childData?.parent]
                    ? valueData[childData?.parent][childData.compareField]
                    : valueData[childData.compareField]
                  : valueData[childData.compareField]
                : ""
            )?.isValid === false
          ) {
            return true;
          }
        } else if (childData.isDisabled) {
          return true;
        }
      } else if (childData?.fieldType === "group-fields") {
        return checkGroupFieldValidation(childData, valueData);
      } else if (
        childData.fieldType === "accordion" ||
        childData?.fieldType === "grid-table"
      ) {
        return true;
      }
      return false;
    });

    isBodyValidation = await Promise.all(isBodyValidation);
    if (
      isBodyValidation.filter((d) => {
        return d;
      })?.length !== isBodyValidation?.length
    ) {
      return false;
    }
    return true;
  };

  const checkFormValidation = async (json, valueData) => {
    let isCheckFormValidation = [];
    isCheckFormValidation = await json.map(async (jsonData, i) => {
      if (jsonData.sectionType === "body") {
        return (await checkBodyValidation(jsonData, valueData)) ? true : false;
      } else if (jsonData.sectionType === "tabs") {
        return (await checkTabsValidation(jsonData, valueData)) ? true : false;
      }
      return true;
    });
    isCheckFormValidation = await Promise.all(isCheckFormValidation);
    if (
      isCheckFormValidation.filter((x) => {
        if (x) {
          return x;
        }
      }).length !== isCheckFormValidation?.length
    ) {
      return false;
    }
    return true;
  };
  const checkValidation = async (json, valueData) => {
    if (json) {
      const response = await checkFormValidation(json, valueData);
      return tabsValidation
        ? { tabsErrors: tabsValid, isValid: response }
        : response;
    }
    return tabsValidation ? { tabsErrors: tabsValid, isValid: false } : false;
  };
  return checkValidation;
};

export default useCheckValidation;
