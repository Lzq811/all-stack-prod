/* 最新签约api */
import ajax from '../ajax'

export const ReqList = params => ajax('/sign/list', params, 'POST')
export const ReqAdd = params => ajax('/sign/add', params, 'POST')
export const ReqUpdate = params => ajax('/sign/update', params, 'POST')
export const ReqDelete = params => ajax('/sign/delete', params, 'POST')
