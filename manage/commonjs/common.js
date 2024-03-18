class tokenStorage {
    get = async () => {
        const token = await localStorage.getItem('token');
        if (token) {
            return token;
        }
    }
    set = (value) => {
        return localStorage.setItem('token', value);
    }
    remove = () => {
        return localStorage.removeItem('token');
    }
    setStore = () => {
        return localStorage.setItem('storeName', value);
    }
    getStore = () => {
        return localStorage.getItem('storeName');
    }
    getStoreEmail = () => {
        return localStorage.getItem('storeEmail');
    }
    getStoreCode = () => {
        return localStorage.getItem('storeCode');
    }
    getFilters = () => {
        const filters = localStorage.getItem('filters');
        return JSON.parse(filters)
    }
    setFilters = (value) => {
        let oldData = JSON.parse(localStorage.getItem('filters'));
        const newData = { ...oldData, ...value }
        return localStorage.setItem('filters', JSON.stringify(newData));
    }
    removeFilters = () => {
        return localStorage.removeItem('filters');
    }
}
const tokens = new tokenStorage;
export { tokens };