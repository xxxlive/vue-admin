<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名:{{ name }}</div>
    <div class="dashboard-text">绑定教师id:{{ teacherId }}</div>
    <a-row :gutter="8" class="head-info">
      <a-card class="head-info-card">
        <a-col :span="12">
          <div class="head-info-avatar">
            <img :src="avatar" alt="头像" style="{width: 50px;height: 50px}">
          </div>
          <div class="head-info-count">
            <div class="head-info-welcome">
              {{ welcomeMessage }}
            </div>
            <div class="head-info-desc">
              <p>角色：{{ roles === '' ? roles : '超级管理员' }} </p>
            </div>
          </div>
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

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import weather from '../../api/monitor/weather'

export default {
  name: 'Dashboard',
  data() {
    return {
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
    welcome() {
      const date = new Date()
      const hour = date.getHours()
      const time = hour < 6 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour <= 18 ? '下午好' : '晚上好')))
      const welcomeArr = [
        '手离手机远一些，离键盘近一些，就距离成功……',
        '喝杯咖啡休息下吧☕',
        '你变秃了吗?',
        '要不要和朋友打局LOL手游',
        '当你的代码量超过5MB的时候，你就会变……|',
        '今天又写了几个Bug🐞呢',
        '今天在群里吹水了吗',
        '今天吃了什么好吃的呢',
        '今天您微笑了吗😊',
        '今天帮助别人解决问题了吗',
        '准备吃些什么呢',
        '周末要不要去看电影？'
      ]
      const index = Math.floor((Math.random() * welcomeArr.length))
      return time.toString() + this.nickName + welcomeArr[index]
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
