<template>
<!-- 增加面包屑组件 把面包屑的代码抽取 -->
  <el-breadcrumb class="my-bread" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{sectitle}}</el-breadcrumb-item>
    <!-- 使用设置的属性 -->
    <el-breadcrumb-item>{{threetitle}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // 对外提供可以设置的属性
  props:['sectitle','threetitle']
};
</script>

<style>
/* 样式抽取过来 */
.my-bread {
  background-color: #d3dce6;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
</style>
