import Vue from "vue";
import App from "./App.vue";

// 导入全局样式
import "./assets/base.scss";

// 导入饿了么ui cnpm i element-ui --save
// 把饿了么ui放到axios导入之前
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 全局注册面包屑组件
import myBread from './components/myBread.vue'
Vue.component('my-bread', myBread)

// 导入我的axios插件
import myaxios from './myaxios.js'
// use一下
Vue.use(myaxios)


Vue.config.productionTip = false;

// 导入路由
import router from "./router.js";

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router
}).$mount("#app");
