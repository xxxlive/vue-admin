import request from '@/utils/request'

export default {
  getKeySize() {
    return request({
      url: '/monitorservice/redis/keysSize',
      method: 'get'
    })
  },
  getMemoryInfo() {
    return request({
      url: '/monitorservice/redis/memoryInfo',
      method: 'get'
    })
  },
  getRedisInfo() {
    return request({
      url: '/monitorservice/redis/info',
      method: 'get'
    })
  }
}
