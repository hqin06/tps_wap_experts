import _ from "lodash"

let data = {};

const getItem = function (key:string) {
    return _.get(data, key);
}

const setItem = function (key:string, content?:any) {
    _.set(data, key, content)
}

const cleanItem = function (key:string) {
    _.set(data, key, undefined)
}

const cleanAll = function () {
    data = {}
}

export default {
    getItem,
    setItem,
    cleanItem,
    cleanAll,
}
