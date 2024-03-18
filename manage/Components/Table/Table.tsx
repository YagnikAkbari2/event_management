import Image from "next/image";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
interface TableRow {
  desc: string;
  id: number;
  image_url: string;
  mrp: number;
  name: string;
  package_type: string;
  qty: number | "-";
  status: string;
  tat: string;
  vendor: string;
  warehouse: string;
}
interface Table {
  data: TableRow[];
  handleRemove: (idx: number, data: TableRow[]) => void;
}
interface TableColumn {
  label: string | "";
  width?: string;
  fieldName: string;
  customLabel?: Function;
  customField?: (
    row: TableRow,
    idx: number,
    data: TableRow[]
  ) => JSX.Element | JSX.Element[];
  tdClassName?: string;
}
const columnsJSON: TableColumn[] = [
  {
    label: "Medicine Name",
    fieldName: "medicine",
    width: "40%",
    customField: (row: TableRow, idx: number, data: TableRow[]) => {
      return (
        <div className="d-flex flex-row">
          {row?.image_url && row?.image_url !== "" ? (
            <div
              className="d-flex my-auto"
              style={{ width: "60px", height: "60px" }}
            >
              <Image
                loader={({ src }) => src}
                src={row.image_url}
                width={40}
                height={40}
                className="custom-image"
                alt="product"
              />
            </div>
          ) : (
            ""
          )}
          <div className="d-flex flex-column my-auto ms-1">
            {row?.name}
            <label style={{ color: "#808080", fontWeight: "16px" }}>
              {row?.desc}
            </label>
          </div>
        </div>
      );
    },
  },
  {
    label: "MRP",
    fieldName: "mrp",
    width: "10%",
    customField: (row: TableRow) => {
      return <div className="text-end pe-2">₹{row.mrp}</div>;
    },
  },
  {
    label: "Quantity",
    fieldName: "qty",
    width: "15%",
    customField: (row: TableRow) => {
      return (
        <div className="text-end pe-2">
          {row.qty !== "-"
            ? `${row.qty} ${row.package_type ? row.package_type + "s" : ""}`
            : "-"}
        </div>
      );
    },
  },
  {
    label: "Available",
    fieldName: "available",
    width: "15%",
    customField: (row: TableRow) => {
      return (
        <div
          className={`ps-2`}
          style={{
            color:
              row.status === "wh" ||
              row.status === "both" ||
              row.status === "vendor"
                ? "#008000"
                : "#BA0000",
          }}
        >
          {row.status === "both" ? (
            <>
              {row.warehouse}
              <br />
              {row.vendor}
            </>
          ) : row.status === "wh" ? (
            row.warehouse
          ) : row.status === "vendor" ? (
            row.vendor
          ) : row.status === "discontinued" ? (
            "This product has been discontinued"
          ) : (
            "Not Available"
          )}
        </div>
      );
    },
  },
  {
    label: "",
    width: "25%",
    fieldName: "tat",
    customLabel: () => {
      return (
        <div className="d-flex flex-row justify-content-center">
          <label className="me-1">TAT</label>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip
                id="button-tooltip"
                className={`${"transprent-tooltip"}`}
              >
                Turn around time
              </Tooltip>
            }
          >
            <Image
              src={"/assets/table/information-svgrepo-com.svg"}
              className="error-icon"
              width={22}
              height={22}
              alt="error"
            />
          </OverlayTrigger>
        </div>
      );
    },
    customField: (row: TableRow) => {
      return <div className={`ps-2`}>{row.tat}</div>;
    },
  },
  {
    label: "",
    fieldName: "cross",
  },
];
const Table = ({ data, handleRemove }: Table) => {
  return (
    <div className="mb-3 pe-1 w-100">
      <table className=" w-100 border custom-table">
        <thead className="border-bottom border-custom">
          {columnsJSON.map((col, index) => {
            return (
              <td
                key={col.fieldName + index}
                className="px-auto justify-content-center mx-auto py-3 text-center"
                style={{ width: col.width ?? "" }}
              >
                {col.customLabel ? col.customLabel() : col.label}
              </td>
            );
          })}
        </thead>
        <tbody>
          {data?.length &&
            data.map((row: TableRow, idx: number) => {
              return (
                <tr key={idx} className="border-bottom border-custom">
                  {columnsJSON.map((col, index) => {
                    return (
                      <td
                        key={col?.fieldName + index}
                        className={`${
                          index !== 0 ? " border-start border-custom" : ""
                        } ${col?.tdClassName ?? ""}`}
                      >
                        {col.fieldName === "cross" ? (
                          <button
                            className="btn border-0 m-0 mb-1"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemove(idx, data);
                            }}
                          >
                            <Image
                              src="/assets/cross.svg"
                              width={16}
                              height={16}
                              alt="Cross"
                            />
                          </button>
                        ) : col?.customField ? (
                          col.customField(row, idx, data)
                        ) : (
                          row?.[col.fieldName]
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
