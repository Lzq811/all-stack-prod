/* 左上角年份管理 */
import React from 'react'

import './index.less'

export default class Year extends React.Component {

  handleClick = id => {
    this.props.onChangeYear(id)
  }

  render () {
    const {yearList, curr_year} = this.props
    return (
      <div className='screen-year-wrap'>
        {yearList.map(item => <p className={item.id === curr_year ? 'year-item active' : 'year-item'} onClick={() => {this.handleClick(item.id)}} key={item.id}>{item.year}</p>)}
      </div>
    )
  }
}