import Vue from 'vue'
import Router from 'vue-router'

// 不在菜单导航里的路由
const Login = resolve => require(['@/views/login/index'], resolve)
const Err404 = resolve => require(['@/views/error/404'], resolve)
const Home = resolve => require(['@/views/home'], resolve)
//重新加载当前路由
const Refresh = resolve => require(['@/views/refresh'], resolve)
// this.$router.replace({
//     path: '/refresh',
//     params: {
//         t: Date.now()
//     }
// })

// 在菜单导航里的路由
// 首页
const Index = resolve => require(['@/views/index/index'], resolve)
// 菜单1



Vue.use(Router)

// 不在菜单导航里的路由
export const publicRouterMap = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/404', name: '404', component: Err404 },
    { path: '/refresh', name: 'Refresh', component: Refresh},
    { path: '*', redirect: '/404' }
]
// 在菜单导航里的路由
export const menuRouterMap = [
	{
        "path": "/",
      	"name": "home",
        "component": Home,
        "redirect": "/index",
        "children": [
			{
		        "name": "Index",
		        "path": "/index",
                "component": Index,
                "meta": {
                    "title": "首页",
                    "icon": "el-icon-mc-app",
                    "enable": "Y"
                },
		        "children": []
		    },
            // {
            //     "name": "MenuOne",
            //     "path": "/menu1",
            //     "component": MenuOne,
            //     "redirect": "/menu1/list",
            //     "meta": {
            //         "title": "列表页模板",
            //         "icon": "el-icon-mc-view-list",
            //         "enable": "Y"
            //     },
            //     "children": [
            //         {
            //             "name": "MenuOneList",
            //             "path": "/menu1/list",
            //             "component": MenuOneList,
            //             "meta": {
            //                 "title": "menu--1",
            //                 "enable": "Y"
            //             },
            //             "children": [],
            //         }
            //     ]
            // }
		]
	}
];

export default new Router({
  // mode: 'history',
  routes: [
  	...publicRouterMap,
  	...menuRouterMap
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
