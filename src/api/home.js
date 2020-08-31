import service from '@/utils/axios'

export function getBanners () {
  return service.request({
    method: 'GET',
    url: '/banner'
  })
}

export default {
  getBanners
}
