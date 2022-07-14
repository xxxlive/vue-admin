import request from '@/utils/request'

export default {
  getWeather(cityId) {
    return request({
      url: '/monitorservice/weather/getWeather/' + cityId,
      method: 'get'
    })
  }
}
