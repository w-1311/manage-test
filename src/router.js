import Vue from "vue";
// 安装vue-router
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入组件   新建组件内部只有站位文本
import login from "./components/login.vue";
import index from "./components/index.vue";
import users from "./components/users.vue";
import roles from "./components/roles.vue";
import rights from "./components/rights.vue";
import goods from "./components/goods.vue";
import categories from "./components/categories.vue";
import orders from "./components/orders.vue";
import params from "./components/params.vue";
import reports from "./components/reports.vue";
// 统一的错误页
import error from "./components/error.vue";

// 规则
let routes = [
  {
    path: "/error",
    component: error
  },
  {
    path: "/login",
    component: login,
    // 路由元信息
    meta: {
      // 不需要登录吗？ true
      noLogin: true
    }
  },
  {
    path: "/",
    component: index,
    // 嵌套路由
    children: [
      {
        path: "users", // /index/users
        component: users
      },
      {
        path: "roles", // /index/roles
        component: roles
      },
      {
        path: "rights", // /index/rights
        component: rights
      },
      {
        path: "goods", // /index/goods
        component: goods
      },
      {
        path: "categories", // /index/categories
        component: categories
      },
      {
        path: "orders", // /index/orders
        component: orders
      },
      {
        path: "params", // /index/params
        component: params
      },
      {
        path: "reports", // /index/reports
        component: reports
      }
    ]
  }
];

// 实例化路由对象
let router = new VueRouter({
  routes
});

// 注册全局前置守卫(导航守卫)
/*
  to 去的 路由信息
  from 来的路由信息
  next 继续向后执行 跟express的中间件中的next类似
* */
router.beforeEach((to, from, next) => {
  console.log(to);
  // console.log(from)
  // next()
  // if(to.path==='/login'){

  // 如果没有匹配统一跳转error页面
  if (to.matched.length === 0) {
    // 提示
    Vue.prototype.$message.error("哥们，你输入的地址不对哦，检查一下把");
    // 没有匹配
    next("/error");
  }

  // 如果meta字段的noLogin为true 就是登录页 直接放行
  if (to.meta.noLogin === true) {
    // 直接去
    next();
  } else {
    // 不是登录页 判断是否有token
    if (window.sessionStorage.getItem("token")) {
      // 存在 过去
      next();
    } else {
      // 弹框
      Vue.prototype.$message.error(
        "哥们，导航守卫发现你没有登录，滚去登录页！！！"
      );
      // 不存在 打会登录页
      next("/login");
    }
  }
});

// 暴露出去
export default router;
