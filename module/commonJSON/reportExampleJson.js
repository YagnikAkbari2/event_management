export const reportExampleJson = [
  {
    Header: "Reports",
    module_name: "report",
    childs: [
      {
        label: "Audit Details",
        path: "/audit-detail",
        module_name: "audit-detail",
        isMultipleData: false,
        isDownload: true,
        showDateField: true,
        showFilters: false,
        isMultiDate: true,
        showSearch: true,
        searchColumn: [
          {
            field: "audit_number",
            title: "Audit Number",
          },
        ],
        filterColumns: [
          {
            title: "Store",
            field: "store_id",
            isSearchable: true,
            valueKey: "name",
            selectValue: "id",
          },
          {
            title: "City",
            field: "city",
            isSearchable: true,
            valueKey: "name",
            selectValue: "name",
          },
          {
            title: "Status",
            field: "status",
            valueKey: "label",
            selectValue: "value",
          },
          {
            title: "Expired",
            field: "is_expired",
            valueKey: "label",
            selectValue: "value",
          },
        ],
        filterValues: {
          status: [
            { label: "Completed", value: "COMPLETED" },
            { label: "In Progress", value: "IN_PROGRESS" },
            { label: "Pending", value: "PENDING" },
          ],
          is_expired: [
            { label: "Expired", value: true },
            { label: "Not Expired", value: false },
          ],
        },
      },
      {
        label: "Audit Summary",
        path: "/audit-summary",
        module_name: "audit-summary",
        showDateField: true,
        showFilters: false,
        isMultiDate: true,
        showSearch: true,
        isDownload: true,
        searchColumn: [
          {
            field: "audit_number",
            title: "Audit Number",
          },
        ],
        filterColumns: [
          {
            title: "Store",
            field: "store_id",
            isSearchable: true,
            valueKey: "name",
            selectValue: "id",
          },
          {
            title: "City",
            field: "city",
            isSearchable: true,
            valueKey: "name",
            selectValue: "name",
          },
          {
            title: "Status",
            field: "status",
            valueKey: "label",
            selectValue: "value",
          },
          {
            title: "Expired",
            field: "is_expired",
            valueKey: "label",
            selectValue: "value",
          },
        ],
        filterValues: {
          status: [
            { label: "Completed", value: "COMPLETED" },
            { label: "In Progress", value: "IN_PROGRESS" },
            { label: "Pending", value: "PENDING" },
          ],
          is_expired: [
            { label: "Expired", value: true },
            { label: "Not Expired", value: false },
          ],
        },
      },
      {
        label: "Home Delivery Details",
        path: "/home-delivery-detail",
        module_name: "home-delivery-detail",
        isMultipleData: false,
        isDownload: true,
        showDateField: true,
        showFilters: false,
        isMultiDate: true,
        showSearch: true,

        filterColumns: [
          {
            title: "Store",
            field: "store_id",
            isSearchable: true,
            valueKey: "name",
            selectValue: "id",
          },
          {
            title: "City",
            field: "city",
            isSearchable: true,
            valueKey: "name",
            selectValue: "name",
          },
          {
            title: "Status",
            field: "status",
            valueKey: "label",
            selectValue: "value",
          },
        ],
        filterValues: {
          status: [
            { label: "Received", value: "RECEIVED" },
            { label: "Delivered", value: "DELIVERED" },
            { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
            { label: "RTO", value: "RTO" },
            { label: "Picked Up", value: "PICKED_UP" },
            { label: "Cancelled By Shipper", value: "CANCELLED_BY_SHIPPER" },
          ],
        },
        searchColumn: [
          {
            field: "order_number",
            title: "Bill No",
          },
          {
            field: "to_name",
            title: "Customer Name",
          },
        ],
      },

      {
        label: "Home Delivery Summary",
        path: "/home-delivery-summary",
        module_name: "home-delivery-summary",
        isMultipleData: false,
        isDownload: true,
        showDateField: true,
        showFilters: false,
        isMultiDate: true,
        showSearch: false,
        filterColumns: [
          {
            title: "Store",
            field: "store_id",
            isSearchable: true,
            valueKey: "name",
            selectValue: "id",
          },
          {
            title: "City",
            field: "city",
            isSearchable: true,
            valueKey: "name",
            selectValue: "name",
          },
        ],
      },
      {
        label: "Stock Transfer Details",
        path: "/stock-transfer-detail",
        module_name: "stock-transfer-detail",
        isMultipleData: false,
        isDownload: true,
        showDateField: true,
        showFilters: false,
        isMultiDate: true,
        showSearch: true,

        searchColumn: [
          {
            field: "order_number",
            title: "Transfer Out Number",
          },
          {
            field: "to_name",
            title: "To Store Name",
          },
        ],

        filterColumns: [
          {
            title: "Store",
            field: "store_id",
            isSearchable: true,
            valueKey: "name",
            selectValue: "id",
          },
          {
            title: "City",
            field: "city",
            isSearchable: true,
            valueKey: "name",
            selectValue: "name",
          },
          {
            title: "Status",
            field: "status",
            valueKey: "label",
            selectValue: "value",
          },
        ],
        filterValues: {
          status: [
            { label: "Received", value: "RECEIVED" },
            { label: "Delivered", value: "DELIVERED" },
            { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
            { label: "RTO", value: "RTO" },
            { label: "Picked Up", value: "PICKED_UP" },
            { label: "Cancelled By Shipper", value: "CANCELLED_BY_SHIPPER" },
          ],
        },
      },
      {
        label: "Stock Transfer Summary",
        path: "/stock-transfer-summary",
        module_name: "stock-transfer-summary",
        isMultipleData: false,
        isDownload: true,
        showDateField: true,
        showFilters: false,
        isMultiDate: true,
        showSearch: false,
        filterColumns: [
          {
            title: "Store",
            field: "store_id",
            isSearchable: true,
            valueKey: "name",
            selectValue: "id",
          },
          {
            title: "City",
            field: "city",
            isSearchable: true,
            valueKey: "name",
            selectValue: "name",
          },
        ],
      },
    ],

    showSearch: true,
  },
];
