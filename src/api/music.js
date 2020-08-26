import service from '@/utils/axios';

// eslint-disable-next-line import/prefer-default-export
export function playListDetail(params) {
  return service.request({
    method: 'GET',
    url: '/playlist/detail',
    params,
  });
}

export function playSong(params) {
  return service.request({
    method: 'GET',
    url: '/song/url',
    params,
  });
}
