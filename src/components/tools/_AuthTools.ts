import _ from "lodash"
import jws from "jws"
import _Key from "../const/_Key";
import _Storage from "./_Storage";
import _Cookie from "./_Cookie";

const getToken = function () {
    return _Cookie.getItem(_Key.accessToken)||"";
    // return _Storage.getItem(_Key.accessToken)||"";
};

const getTokenInfo = function (token?: string) {
    let tokenData = jws.decode(token || getToken());
    let payload = _.get(tokenData, 'payload');
    if (!payload) return null;
    if (_.isObject(payload)) return payload;
    return JSON.parse(payload);
};

const getUserId = function () {
    return _.get(getTokenInfo(), 'user_id')
}

export default {
    getToken,
    getTokenInfo,
    getUserId,
}
