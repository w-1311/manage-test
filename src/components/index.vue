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
          <el-button type="success">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <!-- 侧边栏 -->
      <el-aside class="my-aside" width="200px">Aside</el-aside>
      <!-- 主体区域 -->
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang='scss'>
// 使用scss编写样式
.index-container {
  height: 100%;
  display: flex;
  flex-direction: column;
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
      background-color: hotpink;
    }
  }
}
</style>
