export const GET_REPORTS = "GET_REPORTS";
export const SET_REPORTS = "SET_REPORTS";
export const GET_SINGLE_REPORT = "GET_SINGLE_REPORT";
export const SET_SINGLE_REPORT = "SET_SINGLE_REPORT";
export const GET_REPORT_DOWNLOAD_URL = "GET_REPORT_DOWNLOAD_URL";
export const SET_REPORT_DOWNLOAD_URL = "SET_REPORT_DOWNLOAD_URL";
export const RESET_REPORT_DOWNLOAD_URL = "RESET_REPORT_DOWNLOAD_URL";
export const getReports = (payload) => {
  return {
    type: GET_REPORTS,
    payload,
  };
};

export const getReportDetails = (payload) => {
  return {
    type: GET_SINGLE_REPORT,
    payload,
  };
};

export const getReportDownloadURL = (payload) => {
  return {
    type: GET_REPORT_DOWNLOAD_URL,
    payload,
  };
};

export const resetReportDownloadUrl = () => {
  return {
    type: RESET_REPORT_DOWNLOAD_URL,
  };
};
