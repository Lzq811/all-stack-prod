/* year 模块使用的接口 */

import ajax from '../ajax'

/* list */
export const ReqList = params => ajax('/year/list', params, 'POST')

/* 删除 */
export const ReqDelete = params => ajax('/year/delete', params, 'POST')

/* 新增 */
export const ReqAdd = params => ajax('/year/add', params, 'POST')

/* 更新 */
export const ReqUpdate = params => ajax('/year/update', params, 'POST')

/* 更改默认选择 */
export const ReqSelect = params => ajax('/year/select', params, 'POST')