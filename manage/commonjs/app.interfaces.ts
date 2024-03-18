interface IFilterConstValue {
  label?: string;
  value?: string;
}

interface ISearchColumn {
  title?: string;
  field?: string;
  customLabel?: string;
}

interface s3DataObject {
  region: string;
  credentials: { accessKeyId: string; secretAccessKey: string };
}

interface IfilterColumnObj {
  title?: string;
  field: string;
  valueKey?: string;
  selectValue?: string;
  isSearchable?: boolean;
  maxDate?: Date;
  fromField?: string;
  toField?: string;
  rangeHover?: boolean;
  ref?: any;
  currentDate?: string;
  isHidden?: boolean;
}

interface ICommonHeaders {
  title: string;
  field: string;
  isShort?: boolean;
  isMultiple?: boolean;
  customField?: Function;
}

interface IBodyChild {
  fieldName: string;
  fieldType: string;
  fileLabel?: string;
  isMulti: boolean;
  isMultipleClass: boolean;
  label?: string;
  optionKey?: string;
  optionValue?: string;
}

interface IPaginationData {
  current_page?: number;
  current_page_record?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
}

interface ListingSearch {
  dropdownData?: any[];
  selectColumnSearch?: object;
  onSelectColumn?: (value: object) => void;
  onChangeSearch?: (e?: Event, ...res: any) => void;
  searchResults?: any[];
  isDisabled?: boolean;
  isDropdownPresent?: boolean;
  innerSearchValue?: string;
  searchDropdownLabel?: string;
  onSearchSelect?: Function;
  customPlaceHolder?: string;
  customFieldDropdown?: (val: any) => void;
  hideSearchDropDownBtn?: boolean;
  handleClickCreateNew?: () => void;
  isCreateNewProduct?: boolean;
}

interface ListingFilter {
  showFilter?: boolean;
  setShowFilter?: Function;
  filterColumn?: any[];
  selectColumnFilter?: any;
  onSelectFilterColumn?: () => void;
  selectColumnValue?: any;
  selectedFilterColumnValue?: any;
  filterValues?: any;
  onSelectFilterValue?: any;
  sortingColumnData?: { title: string; field: string }[];
  onSelectSortColumn?: (val: { title: string; field: string }) => void;
  selectedSortColumn?: { title: string; field: string };
  onSelectSortType?: (sortType: string) => void;
  selectedSortType?: string;
  isDisabledFilter?: boolean;
  isDisabledSortBy?: boolean;
}

interface IFilterSection {
  filterColumn?: any[];
  clearAllFilter?: (e: Event) => void;
  clearFilter?: (columnName: IfilterColumnObj) => void;
  isSearchable: boolean;
  onChangeSearch?: (e?: Event, ...res: any) => void;
  selectedFilterValue?: any;
  onSelectValue?: (
    val: { label?: string; value?: string },
    columnData: IfilterColumnObj,
    e?: any
  ) => void;
  onSelectRange?: (date: any, columnData: IfilterColumnObj) => void;
  valueData?: any;
}

interface ListingComponentProps {
  filterInitialValue?: boolean;
  searchhHistory?: boolean;

  // lising Search
  showSearch?: boolean;
  onSelectColumnSearch?: (value: object) => void;
  searchDropdownData?: any[];
  selectedColumnSearch?: object;
  onChangeSearch?: (e?: Event, ...res: any) => void;
  searchResults?: any[];
  isDisabled?: boolean;
  isDropdownPresent?: boolean;
  innerSearchValue?: string;
  searchDropdownLabel?: string;
  onSearchSelect?: Function;
  customPlaceHolder?: string;
  customFieldDropdown?: (val: any) => void;
  hideSearchDropDownBtn?: boolean;
  handleClickCreateNew?: () => void;
  isCreateNewProduct?: boolean;

  // lisitng filter
  filterColumn?: any[];
  selectedFilterValue?: any;
  isMobile?: boolean;
  onSelectRange?: (date: any, columnData: IfilterColumnObj) => void;
  clearFilter?: (columnName: IfilterColumnObj) => void;
  onClickFilterTitle?: (
    columnData: IfilterColumnObj,
    columnInd: number
  ) => void;
  valueData?: any;
  onSelectValue?: (
    val: { label?: string; value?: string },
    columnData: IfilterColumnObj,
    e?: any
  ) => void;
  onDropdownSearch?: (e: Event, columnData: IfilterColumnObj) => void;

  showFilter?: boolean;
  isDisabledFilter?: boolean;
  isDisabledSortBy?: boolean;
  onSelectSortColumn?: (val: { title: string; field: string }) => void;
  onSelectSortType?: (sortType: string) => void;
  selectedSortType?: string;
  clearAllFilter?: (e: Event) => void;
  sortingColumnData?: { title: string; field: string }[];
  selectedSortColumn?: { title: string; field: string };
  moveTo?: (page: number) => void;
  paginationData?: IPaginationData;
  data?: any[];

  // not used any where
  onSelectFilterColumn?: () => void;
  selectedFilterColumnValue?: any;
  filterValues?: any;
  onSelectFilterValue?: any;

  // dynamic table
  column?: any[];
  secondRowCard?: boolean;
  showNoDataCustomBtn?: boolean;
  handleNoDataBtnClick?: () => void;
  isShowCustomBarRow?: boolean;
  showCustomMobileViewRow?: boolean;
  customMobileRowComp?: (rowValue: any, column: any[]) => React.ReactNode;
  buttons?: any[];
  showActions?: boolean;
  rowHederClassName?: string;
  selectAll?: () => void;
  uncheckAll?: () => void;
  onClickButton?: () => void;
  showSecondRowCard?: boolean;

  // used in common side drawer
  isDateField?: boolean;
  showFooterItems?: boolean;
  selectedDate?: Date;
  onSelectedDate?: Function;
  tabs?: boolean;
  tabKey?: string;
  hidePagination?: boolean;
  showSorting?: boolean;
}

interface IProducts {
  content: string;
  id: number;
  images: { name: string; url: string }[];
  is_banned: boolean;
  is_discontinued: boolean;
  mrp: number;
  name: string;
  package_size: number;
  package_type: string;
  sales_price: number;
  ws_code: number;
}

interface mainMenu {
  title: string;
  fieldKey: string;
  imageUrl: string;
  child?: mainMenu[];
  fieldSubKey?: string;
  redirectUrl?: string;
  alternateFieldKey?: string;
}
