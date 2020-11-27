import React, {Component} from 'react'

import { Table, Button, Modal, Form, Input, message } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import * as UserApi from '../../../api/user'

import './index.less'

export default class User extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    showModal: false,
    showAddModal: false,
    updateCurrId: '',
    data: [
      // {_id: "5fb39ce19372f61dfc8da7cb", username: "root", password: "123456"}
    ],
    columns: [
      {title: '用户名', dataIndex: 'username', align: 'center'},
      {title: '密码', dataIndex: 'password', align: 'center'},
      {title: '操作', dataIndex: '操作', align: 'center', render: (text, record) => (
        <div className='edit-btn'><Button onClick={() => { this.edit(record) }} className='edit-btn' type="text">编辑</Button><Button onClick={() => { this.del(record) }} className='delete-btn' type="text">删除</Button></div>
      )}
    ]
  }

  getUserList = async () => {
    const res = await UserApi.ReqUsersList({})
    if (res.code === 0) {
      this.setState({data: res.objectResult.list || []})
    } else {
      message.error(res.msg)
    }
  }

  addUser = () => {
    this.setState({showAddModal: true})
  }

  edit = record => {
    this.setState({showModal: true, updateCurrId: record._id})
    setTimeout(() => {
      this.onFill(record)
    }, 500)
  }

  del = record => {
    Modal.confirm({
      title: '删除!',
      icon: <ExclamationCircleOutlined />,
      content: '您确认要删除该用户吗?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => { this.delSure(record) }
    })
  }

  delSure = async record => {
    const res = await UserApi.ReqDeleteUser({username: record.username})
    if (res.code === 0) {
      message.success('删除成功!')
      this.getUserList()
    } else {
      message.error('删除失败!')
    }
  }

  handleCancel = () => {
    this.setState({showModal: false, showAddModal: false})
  }


  onAddFinish = async values => {
    if (values && values.username && values.password) {
      const res = await UserApi.ReqAddUser(values)
      if (res.code === 0) {
        message.success(res.msg)
        this.setState({showAddModal: false})
        this.getUserList()
      } else {
        message.error(res.msg)
      }
    }
  }

  onUpdateFinish = async values => {
    const { updateCurrId } = this.state
    if (values.username && values.password && updateCurrId !== '') {
      const res = await UserApi.ReqUpdateUser({id: updateCurrId, ...values})
      if (res.code === 0) {
        message.success('更新用户信息成功!')
        this.setState({showModal: false})
        this.getUserList()
      } else {
        message.error(res.msg)
      }
    }
  }

  onFill = record => {
    this.formRef.current.setFieldsValue({
      username: record.username,
      password: record.password
    })
  }

  componentDidMount () {
    this.getUserList()
  }

  render () {
    const {showModal, columns, data, showAddModal} = this.state
    return (
      <div className='user-wrap'>
        <div className='wrap-title'>账号管理</div>
        <div className='search-btn'>
          <Button type="primary" onClick={this.getUserList}> 搜索 </Button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <Button type="primary" onClick={this.addUser}> 新增 </Button>
        </div>
        <Table className='table-wrap' columns={columns} dataSource={data} />
        <Modal
          title="新增用户信息"
          visible={showAddModal}
          closable={false}
          footer={null}
        >
          <Form
            initialValues={{ remember: true }}
            onFinish={this.onAddFinish}
            >
            <Form.Item
              label='用户名：'
              name='username'
              rules={[{required: true, message: '请输入账号!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='密&nbsp;&nbsp;&nbsp;&nbsp;码：'
              name='password'
              rules={[{ required: true, message: '请输入密码!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{textAlign: 'right'}}>
              <Button htmlType="button" onClick={this.handleCancel}>取消</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="primary" htmlType="submit"> 提交 </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="修改用户信息"
          visible={showModal}
          closable={false}
          footer={null}
        >
          <Form
            ref={this.formRef}
            initialValues={{ remember: true }}
            onFinish={this.onUpdateFinish}
            >
            <Form.Item
              label='用户名：'
              name='username'
              rules={[{required: true, message: '请输入账号!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='密&nbsp;&nbsp;&nbsp;&nbsp;码：'
              name='password'
              rules={[{ required: true, message: '请输入密码!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{textAlign: 'right'}}>
              <Button htmlType="button" onClick={this.handleCancel}>取消</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type="primary" htmlType="submit"> 提交 </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
  
}