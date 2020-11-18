import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'

// import md5 from 'js-md5'

/* 项目的入口文件 */

// React.Component.prototype.$md5 = md5 // 目前应该是只在登录页面使用就不用全局注册了

ReactDOM.render(<App />, document.getElementById('root'))
