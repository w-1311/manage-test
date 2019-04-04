<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sectitle="权限管理" threetitle="角色列表"></my-bread>
    <!--输入框 -->
    <el-row>
      <el-col :span="12">
        <el-button type="default" @click="addFormVisible=true" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>

      <el-table-column label="操作">
        <!-- scope 是一个名字 -->
        <template>
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
          <el-button type="warning" size="mini" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    // 角色列表
    return {
      roleList: [{}, {}]
    };
  },
  //方法
  methods: {
    async getRoles() {
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.roleList = res.data.data;
    }
  },
  // 接口调用
  created() {
    this.getRoles();
  }
};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
