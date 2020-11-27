/* 公司简介api */
import ajax from '../ajax'

export const ReqList = params => ajax('/company/list', params, 'POST')
export const ReqAdd = params => ajax('/company/add', params, 'POST')
export const ReqUpdate = params => ajax('/company/update', params, 'POST')
export const ReqDelete = params => ajax('/company/delete', params, 'POST')
