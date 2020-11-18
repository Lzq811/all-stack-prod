/*
* 所有的请求模块都在这里
* 处理结束
* 如果成功 返回 promise
* 如果失败 直接提示 请求错误
* 配合 async await 来使用 await放在ajax请求的前面 async放在距离await最近的函数的参数前面
* function login async (username, password) {
*   const result = await ReqLogin(username, password) // result 就是请求成功返回的结果data
* }
*/

import ajax from './ajax'

export const ReqLogin = (params) => ajax('/user/login', params, 'POST')