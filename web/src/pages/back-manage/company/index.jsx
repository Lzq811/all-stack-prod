/* 公司简介 */
import React, { Component } from 'react'

import moment from 'moment'
import { Table, Button, Modal, Form, Input, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'

import SearchBox from '../../../components/back/search-box'

import * as CompanyApi from '../../../api/company'

export default class Company extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    editModal: false,
    addModa: false,
    curr_id: '',
    data: [],
    columns: [
      {title: '排序', dataIndex: 'order', align: 'center'},
      {title: '标题', dataIndex: 'title', align: 'center'},
      {title: '数值', dataIndex: 'value', align: 'center'},
      {title: '操作', dataIndex: '操作', align: 'center', render: (text, record) => (
        <div className='edit-btn'><Button onClick={() => { this.onUpdate(record) }} className='edit-btn' type="text">编辑</Button><Button onClick={() => { this.del(record) }} className='delete-btn' type="text">删除</Button></div>
      )}
    ]
  }

  getData = async () => {
    const res = await CompanyApi.ReqList({})
    if (res.code === 0) {
      this.setState({data: res.objectResult.list || []})
    } else {
      message.error(res.msg)
    }
  }

  addData = async () => {
    this.setState({addModal: true})
  }

  handleCancel = () => {
    this.setState({addModal: false, editModal: false})
  }

  onAddFinish = async values => {
    const res = await CompanyApi.ReqAdd({...values})
    if (res && res.code === 0) {
      message.success(res.msg || '新增成功!')
      this.getData()
      this.setState({addModal: false})
    } else {
      message.error('新增失败!')
    }
  }

  onUpdateFinish = async values => {
    const res = await CompanyApi.ReqUpdate({id: this.state.curr_id, ...values})
    if (res && res.code === 0) {
      message.success(res.msg || '更新成功!')
      this.getData()
      this.setState({editModal: false})
    } else {
      message.error('更新失败!')
    }
  }

  onUpdate = record => {
    this.setState({editModal: true, curr_id: record._id})
    setTimeout(() => {
      this.onFill(record)
    }, 200)
  }

  onFill = record => {
    let tmp = {...record}
    tmp.signdate = moment(tmp.signdate)
    this.formRef.current.setFieldsValue(tmp)
    this.setState({editModal: true})
  }

  del = async record => {
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
    const res = await CompanyApi.ReqDelete({id: record._id})
    if (res.code === 0) {
      message.success('删除成功!')
      this.getData()
    } else {
      message.error('删除失败!')
    }
  }

  formatDate = time => {
    const tmp = new Date(time)
    return `${tmp.getFullYear()}-${tmp.getMonth() + 1}-${tmp.getDate()}`
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    const { columns, data, editModal, addModal} = this.state
    return (
      <div className='trech-wrap'>
        <div className='wrap-title'>最新签约信息</div>
        <SearchBox search={this.getData} add={this.addData} year={false}></SearchBox>
        <Table className='table-wrap' columns={columns} dataSource={data} />
        <Modal
          title="新增信息"
          visible={addModal}
          closable={false}
          footer={null}
        >
          <Form
            initialValues={{ newsign: true, status: true, signdate: moment() }}
            onFinish={this.onAddFinish}
            >
            <Form.Item
              label='排序:'
              name='order'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='标题:'
              name='title'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='数值:'
              name='value'
              rules={[{ required: true, message: 'please input your value!'}]}
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
          visible={editModal}
          closable={false}
          footer={null}
        >
          <Form
            ref={this.formRef}
            onFinish={this.onUpdateFinish}
            >
            <Form.Item
              label='排序:'
              name='order'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='标题:'
              name='title'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='数值:'
              name='value'
              rules={[{ required: true, message: 'please input your value!'}]}
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