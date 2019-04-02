<template>
  <!-- 使用饿了么ui的布局容器和layout实现的整体布局 -->
  <!-- 整体容器 -->
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="my-header">
      <el-row>
        <el-col :span="4">
          <!-- 图片 -->
          <img src="../assets/logo.png" alt>
        </el-col>
        <el-col :span="18">
          <!-- 标题 -->
          <h2>狂拽酷炫后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <!-- 按钮 -->
          <!-- 绑定点击事件 -->
          <el-button type="success" @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <!-- 侧边栏 -->
      <el-aside class="my-aside" width="200px">
        <!-- 使用饿了么ui的 导航栏实现 -->
        <el-menu router default-active="users" class="el-menu-vertical-demo">
          <el-submenu :index="item.id+''" v-for="item in menuList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="it.path" v-for="it in item.children">
              <!-- 字体图标class="el-icon-menu" -->
              <span class="el-icon-menu"></span>
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体区域 -->
      <el-main class="my-main">
        <!-- 出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      // 菜单列表
      menuList: []
    };
  },
  methods: {
    logout() {
      // 删除缓存
      window.sessionStorage.removeItem("token");
      // 编程式导航 去登录页 会员登录
      this.$router.push("/login");
    }
  },
  // 不需要获取组件中的数据 只是缓存数据 跟组件无关  尽可能早即可
  beforeCreate() {
    // 进行登录判断,没有token打回登录页
    if (window.sessionStorage.getItem("token")) {
    } else {
      this.$message.error("哥们，先登录");
      this.$router.push("/login");
    }
  },
  // 钩子函数
  async created() {
    let res = await this.$axios.get("menus");
    // console.log(res);
    this.menuList = res.data.data;
  }
};
</script>

<style lang='scss'>
// 使用scss编写样式
.index-container {
  height: 100%;
  // display: flex;
  // flex-direction: column;
  .my-header {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }

  .my-container {
    flex: 1;
    .my-aside {
      background-color: skyblue;
    }
    .my-main {
      background-color: #e9eef3;
      padding-top: 0;
    }
  }
}
</style>
