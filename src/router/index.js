// import Vue from 'vue'  //加载优化
// import VueRouter from 'vue-router'  //加载优化
// Vue.use(VueRouter)  //加载优化

// 不在菜单导航里的路由
const Login = resolve => require(["@/views/login/index"], resolve);
const Err404 = resolve => require(["@/views/error/404"], resolve);
const Home = resolve => require(["@/views/home"], resolve);
//重新加载当前路由
const Refresh = resolve => require(["@/views/refresh"], resolve);
// this.$router.replace({
//     path: '/refresh',
//     params: {
//         t: Date.now()
//     }
// })

// 在菜单导航里的路由
// 首页
const Index = resolve => require(["@/views/index/index"], resolve);
const ProjectManage = resolve => require(["@/views/projectManage/index"], resolve);
const PersonManage = resolve => require(["@/views/personManage/index"], resolve);
const TaskManage = resolve => require(["@/views/taskManage/index"], resolve);
const TaskList = resolve => require(["@/views/taskManage/list"], resolve);
const TaskAdd = resolve => require(["@/views/taskManage/components/taskAdd"], resolve);
const PersonSchedule = resolve => require(["@/views/personSchedule/index"], resolve);
const ProjectSchedule = resolve => require(["@/views/projectSchedule/index"], resolve);
const SummaryStatistics = resolve => require(["@/views/summaryStatistics/index"], resolve);

// 不在菜单导航里的路由
export const publicRouterMap = [{ path: "/login", name: "Login", component: Login }, { path: "/404", name: "404", component: Err404 }, { path: "/refresh", name: "Refresh", component: Refresh }, { path: "*", redirect: "/404" }];
// 在菜单导航里的路由
export const menuRouterMap = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: "/index",
    children: [
      {
        name: "Index",
        path: "/index",
        component: Index,
        meta: {
          title: "首页",
          icon: "el-icon-mc-app",
          enable: "Y"
        },
        children: []
      },
      {
        name: "ProjectManage",
        path: "/projectManage",
        component: ProjectManage,
        meta: {
          title: "项目管理",
          icon: "el-icon-mc-view-list",
          enable: "Y"
        },
        children: []
      },
      {
        name: "PersonManage",
        path: "/personManage",
        component: PersonManage,
        meta: {
          title: "人员管理",
          icon: "el-icon-user-solid",
          enable: "Y"
        },
        children: []
      },
      {
        name: "TaskManage",
        path: "/taskManage",
        component: TaskManage,
        redirect: "/taskManage/list",
        meta: {
          title: "任务管理",
          icon: "el-icon-s-cooperation",
          enable: "Y"
        },
        children: [
            {
              "name": "TaskList",
              "path": "/taskManage/list",
              "component": TaskList,
              "meta": {
                  "title": "列表",
                  "enable": "Y"
              },
              "children": [],
          },{
              "name": "TaskAdd",
              "path": "/taskManage/taskAdd",
              "component": TaskAdd,
              "meta": {
                  "title": "新增",
                  "enable": "N",
              },
              "children": [],
          }
        ]
      },
      {
        name: "PersonSchedule",
        path: "/personSchedule",
        component: PersonSchedule,
        meta: {
          title: "人员日程",
          icon: "el-icon-user",
          enable: "Y"
        },
        children: []
      },
      {
        name: "ProjectSchedule",
        path: "/projectSchedule",
        component: ProjectSchedule,
        meta: {
          title: "任务日程",
          icon: "el-icon-date",
          enable: "Y"
        },
        children: []
      },
      {
        name: "SummaryStatistics",
        path: "/summaryStatistics",
        component: SummaryStatistics,
        meta: {
          title: "汇总统计",
          icon: "el-icon-s-data",
          enable: "Y"
        },
        children: []
      }
    ]
  }
];

export default new VueRouter({
  // mode: 'history',
  routes: [...publicRouterMap, ...menuRouterMap],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
