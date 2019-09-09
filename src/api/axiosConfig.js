import Vue from 'vue';
import axios from 'axios';
import Qs from 'qs'

// axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
// 权限
import { removeAuthInfo } from '@/session/index';

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
    //         if (config.method === 'post') {
    //             config.data = Qs.stringify(config.data)
    //         }
    //         return config
    //     },
    //     error => {
    //         console.log(error)
    //         Promise.reject(error)
    //     }
    // )
    
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
                return Promise.reject(response);
            }
        }
    }, function(error) {
        // vm.$message.error('error!');
        vm.$message({
            type: 'error',
            duration: '1500',
            message: '接口调用失败!',
            showClose: true
        });
        return Promise.reject(error);
    });
}

function loginOut() {
    removeAuthInfo();
    isOutLogin = true;
    window.location.href = '/';
}

export default axiosFilter
