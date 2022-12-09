import _ from "lodash"
import base64url from 'base64url'
import moment from 'moment'
import { history } from 'umi'
const isDevelopment = function () {
    return _.isEqual(process.env.NODE_ENV, "development");
}

const isProduction = function () {
    return _.isEqual(process.env.NODE_ENV, "production");
}

const getServerOption = function (key?: string) {
    if (key) return _.get(window, `serverOptions.${key}`);
    else return _.get(window, `serverOptions`);
}

const isHttps = function () {
    return _.startsWith(window.location.href, "https")
}

const encodeBase64 = function (data?: object) {
    if (!data) return base64url.encode(JSON.stringify([]));
    return base64url.encode(JSON.stringify(data))
}

const decodeBase64 = function (base64String?: string) {
    if (!base64String) return null;
    return JSON.parse(base64url.decode(base64String));
}

const toPrivateBase64 = function (dataString?: string) {
    if (!dataString) return undefined;
    dataString = `${dataString.substring(0, 1)}${_.random(0, 9)}${dataString.substring(1, dataString.length)}`;
    return dataString;
}

const buildTreeByCode = function (nodes: any, codeKey: string = "code", split: string = "-", childKey: string = "children") {
    nodes = nodes || [];
    if (_.isEmpty(nodes)) return [];

    nodes = _.sortBy(nodes, codeKey);

    const newNodes: object[] = []
    _.map(nodes, (node) => {
        if (_.isEmpty(node)) return;
        let children = _.filter(nodes, (tempData) => {
            let nodeStr = node[codeKey] + split;
            return _.startsWith(tempData[codeKey], nodeStr)
        });

        if (!_.isEmpty(children)) {
            let hasCodes = _.map(children, codeKey);
            _.remove(nodes, (tempData: any) => {
                return _.includes(hasCodes, tempData[codeKey]);
            });
            newNodes.push({
                [childKey]: buildTreeByCode(children, codeKey, split, childKey),
                ...node,
            })
        } else {
            newNodes.push(node);
        }
    });
    return newNodes;
}

const createTree = function (a: object[], idStr: string = "id", pidStr: string = "father_id", childrenKey: string = "children") {
    if (_.isEmpty(a)) return [];
    let r = [], hash = {}, id = idStr, pid = pidStr, children = childrenKey, i = 0, j = 0, len = a.length;
    for (; i < len; i++) {
        // @ts-ignore
        hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
        // @ts-ignore
        let aVal = a[j], hashVP = hash[aVal[pid]];
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
}

const getDateString = function (date?: any, formatter = "YYYY-MM-DD") {
    if (!date) return null;
    return moment(date).format(formatter);
}

const getTimeString = function (date?: any, formatter = "YYYY-MM-DD HH:mm:ss") {
    return getDateString(date, formatter);
}

const getNowDateString = function () {
    return moment().utc().format("YYYY-MM-DD");
}

const getNowTimeString = function () {
    return moment().utc().format("YYYY-MM-DD HH:mm:ss");
}

const getMapValue = function (mapData: object, columnKey?: string, key = "label") {
    if (!columnKey) return;
    return _.get(_.get(mapData, columnKey), key);
}

// @ts-ignore
const transNumberToChinese = function (num) {
    if (!/^\d*(\.\d*)?$/.test(num)) return "";

    let AA = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    let BB = ["", "拾", "佰", "仟", "万", "亿", "点", ""];
    let a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (let i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        // @ts-ignore
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        // @ts-ignore
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }
    if (a.length > 1) {
        re += BB[6];
        // @ts-ignore
        for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    return re;


}

const getLocationParams = function (key?: any) {
    if (history.location.search) {
        let url = history.location.search.split('?')[1]
        let urlArray = url.split('&')
        let params: any = {}
        _.map(urlArray, (item) => {
            let paramsKey = item.split('=')[0]
            let paramsValue = item.split('=')[1]
            params[paramsKey] = paramsValue
        })
        return _.get(params, `${key}`)
    } else {
        return null
    }
}


export default {
    isDevelopment,
    isProduction,
    isHttps,

    getServerOption,

    encodeBase64,
    decodeBase64,
    toPrivateBase64,

    buildTreeByCode,
    createTree,

    getDateString,
    getTimeString,
    getNowDateString,
    getNowTimeString,
    transNumberToChinese,

    getMapValue,
    getLocationParams,
}
