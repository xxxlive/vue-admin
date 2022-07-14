import request from '@/utils/request'

const api_name = '/eduorder/order'

export default {
  getOrderList(page, limit) {
    return request({
      url: api_name + '/getAllCourse' + '/' + page + '/' + limit,
      method: 'get'
    })
  }
}
