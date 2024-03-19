import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import usePermission from "../../../hooks/usePermission";
import { useSelector } from "react-redux";
import { reportExampleJson } from "../../../commonJSON/reportExampleJson";
function ReportCard(props) {
  const permission = usePermission();
  const [reports, setReports] = useState([]);
  const [data1, setData1] = useState([]);
  const { userDetails } = useSelector((state) => state.user);

  const handleShowAllPicknotes = (idx, isShow) => {
    let data = [];
    data[idx] = { showMore: isShow };
    setData1([...data]);
  };
  useEffect(() => {
    handleShowAllPicknotes(props?.indexWrapper, true);
  }, []);
  useEffect(() => {
    if (userDetails && userDetails?.permissions[0]?.permissions) {
      let reportJson = reportExampleJson[0];
      let allowedModules = [];
      reportJson?.childs?.map((ele) => {
        console.log("xzcbxcvb", reportJson?.module_name, ele?.module_name);
        let sub_mod = [];
        let isAllowed = false;
        if (ele?.child && ele?.child?.length) {
          ele?.child?.map((sub_menu) => {
            isAllowed = permission(
              reportJson?.module_name,
              sub_menu?.module_name,
              null
            );
            if (isAllowed) {
              sub_mod.push(sub_menu);
            }
          });
          if (sub_mod?.length > 0) {
            allowedModules.push(ele);
          }
        } else {
          console.log("zxcvxcb", reportJson?.module_name, ele?.module_name);
          isAllowed = permission(
            reportJson?.module_name,
            ele?.module_name,
            null
          );
          console.log("xzcbxcvb", isAllowed);
          if (isAllowed) {
            allowedModules.push(ele);
          }
        }
      });
      setReports(allowedModules);
    }
  }, [userDetails]);
  return (
    <div className="flex-column col-3 h-auto mb-4">
      <div className="card list-group h-100">
        <div className="d-flex align-items-center list-group-item border-0 border-bottom">
          <Image src="/assets/reportHeaderImg.svg" width={21} height={21} />

          <div className="ms-2 text-primary fw-normal" style={{ fontSize: 14 }}>
            <span>{props?.items?.Header}</span>
          </div>
        </div>

        {reports?.map((item, index) => {
          if (data1[props?.indexWrapper]?.showMore) {
            return (
              <span key={index}>
                {index === reports.length - 1 ? (
                  <div className="d-flex list-group-item border-0 border-bottom py-2 justify-content-between">
                    <div>
                      <Image
                        src="/assets/report_icon.svg"
                        width={24}
                        height={24}
                        alt="File Icon"
                      />
                      <Link
                        href={"/reports" + item?.path}
                        className="d-flex-column ms-2"
                      >
                        {item?.label}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex list-group-item border-0 border-bottom py-2 justify-content-between">
                    <div>
                      <Image
                        src="/assets/report_icon.svg"
                        width={24}
                        height={24}
                        alt="File Icon"
                      />
                      <Link
                        href={"/reports" + item?.path}
                        className="d-flex-column ms-2"
                      >
                        {item?.label}
                      </Link>
                    </div>
                    {item?.isDownloadMaster && (
                      <button
                        className="btn border-0 p-0 m-0"
                        onClick={() => {
                          props?.handleDownload(item);
                        }}
                      >
                        <Image
                          height={24}
                          width={24}
                          src={"/assets/report_download_icon.svg"}
                          alt="report_download_icon"
                        />
                      </button>
                    )}
                  </div>
                )}
              </span>
            );
          } else {
            if (index < 5) {
              return (
                <span key={index}>
                  <div className="d-flex list-group-item justify-content-between border-0 border-bottom py-2">
                    <div>
                      <Image
                        src="/assets/report_icon.svg"
                        width={24}
                        height={24}
                        alt="File Icon"
                      />
                      <Link
                        href={"/reports" + item?.path}
                        className="d-flex-column ms-2"
                      >
                        {item?.label}
                      </Link>
                    </div>
                    {item?.isDownloadMaster && (
                      <button
                        className="btn border-0 p-0 m-0"
                        onClick={() => {
                          props?.handleDownload(item);
                        }}
                      >
                        <Image
                          height={24}
                          width={24}
                          src={"/assets/report_download_icon.svg"}
                          alt="report_download_icon"
                        />
                      </button>
                    )}
                  </div>
                </span>
              );
            }
          }
        })}
      </div>
    </div>
  );
}

export default ReportCard;
