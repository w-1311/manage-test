import Vue from 'vue'
// 安装vue-router
import VueRouter  from 'vue-router'
Vue.use(VueRouter)


// 导入组件   新建组件内部只有站位文本
import login from './components/login.vue';
import index from './components/index.vue';

// 规则
let routes = [
    {
      path:"/login",
      component:login
    },
    {
      path:"/",
      component:index
    },
  ]
  
  // 实例化路由对象
  let router = new VueRouter({
    routes
  })
  
  // 暴露出去
  export default router