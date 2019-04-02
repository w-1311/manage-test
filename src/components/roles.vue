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
    <el-table style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" width="180"></el-table-column>
      <el-table-column label="角色描述" width="180"></el-table-column>

      <el-table-column label="操作">
        <!-- scope 是一个名字 -->
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button
            @click="delOne(scope.row)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            type="warning"
            @click="showRole(scope.row)"
            size="mini"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "roles",

  methods: {
    // 编辑按钮的点击事件
    async handleEdit(index, row) {
      // console.log(index); // 索引
      // console.log(row); // 数据
      let res = await this.$axios.get(`users/${row.id}`);
      // console.log(res);
      this.editForm = res.data.data;
      // 弹框
      if (res.data.meta.status === 200) {
        this.editFormVisible = true;
      }
    },

    // // 删除用户
    // delOne(row) {
    //   this.$confirm("亲，你真的要永久删除该用户, 吗 o(╥﹏╥)o?", "提示", {
    //     confirmButtonText: "狠心删除",
    //     cancelButtonText: "良心发现",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       // axios
    //       let res = await this.$axios.delete(`users/${row.id}`);
    //       if (res.data.meta.status === 200) {
    //         this.search();
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "你真好o(^▽^)o"
    //       });
    //     });
    // },
    // // 弹出角色框
    // async showRole(row) {
    //   this.roleFormVisible = true;
    //   // 保存编辑的用户信息
    //   this.editUser = row;
    //   // 获取所有的角色列表
    //   let res = await this.$axios.get("roles");
    //   // console.log(res);
    //   this.roleList = res.data.data;
    // },
    // // 分配角色
    // async submitRole(formName) {
    //   // 获取用户id
    //   // 获取角色id
    //   let res = await this.$axios.put(`users/${this.editUser.id}/role`, {
    //     rid: this.editUser.role_name
    //   });
    //   if (res.data.meta.status === 200) {
    //     this.search();
    //   }
    //   this.roleFormVisible = false;
    // }
  },
  // 接口调用
  created() {}
};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
