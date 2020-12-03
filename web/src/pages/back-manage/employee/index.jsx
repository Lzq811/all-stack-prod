/* 鹰才情况 */
import React, {Component} from 'react'

import { Table, Button, Modal, Form, Input, message, Select, Radio } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import * as EmployeeApi from '../../../api/employee'

import SearchBox from '../../../components/back/search-box'

import './index.less'

const { Option } = Select

export default class Empolyee extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    showModal: false,
    showAddModal: false,
    ageSelect: [
      {id: '90', name: '90后'},
      {id: '80', name: '80后'},
      {id: '70', name: '70后'}
    ],
    constellationSelect: [
      {id: '白羊座'},{id: '金牛座'},{id: '双子座'},{id: '巨蟹座'},{id: '狮子座'},{id: '处女座'},
      {id: '天秤座'},{id: '天蝎座'},{id: '射手座'},{id: '摩羯座'},{id: '水瓶座'},{id: '双鱼座'}
    ],
    data: [],
    columns: [
      {title: '所属年份', dataIndex: 'curr_year', align: 'center', render: text => `${text}年`},
      {title: '姓名', dataIndex: 'name', align: 'center'},
      {title: '性别', dataIndex: 'sex', align: 'center', render: text => text === 'female' ? '女' : '男'},
      {title: '年龄段', dataIndex: 'age_interval', align: 'center', render: text => `${text}后`},
      {title: '星座', dataIndex: 'constellation', align: 'center'},
      {title: '操作', dataIndex: '操作', align: 'center', render: (text, record) => (
        <div className='edit-btn'><Button onClick={() => { this.edit(record) }} className='edit-btn' type="text">编辑</Button><Button onClick={() => { this.del(record) }} className='delete-btn' type="text">删除</Button></div>
      )}
    ]
  }

  getData = async () => {
    const res = await EmployeeApi.ReqList({curr_year: sessionStorage.getItem('curr_year')})
    if (res.code === 0) {
      this.setState({data: res.objectResult.list || []})
    }
  }

  addData = async () => {
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
    const res = await EmployeeApi.ReqDelete({id: record._id})
    if (res.code === 0) {
      message.success('删除成功!')
      this.getData()
    } else {
      message.error('删除失败!')
    }
  }

  handleCancel = () => {
    this.setState({showModal: false, showAddModal: false})
  }

  onAddFinish = async values => {
    const res = await EmployeeApi.ReqAdd({curr_year: sessionStorage.getItem('curr_year'), ...values})
    if (res.code === 0) {
      message.success(res.msg)
      this.setState({showAddModal: false})
      this.getData()
    } else {
      message.error(res.msg)
    }
  }

  onUpdateFinish = async values => {
    const { updateCurrId } = this.state
    if (values.name && updateCurrId !== '') {
      const res = await EmployeeApi.ReqUpdate({id: updateCurrId, ...values})
      if (res.code === 0) {
        message.success('更新运功信息成功!')
        this.setState({showModal: false})
        this.getData()
      } else {
        message.error(res.msg)
      }
    }
  }

  onFill = record => {
    this.formRef.current.setFieldsValue({
      ...record
    })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    const { columns, data, showAddModal, showModal, ageSelect, constellationSelect} = this.state
    return (
      <div className='employee-wrap'>
        <div className='wrap-title'>鹰才情况</div>
        <SearchBox search={this.getData} add={this.addData} year={true}></SearchBox>
        <Table className='table-wrap' columns={columns} dataSource={data} />
        <Modal
          title="新增员工信息"
          visible={showAddModal}
          closable={false}
          footer={null}
        >
          <Form
            initialValues={{ sex: 'male', constellation: '白羊座', age_interval: '90' }}
            onFinish={this.onAddFinish}
            >
            <Form.Item
              label='姓名：'
              name='name'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='性别：'
              name='sex'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Radio.Group>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label='年龄段：'
              name='age_interval'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Select style={{ width: 180 }} size='large' className='select-el'>
                {ageSelect.map(item => (<Option className='y-select-option' key={item.id} value={item.id}>{item.name}</Option>))}
              </Select>
            </Form.Item>
            <Form.Item
              label='星座：'
              name='constellation'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Select style={{ width: 180 }} size='large' className='select-el'>
                {constellationSelect.map(item => (<Option className='y-select-option' key={item.id} value={item.id}>{item.id}</Option>))}
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
          title="修改员工信息"
          visible={showModal}
          closable={false}
          footer={null}
        >
          <Form
            ref={this.formRef}
            initialValues={{ sex: 'male', constellation: '白羊座', age_interval: '90'  }}
            onFinish={this.onUpdateFinish}
            >
            <Form.Item
              label='姓名：'
              name='name'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='性别：'
              name='sex'
              rules={[{required: true, message: 'please input your value!'}]}
            >
              <Radio.Group>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label='年龄段：'
              name='age_interval'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Select style={{ width: 180 }} size='large' className='select-el'>
                {ageSelect.map(item => (<Option className='y-select-option' key={item.id} value={item.id}>{item.name}</Option>))}
              </Select>
            </Form.Item>
            <Form.Item
              label='星座：'
              name='constellation'
              rules={[{ required: true, message: 'please input your value!'}]}
            >
              <Select style={{ width: 180 }} size='large' className='select-el'>
                {constellationSelect.map(item => (<Option className='y-select-option' key={item.id} value={item.id}>{item.id}</Option>))}
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