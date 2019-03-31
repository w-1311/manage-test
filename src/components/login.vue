<template>
  <!-- 登录页顶部结构 -->
  <div class="login">
    <!-- 居中的盒子 -->
    <div class="box">
      <h2>用户登录</h2>
      <!-- 饿了么ui的from -->
      <el-form
        label-position="top"
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('loginForm')">登录</el-button>
          <el-button type="primary" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: ""
      },
      //表单验证 验证规则 注意 跟表单数据是平级的
      rules: {
        /* 
          required 必须
          message 提示信息
          trigger 触发 触发方式
          min 最短
          max 最长
           */

        // 验证的规则 以及提示的信息 注意数组跟对象不要写混了
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 4, max: 16, message: "长度在4-16个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6-16个字符", trigger: "blur" }
        ]
      }
    };
  },
  // 方法
  methods: {
    // 表单提交  获取饿了么的表单  调用验证方法
    submit(formName) {//使用async修饰函数
    alert(11)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //成功  提交数据  使用await 登录异步操作的结束
           let res = await this.$axios.post("login", this.loginForm);
          console.log(res);
           if (res.data.meta.status === 400) {//根据状态不同的提示框
            this.$message.error(res.data.meta.msg);
          } else if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg);
            // 缓存数据
            window.sessionStorage.setItem("token", res.data.data.token);
            // 跳转 到主页
            this.$router.push("/");
          }
        } else {
          // 失败
          this.$message.error("数据格式错误,请根据提示修改!");
          return false;
        }
      });
    },
    // 重置表单 获取饿了么的表单  调用重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss'>
// 使用css预处理需要添加 lang='scss'
// 安装  cnpm install -D sass-loader node-sass
//底部结构
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
  .box {
    width: 550px;
    padding: 35px;
    border-radius: 10px;
    // 怪异盒模型
    box-sizing: border-box;
    height: 420px;
    background: white;
    .my-btn {
      width: 100%;
    }
  }
}
</style>
 