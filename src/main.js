// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

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
import '@/assets/icon-font/iconfont.js';

// 时间转换
import TDate from '@/assets/js/utils/date.js'
Vue.prototype.$dateUtil = TDate;

// 模糊查询封装
import SearchFilter from '@/assets/js/module/searchFilter.js'
Vue.prototype.$searchFilter = SearchFilter;

// 权限
import { setAuthInfo, getAdminId, getAuthInfo, removeAuthInfo } from '@/cookie/index';
// 在免登录白名单，直接进入
const whiteList = ['/login','/404'];
setAuthInfo({
    userNo: "********",
    id: "********"
});
// removeAuthInfo();
// router global config
router.beforeEach((to,from,next) => {
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