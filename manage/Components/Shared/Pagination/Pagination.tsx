import { useEffect, useState } from "react";

function PaginationComponents({
  data,
  moveTo,
}: {
  data: IPaginationData;
  moveTo: (page: number) => void;
}) {
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  useEffect(() => {
    if (data) {
      var arr: number[] = [];
      for (let index = 1; index <= data?.last_page; index++) {
        arr.push(index);
      }
      setPagesArray(arr);
    }
  }, [data]);
  return (
    <>
      {data && Object.keys(data)?.length ? (
        <div className="d-flex justify-content-between pagination-main p-2">
          <div className="col-12 col-md-3 text-wrap pagination-info">
            {data?.total === 0 ? (
              ""
            ) : (
              <div className="px-4 pt-4 text-muted">
                Showing {data?.current_page_record ?? ""} of {data?.total}
              </div>
            )}
          </div>
          <ul className="col-12 col-md-6 pagination mb-0 justify-content-end mt-3 mb-3 pe-3">
            {data?.current_page <= 1 || data?.last_page <= 6 ? (
              <li
                className={`next-btn-custom cursor-pointer me-2 ${
                  data?.current_page <= 1 && "cursor-default disabled me-2"
                }`}
              >
                <a
                  className="page-link"
                  aria-disabled={data?.current_page <= 1}
                  onClick={(e) => {
                    e.preventDefault();
                    moveTo(data?.current_page - 1);
                  }}
                  id="page-previous"
                >
                  Previous
                </a>
              </li>
            ) : (
              <li
                className={`prev-btn page-item cursor-pointer me-2 ${
                  data?.current_page <= 1 && "cursor-default disabled me-2"
                }`}
              >
                <a
                  className="page-link"
                  aria-disabled={data?.current_page <= 1}
                  onClick={(e) => {
                    e.preventDefault();
                    moveTo(data?.current_page - 1);
                  }}
                  id="page-previous"
                >
                  Previous
                </a>
              </li>
            )}
            {pagesArray.map((d, index) => {
              if (data?.last_page < 10) {
                return (
                  <li
                    key={"middle" + index}
                    className={`page-item me-2 ${
                      data?.current_page == index + 1 && "active"
                    }`}
                  >
                    {data?.total === 0 ? (
                      ""
                    ) : (
                      <button
                        id={"page-" + index + 1}
                        className="page-link"
                        disabled={data?.current_page == index + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          moveTo(index + 1);
                        }}
                      >
                        {index + 1}
                      </button>
                    )}
                  </li>
                );
              } else if (index === 0) {
                return (
                  <li
                    key={"middle" + index}
                    className={`page-item me-2 ${
                      data?.current_page == index + 1 && "active"
                    }`}
                  >
                    <button
                      id={"page-" + index + 1}
                      className="page-link"
                      disabled={data?.current_page == index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        moveTo(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              } else if (data?.current_page < 5 && index < 5) {
                return (
                  <li
                    key={"middle" + index}
                    className={`page-item me-2 ${
                      data?.current_page == index + 1 && "active"
                    }`}
                  >
                    <button
                      id={"page-" + index + 1}
                      className="page-link"
                      disabled={data?.current_page == index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        moveTo(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              } else if (data?.current_page > 3 && index < 2) {
                return (
                  <button
                    id={"page-" + index + 1}
                    key={"middle" + index}
                    className={`page-link page-item me-2 p-0 pt-3 border-0`}
                    disabled={true}
                  >
                    ...
                  </button>
                );
              } else if (
                (index < data?.current_page &&
                  data?.current_page - 4 < index) ||
                (index < data?.current_page + 2 &&
                  data?.current_page - 4 < index)
              ) {
                return (
                  <li
                    key={"first" + index}
                    className={`page-item me-2 ${
                      data?.current_page == index + 1 && "active"
                    }`}
                  >
                    <button
                      id={"page-" + index + 1}
                      className="page-link"
                      disabled={data.current_page == index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        moveTo(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              } else if (
                index + 1 > data?.last_page - 2 &&
                index + 1 !== data?.last_page
              ) {
                return (
                  <button
                    id={"page-" + index + 1}
                    key={"middle" + index}
                    className={`page-link page-item me-2 p-0 pt-3 border-0`}
                    disabled={true}
                  >
                    ...
                  </button>
                );
              } else if (data?.last_page > 8 && data?.last_page === index + 1) {
                return (
                  <li
                    key={"last" + index}
                    className={`page-item me-2 ${
                      data?.current_page == index + 1 && "active"
                    }`}
                  >
                    <button
                      id={"page-" + index + 1}
                      className="page-link"
                      disabled={data.current_page == index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        moveTo(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                  </li>
                );
              }
            })}
            {data?.current_page >= data?.last_page || data?.last_page <= 6 ? (
              <li
                className={`next-btn-custom cursor-pointer ${
                  data?.current_page >= data?.last_page &&
                  "cursor-default disabled ms-2"
                }`}
                style={{ display: "none" }}
              >
                <a
                  className="page-link"
                  aria-disabled={data?.current_page >= data?.last_page}
                  onClick={(e) => {
                    e.preventDefault();
                    moveTo(data?.current_page + 1);
                  }}
                  id="page-next"
                >
                  Next
                </a>
              </li>
            ) : (
              <li
                className={`next-btn page-item cursor-pointer ${
                  data?.current_page >= data?.last_page &&
                  "cursor-default disabled ms-2"
                }`}
              >
                <a
                  className="page-link"
                  aria-disabled={data?.current_page >= data?.last_page}
                  onClick={(e) => {
                    e.preventDefault();
                    moveTo(data?.current_page + 1);
                  }}
                  id="page-next"
                >
                  Next
                </a>
              </li>
            )}
          </ul>
          <div
            className="col-12 px-4 text-muted custom-page-record-info"
            style={{ display: "none" }}
          >
            Page {data?.current_page ?? ""} of {data?.last_page}
          </div>
        </div>
      ) : null}
    </>
  );
}
export default PaginationComponents;
