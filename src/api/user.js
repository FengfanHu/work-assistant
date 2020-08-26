import service from '@/utils/axios';

// eslint-disable-next-line import/prefer-default-export
export function getUserDetail(params) {
  return service.request({
    method: 'GET',
    url: '/user/detail',
    params,
  });
}

export function getPlayList(params) {
  return service.request({
    method: 'GET',
    url: '/user/playlist',
    params,
  });
}
