/* 业务发展目标页面 */
import React, { Component } from 'react'

import { Form, Input, Button, message } from 'antd'
import { FormInstance } from 'antd/lib/form'

import * as TargetApi from '../../../api/target'

import SearchBox from '../../../components/back/search-box'

import './index.less'

const { Item } = Form

export default class Target extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    disabled: true
  }

  getData = async () => {
    this.setState({disabled: true})
    const res = await TargetApi.ReqGet({curr_year: sessionStorage.getItem('curr_year')})
    if (res.code === 0) {
      if (res.objectResult.list.length <= 0) {
        message.info('当前选中月份数据还未创建，请单击新增!')
      } else {
        this.onFill(res.objectResult.list[0])
      }
    }
  }

  addData = async () => {
    const res = await TargetApi.ReqAdd({curr_year: sessionStorage.getItem('curr_year')})
    if (res.code === 0) {
      message.success('数据新增成功! 请及时赋值！')
    } else {
      message.error(res.msg)
    }
  }

  onFinish = async (values) => {
    const year = sessionStorage.getItem('curr_year')
    const res = await TargetApi.ReqUpdate({curr_year: year, ...values})
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
      <div className='target-wrap'>
        <div className='wrap-title'>业务发展目标</div>
        <SearchBox search={this.getData} add={this.addData} year={true}></SearchBox>
        <div className='form-content'>
          <Form
            ref={this.formRef}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}>
              <div className='form-item'>
                <p className='title'>合同额</p>
                <Item
                  className='input-item'
                  label="目标:"
                  name='contract_target'
                  rules={[{ required: true, message: 'Please input your target value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="实际:"
                  name='contract_real'
                  rules={[{ required: true, message: 'Please input your real value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="完成率:"
                  name='contract_rate'
                  rules={[{ required: true, message: 'Please input your done rate value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <div className='form-item'>
                <p className='title'>首付款</p>
                <Item
                  className='input-item'
                  label="目标:"
                  name='firstpay_target'
                  rules={[{ required: true, message: 'Please input your target value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="实际:"
                  name='firstpay_real'
                  rules={[{ required: true, message: 'Please input your real value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="完成率:"
                  name='firstpay_rate'
                  rules={[{ required: true, message: 'Please input your done rate value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <div className='form-item'>
                <p className='title'>支付率</p>
                <Item
                  className='input-item'
                  label="目标:"
                  name='payrate_target'
                  rules={[{ required: true, message: 'Please input your target value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="实际:"
                  name='payrate_real'
                  rules={[{ required: true, message: 'Please input your real value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="完成率:"
                  name='payrate_rate'
                  rules={[{ required: true, message: 'Please input your done rate value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <div className='form-item'>
                <p className='title'>毛利率</p>
                <Item
                  className='input-item'
                  label="目标:"
                  name='rateofmargin_target'
                  rules={[{ required: true, message: 'Please input your target value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="实际:"
                  name='rateofmargin_real'
                  rules={[{ required: true, message: 'Please input your real value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="完成率:"
                  name='rateofmargin_rate'
                  rules={[{ required: true, message: 'Please input your done rate value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <div className='form-item'>
                <p className='title'>利润</p>
                <Item
                  className='input-item'
                  label="目标:"
                  name='profit_target'
                  rules={[{ required: true, message: 'Please input your target value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="实际:"
                  name='profit_real'
                  rules={[{ required: true, message: 'Please input your real value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="完成率:"
                  name='profit_rate'
                  rules={[{ required: true, message: 'Please input your done rate value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <div className='form-item'>
                <p className='title'>经营成本</p>
                <Item
                  className='input-item'
                  label="目标:"
                  name='cost_target'
                  rules={[{ required: true, message: 'Please input your target value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="实际:"
                  name='cost_real'
                  rules={[{ required: true, message: 'Please input your real value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="完成率:"
                  name='cost_rate'
                  rules={[{ required: true, message: 'Please input your done rate value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
              </div>
              <div className='form-item'>
                <p className='title'>收入</p>
                <Item
                  className='input-item'
                  label="目标:"
                  name='income_target'
                  rules={[{ required: true, message: 'Please input your target value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="实际:"
                  name='income_real'
                  rules={[{ required: true, message: 'Please input your real value!' }]}>
                  <Input disabled={disabled}/>
                </Item>
                <Item
                  className='input-item'
                  label="完成率:"
                  name='income_rate'
                  rules={[{ required: true, message: 'Please input your done rate value!' }]}>
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