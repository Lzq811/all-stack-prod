/* 业务情况 */
import React from 'react'

import ReactEcharts from 'echarts-for-react'

import './index.less'

export default function (props) {

  const initChart = (source, title, unit, isshow, top, titleTop) => ({
    color: ['#4FA0FF', '#5ED9FF', '#F3B000', '#EE6F36', '#EE2E79', '#AC5CFF', '#714DFF', '#4172FF'],
    tooltip: {
      trigger: 'item',
      formatter: obj => `${obj.value[0]}: ${obj.value[1]}万 (${obj.percent}%)`
    },
    title: {
      show: true,
      text: `${title}\n${unit}`,
      textAlign: 'center',
      left: '48%',
      top: titleTop,
      textStyle: {color: '#fff', fontSize: 12}
    },
    legend: {
      show: isshow,
      orient: 'horizontal',
      left: 'center',
      top: '58%',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {color: '#fff', fontSize: 8}
    },
    dataset: {
      source: [
        ['product', title],
        ...source
      ]
    },
    series: {
      type: 'pie',
      center: ['50%', top],
      radius: [34, 40],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      labelLine: {
        show: false
      }
    }
  })

  const initChart2 = (source, title, title2, unit, unit2) => ({
    color: ['#5ED9FF', '#EE2E79', '#7359FD', '#D45AFF', '#58CCFF', '#5493FF'],
    tooltip: {
      trigger: 'item',
      formatter: obj => `${obj.value[0]}: ${obj.value[1]}${unit2} (${obj.percent}%)`
    },
    legend: {
      show: true,
      orient: 'horizontal',
      left: 'center',
      top: '72%',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {color: '#fff', fontSize: 10}
    },
    dataset: {
      source: [
        ['product', title, title2],
        ...source
      ]
    },
    series: [
      {
        type: 'pie',
        center: ['24%', '38%'],
        radius: [34, 40],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          color: '#fff',
          formatter: '今年新\n合同' + unit
        },
        labelLine: {
          show: false
        },
        encode: {
          itemName: 'product',
          value: title,
          tootip: title
        }
      },
      {
        type: 'pie',
        center: ['76%', '38%'],
        radius: [34, 40],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          color: '#fff',
          formatter: '历年\n累计' + unit
        },
        labelLine: {
          show: false
        },
        encode: {
          itemName: 'product',
          value: title2,
          tootip: title2
        }
      }
    ]
  })
  return (
    <div className='screen-business-wrap'>
      <p className='option-title'>业务情况</p>
      <h4 className='option-sub-title'>签约情况</h4>
      <h4 className='option-sub-title pay'>回款情况</h4>
      <h4 className='option-sub-title back'>交付情况</h4>
      <div className='sign-box'>
        <div className='item-top'><ReactEcharts option={initChart(props.terch.count, '渠道签约', '数量', false, '50%', '34%')} style={{width: '100%', height: '100%'}}/></div>
        <div className='item-top'><ReactEcharts option={initChart(props.product.count, '产品签约', '数量', false, '50%', '34%')} style={{width: '100%', height: '100%'}}/></div>
        <div className='item-top'><ReactEcharts option={initChart(props.business.count, '行业签约', '数量', false, '50%', '34%')} style={{width: '100%', height: '100%'}}/></div>
        <div className='item-bottom'><ReactEcharts option={initChart(props.terch.costract, '渠道签约', '合同额', true, '32%', '22%')} style={{width: '100%', height: '100%'}}/></div>
        <div className='item-bottom'><ReactEcharts option={initChart(props.product.costract, '产品签约', '合同额', true, '32%', '22%')} style={{width: '100%', height: '100%'}}/></div>
        <div className='item-bottom'><ReactEcharts option={initChart(props.business.costract, '行业签约', '合同额', true, '32%', '22%')} style={{width: '100%', height: '100%'}}/></div>
      </div>
      <div className='reback-box'>
        <div className='item-left'><ReactEcharts option={initChart2(props.reMoney, '今年新合同回款', '历年累计回款', '回款', '万')} style={{height: '100%', width: '100%'}}/></div>
        <div className='item-right'><ReactEcharts option={initChart2(props.delivery, '今年新合同交付', '历年累计交付', '交付', '个')} style={{height: '100%', width: '100%'}}/></div>
      </div>
    </div>
  )
}