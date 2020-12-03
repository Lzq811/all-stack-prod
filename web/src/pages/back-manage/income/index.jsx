/* 月营收情况 */
import React, { Component } from 'react'

import moment from 'moment'
import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'

import SearchBox from '../../../components/back/search-box'

import * as IncomeApi from '../../../api/income'

const {Option} = Select
export default class ReMoney extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    currMonth: sessionStorage.getItem('curr_month') ||  String(new Date().getMonth() + 1),
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
    ],
    editModal: false,
    addModa: false,
    curr_id: '',
    data: [],
    columns: [
      {title: '类别名称', dataIndex: 'title', align: 'center'},
      {title: '年份', dataIndex: 'curr_year', align: 'center', render: text => `${text}年`},
      {title: '月份', dataIndex: 'month', align: 'center', render: text => `${text}月`},
      {title: '默认月份', dataIndex: 'curr_month', align: 'center', render: text => `${text}`},
      {title: '收入', dataIndex: 'income', align: 'center'},
      {title: '成本', dataIndex: 'cost', align: 'center'},
      {title: '毛利', dataIndex: 'gross', align: 'center'},
      {title: '费用合计', dataIndex: 'fee_total', align: 'center'},
      {title: '营业利润', dataIndex: 'profit', align: 'center'},
      {title: '操作', dataIndex: '操作', align: 'center', render: (text, record) => (
        <div className='edit-btn'><Button onClick={() => { this.onUpdate(record) }} className='edit-btn' type="text">编辑</Button><Button onClick={() => { this.del(record) }} className='delete-btn' type="text">删除</Button></div>
      )}
    ]
  }

  getData = async () => {
    const res = await IncomeApi.ReqList({curr_year: sessionStorage.getItem('curr_year'), month: sessionStorage.getItem('curr_month')})
    if (res.code === 0) {
      const tmp = res.objectResult.list.map(item => {
        item.curr_month = item.month === this.state.currMonth ? '是' : '否'
        return item
      })
      this.setState({data: tmp})
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
    const res = await IncomeApi.ReqAdd({curr_year: sessionStorage.getItem('curr_year'), ...values})
    if (res && res.code === 0) {
      message.success(res.msg || '新增成功!')
      this.getData()
      this.setState({addModal: false})
    } else {
      message.error(res.msg || '新增失败！')
    }
  }

  onUpdateFinish = async values => {
    const res = await IncomeApi.ReqUpdate({id: this.state.curr_id, ...values})
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
    const res = await IncomeApi.ReqDelete({id: record._id})
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
    const { columns, data, editModal, addModal, month, currMonth} = this.state
    return (
      <div className='trech-wrap'>
        <div className='wrap-title'>月营收情况</div>
        <SearchBox search={this.getData} add={this.addData} year={true} month={true}></SearchBox>
        <Table className='table-wrap' columns={columns} dataSource={data} />
        <Modal
          title="新增信息"
          visible={addModal}
          closable={false}
          footer={null}
        >
          <Form
            initialValues={{month: currMonth}}
            onFinish={this.onAddFinish}
            >
            <Form.Item
              label='类别名称:'
              name='title'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='收入:'
              name='income'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='成本:'
              name='cost'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='毛利:'
              name='gross'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='费用合计:'
              name='fee_total'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='营业利润:'
              name='profit'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='月份:'
              name='month'
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
          visible={editModal}
          closable={false}
          footer={null}
        >
          <Form
            initialValues={{month: currMonth}}
            ref={this.formRef}
            onFinish={this.onUpdateFinish}
            >
            <Form.Item
              label='收入:'
              name='income'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='成本:'
              name='cost'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='毛利:'
              name='gross'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='费用合计:'
              name='fee_total'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='营业利润:'
              name='profit'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='月份:'
              name='month'
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
      </div>
    )
  }
}