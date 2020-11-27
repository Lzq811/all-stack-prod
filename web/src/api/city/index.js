/* city */
import ajax from '../ajax'

export const ReqList = params => ajax('/city/list', params, 'POST')
export const ReqAdd = params => ajax('/city/add', params, 'POST')
export const ReqUpdate = params => ajax('/city/update', params, 'POST')
export const ReqDelete = params => ajax('/city/delete', params, 'POST')
