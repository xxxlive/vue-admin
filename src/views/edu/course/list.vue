<template>
  <div class="app-container">
    课程列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="280" />

      <el-table-column label="课程状态" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==='Draft'" type="warning" size="medium">未发布</el-button>
          <el-button v-if="scope.row.status==='Normal'" type="success" size="medium">已发布</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" />

      <el-table-column prop="price" label="价格">
        <template slot-scope="scope">
          <el-button v-if="scope.row.price<=0" type="primary" size="medium">免费</el-button>
          <el-button v-if="scope.row.price>0" type="danger" size="medium">￥{{ scope.row.price }}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="viewCount" label="浏览数量" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="'/edu/course/chapter/'+scope.row.id">
            <el-button type="success" size="mini" icon="el-icon-edit">编辑大纲信息</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除课程</el-button>

          <el-button v-if="scope.row.status==='Normal'" type="warning" size="mini" icon="el-icon-edit" @click="privateDataById(scope.row.id)">下架</el-button>
        </template>
      </el-table-column>
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
// 引入调用teacher.js文件
import course from '@/api/edu/course'
export default {
  // 写核心代码位置
  // data:{
  // },
  data() { // 定义变量和初始值
    return {
      teacherId: this.$store.state.user.teacherId,
      listLoading: true, // 数据是否正在加载
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      courseQuery: {
        teacherId: this.teacherId
      } // 条件封装对象
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    // 调用
    this.fetchData()
  },
  methods: { // 创建具体的方法，调用teacher.js定义的方法
    // 加载讲师列表数据
    fetchData(page = 1) {
      console.log('翻页。。。' + page)
      // 异步获取远程数据（ajax）
      this.page = page
      this.courseQuery.teacherId = this.teacherId
      console.log(this.courseQuery)
      course.getListCourse(this.page, this.limit, this.courseQuery).then(
        response => {
          this.list = response.data.list

          this.total = response.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.courseQuery = {}
      // 查询所有讲师数据
      this.fetchData()
    },
    // 当页码发生改变的时候
    changeSize(size) {
      // console.log(size)
      this.limit = size
      this.fetchData(1)
    },
    // 删除课程的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        course.deleteCourseId(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 回到列表页面
            this.fetchData()
          })
      }) // 点击取消，执行catch方法
    },
    // 下架课程的方法
    privateDataById(id) {
      this.$confirm('此操作将下架课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确定，执行then方法
        // 调用删除的方法
        course.privateCourseId(id)
          .then(response => { // 下架成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '下架成功!'
            })
            // 回到列表页面
            this.fetchData()
          })
      }) // 点击取消，执行catch方法
    }

  }
}
</script>
