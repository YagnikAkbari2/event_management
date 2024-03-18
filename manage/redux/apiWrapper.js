import { store } from "./store";
import { SET_ERR_MSG, getToaster } from "./actions/toasterAction";
import api from "./api";
import { loadingAction } from "./actions/loaderAction";
import { errObjtoArray } from "../commonjs/commonHelpers";
import { SET_ADDRESS_ERROR } from "./actions/homeDeliveryAction";
const BASE_URL_ECOM =
  process.env.NEXT_PUBLIC_BASE_URL_ECOM || "https://ecom.mkart.dev/api/v1";
export const get = async (url, baseURL) => {
  try {
    var res = "";

    var res = await api(baseURL).get(url);

    if (res.status === 200) {
      if (res.data?.code === 200) {
        return res;
      }
    } else {
      await store.dispatch(
        getToaster({ type: "error", message: res.data.message })
      );
      await store.dispatch(loadingAction({ isLoading: false }));
      return false;
    }
  } catch (err) {
    console.log("zxcxvb", err);
    if (err?.response) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        localStorage.clear();
        window.location.replace("/login");
      }
      if (err?.response?.data?.errors?.pincode) {
        await store.dispatch({
          type: SET_ADDRESS_ERROR,
          payload: err?.response,
        });
      }

      await store.dispatch(
        getToaster({
          type: "error",
          message: err?.response?.data?.errors
            ? err?.response?.data?.errors
            : err?.response?.data?.message,
        })
      );
    }
    await store.dispatch(loadingAction({ isLoading: false }));

    return false;
  }
};

export const put = async (url, payload, baseURL) => {
  try {
    const res = await api(baseURL).put(url, payload);
    if (res.status === 200) {
      if (res.data?.code === 200) {
        return res;
      }
    } else {
      await store.dispatch(
        getToaster({ type: "error", message: res.data.message })
      );
      await store.dispatch(loadingAction({ isLoading: false }));
    }
  } catch (err) {
    if (err?.response?.status === 422 || err?.response?.status === 400) {
      let errMsg = await errObjtoArray(err?.response?.data?.errors);
      await store.dispatch({
        type: SET_ERR_MSG,
        payload: errMsg,
      });
      await store.dispatch(
        getToaster({
          type: "error",
          message:
            err?.response?.data?.errors ??
            err?.response?.data?.message ??
            err?.response?.data,
        })
      );
    }
    if (err?.response) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        localStorage.clear();
        if (url?.includes("/inventory/store-audit")) {
          await store.dispatch(
            getToaster({
              type: "error",
              message:
                "Your email ID has been used by someone else, that's why you are getting logout",
              redirectToLogin: true,
            })
          );
        } else {
          await store.dispatch(
            getToaster({
              type: "error",
              message: err.response.data?.message ?? err?.response?.data,
            })
          );
          window.location.replace("/login");
        }
      }
    }

    await store.dispatch(loadingAction({ isLoading: false }));
  }
};

export const post = async (url, payload, baseURL, returnResponse) => {
  try {
    const res = await api(baseURL).post(url, payload);

    if (res.status === 200 || res.status === 201) {
      if (res.data?.code === 200 || res.data?.code === 201) {
        return res;
      }
    } else {
      await store.dispatch(
        getToaster({ type: "error", message: res.data.message })
      );
      await store.dispatch(loadingAction({ isLoading: false }));
      if (returnResponse) {
        return res;
      }
    }
  } catch (err) {
    if (err?.response?.status === 422 || err?.response?.status === 400) {
      let errMsg = await errObjtoArray(
        err?.response?.data?.errors ?? err?.response?.data?.message
      );

      await store.dispatch({
        type: SET_ERR_MSG,
        payload: errMsg,
      });
    }
    // if (err?.response?.data?.code === 400) {
    //   // let errMsg = await errObjtoArray(err?.response?.data);
    //   await store.dispatch(
    //     getToaster({ type: "error", message:err?.response?.data?.message })
    //   );
    // }
    if (err?.response) {
      if (err?.response?.status === 401 && url !== "/login") {
        localStorage.clear();
        window.location.replace("/login");
      } else if (err?.response?.data?.code === 400) {
        // let errMsg = await errObjtoArray(err?.response?.data);
        if (err?.response?.data?.errors) {
          await store.dispatch(
            getToaster({ type: "error", message: err?.response?.data?.errors })
          );
        } else {
          await store.dispatch(
            getToaster({ type: "error", message: err?.response?.data?.message })
          );
        }
      } else {
        await store.dispatch(
          getToaster({ type: "error", message: err.response.data.message })
        );
      }
    }

    await store.dispatch(loadingAction({ isLoading: false }));
    if (returnResponse) {
      return err?.response;
    }
  }
};

export const remove = async (url, baseURL) => {
  try {
    const res = await api(baseURL).delete(url);
    if (res.status === 200) {
      if (res.data?.code === 200) {
        return res;
      }
    } else {
      store.dispatch(getToaster({ type: "error", message: res.data.message }));
      await store.dispatch(loadingAction({ isLoading: false }));
    }
  } catch (err) {
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
      store.dispatch(getToaster({ type: "error", message: err.response.data }));
    }

    await store.dispatch(loadingAction({ isLoading: false }));
  }
};

export const patch = async (url, payload, baseURL) => {
  try {
    const res = await api(baseURL).patch(url, payload);
    if (res.status === 200) {
      if (res.data?.code === 200) {
        return res;
      }
    } else {
      await store.dispatch(
        getToaster({ type: "error", message: res.data.message })
      );
      await store.dispatch(loadingAction({ isLoading: false }));
    }
  } catch (err) {
    if (err?.response) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        localStorage.clear();
        window.location.replace("/login");
      }
      await store.dispatch(
        getToaster({ type: "error", message: err.response.data })
      );
    }

    await store.dispatch(loadingAction({ isLoading: false }));
  }
};

// oms
export const ecomGet = (url) => {
  return get(url, BASE_URL_ECOM);
};

export const ecomPost = (url, payload, returnResponse) => {
  return post(url, payload, BASE_URL_ECOM, returnResponse);
};
export const ecomPut = (url, payload) => {
  return put(url, payload, BASE_URL_ECOM);
};
export const ecomRemove = (url) => {
  return remove(url, BASE_URL_ECOM);
};
