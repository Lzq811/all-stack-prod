import React from 'react'

import {Route, Switch} from 'react-router-dom'

import { Layout, Menu, Breadcrumb, Button } from 'antd'
import { ToTopOutlined, UserOutlined, BlockOutlined, ClockCircleOutlined, EuroOutlined, TeamOutlined, ApartmentOutlined, BoldOutlined, UsergroupAddOutlined, DeploymentUnitOutlined } from '@ant-design/icons'

import Space from './space'
import User from './user'
import Year from './year'
import Target from './target'
import Income from './income'
import Employee from './employee'
import Trech from './business/trech'
import Product from './business/product'
import Business from './business/business'
import ReMoney from './business/returnMoney'
import Delivery from './business/delivery'
import Sign from './sign'
import Company from './company'
import City from './prodmap/city'
import Prod from './prodmap/prod'

import './index.less'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export default class BackManage extends React.Component {

  state = {
    breadcrumb: sessionStorage.getItem('menukey') || 'Space',
    menuKey: sessionStorage.getItem('menukey') || 'Space'
  }

  handleClick = e => {
    sessionStorage.setItem('menukey', e.key)
    this.setState({breadcrumb: e.key, menuKey: e.key})
    this.props.history.push(`/back/${e.key}`)
  }

  loginout = () => {
    sessionStorage.clear()
    this.props.history.replace('/login')
  }

  render () {
    const { breadcrumb, menuKey } = this.state
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
            <Menu className='menu' theme="dark" mode="inline" defaultSelectedKeys={[menuKey]} onClick={this.handleClick}>
              <Menu.Item key="Space" icon={<BlockOutlined />}>首页</Menu.Item>
              <Menu.Item key="User" icon={<UserOutlined />}>账号管理</Menu.Item>
              <Menu.Item key="Year" icon={<ClockCircleOutlined />}>年份月份管理</Menu.Item>
              <Menu.Item key="Target" icon={<ToTopOutlined />}>业务发展目标</Menu.Item>
              <Menu.Item key="Income" icon={<EuroOutlined />}>月营收情况</Menu.Item>
              <Menu.Item key="Employee" icon={<TeamOutlined />}>鹰才情况</Menu.Item>
              <SubMenu key="Bus" title='业务情况' icon={<ApartmentOutlined />}>
                <SubMenu key="Cons" title='签约情况'>
                  <Menu.Item key='Trech'>渠道签约</Menu.Item>
                  <Menu.Item key='Product'>产品签约</Menu.Item>
                  <Menu.Item key='Business'>行业签约</Menu.Item>
                </SubMenu>
                <Menu.Item key="ReMoney">回款情况</Menu.Item>
                <Menu.Item key="Delivery">交付情况</Menu.Item>
              </SubMenu>
              <Menu.Item key="Sign" icon={<BoldOutlined />}>最新签约</Menu.Item>
              <Menu.Item key="Company" icon={<UsergroupAddOutlined />}>公司简介</Menu.Item>
              <SubMenu key="Map" title='项目地图' icon={<DeploymentUnitOutlined />}>
                <Menu.Item key="City">城市管理</Menu.Item>
                <Menu.Item key="Prod">项目详情</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header className="layout-header">
              <Breadcrumb className='bread-crumb'>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              </Breadcrumb>
              <div className='user-tips'>
                <h2 className='current-user' onClick={() => {this.props.history.push('/web')}}>前往大屏页面</h2>
                <h2 className='current-user' onClick={() => {this.props.history.push('/admin')}}>回到列表页</h2>
                <Button className='login-out-btn' type='link' onClick={this.loginout} danger>退出</Button>
              </div>
            </Header>
            <Content style={{ margin: '24px 40px 0 24px' }}>
              <Switch>
                <Route path='/back/space' component={Space} />
                <Route path='/back/user' component={User} />
                <Route path='/back/year' component={Year} />
                <Route path='/back/target' component={Target} />
                <Route path='/back/income' component={Income} />
                <Route path='/back/employee' component={Employee} />
                <Route path='/back/trech' component={Trech} />
                <Route path='/back/business' component={Business} />
                <Route path='/back/product' component={Product} />
                <Route path='/back/remoney' component={ReMoney} />
                <Route path='/back/delivery' component={Delivery} />
                <Route path='/back/sign' component={Sign} />
                <Route path='/back/company' component={Company} />
                <Route path='/back/city' component={City} />
                <Route path='/back/prod' component={Prod} />
                <Route path='/back' component={Space} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center', letterSpacing: '4px' }}>鹰云智能数据看板管理后台系统</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}