/* 用 户 登 陆 的 路 由 组 件 */

import React, {Component} from 'react'

import LoginBac from '../../components/loginBac'

import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import md5 from 'js-md5' // md5 密码加密

import { ReqLogin } from '../../api'

import './login.less'
export default class Login extends Component {
  
  onFinish = async values => {
    // form 校验成功后的方法
    // md5(values.password)// md5 密码加密
    const params = {
      encryptType: 'md5',
      timestamp: new Date().getTime(),
      password: md5(values.password),
      username: values.username,
    }
    const res = await ReqLogin(params)
    if (res.code === 0) {
      message.success('登录成功!')
      sessionStorage.setItem('token', res.objectResult.token)
      /* 页面跳转, push(), goback(), replace(), go()*/
      this.props.history.replace('/admin') // 不需要回退回来的时候用 replace
    } else {
      message.error(res.msg)
    }
  }

  render () {
    return ( <div className='login-wrap'>
      <LoginBac className='bac-box'></LoginBac>
      <div className='form-container'>
        <div className='img-box'>
          <img src='http://big-screen.oss-cn-shenzhen.aliyuncs.com/beijingRoad/login/banner.png' alt=''/>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          >
          <Form.Item
            className="login-form-item"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input
              size="large"
              className='login-form-input'
              prefix={<UserOutlined className='login-form-input-icon'/>} 
              placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            className="login-form-item"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password 
              size="large"
              className='login-form-input'
              prefix={<LockOutlined className='login-form-input-icon'/>}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item><Button type="primary" size="large" htmlType="submit" className="login-form-button">登录</Button></Form.Item>
        </Form>
      </div>
      <div className='left-top-logo'>
        <img src='http://big-screen.oss-cn-shenzhen.aliyuncs.com/beijingRoad/login/yy_white_logo.png' alt=''/>
      </div>
      <div className='left-bottom-desc'>
        <p>成为最有价值的</p>
        <p>商业数据决策服务提供商</p>
      </div>
    </div> )
  }
}