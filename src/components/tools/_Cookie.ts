import Cookies from 'js-cookie'
import _Tools from "./_Tools";

const domain = _Tools.isProduction()?document.domain.split('.').slice(-2).join('.'):document.domain;
const nameSpace = _Tools.getServerOption("localNameSpace");

const getItem = function (key: string) {
    return Cookies.get(`${nameSpace}${key}`);
}

const setItem = function (key: string, data:any, options?:object) {
    return Cookies.set(`${nameSpace}${key}`, data, {
        domain: domain,
        expires: 1,
        ...options
    });
}

const removeItem = function (key: string) {
    return Cookies.remove(`${nameSpace}${key}`);
}

export default {
    getItem,
    setItem,
    removeItem,
};
