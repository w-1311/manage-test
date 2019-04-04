<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sectitle="订单管理" threetitle="订单列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格（元）" width="180"></el-table-column>
      <el-table-column prop="mobile" label="是否付款">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay==='0'" type="danger" size="mini" plain>未付款</el-button>
          <el-button v-else type="success" size="mini" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | formatTime('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <!-- scope 是一个名字 -->
        <template >
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            @click="dialogFormVisible=true"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 18]"
      :page-size="sendData.pagesize"
      :current="sendData.pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form >
        <el-form-item label="省市区" label-width="120px">
          <!-- 级联选择器实现 -->
          <el-cascader :options="options" v-model="selectedOptions"></el-cascader>
          <!-- v-distpicker实现 -->
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入省市联动数据
import options from "../assets/city_data2017_element.js";
// 导入组件
import VDistpicker from "v-distpicker";

export default {
  name: "users",
  data() {
    return {
      sendData: {
        pagesize: 10,
        pagenum: 1
      },
      // 弹框标记字段
      dialogFormVisible: false,
      // 渲染的数据
      options,
      // 级联选择器绑定的数据
      selectedOptions: [],
      // 总条数
      total: 0,
      orderList: [{}, {}]
    };
  },

  // 本地注册组件
  components: {
    VDistpicker
  },

  // 方法
  methods: {
    // 数据的获取方法
    async getOrders() {
      let res = await this.$axios.get("orders", {
        params: this.sendData
      });
      // console.log(res);
      this.orderList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    sizeChange(size) {
      // 赋值
      this.sendData.pagesize = size;
      // 重新获取数据
      this.getOrders();
    },
    currentChange(current) {
      // 赋值
      this.sendData.pagenum = current;
      // 重新获取数据
      this.getOrders();
    }
  },
  created() {
    this.getOrders();
  }
};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
