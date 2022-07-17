<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.courseTitle" placeholder="课程名称"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 讲师列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="courseTitle" label="课程名称" width="150"/>
      <el-table-column label="课程封面" width="90">
        <template slot-scope="scope">
          <img :src="scope.row.courseCover" width="80" height="80" alt="avatar">
        </template>
      </el-table-column>
      <el-table-column prop="teacherName" label="老师姓名" width="150"/>
      <el-table-column prop="totalFee" label="价格"/>
      <el-table-column prop="nickname" label="学员"/>
      <el-table-column prop="gmtCreate" label="购买时间" width="180"/>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import order from '../../api/acl/order'

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 讲师列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      multipleSelection: [] // 批量选择中选择的记录列表
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    this.fetchData()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
  },

  methods: {

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData(1)
    },

    addUser() {
      this.$router.push({ path: '/acl/user/add' })
    },

    // 加载讲师列表数据
    fetchData(page = 1) {
      this.page = page
      // 异步获取远程数据（ajax）
      order.getOrderList(this.page, this.limit, this.searchObj).then(
        response => {
          this.list = response.data.items
          this.total = response.data.total
          // 数据加载并绑定成功
          this.listLoading = false
          console.log(response)
        }
      )

    },

    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    },

    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      console.log('handleSelectionChange......')
      console.log(selection)
      this.multipleSelection = selection
    },

    // 执行搜索
    // queryString：文本框中输入的值
    // cb：一个函数
    querySearch(queryString, cb) {
      console.log(queryString)
      console.log(cb)

      // teacher.selectNameByKey(queryString).then(response => {
      //   // 调用 callback 返回建议列表的数据
      //   cb(response.data.items)
      // })
    }
  }
}
</script>

