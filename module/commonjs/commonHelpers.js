import { onlyInteger_Regex } from "./regexGlobal";

export const convertToModuleName = (route, isMultipleRoute) => {
  let str = "";
  if (route && Array.isArray(route)) {
    let arr = [];
    route?.map((d, i) => {
      let subArr = [];
      let innerStr = "";
      if (i !== 0 && d !== "") {
        subArr = d?.split("-");
      }
      subArr.map((sI) => {
        innerStr = innerStr.concat(
          sI?.charAt(0)?.toUpperCase() + sI.slice(1)?.toLowerCase()
        );
      });
      arr.push(innerStr);
    });
    str = arr.join("");
  }
  return str;
};
export const returnProductsMap = (data, searchKey, valueKey, totalOps) => {
  let x = {};
  data?.map((val, idx) => {
    if (val?.[searchKey]) {
      let addValue = 0;
      if (totalOps && totalOps?.length) {
        totalOps?.map((op, idx) => {
          addValue += Number(val?.[op]);
        });
      } else {
        addValue = parseInt(val?.[valueKey] ?? 1);
      }
      x[val[searchKey]] = (x[val[searchKey]] ?? 0) + addValue;
    }
  });
  return x;
};

export const customReturnProductsMap = (
  data,
  searchKey,
  totalOps,
  subObject
) => {
  let x = {};
  data?.map((val, idx) => {
    if (val?.[searchKey]) {
      let addValue = {};
      let row = val;
      if (totalOps?.length > 0) {
        totalOps?.map((op, idx) => {
          if (!addValue.op) {
            addValue[op] = 0;
          }
          addValue[op] = Number(val?.[op] ?? 0);
          if (x[val?.[searchKey]]) {
            addValue[op] += Number(x[val?.[searchKey]]?.[op] ?? 0);
          }
        });

        row = { ...row, ...addValue };
        x[val[searchKey]] = row;
      } else {
        x[val[searchKey]] = row;
      }
    } else if (val?.[subObject]?.[searchKey]) {
      x[val[subObject][searchKey]] = true;
    }
  });
  return x;
};
export const convertMasterDataToFormattedArray = (data, key, value) => {
  let obj = data ?? {};
  let formatted = [];
  Object.keys(obj)?.map((val, idx) => {
    let keySplit = val?.split("_");
    let formattedKey = "";
    keySplit?.map((d, i) => {
      d = d?.toLowerCase();
      d = d.substring(0, 1)?.toUpperCase() + d.substring(1);
      formattedKey = (formattedKey ? formattedKey + " " : "") + d;
      return d;
    });
    formatted.push({ key: formattedKey, value: val });
  });
  return formatted;
};

export const modifyArrayElementsToKeyValuePairs = (
  data,
  extractKey,
  key,
  value
) => {
  let newArray = [];
  data?.map((val, idx) => {
    let value = val[extractKey];
    let keySplit = value?.split("-");
    let formattedKey = "";
    keySplit?.map((d, i) => {
      d = d?.toLowerCase();
      d = d.substring(0, 1)?.toUpperCase() + d.substring(1);
      formattedKey = (formattedKey ? formattedKey + " " : "") + d;
      return d;
    });
    newArray.push({
      key: formattedKey,
      value: value,
    });

    return val;
  });
  return newArray;
};

export const arrayToObjectKeyValueMap = (data, extractKey, childKey, value) => {
  let map = {};
  data?.map((val, idx) => {
    let mainKey = val?.[extractKey];
    if (map[mainKey]) {
      if (childKey) {
        let childs = map[mainKey][childKey];
        childs = [...childs, ...val?.child];
        map[mainKey] = { ...val, ["child"]: childs };
      }
    } else {
      map[mainKey] = val;
    }
   
    return val;
  });
  return map;
};
export const returnIndexWithField = async (data) => {
  if (data) {

    
    if (data?.toString().trim().includes(".")) {
   
      const splittedData = data?.toString().trim().split(".");
      if (splittedData?.[1] && onlyInteger_Regex.test(splittedData?.[1])) {
        return { idx: splittedData?.[1], fieldName: splittedData?.[2] };
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const errObjtoArray = async (obj) => {
  
  
  let newObj = {};
  if (obj && Object.keys(obj).length > 0) {
    await Object.keys(obj).map(async (oD, ind) => {
      
      
      const result = await returnIndexWithField(oD);
   
      if (result) {
        if (!newObj[result?.idx]) {
          newObj = { [result?.idx]: {} };
        }
        newObj[result.idx] = {
          ...newObj[result.idx],
          [result.fieldName]: { type: "error", message: obj[oD] },
        };
      }
    });
  }

  
  return newObj;
};

export const focusNextElement = (tabIndex) => {
  var tabbables = document.querySelectorAll(".tabable");
  for (var i = 0; i < tabbables.length; i++) {
    if (tabbables[i].tabIndex == (tabIndex + 1)) {
      tabbables[i].focus();
      break;
    }
  }
}