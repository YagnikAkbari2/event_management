import api from "./api";

export const get = async (url, baseURL) => {
  try {
    const res = await api(baseURL).get(url);

    if (res.status === 200) {
      if (res.data?.code === 200) {
        return res;
      }
    } else {
      return false;
    }
  } catch (err) {
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }
    throw err;
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
      return false;
    }
  } catch (err) {
    if (err?.response?.status === 422 || err?.response?.status === 400) {
      console.error(err.message);
    }
    if (err?.response) {
      if (err?.response?.status === 401) {
        console.error(err.message);
      }
    }
    throw err;
  }
};

export const post = async (url, payload, baseURL) => {
  try {
    const res = await api(baseURL).post(url, payload);
    if (res.status === 200 || res.status === 201) {
      if (res.data?.code === 200 || res.data?.code === 201) {
        return res;
      }
    } else {
      return false;
    }
  } catch (err) {
    if (err?.response?.status === 422 || err?.response?.status === 400) {
      console.error(err.message);
    }
    if (err?.response) {
      if (err?.response?.status === 401 && url !== "/login") {
      } else {
        console.error(err.message);
      }
    }
    throw err;
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
      return false;
    }
  } catch (err) {
    if (err?.response) {
      if (err?.response?.status === 401) {
        console.error(err.message);
      }
      throw err;
    }
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
      return false;
    }
  } catch (err) {
    if (err?.response) {
      if (err?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/login");
      }
      console.error(err.message);
    }
    throw err;
  }
};
