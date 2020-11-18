import React, {Component} from 'react'

import { Table, Button, Modal, Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import './index.less'

export default class User extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    showModal: false,
    data: [
      {key: '1', name: 'root', password: '123456'},
      {key: '2', name: 'admin', password: '123456'}
    ],
    columns: [
      {title: '用户名', dataIndex: 'name', align: 'center'},
      {title: '密码', dataIndex: 'password', align: 'center'},
      {title: '操作', dataIndex: '操作', align: 'center', render: (text, record) => (
        <div className='edit-btn'><Button onClick={() => { this.edit(record) }} className='edit-btn' type="text">编辑</Button><Button onClick={() => { this.del(record) }} className='delete-btn' type="text">删除</Button></div>
      )}
    ]
  }

  edit = record => {
    this.setState({showModal: true})
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

  delSure = record => {
    console.log('确认删除', record) // {key: "1", name: "root", password: "123456"}
  }

  handleCancel = () => {
    this.setState({showModal: false})
  }


  onFinish = async values => {
    console.log(values)
  }

  onFill = record => {
    this.formRef.current.setFieldsValue({
      username: record.name,
      password: record.password
    })
  }

  componentDidMount () {
    
  }

  render () {
    const {showModal, columns, data} = this.state
    return (
      <div className='user-wrap'>
        <Table className='table-wrap' columns={columns} dataSource={data} />
        <Modal
          title="修改用户信息"
          visible={showModal}
          closable={false}
          footer={null}
        >
          <Form
            ref={this.formRef}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
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