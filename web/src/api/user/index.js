/* user模块使用的接口 */

import ajax from '../ajax'

/* 查询所有用户 */
export const ReqUsersList = params => ajax('/user/list', params, 'POST')

/* 删除用户 */
export const ReqDeleteUser = params => ajax('/user/delete', params, 'POST')

/* 新增用户 */
export const ReqAddUser = params => ajax('/user/add', params, 'POST')

/* 更新用户 */
export const ReqUpdateUser = params => ajax('/user/update', params, 'POST')