import { get } from "../../apiWrapper";

export const getReportsListApi = (data) => {
  return get(`/search/search-history?${data}`);
};

export const getSingleReportApi = (data) => {
  return get(`/report/${data}`);
};
