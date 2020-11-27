/* prod */
import ajax from '../ajax'

export const ReqList = params => ajax('/prod/list', params, 'POST')
export const ReqAdd = params => ajax('/prod/add', params, 'POST')
export const ReqUpdate = params => ajax('/prod/update', params, 'POST')
export const ReqDelete = params => ajax('/prod/delete', params, 'POST')
