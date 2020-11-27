import React from 'react'

import Header from '../../components/screen/header'
import Year from '../../components/screen/year'
import Center from '../../components/screen/center'
import Target from '../../components/screen/target'
import Income from '../../components/screen/income'
import Empolyee from '../../components/screen/empolyee'
import Business from '../../components/screen/business'
import Sign from '../../components/screen/sign'

import * as CompanyApi from '../../api/company'
import * as TargetApi from '../../api/target'

import person from '../../assets/image/person.png'
import expend from '../../assets/image/expend.png'
import salary from '../../assets/image/salary.png'
import sign from '../../assets/image/sign.png'
import working from '../../assets/image/working.png'
import done from '../../assets/image/done.png'
import business from '../../assets/image/business.png'
import data from '../../assets/image/data.png'
import prod from '../../assets/image/prod.png'
import dev from '../../assets/image/dev.png'
import share from '../../assets/image/share.png'
import knowledge from '../../assets/image/knowledge.png'

import './index.less'

export default class BackManage extends React.Component {

  state = {
    company: [
      { order: 1, title: '', value: '', unit: '人', icon: person },
      { order: 2, title: '', value: '', unit: '元', icon: expend },
      { order: 3, title: '', value: '', unit: '元', icon: salary },
      { order: 4, title: '', value: '', unit: '个', icon: sign },
      { order: 5, title: '', value: '', unit: '个', icon: working },
      { order: 6, title: '', value: '', unit: '个', icon: done },
      { order: 7, title: '', value: '', unit: '人', icon: business },
      { order: 8, title: '', value: '', unit: '人', icon: data },
      { order: 9, title: '', value: '', unit: '人', icon: prod },
      { order: 10, title: '', value: '', unit: '人', icon: dev },
      { order: 11, title: '', value: '', unit: '人', icon: share },
      { order: 12, title: '', value: '', unit: '人', icon: knowledge }
    ],
    incomeTotal: '',
    target: []
  }

  getCompany = async () => {
    let tmp = this.state.company
    const res = await CompanyApi.ReqList({})
    if (res.code === 0) {
      const data = res.objectResult.list
      tmp.forEach((item, index) => {
        if (item.order === Number(data[index].order)) {
          item.title = data[index].title
          item.value = data[index].value
        }
      })
      this.setState({company: tmp, incomeTotal: data[data.length - 1].value})
    }
  }

  getTarget = async () => {
    const res = await TargetApi.ReqGet({curr_year: sessionStorage.getItem('curr_year')})
    console.log(res);
    if (res.code === 0) {
      this.setState({target: res.objectResult.list || []})
    }
  }

  componentDidMount () {
    this.getCompany()
    this.getTarget()
  }

  render () {
    const {company, incomeTotal, target} = this.state
    return (
      <div className='big-screen-page'>
        <Header></Header>
        <Year></Year>
        <div className='main-container'>
          <div className='left-container'>
            <Target target={target}></Target>
            <Income></Income>
            <Empolyee></Empolyee>
          </div>
          <div className='center-container'>
            <Center company={company} incomeTotal={incomeTotal}></Center>
          </div>
          <div className='right-container'>
            <Business></Business>
            <Sign></Sign>
          </div>
        </div>
      </div>
    )
  }
}