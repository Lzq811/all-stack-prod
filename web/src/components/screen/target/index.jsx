/* 业务发展目标 */
import React from 'react'

import { Progress, Row, Col } from 'antd'

import './index.less'

export default function Target (props) {

  console.log(props)

  return (
    <div className='screen-target-wrap'>
      <p className='option-title'>{sessionStorage.getItem('curr_year')}年业务发展目标</p>
      <div className='content'>
        <div className='item'>
          <Row>
            <Col className='target' span={12}>合同额: 1000万</Col>
            <Col className='real' span={12}>实际: 700万</Col>
          </Row>
          <Progress percent={26} strokeColor={{from: '#1779D8', to: '#3CCFFD'}} status="active" showInfo={false} strokeWidth='20px' trailColor='#001D68' />
        </div>
      </div>
    </div>
  )
}