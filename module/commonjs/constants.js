export const permissions = ["LIST", "ADD", "EDIT", "DELETE", "APPROVE"];

export const status = {
  DRAFT: {
    status: "Draft",
    bgColor: "#EBEEF0",
    bulletColor: "#C0C0C0",
    textColor: "#202223",
  },
  INVOICED: {
    status: "Invoiced",
    bgColor: "#BAF0DA",
    bulletColor: "#007F5F",
    textColor: "#202223",
  },
  CONFIRMED: {
    status: "Confirmed",
    bgColor: "#BAF0DA",
    bulletColor: "#007F5F",
    textColor: "#202223",
  },
  CONFIRMED_IN_QUEUE: {
    status: "In Queue",
    bgColor: "#FFDBB9",
    bulletColor: "#E4824B",
    textColor: "#202223",
  },
  ON_HOLD: {
    status: "On Hold",
    bgColor: "#FED3D1",
    bulletColor: "#D72C0D",
    textColor: "#202223",
  },
  CANCELLED: {
    status: "Cancelled",
    bgColor: "#EBEEF0",
    bulletColor: "#C0C0C0",
    textColor: "#202223",
  },
};
export const type = {
  NON_MOVING: {
    status: "Non-Moving"
  },
  EXPIRY: {
    status: "Expired"
  },
  DAMAGED: {
    status: "Damaged"
  },
  DISPUTED: {
    status: "Disputed"
  },
}
export const IFSC_REGEX = /[A-Z]{4}0[A-Z0-9]{6}$/;
export const alphabetsMapping = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
  8: 'I',
  9: 'J',
  10: 'K',
  11: 'L',
  12: 'M',
  13: 'N',
  14: 'O',
  15: 'P',
  16: 'Q',
  17: 'R',
  18: 'S',
  19: 'T',
  20: 'U',
  21: 'V',
  22: 'W',
  23: 'X',
  24: 'Y',
  25: 'Z'
};
export const formats = ["DD/MM/YYYY", "DD-MM-YYYY", "MM/YY", "MM/YYYY", "MMM/YYYY", "MM-YY", "DD-MM-YY", "DD/MM/YY", "MM/YY", "MMM-YYYY", "MMM-YY", "MMM/YY", "DDMMYYYY", "DD/MMM/YYYY", "DD/MMM/YY", "DD-MMM-YYYY", "DD-MMM-YY", "DD/MM/YYYY[T]HH:mm:ss", "DD-MM-YYYY[T]HH:mm:ss"]