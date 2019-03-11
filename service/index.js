import request from '../utils/request'
export const product = data => request({ url: '/filter', method: 'GET', data })
