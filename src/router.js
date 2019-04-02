import Vue from "vue";
// 安装vue-router
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入组件   新建组件内部只有站位文本
import login from "./components/login.vue";
import index from "./components/index.vue";
import users from "./components/users.vue";
import roles from './components/roles.vue'
import rights from './components/rights.vue'
import goods from './components/goods.vue'
import categories from './components/categories.vue'
import orders from './components/orders.vue'


// 规则
let routes = [
  {
    path: "/login",
    component: login
  },
  {
    path: "/",
    component: index,
    // 嵌套路由
    children: [
      {
        path: "users",// /index/users
        component: users
      },
      {
        path: 'roles', // /index/roles
        component: roles
      },
      {
        path: 'rights', // /index/rights
        component: rights
      },
      {
        path: 'goods', // /index/goods
        component: goods
      },
      {
        path: 'categories', // /index/categories
        component: categories
      },
      {
        path: 'orders', // /index/orders
        component: orders
      },
    ]
  },
];

// 实例化路由对象
let router = new VueRouter({
  routes
});

// 暴露出去
export default router;
