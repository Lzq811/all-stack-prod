import React from 'react'

import {Row, Col} from 'antd'

import './index.less'

export default class Center extends React.Component {

  render () {
    const {company, incomeTotal} = this.props
    return (
      <div className='center-wrap'>
        {/* 累计营收框 */}
        <div className='income-box'>
          <h2 className='value'>{incomeTotal.toLocaleString()}<span>万</span></h2>
          <h4 className='desc-title'>{sessionStorage.getItem('curr_year')}年累计营收</h4>
        </div>
        <div className='bottom-box'>
          <Row>
            {company.map(item => (
              <Col span={4}  key={item.order}>
                <div className='item'>
                  <div className='icon' style={{backgroundImage: `url(${item.icon})`}}></div>
                  <h4 className='value'>{item.value}<span>{item.unit}</span></h4>
                  <p className='desc-sub-title'>{item.title}</p>
                </div>
              </Col>
            ))}
          </Row>
          
        </div>
      </div>
    )
  }
}