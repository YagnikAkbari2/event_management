export const mainMenu: mainMenu[] = [
  {
    title: "Search",
    fieldKey: "search",
    imageUrl: "/assets/navbar-menu/SearchHistory.svg",
    child: [
      {
        title: "Medicine Search",
        fieldKey: "medicine-search",
        imageUrl: "/assets/navbar-menu/Dashboard.svg",
        redirectUrl: "/",
      },
      {
        title: "Search History",
        fieldKey: "search-history",
        imageUrl: "/assets/navbar-menu/SearchHistory.svg",
        redirectUrl: "/search-history",
      },
    ],
  },
  {
    title: "Sales Order",
    fieldKey: "orders",
    fieldSubKey: "sales-orders",
    redirectUrl: "/orders",
    imageUrl: "/assets/navbar-menu/Orders.svg",
  },
  {
    title: "Deliveries",
    fieldKey: "orders",
    imageUrl: "/assets/navbar-menu/HomeDelivery.svg",
    child: [
      {
        title: "Home Delivery",
        fieldKey: "store-orders",
        imageUrl: "/assets/navbar-menu/Dashboard.svg",
        redirectUrl: "/home-delivery",
      },
      {
        title: "Stock Transfer",
        fieldKey: "store-orders",
        imageUrl: "/assets/navbar-menu/SearchHistory.svg",
        redirectUrl: "/store-delivery",
      },
    ],
  },
  {
    title: "Inventory",
    fieldKey: "inventory",
    imageUrl: "/assets/navbar-menu/Inventory.svg",
    child: [
      {
        title: "Stock Audit Store",
        fieldKey: "store-audit",
        imageUrl: "/assets/navbar-menu/Masters.svg",
        redirectUrl: "/stock-audit-store",
      },
      {
        title: "Stock Audit Admin",
        fieldKey: "admin-audit",
        imageUrl: "/assets/navbar-menu/Masters.svg",
        redirectUrl: "/stock-audit-admin",
      },
    ],
  },

  {
    title: "Settings",
    fieldKey: "master",
    imageUrl: "/assets/navbar-menu/Settings.svg",
    redirectUrl: "/",
    child: [
      {
        title: "Users & Roles",
        fieldKey: "user",
        redirectUrl: "/user-and-roles/",
      },
      {
        title: "Import History",
        fieldKey: "import-history",
        redirectUrl: "/import-history",
      },
    ],
  },
  {
    title: "Reports",
    fieldKey: "report",
    imageUrl: "/assets/navbar-menu/Reports.svg",
    redirectUrl: "/reports",
    child: [],
  },
];
