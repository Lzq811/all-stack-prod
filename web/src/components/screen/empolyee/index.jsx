/* 鹰才情况 */
import React from 'react'

import ReactEcharts from 'echarts-for-react'

import leo from '../../../assets/image/leo.png'
import libra from '../../../assets/image/libra.png'
import aquarius from '../../../assets/image/aquarius.png'
import aries from '../../../assets/image/aries.png'
import cancer from '../../../assets/image/cancer.png'
import capricorn from '../../../assets/image/capricorn.png'
import gemini from '../../../assets/image/gemini.png'
import pisces from '../../../assets/image/pisces.png'
import sagittarius from '../../../assets/image/sagittarius.png'
import scorpio from '../../../assets/image/scorpio.png'
import taurus from '../../../assets/image/taurus.png'
import virgo from '../../../assets/image/virgo.png'

import './index.less'

export default function (props) {
  const {empolyee} = props

  const data = [
    {title: '白羊座', num: 0,  icon: aries},{title: '金牛座', num: 0,  icon: taurus},{title: '双子座', num: 0,  icon: gemini},{title: '巨蟹座', num: 0,  icon: cancer},{title: '狮子座', num: 0,  icon: leo},{title: '处女座', num: 0,  icon: virgo},
    {title: '天秤座', num: 0,  icon: libra},{title: '天蝎座', num: 0,  icon: scorpio},{title: '射手座', num: 0,  icon: sagittarius},{title: '摩羯座', num: 0,  icon: capricorn},{title: '水瓶座', num: 0,  icon: aquarius},{title: '双鱼座', num: 0,  icon: pisces}
  ]

  let age = [{age_interval: '70', num: 0}, {age_interval: '80', num: 0}, {age_interval: '90', num: 0}]

  const total = empolyee.length
  if (empolyee && empolyee.length > 0) {
    empolyee.forEach(item => {
      data.forEach(inner => {
        if (item.constellation === inner.title) {
          inner.num++
        }
      })
      age.forEach(a => {
        if (item.age_interval === a.age_interval) {
          a.num++
        }
      })
    })
  }

  let series = []
  age.forEach(item => {
    series.push({
      name: item.age_interval + '后',
      type: 'bar',
      barWidth: 12,
      stack: '总量',
      label: {
        show: true,
        formatter: '{c}%',
        position: 'insideRight'
      },
      data: [(item.num/total * 100).toFixed(1)]
    })
  })


  const initchart = () => {
    return {
      color: ['#58CCFF', '#5C88FF', '#D45AFF'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      legend: {
        show: true,
        top: 0,
        right: 20,
        itemWidth: 10,
        icon: 'circle',
        textStyle: { color: '#fff'}
      },
      grid: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 0,
        containLabel: false
      },
      xAxis: {
        type: 'value',
        show: false,
        splitLine: {show: false}
      },
      yAxis: {
        type: 'category',
        show: false,
        data: ['年龄比例']
      },
      series
    }
  }

  return (
    <div className='screen-empolyee-wrap'>
      <p className='option-title'>鹰才情况</p>
      <h4 className='option-sub-title'>年龄比例</h4>
      <ReactEcharts className='chart-el' option={initchart()} style={{width: '100%', height: '60px'}} />
      <h4 className='option-sub-title xingzuo'>星座情况</h4>
      <div className='box'>
        {data.map(item => (<div className='item' key={item.id}>
        <div className='icon'><img src={item.icon} width='100%' alt=""/></div>
          <p className='desc-title'>{item.title}</p>
          <h4 className='value'>{item.num}人</h4>
        </div>))}
      </div>
    </div>
  )
}