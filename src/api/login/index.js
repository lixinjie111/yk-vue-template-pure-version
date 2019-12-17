
import {HTTPURL} from '../requestUrl';

/**
 * 登录
 */
export const requestLogin = params => { return axios.post(`${HTTPURL}openApi/user/login`, params).then(res => res.data); };
/**
 * 退出登录
 */
export const requestLogout = params => { return axios.post(`${HTTPURL}openApi/user/logout`, params).then(res => res.data); };
/**
 * 修改密码
 */
export const requestPasswd = params => { return axios.post(`${HTTPURL}openApi/user/passwd`, params).then(res => res.data); };
/**
 * 获取滑块位置
 */
export const requestCreateCode = params => { return axios.post(`${OPERATEURL}openApi/user/createCode`, params).then(res => res.data); };
/**
 * 滑动校验
 */
export const requestAuthCode = params => { return axios.post(`${OPERATEURL}openApi/user/authCode`, params).then(res => res.data); };


/**
 * 登录
 */
// export const requestLogin = params => { return axios.post(`${HTTPURL}openApi/v2/user/login`, params).then(res => res.data); };
/**
 * 退出登录
 */
// export const requestLogout = params => { return axios.post(`${HTTPURL}openApi/v2/user/logout`, params).then(res => res.data); };
/**
 * 修改密码
 */
// export const requestPasswd = params => { return axios.post(`${HTTPURL}openApi/v2/user/passwd`, params).then(res => res.data); };
