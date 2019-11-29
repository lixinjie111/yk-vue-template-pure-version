// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue';  //加载优化
import App from './App';
import router from './router';
import store from './store';

// Element-ui
import ElementUI from 'element-ui';  //加载优化
import 'element-ui/lib/theme-chalk/index.css';  //加载优化
Vue.use(ElementUI);  //加载优化

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 设置进度条
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.config.productionTip = false;

// 全局静态资源
import '@/assets/scss/reset.scss';
import '@/assets/scss/public.scss';
import '@/assets/scss/element-ui-reset.scss';
import '@/assets/icon-font/iconfont.css';
// import '@/assets/icon-font/iconfont.js';  //不需要

// 时间转换--组件内各自引用
// import TDate from '@/assets/js/utils/date.js'  //加载优化
// Vue.prototype.$dateUtil = TDate;  //加载优化

// 权限
import { setAuthInfo, getAdminId, getAuthInfo, removeAuthInfo } from '@/session/index';
// 在免登录白名单，直接进入
const whiteList = ['/login','/404'];
// setAuthInfo({
//     userNo: "********",
//     id: "********"
// });
// removeAuthInfo();
// router global config

//取消请求的对象
window.cancleSource={};
window.cancelToken = axios.CancelToken;

router.beforeEach((to,from,next) => {
    window.cancleSource.cancel && window.cancleSource.cancel()
    window.cancleSource = window.cancelToken.source()
    NProgress.start();
    const ADMINID = getAdminId();
    if(ADMINID) {
        // 回填用户信息
        store.dispatch('setAuthInfo', getAuthInfo());
        if(to.path === '/login') {
            next({path: '/'});
        }else {
            next();
        }
    }else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login'); // 否则全部重定向到登录页
        }
        NProgress.done()
    }
});

router.afterEach(() => {
    NProgress.done()
});

/* eslint-disable no-new */
const vm = new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})

// axios 过滤器
import axiosFilter from './api/axiosConfig.js';
axiosFilter(vm);