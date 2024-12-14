import { request } from '@/service/request'

export const getGoodsList = (data) =>
  request({
    url: '/member/goods/list',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })