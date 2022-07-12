export const Service_Provider = "Nhà cung cấp";

export const COLLECTION = {
  USER: "users",
  GROUP: "groups",
  EVENT: "events",
  PAYMENT: "_payments",
  EXPENSE: "_expenses",
  EXPENSE_TYPE: "expense_types",
};

export const GROUP = {
  ALL: "",
  CUSTOMER: "GRP00",
};

export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
  GUEST: "GUEST",
};

export const CATEGORY = {
  ALL: "",
  TRANSPORT: "TRANSPORT",
  HOTEL: "HOTEL",
  FOOD: "FOOD",
  GIFT: "GIFT",
  OTHER: "OTHER",
};

export const CATEGORIES = [
  { id: "TRANSPORT", name: "Đi lại", icon: "" },
  { id: "HOTEL", name: "Nơi lưu trú", icon: "" },
  { id: "FOOD", name: "Ăn uống", icon: "" },
  { id: "GIFT", name: "Quà tặng", icon: "" },
  { id: "OTHER", name: "Khác", icon: "" },
];

export const TYPE = {
  ALL: "",
  PRIVATE: "PRIVATE",
  SHARE: "SHARE",
};

export const PAYMENT_TYPE = {
  ALL: "",
  PAID: "PAID",
  RECIEVED: "RECIEVED",
};

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  IDLE: "IDLE",
};

export const GENDER = {
  M: "gender.male",
  F: "gender.female",
  O: "gender.other",
};

export const MODAL_RESPONSE_TYPE = {
  BETTING: "BETTING",
  CHANGE_STATUS: "CHANGE_STATUS",
  SET_RESULT: "SET_RESULT",
};

export const MESSAGES = {
  UNKNOW_ERROR: "msg_unknow_error",
};

export const DATETIME_FORMAT = {
  VI_DATE: "DD/MM/YYYY",
  EN_DATE: "MM/DD/YYYY",
  TIME_12: "hh:mm A",
  TIME_24: "HH:mm",
  VI_DATETIME_12: "hh:mm A DD/MM/YYYY",
  EN_DATETIME_12: "MM/DD/YYYY hh:mm A",
  VI_DATETIME_24: "HH:mm DD/MM/YYYY",
  EN_DATETIME_24: "MM/DD/YYYY HH:mm",
};

export const SELECT_STYLES = {
  searchBox: {
    padding: "3px",
  },
  inputField: {
    margin: "2px",
  },
  groupHeading: {
    "font-weight": "bold",
  },
  option: {
    "padding-top": "4px",
    "padding-bottom": "4px",
  },
};
