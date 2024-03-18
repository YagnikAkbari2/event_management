import {
  RESET_REPORT_DOWNLOAD_URL,
  SET_REPORTS,
  SET_REPORT_DOWNLOAD_URL,
  SET_SINGLE_REPORT,
} from "../actions/reportAction";

const initialState = {
  search_reports: [],
  // productDetails: {},
  // message: "",
  // isLoading: false,
  // salesOrderProducts: [],
  // salesOrderProductsMeta: {},
  mrpPtrListMeta: {},
  reportData: {},
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORTS:
      return {
        ...state,
        mrpPtrListMeta: action.payload?.meta ?? {},
        reportList: action.payload?.search_reports ?? [],
      };
    case SET_SINGLE_REPORT:
      return {
        ...state,
        reportData: action.payload?.data,
      };
    case SET_REPORT_DOWNLOAD_URL:
      return {
        ...state,
        reportDownloadURL: action.payload?.data?.report_file,
      };
    case RESET_REPORT_DOWNLOAD_URL:
      return {
        ...state,
        reportDownloadURL: "",
      };
    default:
      return state;
  }
};

export default reportReducer;
