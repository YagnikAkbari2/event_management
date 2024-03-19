import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToaster } from "../../redux/actions/toasterAction";
import CommonToasterErrorModal from "../Shared/CommonModal/ToasterModal";
const Toaster = () => {
  const dispatch = useDispatch();
  const toasterData = useSelector(
    (state) => (state as any)?.toasterReducer.toasterData
  );
  useEffect(() => {
    if (toasterData?.type) {
      setTimeout(() => {
        dispatch(getToaster({ type: "", message: "", redirectToLogin: null }));
        if (toasterData?.redirectToLogin) {
          window.location.replace("/login");
        }
      }, 5000);
    }
  }, [dispatch, toasterData]);

  return (
    <>
      {toasterData && toasterData?.type && !toasterData?.redirectToLogin ? (
        <div
          id="hide-toaster"
          className={`alert alert-success alert-dismissible fade show toaster-show ${toasterData?.type}`}
          role="alert"
        >
          {toasterData ? (
            typeof toasterData.message?.errors === "object" ? (
              <ul className="mb-0">
                {Object.keys(
                  toasterData.message?.errors ?? toasterData.message
                ).map((key, ind) => {
                  return (
                    <li key={ind}>
                      {toasterData.message.errors[key]?.length
                        ? toasterData.message.errors[key][0]
                        : ""}
                    </li>
                  );
                })}
              </ul>
            ) : typeof toasterData.message === "object" ? (
              <ul className="mb-0">
                {Object.keys(
                  toasterData.message?.errors ?? toasterData.message
                ).map((key, ind) => {
                  return (
                    <li key={ind}>
                      {toasterData.message[key]?.length
                        ? toasterData.message[key]
                        : ""}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <>
                {typeof toasterData.message === "string"
                  ? toasterData.message
                  : toasterData.message?.message}
              </>
            )
          ) : null}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="btn-close"
            onClick={() => {
              dispatch(
                getToaster({ type: "", message: "", redirectToLogin: null })
              );
              if (toasterData?.redirectToLogin) {
                window.location.replace("/login");
              }
            }}
          ></button>
        </div>
      ) : (
        <CommonToasterErrorModal
          show={
            toasterData && toasterData?.type && toasterData?.redirectToLogin
              ? true
              : false
          }
        />
      )}
    </>
  );
};
export default Toaster;
