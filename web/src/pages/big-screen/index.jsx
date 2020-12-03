import React from 'react'

import Header from '../../components/screen/header'
import Year from '../../components/screen/year'
import Center from '../../components/screen/center'
import Target from '../../components/screen/target'
import Income from '../../components/screen/income'
import Empolyee from '../../components/screen/empolyee'
import Business from '../../components/screen/business'
import Sign from '../../components/screen/sign'

import * as YearApi from '../../api/year'
import * as CompanyApi from '../../api/company'
import * as TargetApi from '../../api/target'
import * as IncomeApi from '../../api/income'
import * as EmployeeApi from '../../api/employee'
import * as SignApi from '../../api/sign'
import * as BusinessApi from '../../api/business'

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
    yearList: [],
    curr_year: '',
    month: '',
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
    incomeTotal: '', // 中间头部的年累计收入
    target: [],
    monthIncome: [], // 月营收情况
    empolyee: [], // 英才情况
    sign: [], // 最新签约信息
    terch: {count: [], costract: []}, // 渠道签约信息
    product: {count: [], costract: []}, // 产品签约信息
    business: {count: [], costract: []}, // 行业签约信息
    reMoney: [], // 回款情况
    delivery: [], // 交付情况
  }

  getYear = async () => {
    const res = await YearApi.ReqList({})
    if (res.code === 0) {
      res.objectResult.list.forEach(item => {
        if (item.selectDefault) {
          this.setState({curr_year: item.id, month: item.month})
        }
      })
      this.setState({yearList: res.objectResult.list})
      this.onChangeYear(this.state.curr_year)
    }
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
    const res = await TargetApi.ReqList({curr_year: this.state.curr_year})
    if (res.code === 0) {
      this.setState({target: res.objectResult.list || []})
    }
  }

  getMonthIncome = async () => {
    const {curr_year, month} = this.state
    const res = await IncomeApi.ReqList({curr_year, month})
    if (res.code === 0) {
      this.setState({monthIncome: res.objectResult.list || []})
    }
  }

  getEmpolyee = async () => {
    const res = await EmployeeApi.ReqList({curr_year: this.state.curr_year})
    if (res.code === 0) {
      this.setState({empolyee: res.objectResult.list || []})
    }
  }

  getSign = async () => {
    const res = await SignApi.ReqList({})
    if (res.code === 0) {
      this.setState({sign: res.objectResult.list || []})
    }
  }

  getBusiness = async () => {
    const resTrech = await BusinessApi.ReqList({curr_year: this.state.curr_year, key: 'trech'})
    if (resTrech.code === 0) {
      if (resTrech.objectResult.list && resTrech.objectResult.list.length > 0) {
        let tmpCount = [], tmpCost = []
        resTrech.objectResult.list.forEach(item => {
          tmpCount.push([item.name, item.count])
          tmpCost.push([item.name, item.constract])
        })
        this.setState({terch: {count: tmpCount, costract: tmpCost}})
      } else {
        this.setState({terch: {count: [], costract: []}})
      }
    }
    const resProd = await BusinessApi.ReqList({curr_year: this.state.curr_year, key: 'product'})
    if (resProd.code === 0) {
      if (resProd.objectResult.list && resProd.objectResult.list.length > 0) {
        let tmpCount = [], tmpCost = []
        resProd.objectResult.list.forEach(item => {
          tmpCount.push([item.name, item.count])
          tmpCost.push([item.name, item.constract])
        })
        this.setState({product: {count: tmpCount, costract: tmpCost}})
      } else {
        this.setState({product: {count: [], costract: []}})
      }
    }
    const resBusi = await BusinessApi.ReqList({curr_year: this.state.curr_year, key: 'business'})
    if (resBusi.code === 0) {
      if (resBusi.objectResult.list && resBusi.objectResult.list.length > 0) {
        let tmpCount = [], tmpCost = []
        resBusi.objectResult.list.forEach(item => {
          tmpCount.push([item.name, item.count])
          tmpCost.push([item.name, item.constract])
        })
        this.setState({business: {count: tmpCount, costract: tmpCost}})
      } else {
        this.setState({business: {count: [], costract: []}})
      }
    }
    const resReMoney = await BusinessApi.ReqList({curr_year: this.state.curr_year, key: 'remoney'})
    if (resReMoney.code === 0) {
      if (resReMoney.objectResult.list && resReMoney.objectResult.list.length > 0) {
        let tmpDone = ['已回款'], tmpNotyet = ['未回款']
        resReMoney.objectResult.list.forEach(item => {
          tmpDone.push(item.remoney)
          tmpNotyet.push(item.noremoney)
        })
        this.setState({reMoney: [tmpDone, tmpNotyet]})
        console.log(...this.state.reMoney);
      } else {
        this.setState({reMoney: []})
      }
    }
    const resDelivery = await BusinessApi.ReqList({curr_year: this.state.curr_year, key: 'delivery'})
    if (resDelivery.code === 0) {
      if (resDelivery.objectResult.list && resDelivery.objectResult.list.length > 0) {
        let tmpPost = ['过账客户'], tmpDone = ['收入完结客户'], tmpWorking = ['进行中客户'], tmpBad = ['坏账客户']
        resDelivery.objectResult.list.forEach(item => {
          tmpPost.push(item.post)
          tmpDone.push(item.done)
          tmpWorking.push(item.working)
          tmpBad.push(item.bad)
        })
        this.setState({delivery: [tmpPost, tmpDone, tmpWorking, tmpBad]})
      } else {
        this.setState({delivery: []})
      }
    }
  }

  onChangeYear = id => {
    const {yearList} = this.state
    yearList.forEach(item => {
      if (item.id === id) {
        this.setState({curr_year: item.id, month: item.curr_month})
      }
    })
    this.timer = setTimeout(()=>{
      this.getCompany()
      this.getTarget()
      this.getMonthIncome()
      this.getEmpolyee()
      this.getSign()
      this.getBusiness()
    }, 200)
    
  }

  componentDidMount () {
    this.getYear()
  }

  componentWillUnmount () {
    if (this.timer) clearTimeout(this.timer)
  }

  render () {
    const {curr_year, yearList, company, incomeTotal, target, month, monthIncome, empolyee, sign, terch, product, business, reMoney, delivery} = this.state
    return (
      <div className='big-screen-page'>
        <Header />
        <Year onChangeYear={this.onChangeYear} yearList={yearList} curr_year={curr_year} />
        <div className='main-container'>
          <div className='left-container'>
            <Target target={target} curr_year={curr_year} />
            <Income month={month} monthIncome={monthIncome} />
            <Empolyee empolyee={empolyee} />
          </div>
          <div className='center-container'>
            <Center company={company} incomeTotal={incomeTotal} curr_year={curr_year} />
          </div>
          <div className='right-container'>
            <Business terch={terch} product={product} business={business} reMoney={reMoney} delivery={delivery} />
            <Sign sign={sign} />
          </div>
        </div>
      </div>
    )
  }
}