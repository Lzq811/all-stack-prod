import React, { Component } from 'react'

import moment from 'moment'

import './index.less'

export default class Header extends Component {

  state = {
    date: '',
    week: '',
    time: ''
  }

  initDate = () => {
    const date = moment().format('YYYY - MM - DD')
    const week = moment().format('dddd')
    this.setState({date, week})
  }

  initTime = () => {
    const time = moment().format('HH : mm : ss')
    this.setState({time})
  }

  toManage = () => {
    const {history} = this.props
    history.push('/back')
  }

  componentDidMount () {
    this.initDate()
    this.initTime()
    this.timer = setInterval(() => {
      this.initTime()
    }, 1000)
    this.timer2 = setInterval(() => {
      this.initDate()
    }, 60 * 60 * 1000)
  }

  componentWillUnmount () {
    if (this.timer) clearInterval(this.timer)
    if (this.timer2) clearInterval(this.timr2)
  }

  render () {
    const {date, week, time} = this.state
    return (
      <div className='header-wrap'>
        <div className='logo-pos' onClick={() => { this.toManage() }}></div>
        <h1 className='screen-title'>鹰云智能业务发展状况大屏</h1>
        <div className='time-box'>
          <p className='time'>{date} &nbsp; {week}</p>
          <p className='time'>{time}</p>
        </div>
      </div>
    )
  }
}