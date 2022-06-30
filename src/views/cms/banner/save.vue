<template>
  <div class="app-container">
    轮播图表单
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="banner.title"/>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="banner.linkUrl"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="banner.sort" controls-position="right" min="0"/>
      </el-form-item>
      <!-- 轮播图 -->
      <el-form-item label="轮播图">

        <el-upload
          ref="upload1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss'"
          class="avatar-uploader">
          <el-image :src="banner.imageUrl"/>
        </el-upload>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
// 引入调用banner.js文件
import bannerApi from '@/api/cms/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      banner: {
        title: '',
        sort: 0,
        linkUrl: '',
        imageUrl: '/static/null.jpg'
      },
      srcList: [],
      BASE_API: process.env.BASE_API, // 接口API地址

      // 上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, // 上传组件key值
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  watch: { // 监听
    $route(to, from) { // 路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  created() { // 页面渲染之前执行
    this.init()
  },
  methods: {
    // 上传成功调用的方法
    handleAvatarSuccess(res, file) {
      this.banner.imageUrl = res.data.url
      this.$refs.upload1.clearFiles()// 清空原来上传的文件
    },

    // 上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPGOrPNG) {
        this.$message.error('上传轮播图只能是 JPG或者PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传轮播图大小不能超过 10MB!')
      }
      return isJPGOrPNG && isLt10M
    },
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id查询的方法
        this.getInfo(id)
      } else { // 路径没有id值，做添加
        // 清空表单
        this.banner = { imageUrl: '/static/null.jpg' }
      }
    },
    // 根据讲师id查询的方法
    getInfo(id) {
      bannerApi.getBannerInfo(id)
        .then(response => {
          this.banner = response.data.item
          this.srcList.push(this.banner.imageUrl)
        })
    },
    saveOrUpdate() {
      // 判断修改还是添加
      // 根据teacher是否有id
      if (!this.banner.id) {
        // 添加
        this.saveBanner()
      } else {
        // 修改
        this.updateBanner()
      }
    },
    // 修改讲师的方法
    updateBanner() {
      bannerApi.updateBannerInfo(this.banner)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/cms/banner/list' })
        })
    },
    // 添加讲师的方法
    saveBanner() {
      bannerApi.addBanner(this.banner)
        .then(response => { // 添加成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/cms/banner/list' })
        })
    }

  }
}
</script>
