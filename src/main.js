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

// 导入axios cnpm i axios --save
import axios from "axios";

// 设置基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
// 设置axios拦截器
// 请求拦截器 请求之前统一设置一些内容 比如 token
axios.interceptors.request.use(
  //请求拦截
  function(config) {
    // Do something before request is sent
    // 统一设置token
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器 统一处理响应
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log("响应拦截");
    console.log(response);
    // 统一进行弹框  成功状态码
    if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
      Vue.prototype.$message.success(response.data.meta.msg);
    } else {
      // 否则就是失败
      Vue.prototype.$message.warning(response.data.meta.msg);
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios; //设置到Vue的原型上

Vue.config.productionTip = false;

// 导入路由
import router from "./router.js";

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router
}).$mount("#app");
