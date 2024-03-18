import React from "react";

const StatusChip = ({ status, bgColor, bulletColor, textColor }) => {
  return (
    <span style={{ backgroundColor: bgColor }} className="chip pill p-1 px-2 ">
      <span className="chip_point" style={{ color: bulletColor }}>
        •
      </span>
      <span style={{ color: textColor }} className="px-1 status-label ">{status ?? ""}</span>
    </span>
  );
};

export default StatusChip;
