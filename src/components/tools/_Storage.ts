import _Tools from "./_Tools";

const localNameSpace = _Tools.getServerOption("localNameSpace");

const getItem = function (key: string) {
    return localStorage.getItem(`${localNameSpace}_${key}`);
}

const setItem = function (key: string, data: string) {
    return localStorage.setItem(`${localNameSpace}_${key}`, data);
}

const removeItem = function (key: string) {
    return localStorage.removeItem(`${localNameSpace}_${key}`);
}

const clear = function () {
    return localStorage.clear();
}

export default {
    getItem,
    setItem,
    removeItem,
    clear,
};
