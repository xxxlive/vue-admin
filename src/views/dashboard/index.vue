<template>
  <div class="dashboard-container">
    <a-row :gutter="0" class="head-info">
      <a-card class="head-info-card">
        <a-col :span="4">
          <img :src="avatar" alt="头像" contain height="150px" width="150px" style="margin-top: 0px; border: #000000 2px; border-radius: 4px">
          <el-button type="primary" icon="el-icon-upload" style="margin-top: 5px; width: 150px" @click="imagecropperShow=true">更换头像
          </el-button><div/>
          <el-button type="primary" icon="el-icon-refresh" style="margin-top: 5px; width: 150px" @click="passwordChangerShow=true">更改密码
          </el-button>
        </a-col>
        <a-col :span="10">
          <section class="comm-title" style="margin-top: 10px">
            <div >
              <h4>{{ welcomeMessage }}</h4>
            </div>
            <div>
              角色：{{ roles === '' ? roles : '超级管理员' }}
            </div>
          </section>
        </a-col>
        <a-col :span="10" class="project-wrapper">
          <a-card title="进行中的项目" class="project-card">
            <a slot="extra" href="https://github.com/xxxlive?tab=repositories" target="_blank">所有项目</a>
            <table>
              <tr>
                <td>
                  <div class="project-avatar-wrapper">
                    <a-avatar class="project-avatar">{{ projects[0].avatar }}</a-avatar>
                  </div>
                  <div class="project-detail">
                    <div class="project-name">
                      {{ projects[0].name }}
                    </div>
                    <div class="project-desc">
                      <p>{{ projects[0].des }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="project-avatar-wrapper">
                    <a-avatar class="project-avatar">{{ projects[1].avatar }}</a-avatar>
                  </div>
                  <div class="project-detail">
                    <div class="project-name">
                      {{ projects[1].name }}
                    </div>
                    <div class="project-desc">
                      <p>{{ projects[1].des }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="project-avatar-wrapper">
                    <a-avatar class="project-avatar">{{ projects[4].avatar }}</a-avatar>
                  </div>
                  <div class="project-detail">
                    <div class="project-name">
                      {{ projects[4].name }}
                    </div>
                    <div class="project-desc">
                      <p>{{ projects[4].des }}</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="project-avatar-wrapper">
                    <a-avatar class="project-avatar">{{ projects[2].avatar }}</a-avatar>
                  </div>
                  <div class="project-detail">
                    <div class="project-name">
                      {{ projects[2].name }}
                    </div>
                    <div class="project-desc">
                      <p>{{ projects[2].des }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="project-avatar-wrapper">
                    <a-avatar class="project-avatar">{{ projects[3].avatar }}</a-avatar>
                  </div>
                  <div class="project-detail">
                    <div class="project-name">
                      {{ projects[3].name }}
                    </div>
                    <div class="project-desc">
                      <p>{{ projects[3].des }}</p>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </a-card>
        </a-col>
      </a-card>
    </a-row>
    <a-row>
      <a-card>
        <a-col :span="12">
          <div v-show="!loading" class="weather-area">
            <div class="weather-chart-info">
              <apexchart
                ref="seven"
                :options="seven.chartOptions"
                :series="seven.series"
                height="350"
                width="600"
                type="line"/>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="weather-chart-info">
            <apexchart
              ref="future"
              :options="future.chartOptions"
              :series="future.series"
              height="350"
              width="600"
              type="area"/>
          </div>
        </a-col>
      </a-card>
    </a-row>

    <div class="weather-area">
      <div class="weather-info">
        <a-card :loading="loading" :title="weather.countyName + ' 当前天气'">
          <a-row>
            <a-col :span="8"><p>天气：{{ weather.realtime.weather }}</p></a-col>
            <a-col :span="8"><p>风向：{{ weather.realtime.wD }}</p></a-col>
            <a-col :span="8"><p>风力大小：{{ weather.realtime.wS }}</p></a-col>
          </a-row>
          <a-row>
            <a-col :span="8"><p>温度：{{ weather.realtime.temp }}℃</p></a-col>
            <a-col :span="8"><p>体感温度：{{ weather.realtime.sendibleTemp }}℃</p></a-col>
            <a-col :span="8"><p>空气湿度：{{ weather.realtime.sD }}%</p></a-col>
          </a-row>
          <a-row>
            <a-col :span="8"><p>更新时间：{{ weather.realtime.time }}</p></a-col>
          </a-row>
        </a-card>
      </div>
      <div class="weather-info">
        <a-card :loading="loading" :title="weather.countyName + ' 未来天气'">
          <a-row>
            <a-col v-for="(w, index) in weather.weathers" :span="24" :key="index">
              <template v-if="index !== 6">
                <p>{{ w.date }}【{{ w.week }}】：日出时间 --- {{ w.sun_rise_time }} 日落时间 --- {{ w.sun_down_time }} 天气 ---
                  {{ w.weather }}</p>
              </template>
            </a-col>
          </a-row>
        </a-card>
      </div>
      <div class="weather-info">
        <a-card :loading="loading" :title="weather.countyName + ' 生活指数'">
          <a-row>
            <a-col v-for="(i, index) in weather.indexes" :span="24" :key="index">
              <p>{{ i.name }} --- {{ i.content }}</p>
            </a-col>
          </a-row>
        </a-card>
      </div>
      <div v-if="weather.alarms.length" class="weather-info">
        <a-card :loading="loading" :title="weather.countyName + ' 预警信息'">
          <a-col :span="24">
            <p>预警标题 --- {{ weather.alarms[0].alarmDesc }}</p>
            <p>预警类型 --- {{ weather.alarms[0].alarmTypeDesc }}</p>
            <p>预警等级 --- {{ weather.alarms[0].alarmLevelNoDesc }}</p>
            <p>发布时间 --- {{ weather.alarms[0].publishTime }}</p>
            <p>预防措施 --- {{ weather.alarms[0].precaution }}</p>
            <a-popover title="预警详情">
              <template slot="content">
                <div style="max-width: 360px">{{ weather.alarms[0].alarmContent }}</div>
              </template>
              <p>预警详情 --- {{ weather.alarms[0].alarmContent }}</p>
            </a-popover>
          </a-col>
        </a-card>
      </div>
    </div>
    <PasswordChanger
      v-show="passwordChangerShow"
      :width="300"
      :height="300"
      @close="closePasswordChanger"/>

    <image-cropper
      v-show="imagecropperShow"
      :width="300"
      :height="300"
      :key="imagecropperKey"
      :url="BASE_API+'/eduoss/fileoss'"
      field="file"
      @close="closeImageCropper"
      @crop-upload-success="cropSuccess"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImageCropper from '../../components/ImageCropper'
import PasswordChanger from '../../components/PasswordChanger'
import weather from '../../api/monitor/weather'
import userApi from '../../api/acl/user'

export default {
  name: 'Dashboard',
  components: { PasswordChanger, ImageCropper },
  data() {
    return {
      user: {},
      passwordChangerShow: false,
      imagecropperShow: false,
      imagecropperKey: 0, // 上传组件key值
      BASE_API: process.env.BASE_API, // 获取dev.env.js里面地址
      saveBtnDisabled: false, // 保存按钮是否禁用
      projects: [
        {
          name: '东软猪肉订单',
          des: '一定不能有寄生虫',
          avatar: 'F'
        },
        {
          name: '百度可乐订单',
          des: '他们真的不喝百事可乐',
          avatar: 'F'
        },
        {
          name: '阿里巴巴面包订单',
          des: '肉松面包',
          avatar: 'S'
        },
        {
          name: '腾讯老干妈订单',
          des: '摊牌了是假的老干妈',
          avatar: 'F'
        },
        {
          name: '字节跳动冰淇淋订单',
          des: '加班做',
          avatar: 'F'
        }
      ],
      weather: {
        provinceName: '',
        countyName: '',
        weathers: [],
        day_c: [],
        night_c: [],
        hours_c: [],
        dateArr: [],
        timeArr: [],
        publishTime: '',
        alarms: [],
        realtime: {},
        indexes: []
      },
      welcomeMessage: '',
      dataSource: [],
      storage: [],
      areaId: '101070201',
      seven: {
        series: [],
        chartOptions: {
          chart: {
            shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#f5564e', '#35d0ba'],
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'smooth'
          },
          markers: {
            size: 4
          },
          xaxis: {},
          yaxis: {}
        }
      },
      future: {
        series: [],
        chartOptions: {
          chart: {
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {}
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'id',
      'teacherId',
      'avatar',
      'nickName'
    ])
  },
  created() {
    this.welcomeMessage = this.welcome()
    this.onselect()
    this.searchWeather()
  },
  methods: {
    closePasswordChanger() {
      this.passwordChangerShow = false
    },
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

      userApi.getById(this.id)
        .then(response => {
          this.user = response.data.item
          this.user.salt = data.url
          userApi.updateById(this.user)
            .then(response => { // 修改成功
              // 提示信息
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              location.reload()
            })
        })
    },
    welcome() {
      const date = new Date()
      const hour = date.getHours()
      const time = hour < 6 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour <= 18 ? '下午好' : '晚上好')))
      const welcomeArr = [
        '手离手机📱远一些，离键盘⌨️近一些，就距离成功近一些',
        '喝杯咖啡☕️休息下吧',
        '你变秃🦲了吗?',
        '要不要和朋友打局LOL手游🎮',
        '当你的代码量💻超过5MB的时候，你就会变强',
        '今天又写了几个Bug🐞呢',
        '今天在群里吹水了吗',
        '今天吃了什么好吃🍲的呢',
        '今天您微笑了吗😊',
        '今天帮助别人解决问题了吗',
        '准备吃些什么🍚呢',
        '周末要不要去看电影🎬？'
      ]
      const index = Math.floor((Math.random() * welcomeArr.length))
      return time.toString() + '，' + this.nickName + '。' + welcomeArr[index]
    }, handleSearch(value) {
      this.dataSource = []
      this.storage = []
      this.areaId = ''
      if (!value) {
        return
      }
      for (let i = 0; i < this.citys.length; i++) {
        const currentCity = this.citys[i]
        if (currentCity.countyname.indexOf(value) !== -1) {
          this.dataSource.push(currentCity.countyname)
          this.storage.push(currentCity.areaid)
        }
      }
    },
    onselect() {
      this.areaId = '101070201'
    }, searchWeather() {
      weather.getWeather(this.areaId).then((r) => {
        const data = JSON.parse(r.data.data)
        if (data.code === '200') {
          this.weather = {
            countyName: '',
            weathers: [],
            day_c: [],
            night_c: [],
            hours_c: [],
            dateArr: [],
            timeArr: [],
            publishTime: ''
          }
          this.loading = false
          console.log(data)
          this.weather.provinceName = data.value[0].provinceName
          this.weather.countyName = data.value[0].city
          this.weather.weathers = data.value[0].weathers
          this.weather.alarms = data.value[0].alarms
          this.weather.realtime = data.value[0].realtime
          this.weather.indexes = data.value[0].indexes
          const weathers = this.weather.weathers
          let min = 0
          let max = 0
          for (let i = 0; i < weathers.length; i++) {
            if (i === weathers.length - 1) {
              this.weather.day_c.unshift(parseFloat(weathers[i].temp_day_c))
              this.weather.night_c.unshift(parseFloat(weathers[i].temp_night_c))
              this.weather.dateArr.unshift(weathers[i].date.split('-')[1] + '-' + weathers[i].date.split('-')[2])
            } else {
              this.weather.day_c.push(parseFloat(weathers[i].temp_day_c))
              this.weather.night_c.push(parseFloat(weathers[i].temp_night_c))
              this.weather.dateArr.push(weathers[i].date.split('-')[1] + '-' + weathers[i].date.split('-')[2])
            }
            if (i === 0) {
              max = this.weather.day_c[0]
              min = this.weather.night_c[0]
            } else {
              if (this.weather.day_c[i] > max) {
                max = this.weather.day_c[i]
              }
              if (this.weather.night_c[i] < min) {
                min = this.weather.night_c[i]
              }
            }
          }
          const weather3HoursDetailsInfos = data.value[0].weatherDetailsInfo.weather3HoursDetailsInfos
          this.weather.publishTime = data.value[0].weatherDetailsInfo.publishTime
          for (let i = 0; i < weather3HoursDetailsInfos.length; i++) {
            const time = weather3HoursDetailsInfos[i].endTime.split(' ')[1].split(':')
            this.weather.hours_c.push(parseFloat(weather3HoursDetailsInfos[i].highestTemperature))
            this.weather.timeArr.push(time[0] + ':' + time[1])
          }
          this.$refs.seven.updateSeries([
            {
              name: '最高温',
              data: this.weather.day_c
            },
            {
              name: '最低温',
              data: this.weather.night_c
            }
          ], true)
          this.$refs.future.updateSeries([
            {
              name: '未来气温',
              data: this.weather.hours_c
            }
          ])
          this.$refs.seven.updateOptions({
            xaxis: {
              categories: this.weather.dateArr
            },
            yaxis: {
              min: min - 5,
              max: max + 5
            },
            title: {
              text: `${this.weather.provinceName} - ${this.weather.countyName}未来七日气温`,
              align: 'center'
            }
          }, true, true)
          this.$refs.future.updateOptions({
            xaxis: {
              categories: this.weather.timeArr
            },
            title: {
              text: `${this.weather.provinceName} - ${this.weather.countyName}未来气温细节`,
              align: 'center'
            }
          }, true, true)
        }
      }).catch((r) => {
        console.error(r)
        this.$message.error('天气查询失败')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<style lang="scss">
.home-page {
  .head-info {
    margin-bottom: .5rem;

    .head-info-card {
      padding: .5rem;
      border-color: #f1f1f1;

      .head-info-avatar {
        display: inline-block;
        float: left;
        margin-right: 1rem;

        img {
          width: 5rem;
          border-radius: 2px;
        }
      }

      .head-info-count {
        display: inline-block;
        float: left;

        .head-info-welcome {
          font-size: 1.05rem;
          margin-bottom: .1rem;
        }

        .head-info-desc {
          color: rgba(0, 0, 0, 0.45);
          font-size: .8rem;
          padding: .2rem 0;

          p {
            margin-bottom: 0;
          }
        }

        .head-info-time {
          color: rgba(0, 0, 0, 0.45);
          font-size: .8rem;
          padding: .2rem 0;
        }
      }
    }
  }

  .count-info {
    .visit-count-wrapper {
      padding-left: 0 !important;

      .visit-count {
        padding: .5rem;
        border-color: #f1f1f1;

        .ant-card-body {
          padding: .5rem 1rem !important;
        }
      }
    }

    .project-wrapper {
      padding-right: 0 !important;

      .project-card {
        border: none !important;

        .ant-card-head {
          border-left: 1px solid #f1f1f1 !important;
          border-top: 1px solid #f1f1f1 !important;
          border-right: 1px solid #f1f1f1 !important;
        }

        .ant-card-body {
          padding: 0 !important;

          table {
            width: 100%;

            td {
              width: 50%;
              border: 1px solid #f1f1f1;
              padding: .6rem;

              .project-avatar-wrapper {
                display: inline-block;
                float: left;
                margin-right: .7rem;

                .project-avatar {
                  color: #42b983;
                  background-color: #d6f8b8;
                }
              }
            }
          }
        }

        .project-detail {
          display: inline-block;
          float: left;
          text-align: left;
          width: 78%;

          .project-name {
            font-size: .9rem;
            margin-top: -2px;
            font-weight: 600;
          }

          .project-desc {
            color: rgba(0, 0, 0, 0.45);

            p {
              margin-bottom: 0;
              font-size: .6rem;
              white-space: normal;
            }
          }
        }
      }
    }
  }
}

</style>
