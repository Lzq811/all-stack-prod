/* 月营收情况 */

import ajax from '../ajax'

export const ReqAdd = params => ajax('/income/add', params, 'POST')

export const ReqList = params => ajax('/income/list', params, 'POST')

export const ReqUpdate = params => ajax('/income/update', params, 'POST')

export const ReqDelete = params => ajax('/income/delete', params, 'POST')