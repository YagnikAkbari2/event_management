const queries: string[] = ["search", "filter", "sort", "page"];

function QueryUtilityFunc(
  searchQuery: string,
  selectedColumn: { label: string; field: string },
  filterValues: any,
  sortValue: { val: string; type: string },
  page?: number,
  filterJSON?: IfilterColumnObj[]
) {
  let apiQuery = "";
  queries.filter((d, i) => {
    apiQuery =
      apiQuery !== "" && apiQuery.charAt(apiQuery.length - 1) !== "&"
        ? apiQuery.concat("&")
        : apiQuery.concat("");
    if (d === "search" && searchQuery) {
      apiQuery = apiQuery.concat(
        "search=" +
          encodeURIComponent(searchQuery) +
          "," +
          selectedColumn?.field
      );
    } else if (d === "filter" && filterValues) {
      filterJSON &&
        filterJSON.length &&
        filterJSON.map((k: any, i: number) => {
          let child = k.selectValue ?? false;
          if (filterValues[k.field]) {
            apiQuery =
              apiQuery !== "" && apiQuery.charAt(apiQuery.length - 1) !== "&"
                ? apiQuery.concat("&")
                : apiQuery;
            apiQuery = apiQuery.concat(
              k.field +
                "=" +
                (child ? filterValues[k.field]?.[child] : filterValues[k.field])
            );
          }
        });
    } else if (d == "sort" && sortValue) {
      apiQuery = apiQuery.concat(
        "sort_by=" + sortValue.val + "," + sortValue.type
      );
    } else if (d === "page" && page) {
      apiQuery = apiQuery.concat("page=" + page);
    }
  });
  return apiQuery;
}
export default QueryUtilityFunc;
