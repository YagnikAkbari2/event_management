class tokenStorage {
  get = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      return token;
    }
  };
  set = (value) => {
    return localStorage.setItem("token", value);
  };
  remove = () => {
    return localStorage.removeItem("token");
  };
  getFilters = () => {
    const filters = localStorage.getItem("filters");
    return JSON.parse(filters);
  };
  setFilters = (value) => {
    let oldData = JSON.parse(localStorage.getItem("filters"));
    const newData = { ...oldData, ...value };
    return localStorage.setItem("filters", JSON.stringify(newData));
  };
  removeFilters = () => {
    return localStorage.removeItem("filters");
  };
}
const tokens = new tokenStorage();
export { tokens };
