/* 页面头部的 选择年份， 搜索， 新增 */

import React, {Component} from 'react'

import { Button, Select } from 'antd'

import * as YearApi from '../../../api/year'

import './index.less'

const { Option } = Select

export default class SearchBox extends Component {

  state = {
    curr: '',
    select: [],
    currMonth: sessionStorage.getItem('curr_month') ||  String(new Date().getMonth() + 1),
    monthList: [
      {month: '1月', id: '1'},
      {month: '2月', id: '2'},
      {month: '3月', id: '3'},
      {month: '4月', id: '4'},
      {month: '5月', id: '5'},
      {month: '6月', id: '6'},
      {month: '7月', id: '7'},
      {month: '8月', id: '8'},
      {month: '9月', id: '9'},
      {month: '10月', id: '10'},
      {month: '11月', id: '11'},
      {month: '12月', id: '12'}
    ]
  }

  initYear = async () => {
    const res = await YearApi.ReqList({})
    if (res.code === 0) {
      const tmp = res.objectResult.list.filter(item => item.selectDefault)
      this.setState({curr: tmp[0].id, select: res.objectResult.list || [], currMonth: tmp[0].curr_month})
      sessionStorage.setItem('curr_year', tmp[0].id)
      sessionStorage.setItem('curr_month', tmp[0].curr_month)
    }
  }

  getlist = () => {
    this.props.search()
  }
  add = () => {
    this.props.add()
  }

  handleChange = data => {
    this.setState({curr: data})
    sessionStorage.setItem('curr_year', data)
    setTimeout(() => {this.getlist()}, 200)
  }

  handleChangeMonth = data => {
    sessionStorage.setItem('curr_month', data)
    this.setState({currMonth: data})
    setTimeout(() => {this.getlist()}, 200)
  }

  componentDidMount () {
    sessionStorage.setItem('curr_month', this.state.currMonth)
    this.initYear()
  }

  render () {

    const { curr, select, monthList, currMonth } = this.state
    const { month, year } = this.props

    return (
      <div className='search-box-wrap'>
        <div className='select-box'>
          {
            year ? (
              <Select key={curr} defaultValue={curr} style={{ width: 180 }} size='large' className='select-el' onChange={this.handleChange}>
                {select.map(item => (<Option className='y-select-option' key={item.id} value={item.id}>{item.year}</Option>))}
              </Select>
            ) : ''
          }
          &nbsp; &nbsp; &nbsp; &nbsp;
          {
            month ? (
              <Select key={currMonth} defaultValue={currMonth} style={{ width: 180 }} size='large' className='select-el' onChange={this.handleChangeMonth}>
                {monthList.map(item => (<Option className='y-select-option' key={item.id} value={item.id}>{item.month}</Option>))}
              </Select>
            ) : ''
          }
         
        </div>
        
        <div className='search-box-btn'>
          <Button type="primary" onClick={this.getlist}> 搜索 </Button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <Button type="primary" onClick={this.add}> 新增 </Button>
        </div>
      </div>
    )
  }
}