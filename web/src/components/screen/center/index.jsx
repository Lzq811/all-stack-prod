import React from 'react'

import {Row, Col, Popover} from 'antd'
import moment from 'moment'

import * as CityApi from '../../../api/city'
import * as ProdApi from '../../../api/prod'

import './index.less'

export default class Center extends React.Component {

  state = {
    citys: [
      // {name: '', top: 0, left: 0}
    ],
  }

  getCityData = async () => {
    const res = await CityApi.ReqList({})
    if (res.code === 0) {
      if (res.objectResult.list && res.objectResult.list.length > 0) {
        let tmp = []
        res.objectResult.list.forEach(async item => {
          // 根据返回的 city 请求 当前city对应的项目信息 如果city里没有项目，则city也不显示
          const resDetail = await ProdApi.ReqList({city: item.title})
          if (resDetail.code === 0 && resDetail.objectResult && resDetail.objectResult.list && resDetail.objectResult.list.length > 0) {
            tmp.push({
              title: item.title,
              top: Math.floor(Number(item.value.split(',')[1]) * 1080 / 731.25) - 105 - 25,
              left: Math.floor(Number(item.value.split(',')[0]) * 1920 / 1300) - 420 - 25,
              children: resDetail.objectResult.list || [],
              count: resDetail.objectResult.list.length || 0
            })
            this.setState({citys: tmp || []})
          }
          /* 
          * 420 是中间地图元素距离页面左边的边距
          * 105 是中间地图元素距离页面顶部的边距
          * 25 是 icon 元素大小的一半
          */
        })
      }
    }
  }

  componentDidMount () {
    this.getCityData()
  }

  render () {
    const {citys} = this.state
    const {company, incomeTotal} = this.props
    return (
      <div className='center-wrap'>
        {/* 累计营收框 */}
        <div className='income-box'>
          <h2 className='value'>{Number(incomeTotal).toLocaleString()} <span>万</span></h2>
          <h4 className='pop-item-desc-title'>公司至今累计总营收</h4>
        </div>
        <div className='cityes-box'>
          {citys.map(item => <div className='city' style={{top: `${item.top}px`, left: `${item.left}px`}} key={item.title}>
            <div className='out-circle'></div>
            <div className='inner-circle'></div>
            <Popover placement="rightTop" className='pop-title' title={<span className='pop-sub-title'>{item.title}</span>} content={
              <div>
                {
                  item.children.map(inner => <Popover key={inner.id} placement="rightTop" className='pop-title-inner' content={
                    <div>
                      <p className='pop-item-desc'>交付时间：{moment(inner.final_time).format('YYYY年MM月DD日')}</p>
                      <p className='pop-item-desc'>总项目进度：{inner.total_rate}%</p>
                      <p className='pop-item-desc'>合同金额：{inner.constract_money}万</p>
                      <p className='pop-item-desc'>合同进度：{inner.constract_rate}%</p>
                      <p className='pop-item-desc'>回款进度：{inner.re_money_rate}%</p>
                      <p className='pop-item-desc'>已回款金额：{inner.re_money}万</p>
                      <p className='pop-item-desc'>实施负责人：{inner.implementation}</p>
                      <p className='pop-item-desc'>BD负责人：{inner.BD}</p>
                      <p className='pop-item-desc'>已投入人数：{inner.jion_person}人</p>
                      <p className='pop-item-desc'>已投入周期：{inner.jion_dates}人/天</p>
                      <p className='pop-item-desc'>项目备注：{inner.notes || ''}</p>
                    </div>
                  } trigger="hover">
                    <h4>{inner.title}</h4>
                  </Popover>)
                }
              </div>
            } trigger="hover">
              {item.title}({item.count})
            </Popover>
          </div>)}
        </div>
        <div className='bottom-box'>
          <Row>
            {company.map(item => (
              <Col span={4}  key={item.order}>
                <div className='item'>
                  <div className='icon' style={{backgroundImage: `url(${item.icon})`}}></div>
                  <h4 className='value'>{item.value} <span>{item.unit}</span></h4>
                  <p className='pop-item-desc-sub-title'>{item.title}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}