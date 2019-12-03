// import Vue from 'vue';  //加载优化
// import axios from 'axios';  //加载优化
import Qs from 'qs'

// axios.defaults.withCredentials = true;
// Vue.prototype.$http = axios;  //加载优化
// 权限
import { removeAuthInfo } from '@/session/index';
import store from '../store/index';

// 避免在账号登录失效后提示多次
let isOutLogin = true;
/**
 * axios过滤器
 */
function axiosFilter(vm) {
    // request
    axios.create({
      baseURL: window.config.url,
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      responseType: 'json',
      transformResponse: [function(data) { //后端发送过来的数据
        // return data;
        return Qs.stringify({
            ...data
        });
      }],
      transformRequest: [function(data) {
        return data;
      }]
    });
     // request 添加响应拦截器 
    // axios.interceptors.request.use(
    //     config => {
    //         if (config.method == 'post') {
    //             config.data = {
    //                 data: config.data,
    //                 timestamp: Date.parse(new Date()) / 1000,
    //                 token: store.state.admin.token,
    //                 appCode: store.state.admin.platform,
    //                 version: store.state.admin.version,
    //                 appType: ""
    //             }
    //         } else if (config.method == 'get') {
    //             config.params = {
    //                 data: config.data,
    //                 timestamp: Date.parse(new Date()) / 1000,
    //                 token: store.state.admin.token,
    //                 appCode: store.state.admin.platform,
    //                 version: store.state.admin.version,
    //                 appType: ""
    //             }
    //         }
    //         // config.data = Qs.stringify(config.data);
    //         return config
    //     },
    //     function(error) {
    //         return Promise.reject(error)
    //     }
    // )
     // request 添加请求拦截器 
     axios.interceptors.request.use(
        config => {
            config.cancelToken = window.cancleSource.token;
            return config
        },
        function(error) {
            return Promise.reject(error)
        }
    )
    
    // response
    axios.interceptors.response.use(response => {
        let returnStatus = response.data.status,
            returnMessage = response.data.message || '操作失败！'
        switch (returnStatus.toString()) {
            case '200': {
                return Promise.resolve(response);
                break;
            }
            case '808': {   // 登录失效
                if(isOutLogin) {
                    isOutLogin = false;
                    vm.$confirm(response.data.message, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        loginOut();
                    }).catch(() => {
                        loginOut();
                    });
                }
                // return Promise.resolve(response);
                break;
            }
            default: {
                // vm.$message.error(response.data.message);
                vm.$message({
                    type: 'error',
                    duration: '1500',
                    message: response.data.message,
                    showClose: true
                });
                return Promise.resolve(response);
            }
        }
    }, function(error) {
        // vm.$message.error('error!');
        if (axios.isCancel(error)) {
            console.log("请求被取消"+error); //请求如果被取消，这里是返回取消的message
        } else {
            vm.$message({
                type: 'error',
                duration: '1500',
                message: '网络异常,请稍候重试!',
                showClose: true
            });
        }
        return Promise.reject(error);
    });
}

function loginOut() {
    removeAuthInfo();
    isOutLogin = true;
    window.location.href = '/';
}

export default axiosFilter
