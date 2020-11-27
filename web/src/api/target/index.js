/* 业务发展目标api */

import ajax from '../ajax'

export const ReqAdd = params => ajax('/target/add', params, 'POST')

export const ReqGet = params => ajax('/target/list', params, 'POST')

export const ReqUpdate = params => ajax('/target/update', params, 'POST')