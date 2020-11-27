/* 左上角年份管理 */
import React from 'react'

import * as YearApi from '../../../api/year'

import './index.less'

export default class Year extends React.Component {

  state = {
    yearList: [],
    curr_year: sessionStorage.getItem('curr_year') || ''
  }

  getYear = async () => {
    const res = await YearApi.ReqList({})
    if (res.code === 0) {
      res.objectResult.list.forEach(item => {
        if (item.selectDefault) {
          this.setState({curr_year: item.id})
          sessionStorage.setItem("curr_year", item.id)
        }
      })
      this.setState({yearList: res.objectResult.list})
    }
  }

  handleClick = id => {
    this.setState({curr_year: id})
    sessionStorage.setItem("curr_year", id)
  }

  componentDidMount () {
    this.getYear()
  }

  render () {
    const {yearList, curr_year} = this.state
    return (
      <div className='screen-year-wrap'>
        {yearList.map(item => <p className={item.id === curr_year ? 'year-item active' : 'year-item'} onClick={() => {this.handleClick(item.id)}} key={item.id}>{item.year}</p>)}
      </div>
    )
  }
}