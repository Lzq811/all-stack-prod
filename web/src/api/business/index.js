/* 业务情况api */
import ajax from '../ajax'

// 渠道 trech    产品 product   行业 business 回款 remoney  交付 delivery
export const ReqList = params => ajax('/business/list', params, 'POST')
export const ReqAdd = params => ajax('/business/add', params, 'POST')
export const ReqUpdate = params => ajax('/business/update', params, 'POST')
export const ReqDelete = params => ajax('/business/delete', params, 'POST')
