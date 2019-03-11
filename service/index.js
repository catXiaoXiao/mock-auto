import request from '../utils/request'
export const product = body => request({ url: '/filter', method: 'GET', body, mock: true })
