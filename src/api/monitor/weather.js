import request from '@/utils/request'

export default {
  getWeather(cityId) {
    return request({
      url: '/monitorservice/weather/getWeather/' + cityId,
      method: 'get'
    })
  }, getFace(url) {
    return request({
      url: '/monitorservice/weather/getEmotion/?url=' + url,
      method: 'get'
    })
  }
}
