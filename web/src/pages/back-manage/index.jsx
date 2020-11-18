import React from 'react'

import {Route, Switch} from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Button } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import User from '../user'

import './index.less'

const { Header, Content, Footer, Sider } = Layout

export default class BackManage extends React.Component {

  state = {
    breadcrumb: ''
  }

  handleClick = e => {
    this.setState({breadcrumb: e.key})
    this.props.history.push(`/back-manage/${e.key}`)
  }

  componentDidMount () {

  }

  render () {
    const { breadcrumb } = this.state
    return (
      <div className='back-manage-page'>
        <Layout className='layout-wrap'>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className='logo'>
              <img src='https://big-screen.oss-cn-shenzhen.aliyuncs.com/AquilaFlyCloud/manage-screen/yy_white_logo.png' alt=''/>
            </div>
            <Menu className='menu' theme="dark" mode="inline" defaultSelectedKeys={['user']} onClick={this.handleClick}>
              <Menu.Item key="User" icon={<UserOutlined />}>账号管理</Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                nav 4
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="layout-header">
              <Breadcrumb className='bread-crumb'>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              </Breadcrumb>
              <div className='user-tips'>
                <h2 className='current-user'>超级管理员</h2>
                <Button className='login-out-btn' type='link' danger>退出</Button>
              </div>
            </Header>
            <Content style={{ margin: '24px 40px 0 24px' }}>
              <Switch>
                <Route path='/back-manage/user' component={User} />
                <Route path='/' component={User} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center', letterSpacing: '4px' }}>鹰云智能数据看板管理后台系统</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}