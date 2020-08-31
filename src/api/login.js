import service from '@/utils/axios'

export function Login (params) {
  return service.request({
    method: 'GET',
    url: '/login/cellphone',
    params
  })
}

export function CheckStatus () {
  return service.request({
    method: 'GET',
    url: '/login/status'
  })
}
