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
      <el-form-item label="轮播视频">
        <!--        <el-upload
          ref="upload1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss'"
          class="avatar-uploader">
          <el-image :src="banner.imageUrl"/>
        </el-upload>-->
        <video id="playVideos" :src="banner.imageUrl+'#t=0'" style="aspect-ratio: 16/9; height: 300px" controls playsinline preload="none"/>
        <el-upload
          ref="upload1"
          :on-success="handleVodUploadSuccess"
          :on-remove="handleVodRemove"
          :before-remove="beforeVodRemove"
          :on-exceed="handleUploadExceed"
          :file-list="fileList"
          :action="BASE_API+'/eduvod/video/uploadAlyiVideo'"
          :limit="1"
          class="upload-demo">
          <el-button size="small" type="primary">上传视频</el-button>
          <el-tooltip placement="right-end">
            <div slot="content">最大支持1G，<br>
              支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
              GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
              MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
              SWF、TS、VOB、WMV、WEBM 等视频格式上传
            </div>
            <i class="el-icon-question"/>
          </el-tooltip>
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
import PanThumb from '@/components/PanThumb'
import videoApi from '@/api/edu/video'

export default {
  components: { PanThumb },
  data() {
    return {
      banner: {
        title: '',
        sort: 0,
        linkUrl: '',
        imageUrl: '/static/null.mp4'
      },
      srcList: [],
      fileList: [],
      BASE_API: process.env.BASE_API, // 接口API地址
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
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        // 调用根据id查询的方法
        this.getInfo(id)
      } else { // 路径没有id值，做添加
        // 清空表单
        this.banner = { imageUrl: '/static/null.mp4' }
      }
    },
    // 根据讲师id查询的方法
    getInfo(id) {
      bannerApi.getBannerInfo(id)
        .then(response => {
          console.log(response)
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
      console.log('this banner:')
      console.log(this.banner)
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
    },
    // 点击确定调用的方法
    handleVodRemove() {
      // 调用接口的删除视频的方法
      videoApi.deleteAliyunvod(this.banner.imageUrl)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '删除视频成功!'
          })
          // 把文件列表清空
          this.srcList = []
        })
    },
    // 点击×调用这个方法
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传视频成功调用的方法
    handleVodUploadSuccess(response, file, fileList) {
      console.log('vod response')
      console.log(response)
      // 上传视频URL赋值
      this.banner.imageUrl = response.data.videoURL
      const videos = document.getElementById('playVideos')
      videos.src = this.video.videoSourceUrl + '#t=0'
    },
    handleUploadExceed() {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    }
  }
}
</script>
<style>

</style>
