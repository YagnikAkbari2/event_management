export const searchDebounce2 = (func, timeout = 1000) => {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this); }, timeout);
}
