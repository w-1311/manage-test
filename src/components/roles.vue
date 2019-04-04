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
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            type="primary"
            @click="enterEdit(scope.row)"
            size="mini"
            icon="el-icon-edit"
            plain
          ></el-button>
          <el-button
            type="danger"
            @click="delRole(scope.row)"
            size="mini"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            @click="showTree(scope.row)"
            type="warning"
            size="mini"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增对话框 -->
    <el-dialog title="新增角色" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName" label-width="100">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName" label-width="100">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100">
          <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 树形菜单对话框 -->
    <el-dialog title="分配权限" :visible.sync="treeVisible">
      <el-tree
        :data="rightList"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTree">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    // 角色列表
    return {
      roleList: [{}, {}],
      // 标记字段
      addFormVisible: false,
      editFormVisible: false,
      treeVisible: false,
      // 树形菜单的数据
      rightList: [],
      // 选中的选项
      checkedKeys: [],
      // tree菜单的设置
      defaultProps: {
        // 告诉树形菜单 数据的属性名是什么
        children: "children",
        label: "authName"
      },
      // 新增的表单
      addForm: {
        roleName: "",
        roleDesc: "",
        id: 0
      },
      // 当前操纵tree的角色
      treeItem: {},
      // 编辑的表单
      editForm: {
        roleName: "",
        roleDesc: ""
      },
      // 验证规则
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  //方法
  methods: {
    async getRoles() {
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.roleList = res.data.data;
    },
    // 新增角色
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证成功
          let res = await this.$axios.post("roles", this.addForm);
          // console.log(res);
          if (res.data.meta.status === 201) {
            this.getRoles();
          }

          // 关闭对话框
          this.addFormVisible = false;
        } else {
          // 失败
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    },
    // 删除角色
    delRole(row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(`roles/${row.id}`);
          // console.log(res);
          if (res.data.meta.status === 200) {
            this.getRoles();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 进入编辑状态
    async enterEdit(row) {
      // console.log(row);
      let res = await this.$axios.get(`roles/${row.id}`);
      // console.log(res);
      this.editForm.id = res.data.data.roleId;
      this.editForm.roleName = res.data.data.roleName;
      this.editForm.roleDesc = res.data.data.roleDesc;
      // 弹框
      this.editFormVisible = true;
    },
    // 提交编辑
    submitEdit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证成功
          let res = await this.$axios.put(
            `roles/${this.editForm.id}`,
            this.editForm
          );
          // console.log(res);
          if (res.data.meta.status === 200) {
            this.getRoles();
          }

          // 关闭对话框
          this.editFormVisible = false;
        } else {
          // 失败
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    },
    // 显示树形菜单对话框
    async showTree(row) {
      // 所有的数据
      let res = await this.$axios.get("rights/tree");
      // console.log(res);
      this.rightList = res.data.data;
      // 设置选中的节点
      let checkedKeys = [];
      // 函数
      function getCheckedKeys(item) {
        // 退出条件
        if (item.children) {
          item.children.forEach(v => {
            checkedKeys.push(v.id);
            getCheckedKeys(v);
          });
        }
      }
      getCheckedKeys(row);
      // console.log(checkedKeys);
      // 设置到data中
      this.checkedKeys = checkedKeys;
      // 弹框
      this.treeVisible = true;
      // 保存当前编辑的角色信息
      this.treeItem = row;
    },
    // 提交选择的权限(角色授权)
    async submitTree() {
      // 获取选中的id
      // console.log(this.$refs.tree.getCheckedKeys());
      let rids = this.$refs.tree.getCheckedKeys().join(",");
      // console.log(rids);
      // 接口调用
      let res = await this.$axios.post(`roles/${this.treeItem.id}/rights`, {
        rids
      });
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.getRoles();
      }
      // 关闭弹框
      this.treeVisible = false;
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
