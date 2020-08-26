import axios from 'axios';
import store from '@/store';

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { withCredentials: true },
});

// 添加请求拦截器
service.interceptors.request.use((config) => config,
  (error) => {
  // 对请求错误做些什么
    Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use((response) => (response),
  (error) => {
  // 对响应错误做点什么
    const info = { type: 'danger', message: '发生了一些意外:(' };
    store.commit('Notification', info);
    return Promise.reject(error);
  });

export default service;
