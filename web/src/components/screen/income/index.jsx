/* 营收情况 */
import React from 'react'

import ReactEcharts from 'echarts-for-react'

import './index.less'

export default function (props) {
  const {monthIncome} = props
  let source = [
    ['product'],
    ['收入'],
    ['成本'],
    ['毛利'],
    ['费用合计'],
    ['营业利润']
  ]
  if (monthIncome && monthIncome.length > 0) {
    monthIncome.forEach(item => {
      source[0].push(item.title)
      source[1].push(item.income)
      source[2].push(item.cost)
      source[3].push(item.gross)
      source[4].push(item.fee_total)
      source[5].push(item.profit)
    })
  }

  const initOption = () => ({
    color: ['#0183FD', '#C57FFF', '#FC386B'],
    legend: { show: true, left: 'center', bottom: '8%', itemWidth: 10, itemHeight: 10, itemGap: 30, textStyle: {color: '#fff'} },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: '16%',
      left: '3%',
      right: '4%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: true,  lineStyle: { width: 1, color: '#fff'} },
        axisLabel: { show: true, fontSize: 14, color: '#fff', interval: 0 }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: true, fontSize: 14, color: '#fff' },
      }
    ],
    dataset: {
      source
    },
    series: [
      {
        name: '鹰云智能',
        type: 'bar',
        barGap: 0,
        barWidth: '16%'
      },
      {
        name: '正佳网',
        type: 'bar',
        barWidth: '16%'
      },
      {
        name: '合计',
        type: 'bar',
        barWidth: '16%'
      }
    ]
  })

  return (
    <div className='screen-income-wrap'>
      <p className='option-title'>{props.month}月营收情况(万元)</p>
      <ReactEcharts className='chart-el' option={initOption()} style={{width: '100%', height: '100%'}} />
    </div>
  )
}