import React, {Component} from 'react'

import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import * as YearApi from '../../../api/year'

import './index.less'

const {Option} = Select
export default class User extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    showModal: false,
    showAddModal: false,
    currUpdateId: '',
    data: [],
    columns: [
      {title: '排序', dataIndex: 'order', align: 'center'},
      {title: 'id', dataIndex: 'id', align: 'center'},
      {title: '年份', dataIndex: 'year', align: 'center'},
      {title: '默认月份', dataIndex: 'curr_month', align: 'center', render: text => `${text}月`},
      {title: '默认选中', dataIndex: 'selectDefault', align: 'center', render: text => text ? <b style={{color: '#3DB389',fontSize: '16px'}}>是</b> : <b style={{fontSize: '16px'}}>否</b>},
      {title: '操作', dataIndex: '操作', align: 'center', render: (text, record) => (
        <div className='edit-btn'><Button onClick={() => { this.select(record) }} style={{color: '#3DB389'}} type="text">设为选中</Button><Button onClick={() => { this.edit(record) }} className='edit-btn' type="text">编辑</Button><Button onClick={() => { this.del(record) }} className='delete-btn' type="text">删除</Button></div>
      )}
    ],
    currMonth: String(new Date().getMonth() + 1),
    month: [
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

  getList = async () => {
    const res = await YearApi.ReqList({})
    if (res.code === 0) {
      this.setState({data: res.objectResult.list || []})
    } else {
      message.error(res.msg)
    }
  }

  add = async () => {
    this.setState({showAddModal: true})
  }

  edit = record => {
    this.setState({showModal: true, currUpdateId: record._id})
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
    const res = await YearApi.ReqDelete({id: record.id})
    if (res.code === 0) {
      message.success('删除成功!')
      this.getList()
    } else {
      message.error('删除失败!')
    }
  }

  select = async record => {
    if (record && record.id) {
      const res = await YearApi.ReqSelect({id: record.id})
      if (res.code === 0) {
        this.getList()
        message.success('默认选择操作成功!')
      } else {
        message.error('默认选择操作失败!')
      }
    }
  }

  handleCancel = () => {
    this.setState({showModal: false, showAddModal: false})
  }


  onAddFinish = async values => {
    if (values && values.id && values.year && values.order) {
      const res = await YearApi.ReqAdd(values)
      if (res.code === 0) {
        message.success(res.msg)
        this.setState({showAddModal: false})
        this.getList()
      } else {
        message.error(res.msg)
      }
    }
  }

  onUpdateFinish = async values => {
    if (values.year && values.id && this.state.currUpdateId !== '') {
      const res = await YearApi.ReqUpdate({key: this.state.currUpdateId, ...values})
      if (res.code === 0) {
        message.success('更新用户信息成功!')
        this.setState({showModal: false})
        this.getList()
      } else {
        message.error(res.msg)
      }
    }
  }

  onFill = record => {
    this.formRef.current.setFieldsValue(record)
  }

  componentDidMount () {
    this.getList()
  }

  render () {
    const {showModal, columns, data, showAddModal, month, currMonth} = this.state
    return (
      <div className='year-wrap'>
        <div className='wrap-title'>年份管理</div>
        <div className='search-btn'>
          <Button type="primary" onClick={this.getList}> 搜索 </Button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <Button type="primary" onClick={this.add}> 新增 </Button>
        </div>
        <Table className='table-wrap' columns={columns} dataSource={data} />
        <Modal
          title="新增年份信息"
          visible={showAddModal}
          closable={false}
          footer={null}
        >
          <Form
            initialValues={{ curr_month: currMonth }}
            onFinish={this.onAddFinish}
            >
            <Form.Item
              label='id：'
              name='id'
              rules={[{required: true, message: 'please input your value'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='年份：'
              name='year'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='排序：'
              name='order'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='默认选择月份'
              name='curr_month'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Select style={{ width: 180 }} size='large' className='select-el' onChange={this.handleChangeMonth}>
                {month.map(item => (<Option className='y-select-option' key={item.id} value={item.id}>{item.month}</Option>))}
              </Select>
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
            onFinish={this.onUpdateFinish}
            >
            <Form.Item
              label='id:'
              name='id'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='年份：'
              name='year'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='排序：'
              name='order'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='默认选择月份'
              name='curr_month'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Select key={currMonth} defaultValue={currMonth} style={{ width: 180 }} size='large' className='select-el' onChange={this.handleChangeMonth}>
                {month.map(item => (<Option className='y-select-option' key={item.id} value={item.id}>{item.month}</Option>))}
              </Select>
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