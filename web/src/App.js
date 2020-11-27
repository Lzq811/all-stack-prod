/* 应用跟组件 */

import React, { Component } from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import flex from './utils/flex'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

import BackManage from './pages/back-manage'
import BigScreen from './pages/big-screen'


class App extends Component {

  componentDidMount () {
    flex()
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/admin' component={Admin}/>
          <Route path='/back' component={BackManage}/>
          <Route path='/web' component={BigScreen}/>
          <Route path='/' component={Admin}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App