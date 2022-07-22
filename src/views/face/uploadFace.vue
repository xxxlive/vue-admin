<template>
  <div>
    <a-row :gutter="0">
      <a-card>
        <a-col :span="4">
          <el-button type="primary" icon="el-icon-upload" style="margin-top: 5px" @click="imagecropperShow=true">Upload
          Emotion Expression
          </el-button>
        </a-col>
      </a-card>
    </a-row>

    <image-cropper
      v-show="imagecropperShow"
      :width="300"
      :height="300"
      :url="BASE_API+'/eduoss/fileoss'"
      field="file"
      @close="closeImageCropper"
      @crop-upload-success="cropSuccess"/>

  </div>
</template>

<script>
import ImageCropper from '../../components/ImageCropper'
import weather from '../../api/monitor/weather'

export default {
  name: 'UploadFace',
  components: {
    ImageCropper
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API,
      avatar: ''
    }
  },
  methods: {
    closeImageCropper() { // 关闭上传弹框的方法
      this.imagecropperShow = false
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 上传成功方法
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      // 上传之后接口返回图片地址
      this.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
      weather.getFace(data.url).then(respose => {
        alert('检测结果为' + respose.data.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
