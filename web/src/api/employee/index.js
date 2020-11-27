/* 鹰才情况 */
import ajax from '../ajax'

export const ReqList = params => ajax('/employee/list', params, 'POST')

export const ReqAdd = params => ajax('/employee/add', params, 'POST')

export const ReqUpdate = params => ajax('/employee/update', params, 'POST')

export const ReqDelete = params => ajax('/employee/delete', params, 'POST')