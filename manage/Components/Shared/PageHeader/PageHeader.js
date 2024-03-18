import Link from "next/link";
import React from "react";
import BreadCrumbs from "../BreadCrumbs/breadCrumbs";
const PageHeader = ({
  isAdd,
  onButtonClick,
  path,
  importPath,
  customButton,
  breadCrumsPath,
  customAddLabel,
  customButtonParentClass,
}) => {
  return (
    <div
      className={`row page-header-common d-flex justify-content-between ${
        !isAdd ? "py-1" : "py-0"
      }`}
    >
      <BreadCrumbs breadCrumsPath={breadCrumsPath} />
      {isAdd ? (
        onButtonClick ? (
          <div className="col-5 d-flex justify-content-end  header-add-button">
            {importPath && (
              <Link href={`${importPath}`}>
                <button className="btn import-btn px-4">Import</button>
              </Link>
            )}

            <Link href={``}>
              <button
                className="btn btn-primary border-primary ps-4 pe-4 ms-3 header-add-button"
                onClick={(e) => {
                  e.preventDefault();
                  onButtonClick();
                }}
              >
                + Add
              </button>
            </Link>
          </div>
        ) : (
          <div className="col-5 d-flex justify-content-end">
            {importPath && (
              <Link href={`${importPath}`}>
                <button className="btn import-btn px-4">Import</button>
              </Link>
            )}
            <Link href={`${path}`}>
              <button className="btn btn-primary border-primary ps-3 pe-4 ms-3 header-add-button">
                {customAddLabel ?? "+ Add"}
              </button>
            </Link>
          </div>
        )
      ) : (
        ""
      )}
      {customButton && (
        <div
          className={`${
            customButtonParentClass ?? "col-5 d-flex justify-content-end"
          }`}
        >
          {customButton()}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
