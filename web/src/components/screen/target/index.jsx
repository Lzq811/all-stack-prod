/* 业务发展目标 */
import React from 'react'

import { Progress, Row, Col } from 'antd'

import './index.less'

export default function Target (props) {

  const { target, curr_year } = props

  return (
    <div className='screen-target-wrap'>
      <p className='option-title'>{curr_year}年业务发展目标</p>
      <div className='content'>
        {target.map(item => (
          <div className='item' key={item._id}>
            <Row>
              <Col className='target' span={12}>{item.title}: {item.target}万</Col>
              <Col className='real' span={12}>实际: {item.real}万</Col>
            </Row>
            <Progress percent={Number(item.rate)} strokeColor={{from: '#1779D8', to: '#3CCFFD'}} status="active" showInfo={false} strokeWidth='14px' trailColor='#001D68' />
          </div>
        ))}
      </div>
    </div>
  )
}