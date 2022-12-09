import _ from "lodash";
import moment from "moment";

import { useModel, createStore } from 'react-model'
import _RestTools from "../tools/_RestTools";
import _Key from "../const/_Key";
import jws from 'jws'
import { CorpSubSystemVO } from "./SubSystemVO";
import _Cookie from "../tools/_Cookie";

const useSession = function () {
    const [session, setSession] = useModel({});
    const [loading, setLoading] = useModel(true);
    const [allSubSystemList, setAllSubSystemList] = useModel<CorpSubSystemVO[]>([]);
    const [allBusinessSubSystemList, setAllBusinessSubSystemList] = useModel<CorpSubSystemVO[]>([]);
    const [corpSubSystemList, setCorpSubSystemList] = useModel<CorpSubSystemVO[]>([]);
    const [corpBusinessSystemList, setCorpBusinessSystemList] = useModel<CorpSubSystemVO[]>([]);
    const [corpUserSystemList, setCorpUserSystemList] = useModel<CorpSubSystemVO[]>([]);

    const register = async function (formData: {
        real_name: string,
        mobile: string,
        password: string,
        sms_code: string
    }) {
        const resp = await _RestTools.promisePost({
            url: `/auth/register`,
            data: formData,
        });
        await loginByPassword({
            username: formData.mobile,
            password: formData.password
        })
        return _.get(resp, 'body.content')
    }

    const loginByPassword = async function (formData: { username: string, password: string, verifyCode?: string, captchaId?: string }) {
        const resp = await _RestTools.promisePost({
            url: '/auth/login',
            data: {
                username: formData.username,
                password: formData.password
            },
            withToken: false
        });

        _Cookie.setItem(_Key.accessToken, 'eyJraWQiOiJkZXYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdXRoX3R5cGUiOiJzZXNzaW9uIiwidXNlcl90eXBlIjoiTSIsInVzZXJfaWQiOiJlZmY5ODMxMi0xNzM5LTQ3OGEtYjdlYi1lYTUxNTQ4YjRjYTQiLCJzZXNzaW9uX2lkIjoiZDk4M2RhOWQtMjllNy00Y2M4LTk4YjAtZjViNDg3YTAxZTU3IiwiZXhwIjoxNjcwNTQ4MjUzLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjcwNDYxODUzfQ.QTtblXUNYTBGaAVkb7JjTJQO4UemZNatYd_LC00FR_kY8N5QbqOOSDQXga9X_pd-ypxoJDMUf2sE0L3rR9wRTfrGNTwno7LBYdZGHWSUFua8I-DKphzeqFwClFU4KLmx3rHcQd5G6SkOpNxcss1JPj3KHpkU1nJxkqT-drA8V5KFjlBRBP6hjBvnbJMfNBmz769dMWgCWcGRi7XkvwFdvyFiUp8aZtLz-D9095fAxTyXDVrPJmGZlWsY-j3q3JqfRZqFKDZM89oJGzXyjZIF6TukJV8cL3rdJfdaSrx49jhRo2JdUQxW0LrZdylDxYAaMWJ0CeG0rbmeOWAgF3leh2Q87OmW7sTObQ2LrO2ttrRo8ytld70aF_OiizHtdvIVO4EdSYmRX68P2PQ23YZZ91q7sh1Z46mxoo1kJli3oQ9ccScbEEaTZoGCH1zs4Ni5SYoUuzlQWl9gk0d3IHgTA4DprkmcWcUbqXviFUr3dS-svSdhuzKErMsAUSYOn1enVGqu3LWoCFVEBsZfFI0Q_PqPe-uRWnLE8DmBQvpX1fMjlcJqanu7KgQdYcB7sux38en2t8glyHvgevaGyYOh2FtHOxyumJAZzHi0Bz6Srz2VZXDS1kFD0IiLgztx7OCcL-vUHlwbLbpSLgxJRlmEWbctoQH6-l8gqEqy9DIJNoY');
        _Cookie.setItem(_Key.refreshToken, 'eyJraWQiOiJkZXYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdXRoX3R5cGUiOiJzZXNzaW9uIiwidXNlcl90eXBlIjoiTSIsInVzZXJfaWQiOiJlZmY5ODMxMi0xNzM5LTQ3OGEtYjdlYi1lYTUxNTQ4YjRjYTQiLCJzZXNzaW9uX2lkIjoiZDk4M2RhOWQtMjllNy00Y2M4LTk4YjAtZjViNDg3YTAxZTU3IiwiZXhwIjoxNjcwNTQ4MjUzLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjcwNDYxODUzfQ.QTtblXUNYTBGaAVkb7JjTJQO4UemZNatYd_LC00FR_kY8N5QbqOOSDQXga9X_pd-ypxoJDMUf2sE0L3rR9wRTfrGNTwno7LBYdZGHWSUFua8I-DKphzeqFwClFU4KLmx3rHcQd5G6SkOpNxcss1JPj3KHpkU1nJxkqT-drA8V5KFjlBRBP6hjBvnbJMfNBmz769dMWgCWcGRi7XkvwFdvyFiUp8aZtLz-D9095fAxTyXDVrPJmGZlWsY-j3q3JqfRZqFKDZM89oJGzXyjZIF6TukJV8cL3rdJfdaSrx49jhRo2JdUQxW0LrZdylDxYAaMWJ0CeG0rbmeOWAgF3leh2Q87OmW7sTObQ2LrO2ttrRo8ytld70aF_OiizHtdvIVO4EdSYmRX68P2PQ23YZZ91q7sh1Z46mxoo1kJli3oQ9ccScbEEaTZoGCH1zs4Ni5SYoUuzlQWl9gk0d3IHgTA4DprkmcWcUbqXviFUr3dS-svSdhuzKErMsAUSYOn1enVGqu3LWoCFVEBsZfFI0Q_PqPe-uRWnLE8DmBQvpX1fMjlcJqanu7KgQdYcB7sux38en2t8glyHvgevaGyYOh2FtHOxyumJAZzHi0Bz6Srz2VZXDS1kFD0IiLgztx7OCcL-vUHlwbLbpSLgxJRlmEWbctoQH6-l8gqEqy9DIJNoY');
        // _Cookie.setItem(_Key.accessToken, _.get(resp, 'body.content.access_token'));
        // _Cookie.setItem(_Key.refreshToken, _.get(resp, 'body.content.access_token'));
        // 加载session信息
        await refreshSession()
    }

    const loginBySms = async function (formData: { mobile: string, sms_code: string }) {
        const resp = await _RestTools.promisePost({
            url: '/auth/loginBySms',
            data: formData,
            withToken: false
        });
        _Cookie.setItem(_Key.accessToken, _.get(resp, 'body.content.access_token'));
        _Cookie.setItem(_Key.refreshToken, _.get(resp, 'body.content.access_token'));
        // _Storage.setItem(_Key.accessToken, _.get(resp, 'body.content.access_token'));
        // _Storage.setItem(_Key.refreshToken, _.get(resp, 'body.content.access_token'));
        // 加载session信息
        await refreshSession()
    }

    const changePassword = async function (formData: { old_password: string, new_password: string }) {
        await _RestTools.promisePost({
            url: '/auth/changePassword',
            data: formData,
        });
        // todo 后端返回accessToken，需要重置jws信息，并且需要重新刷新会话
        await refreshSession()
    }

    const logout = () => {
        // _Storage.clear();
        _Cookie.removeItem(_Key.accessToken);
        _Cookie.removeItem(_Key.refreshToken);
        _.map(_.keys(session), (k) => {
            _.set(session, k, undefined)
        })
        setSession(session);
    }

    const refreshSession = async function () {
        setLoading(true)
        const resp = await _RestTools.promiseQuery({
            url: `/auth/session`
        })
        const sessionInfo = _.get(resp, 'body.content');
        setSession(sessionInfo)
        setLoading(false)
    }

    const getToken = function () {
        return _Cookie.getItem(_Key.accessToken) || "";
        // return _Storage.getItem(_Key.accessToken)||"";
    };

    const getTokenInfo = function (token?: string) {
        let tokenData = jws.decode(token || getToken());
        let payload = _.get(tokenData, 'payload');
        if (!payload) return null;
        if (_.isObject(payload)) return payload;
        return JSON.parse(payload);
    };

    const judgeToken = function () {
        const tokenInfo = getTokenInfo();
        if (_.isEmpty(tokenInfo)) return "登录授权为空"
        const nowUnix = moment().unix();
        if (_.gte(nowUnix, _.get(tokenInfo, "exp"))) return "用户登录授权已过期";
        return null
    }

    const getUserInfo = function () {
        return _.get(session, 'user_info');
    }

    const getUserId = function () {
        return _.get(getUserInfo(), 'user_id')
    }

    const getUserMobile = function () {
        return _.get(getUserInfo(), 'mobile')
    }

    const getUserRealName = function () {
        return _.get(getUserInfo(), 'real_name')
    }

    const getUsername = function () {
        return _.get(getUserInfo(), 'username')
    }

    const getUserNickName = function () {
        return _.get(getUserInfo(), 'nick_name')
    }

    const getUserHasIdentified = function () {
        return _.get(getUserInfo(), 'has_identified')
    }

    const getUserShowName = function () {
        return getUserRealName() || getUserNickName() || getUsername()
    }

    const getUserCorpSubSystemList = function () {
        return _.get(getCorpInfo(), 'sub_system_list')
    }

    const getCorpInfo = function () {
        return _.get(session, 'corp_info');
    }

    const getCorpId = function () {
        return _.get(getCorpInfo(), 'corp_id')
    }

    const getCorpName = function () {
        return _.get(getCorpInfo(), 'name')
    }

    const getCorpShortName = function () {
        return _.get(getCorpInfo(), 'short_name') || getCorpName()
    }

    const getCorpLicenseNo = function () {
        return _.get(getCorpInfo(), 'license_no')
    }

    const getCorpHasIdentified = function () {
        return _.get(getCorpInfo(), 'has_identified')
    }

    const getIsOwner = function () {
        return _.get(getCorpInfo(), 'iss_owner')
    }

    const getIsAdmin = function () {
        // 如果是owner也会被当做是管理员
        return _.get(getCorpInfo(), 'iss_admin') || getIsOwner()
    }

    const getAllowSeal = function () {
        return _.get(getCorpInfo(), 'allow_seal')
    }

    const addCorp = async function (formData: object) {
        const resp = await _RestTools.promisePost({
            url: `/auth/addCorp`,
            data: formData
        });
        const newCorp = _.get(resp, 'body.content');
        await chooseCorp(_.get(newCorp, 'id'));
        await refreshSession();
        return newCorp;
    }

    const getUserCorpList = async function () {
        const resp = await _RestTools.promiseQuery({
            url: `/auth/getUserCorpList`
        })
        return _.get(resp, 'body.content')
    }

    const chooseCorp = async function (corpId: string) {
        const resp = await _RestTools.promisePost({
            url: `/auth/chooseCorp`,
            data: {
                corp_id: corpId
            }
        });
        await refreshSession();
        return _.get(resp, 'body.content')
    }

    const applyCorpSubSystem = async function (sub_system_id: string) {
        const resp = await _RestTools.promisePost({
            url: `/auth/applySubSystem`,
            data: {
                sub_system_id: sub_system_id
            }
        });
        await refreshSession();
        await refreshCorpSubSystemList()
        return _.get(resp, 'body.content')
    }

    // const refreshResources = async function () {
    //     // todo 此处应该请求当前登录用户在获取会员中心权限的接口
    //     const resp = await _RestTools.promiseQuery({
    //         url: `/sm/resource`,
    //         queryParams: {size: 500}
    //     });
    //     setResources(_.get(resp, 'body.content'));
    // }

    const queryCorpInfo = async function () {
        return await _RestTools.promiseQueryOne({
            url: `/auth/getCorpInfo`
        });
    }

    const updateCorpInfo = async function (formData: any) {
        return await _RestTools.promisePut({
            url: `/auth/updateCorp`,
            data: formData
        });
    }

    const refreshCorpSubSystemList = function () {
        setLoading(true)
        try {
            if (!getCorpId()) {
                setCorpSubSystemList([]);
                return;
            }
            _RestTools.promiseQuery({
                url: `/auth/corp_sub_system`,
                queryParams: { size: 500 }
            }).then((resp) => {
                const list = _.get(resp, 'body.content');
                setAllSubSystemList(list);
                setAllBusinessSubSystemList(_.filter(list, { iss_business: true }));
                setCorpSubSystemList(_.filter(list, { iss_active: true }));
                setCorpBusinessSystemList(_.filter(list, { iss_active: true, iss_business: true }));
                // setCorpAllSubSystemList(list);
                // setCorpAllBusinessSubSystemList(_.filter(list, {iss_business: true}));
                setLoading(false)
            }).catch((e) => {
                console.log("获取企业子系统列表时发生错误", e)
            });
        } catch (e) {
            console.log(e, 'error')
        } finally {
        }


    }

    const getGrantSubSystems = function () {
        if (!getCorpId()) return [];
        let results: CorpSubSystemVO[] = allSubSystemList;
        if (getIsAdmin()) {
            results = _.union(corpSubSystemList, _.filter(allSubSystemList, { iss_business: false }));
        } else {
            results = _.filter(corpSubSystemList, (item) => {
                if (_.includes(getUserCorpSubSystemList(), item.sub_system_id)) return true;
                else return false;
            });
        }

        return results;


        // return _.filter(corpBusinessSystemList, (item)=>{
        //     if(getIsAdmin()) return true;
        //     if(_.includes(getUserCorpSubSystemList(), item.sub_system_id)) return true;
        //     return false
        // })
    }

    return {
        session,
        loading,
        loginByPassword,
        loginBySms,
        logout,
        register,

        refreshSession,
        changePassword,

        getToken,
        getTokenInfo,
        judgeToken,

        getUserCorpList,
        addCorp,
        chooseCorp,
        applyCorpSubSystem,

        getUserInfo,
        getUserId,
        getUserMobile,
        getUserRealName,
        getUserHasIdentified,
        getUserShowName,
        getUserCorpSubSystemList,
        getCorpInfo,
        getCorpId,
        getCorpName,
        getCorpShortName,
        getCorpLicenseNo,
        getCorpHasIdentified,
        getIsOwner,
        getIsAdmin,
        getAllowSeal,

        getGrantSubSystems,

        // resources,
        // refreshResources,

        queryCorpInfo,
        updateCorpInfo,

        // corpAllSubSystemList,
        // corpAllBusinessSubSystemList,
        corpSubSystemList,
        corpBusinessSystemList,
        allSubSystemList,
        allBusinessSubSystemList,
        refreshCorpSubSystemList
    }
}


const { useStore } = createStore(useSession)


export default useStore;






