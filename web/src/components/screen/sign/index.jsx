/* 签约信息 */
import React from 'react'

import moment from 'moment'

import './index.less'

export default function (props) {

  const {sign} = props

  return (
    <div className='screen-sign-wrap'>
      <p className='option-title'>最新签约信息</p>
      <div className='content'>
        {sign.map(item => <div className='item' key={item.id}>
          <div className='icon'>{item.name.substr(0, 1)}</div>
          <div className='detail'>
            <p className='bd-name'>{item.name}</p>
            <h3 className='value'>合同金额: {item.money}万</h3>
            <h3 className='prod-name'>{item.productname}</h3>
            <div className='sign-time'>{moment(item.signdate).format('YYYY年MM月DD日')}</div>
            {item.newsign ? <div className='bag'>new</div> : ''}
          </div>
        </div>)}
      </div>
    </div>
  )
}