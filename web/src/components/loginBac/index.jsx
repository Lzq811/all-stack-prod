/* 登录页面背景效果组件 */

import React,{ Component } from 'react'

import './b.min.css'
import './index.less'

export default class LoginBac extends Component {

  state = {
    ballNum: Array.from(Array(40), (v,k) =>k) // 創建一個長度為40的數組
  } 

  render () {
    return (
      <div className='login-bac-wrap hotBrand'>
        {
          this.state.ballNum.map(item => (
            <div key={item} className='circle-container'><div className="circle"></div></div>
          ))
        }
      </div>
    )
  }
}