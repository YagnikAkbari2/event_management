export const searchDebounce = (func) => {
    console.log("asasasas",func);
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)

        debounceTimer = setTimeout(() => func.apply(context, args), 500)
    }
}