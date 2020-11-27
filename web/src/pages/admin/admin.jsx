/* 后台管理主路由组件 */

import React, {Component} from 'react'

import {message} from 'antd'

import './admin.less'
export default class Admin extends Component {

  state = {
    screenData: [
      {
        itemName: '大屏展示',
        pictureUrl: 'http://big-screen.oss-cn-shenzhen.aliyuncs.com/beijingRoad/develop.png',
        targetLink: '/web'
      },
      {
        itemName: '后台管理',
        pictureUrl: 'http://big-screen.oss-cn-shenzhen.aliyuncs.com/beijingRoad/passenger.png',
        targetLink: '/back'
      }
    ],
    // initScreenNum: Array.from(Array(6), (v,k) =>k), // 創建一個長度為6的數組
    currentIndex: -1,
    defaultItemSrc: 'http://big-screen.oss-cn-shenzhen.aliyuncs.com/beijingRoad/login/default.png'
  }

  handleClick = (index) => {
    const {screenData} = this.state
    if (screenData[index].targetLink && screenData[index].targetLink.length > 0) {
      this.props.history.push(screenData[index].targetLink)
    } else {
      message.warn('当前屏幕暂未开放...')
    }
  }

  mouseEnter = (index) => {
    this.setState({
      currentIndex: index
    })
  }
  mouseLeave = () => {
    this.setState({
      currentIndex: -1
    })
  }

  checkToken = () => {
    const token = sessionStorage.getItem('token')
    if (!token || token.length <= 0) {
      // 说明没有正常登陆
      this.props.history.push('/login') // 到登陆页面
    }
  }

  componentDidMount () {
    this.checkToken()
  }

  render() {

    const {screenData, defaultItemSrc, currentIndex} = this.state

    return ( 
      <div className='admin-warp'>
        <div className='left-top-logo'>
          <img src='http://big-screen.oss-cn-shenzhen.aliyuncs.com/beijingRoad/login/yy_white_logo.png' alt=''/>
        </div>
        <div className='title-box'>鹰云智能数据管理</div>
        <div className="right_bottom_area_anmation">
          <div className="inside_wrap">
            <div className="blue_ball"></div>
            <div className="girl_img"></div>
            <div className="boy_img"></div>
            <div className="little_ball"></div>
            <div className="little_ball_op"></div>
            <div className="gold_coin"></div>
          </div>
        </div>
        <div className='left-bottom-area'></div>
        <div className='left-bottom-desc'>
          <p>成为最有价值的</p>
          <p>商业数据决策服务提供商</p>
        </div>
        <div className='main-area'>
          {
            screenData.map((item, index) => (
              <div
                onMouseEnter={() => {this.mouseEnter(index)}}
                onMouseLeave={this.mouseLeave}
                onClick={() => {this.handleClick(index)}}
                key={item.itemName} className={`list-item ${index === currentIndex ? 'active' : null}`}
                style={{
                  backgroundImage: 'url(' + (item.pictureUrl.length > 0 ? item.pictureUrl : defaultItemSrc) + ')'
                }}>
                <h3>{item.itemName}</h3>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
