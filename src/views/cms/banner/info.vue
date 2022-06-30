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

        <!-- 头衔缩略图 -->
        <pan-thumb :image="banner.imageUrl"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换轮播图
        </el-button>

        <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调
        <input type="file" name="file"/>
      -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
