import _ from "lodash"
import request from 'superagent'
import _Tools from "./_Tools";
import _AuthTools from "./_AuthTools";
import _Cache from "./_Cache";
import md5 from 'js-md5'

const getServerApiUrl = function () {
    return _Tools.getServerOption("serverApiUrl");
};

interface RequestParams {
    url: string
    queryParams?: object
    withToken?: boolean
    fullUrl?: boolean
    data?: object
    cache?: boolean         //是否缓存，主要针对query，默认为false
    forceRefresh?:boolean   //强制刷新
}

const promiseQuery = function (params: RequestParams) {
    return new Promise((resolve, reject) => {
        const {url, fullUrl=false, withToken=true, queryParams, cache=false, forceRefresh=false} = params;

        let requestUrl = "";
        if(fullUrl) requestUrl = url;
        else requestUrl = `${getServerApiUrl()}${url}`;

        const cacheName = md5(JSON.stringify(params));
        if (cache&&!forceRefresh&&_Cache.getItem(cacheName)) resolve(_Cache.getItem(cacheName))

        // const withToken = _.isUndefined(params.withToken)?true:params.withToken

        request
            .get(requestUrl)
            .accept('application/json')
            .set('Authorization', withToken?`Bearer ${_AuthTools.getToken()}`:``)
            .query(queryParams||{})
            .end((err, res) => {
                const errMsg = getError(err, res);
                if (errMsg) reject(errMsg)
                else {
                    if (cache) _Cache.setItem(cacheName, res);
                    resolve(res);
                }
            });
    })
}

const promiseQueryAll = async function (params: RequestParams) {
    let hasMore = true;
    let list: object[] = [];
    let page = 0;
    const size = 500;
    const {queryParams, cache=false, forceRefresh=false, ...other} = params;

    const cacheName = md5(JSON.stringify(params));
    if (cache&&!forceRefresh&&_Cache.getItem(cacheName)) return _Cache.getItem(cacheName)

    while (hasMore) {
        const resp = await promiseQuery({
            ...other,
            queryParams: {
                ...queryParams,
                page: page,
                size: size
            }
        });
        const results = _.get(resp, 'body.content');
        list = [...list, ...results];
        hasMore = results.length>=size;
        page++;
    }
    if(cache) _Cache.setItem(cacheName, list)
    return list;
}

const promiseQueryOne = async function (params: RequestParams) {
    const {queryParams, cache=false, forceRefresh=false, ...other} = params;

    const cacheName = md5(JSON.stringify(params));
    if (cache&&!forceRefresh&&_Cache.getItem(cacheName)) return _Cache.getItem(cacheName)

    const resp = await promiseQuery({
        ...other,
        queryParams: {
            ...queryParams,
            size: 1
        }
    });
    const result = _.get(resp, 'body.content[0]')
    if(cache) _Cache.setItem(cacheName, result)
    return result
}

const promisePost = function (params: RequestParams) {
    return new Promise((resolve, reject) => {
        let requestUrl = "";
        if(params.fullUrl) requestUrl = params.url;
        else requestUrl = `${getServerApiUrl()}${params.url}`;

        const withToken = _.isUndefined(params.withToken)?true:params.withToken

        request
            .post(requestUrl)
            .accept('application/json')
            .set('Authorization', withToken?`Bearer ${_AuthTools.getToken()}`:``)
            .query(params.queryParams||{})
            .send(params.data)
            .end((err, res) => {
                const errMsg = getError(err, res);
                if (errMsg) reject(errMsg)
                else resolve(res);
            });
    })
}

const promisePut = function (params: RequestParams) {
    return new Promise((resolve, reject) => {
        let requestUrl = "";
        if(params.fullUrl) requestUrl = params.url;
        else requestUrl = `${getServerApiUrl()}${params.url}`;

        const withToken = _.isUndefined(params.withToken)?true:params.withToken

        request
            .put(requestUrl)
            .accept('application/json')
            .set('Authorization', withToken?`Bearer ${_AuthTools.getToken()}`:``)
            .query(params.queryParams||{})
            .send(params.data)
            .end((err, res) => {
                const errMsg = getError(err, res);
                if (errMsg) reject(errMsg)
                else resolve(res);
            });
    })
}

const promiseDel = function (params: RequestParams) {
    return new Promise((resolve, reject) => {
        let requestUrl = "";
        if(params.fullUrl) requestUrl = params.url;
        else requestUrl = `${getServerApiUrl()}${params.url}`;

        const withToken = _.isUndefined(params.withToken)?true:params.withToken

        request
            .delete(requestUrl)
            .accept('application/json')
            .set('Authorization', withToken?`Bearer ${_AuthTools.getToken()}`:``)
            .query({ ...params.queryParams })
            .end((err, res) => {
                const errMsg = getError(err, res);
                if (errMsg) reject(errMsg)
                else resolve(res);
            });
    })
}

const getError = function (err: any, res: any) {
    if (_.get(res, 'status') < 300) return;

    const errStatus = _.get(err, 'status');
    switch (errStatus) {
        case 404:
            return "没有找到请求的资源" + (_.get(res, 'body.content.message') || _.get(res, 'body.errorMessage') || _.get(res, 'body.message'));
        case 401:
            return "认证错误" + (_.get(res, 'body.content.message') || _.get(res, 'body.errorMessage') || _.get(res, 'body.message'));
        case 409:
            // return "重复数据" + (_.get(res, 'body.content.message') || _.get(res, 'body.errorMessage') || _.get(res, 'body.message'));
            return "重复数据";
        case 503:
            return "服务器没有响应" + (_.get(res, 'body.content.message') || _.get(res, 'body.errorMessage') || _.get(res, 'body.message'));
        default:
            return (_.get(res, 'body.content.message') || _.get(res, 'body.errorMessage') || _.get(res, 'body.message'));
    }
};

export default {
    promiseQuery,
    promiseQueryAll,
    promiseQueryOne,
    promisePost,
    promisePut,
    promiseDel,
}
