/* 业务发展目标页面 */
import React, { Component } from 'react'

import { Form, Input, Button, message } from 'antd'
import { FormInstance } from 'antd/lib/form'

import * as IncomeApi from '../../../api/income'

import SearchBox from '../../../components/back/search-box'

import './index.less'

const { Item } = Form

export default class Income extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    disabled: true
  }

  getData = async () => {
    this.setState({disabled: true})
    const res = await IncomeApi.ReqGet({curr_year: sessionStorage.getItem('curr_year'), curr_month: sessionStorage.getItem('curr_month')})
    if (res.code === 0) {
      if (res.objectResult.list.length <= 0) {
        message.info('当前选中月份数据还未创建，请单击新增!')
      } else {
        this.onFill(res.objectResult.list[0])
      }
    }
  }

  addData = async () => {
    const res = await IncomeApi.ReqAdd({curr_year: sessionStorage.getItem('curr_year'), curr_month: sessionStorage.getItem('curr_month')})
    if (res.code === 0) {
      message.success('数据新增成功! 请及时赋值！')
      this.getData()
    } else {
      message.error(res.msg)
    }
  }

  onFinish = async (values) => {
    const year = sessionStorage.getItem('curr_year')
    const res = await IncomeApi.ReqUpdate({curr_year: year, curr_month: sessionStorage.getItem('curr_month'), ...values})
    if (res.code === 0) {
      message.success('数据更新成功!')
      this.setState({disabled: true})
    } else {
      message.error('数据更新失败!')
    }
  }

  onFill = record => {
    this.formRef.current.setFieldsValue({
      ...record
    })
  }

  edit = () => {
    this.setState({disabled: false})
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    const { disabled } = this.state
    return (
      <div className='income-wrap'>
        <div className='wrap-title'>月营收信息</div>
        <SearchBox search={this.getData} add={this.addData} showmonth={true} year={true}></SearchBox>
        <div className='form-content'>
          <Form
            ref={this.formRef}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}>
              <div className='form-item'>
                <p className='title'>鹰云智能</p>
                <Item
                  className='input-item'
                  label="收入(万元):"
                  name='afc_income'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="成本(万元):"
                  name='afc_cost'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="毛利(万元):"
                  name='afc_gross'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="费用合计(万元):"
                  name='afc_fee_total'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="营业利润(万元):"
                  name='afc_profit'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <div className='form-item'>
                <p className='title'>正佳网</p>
                <Item
                  className='input-item'
                  label="收入(万元):"
                  name='zjw_income'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="成本(万元):"
                  name='zjw_cost'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="毛利(万元):"
                  name='zjw_gross'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="费用合计(万元):"
                  name='zjw_fee_total'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="营业利润(万元):"
                  name='zjw_profit'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <div className='form-item'>
                <p className='title'>合计</p>
                <Item
                  className='input-item'
                  label="收入(万元):"
                  name='total_income'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="成本(万元):"
                  name='total_cost'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="毛利(万元):"
                  name='total_gross'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="费用合计(万元):"
                  name='total_fee_total'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="营业利润(万元):"
                  name='total_profit'
                  rules={[{ required: true, message: 'Please input your value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <Item className='search-btn' style={{textAlign: 'center', paddingTop: '10px'}}>
                <Button type="primary" htmlType="button" danger onClick={this.edit}> 编辑 </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" htmlType="submit"> 保存 </Button>
              </Item>
          </Form>
        </div>
      </div>
    )
  }
}