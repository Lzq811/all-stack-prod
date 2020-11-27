/* 项目管理 */
import React, { Component } from 'react'

import moment from 'moment'
import { Table, Button, Modal, Form, Input, Row, Col, Select, DatePicker, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'

import SearchBox from '../../../components/back/search-box'

import * as ProdApi from '../../../api/prod'
import * as CityApi from '../../../api/city'

const { Option } = Select

export default class City extends Component {

  formRef = React.createRef(<FormInstance />)

  state = {
    editModal: false,
    addModa: false,
    curr_id: '',
    citys: [],
    curr_city: '广州',
    data: [],
    columns: [
      {title: '项目名称', dataIndex: 'title', align: 'center'},
      {title: '总交付时间', dataIndex: 'final_time', align: 'center', render: text => text ? this.formatDate(text) : '' },
      {title: '总项目进度', dataIndex: 'total_rate', align: 'center'},
      {title: '合同进度', dataIndex: 'constract_rate', align: 'center'},
      {title: '合同金额', dataIndex: 'constract_money', align: 'center'},
      {title: '回款进度', dataIndex: 're_money_rate', align: 'center'},
      {title: '回款金额', dataIndex: 're_money', align: 'center'},
      {title: '实施负责人', dataIndex: 'implementation', align: 'center'},
      {title: 'BD负责人', dataIndex: 'BD', align: 'center'},
      {title: '操作', dataIndex: '操作', align: 'center', render: (text, record) => (
        <div className='edit-btn'><Button onClick={() => { this.onUpdate(record) }} className='edit-btn' type="text">编辑/详情</Button><Button onClick={() => { this.del(record) }} className='delete-btn' type="text">删除</Button></div>
      )}
    ]
  }

  getCitys = async () => {
    const res = await CityApi.ReqList({})
    if (res.code === 0) {
      this.setState({citys: res.objectResult.list || []})
    } else {
      message.error(res.msg)
    }
  }

  getData = async () => {
    const res = await ProdApi.ReqList({})
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
    const res = await ProdApi.ReqAdd({...values})
    if (res && res.code === 0) {
      message.success(res.msg || '新增成功!')
      this.getData()
      this.setState({addModal: false})
    } else {
      message.error('新增失败!')
    }
  }

  onUpdateFinish = async values => {
    const res = await ProdApi.ReqUpdate({id: this.state.curr_id, ...values})
    if (res && res.code === 0) {
      message.success(res.msg || '更新成功!')
      this.getData()
      this.setState({editModal: false})
    } else {
      message.error('更新失败!')
    }
  }

  onUpdate = record => {
    this.setState({editModal: true, curr_city: record.city, curr_id: record._id})
    setTimeout(() => {
      this.onFill(record)
    }, 200)
  }

  onFill = record => {
    let tmp = {...record}
    tmp.final_time = moment(tmp.final_time)
    tmp.next_time = moment(tmp.next_time)
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
    const res = await ProdApi.ReqDelete({id: record._id})
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
    this.getCitys()
    this.getData()
  }

  render () {
    const { columns, data, editModal, addModal, curr_city, citys } = this.state
    return (
      <div className='prod-wrap'>
        <div className='wrap-title'>项目信息管理</div>
        <SearchBox search={this.getData} add={this.addData} year={false}></SearchBox>
        <Table className='table-wrap' columns={columns} dataSource={data} />
        <Modal
          title="新增信息"
          width='700px'
          visible={addModal}
          closable={false}
          footer={null}
        >
          <Form
            initialValues={{city: curr_city}}
            onFinish={this.onAddFinish}
            >
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='项目名称:'
                  name='title'
                  rules={[{required: true, message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='所属城市:'
                  name='city'
                  rules={[{required: true, message: 'please input your value!'}]}
                >
                  <Select key={curr_city} defaultValue={curr_city} className='select-el'>
                    { citys.length > 0 ? (
                        citys.map(item => (<Option className='y-select-option' key={item.title} value={item.title}>{item.title}</Option>))
                      ) : '' }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='总交付时间:'
                  name='final_time'
                >
                  <DatePicker format='YYYY-MM-DD' />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='总项目进度:'
                  name='total_rate'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='节点交付时间:'
                  name='next_time'
                >
                  <DatePicker format='YYYY-MM-DD' />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='节点交付进度:'
                  name='next_rate'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='合同进度:'
                  name='constract_rate'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='合同金额:'
                  name='constract_money'
                  rules={[{ required: true, message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='回款进度:'
                  name='re_money_rate'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='回款金额:'
                  name='re_money'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='实施负责人:'
                  name='implementation'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='BD负责人:'
                  name='BD'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='投入人数:'
                  name='jion_person'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='投入周期:'
                  name='jion_dates'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label='项目备注:'
              name='notes'
              rules={[{ message: 'please input your value!'}]}
            >
              <Input.TextArea rows={4} />
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
          width='700px'
        >
          <Form
            ref={this.formRef}
            initialValues={{city: curr_city}}
            onFinish={this.onUpdateFinish}
            >
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='项目名称:'
                  name='title'
                  rules={[{required: true, message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='所属城市:'
                  name='city'
                  rules={[{required: true, message: 'please input your value!'}]}
                >
                  <Select key={curr_city} defaultValue={curr_city} className='select-el'>
                    { citys.length > 0 ? (
                        citys.map(item => (<Option className='y-select-option' key={item.title} value={item.title}>{item.title}</Option>))
                      ) : '' }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='总交付时间:'
                  name='final_time'
                >
                  <DatePicker format='YYYY-MM-DD' />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='总项目进度:'
                  name='total_rate'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='节点交付时间:'
                  name='next_time'
                >
                  <DatePicker format='YYYY-MM-DD' />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='节点交付进度:'
                  name='next_rate'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='合同进度:'
                  name='constract_rate'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='合同金额:'
                  name='constract_money'
                  rules={[{ required: true, message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='回款进度:'
                  name='re_money_rate'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='回款金额:'
                  name='re_money'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='实施负责人:'
                  name='implementation'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='BD负责人:'
                  name='BD'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Col span={11}>
                <Form.Item
                  label='投入人数:'
                  name='jion_person'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label='投入周期:'
                  name='jion_dates'
                  rules={[{ message: 'please input your value!'}]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label='项目备注:'
              name='notes'
              rules={[{ message: 'please input your value!'}]}
            >
              <Input.TextArea rows={4} />
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