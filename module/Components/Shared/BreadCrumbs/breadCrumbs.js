import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
const capitalWords = { b2c: true, grn: true, b2b: true, mrp: true, ptr: true };
const BreadCrumbs = ({ breadCrumsPath }) => {
  const router = useRouter();

  const [pathArr, setPathArr] = useState([
    {
      title: "",
      path: "/",
    },
  ]);
  useEffect(() => {
    let path = router.asPath;
    let strArr = path.split("/");

    let copyArr = [];
    let prev = "";
    let queryVal = "";
    if (strArr) {
      if (router.query.id || router.query.idx || router.query.index) {
        strArr.map((s, i) => {
          if (i == 1) prev = prev + s;
          else prev = prev + "/" + s;
          let title = s;
          if (s.includes("-")) {
            let spl = s.split("-");
            spl.forEach((sp, ind) => {
              spl[ind] =
                spl[ind] === "and"
                  ? "&"
                  : capitalWords[sp]
                  ? sp?.toUpperCase()
                  : sp.charAt(0).toUpperCase() + sp.slice(1);
            });
            title = spl.join(" ");
          } else {
            title = capitalWords[s]
              ? s?.toUpperCase()
              : s.charAt(0).toUpperCase() + s.slice(1);
          }
          if (i != strArr.length - 2) {
            if (i == strArr.length - 1) {
              copyArr.push({
                title: queryVal,
                path: `${prev}`,
              });
            } else {
              copyArr.push({
                title: title,
                path: `${prev}`,
              });
            }
          } else {
            queryVal = title;
          }
        });
      } else {
        strArr.map((s, i) => {
          if (i == 1) prev = prev + s;
          else prev = prev + "/" + s;
          let title = s;
          if (s.includes("-")) {
            let spl = s.split("-");
            spl.forEach((sp, ind) => {
              spl[ind] =
                spl[ind] === "and"
                  ? "&"
                  : capitalWords[sp]
                  ? sp?.toUpperCase()
                  : sp.charAt(0).toUpperCase() + sp.slice(1);
            });
            title = spl.join(" ");
          } else {
            title = capitalWords[s]
              ? s?.toUpperCase()
              : s.charAt(0).toUpperCase() + s.slice(1);
          }
          copyArr.push({
            title: title,
            path: `${prev}`,
            // basekey:basekey
          });
        });
      }
    }
    copyArr = breadCrumsPath ? breadCrumsPath : copyArr;
    setPathArr(copyArr);
  }, [router, breadCrumsPath]);
  return (
    <div className="breadcums col-9 col-lg-5 d-flex align-items-center">
      <div className="d-flex flex-row align-items-center">
        {pathArr?.map((data, ind) => {
          return (
            <div key={ind}>
              {ind == 0 ? (
                <>
                  <Link href={`${data.path}`} key={ind} className="home-link">
                    <Image
                      width={22}
                      height={22}
                      src="/assets/home_breadcrumb.svg"
                      alt="home-icon"
                      className="breadcrumb-2"
                    />
                  </Link>
                  <Image
                    width={8}
                    height={10}
                    src="/assets/breadcrumb_arrow.svg"
                    alt="arrow-icon"
                    className="breadcrumb-1"
                  />
                </>
              ) : ind < pathArr.length - 1 ? (
                <>
                  <Link
                    href={`${data.path}`}
                    className="breadcums-title"
                    key={ind}
                  >
                    <span className="text-primary">{data.title}</span>
                  </Link>
                  <Image
                    width={8}
                    height={10}
                    src="/assets/breadcrumb_arrow.svg"
                    alt="arrow-icon"
                    className="breadcrumb-1"
                  />
                </>
              ) : (
                <Link
                  href={`${data.path}`}
                  className="breadcums-title active"
                  key={ind}
                >
                  <span className="text-primary">{data.title}</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BreadCrumbs;
