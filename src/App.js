import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './Redux/Store/store'
import {
  BrowserRouter, Switch,
} from 'react-router-dom'

import { Col } from 'react-bootstrap'
import {
  AddPollButton
} from './components/AddPoll/index'
import Menu from './components/MainMenu/Menu'
import Routes from './components/Routes'
import { ToastAlert } from './components/_Shared/index'

import './App.css'

class App extends Component {
  render () {
    return (
      <Provider store={ configureStore() }>
        <div className='appContainer'>
          <BrowserRouter basename='/'>
            <Menu />
            <Switch>
              <Routes />
            </Switch>

            <Col lg={ 12 } style={ { marginTop: 60 } }>
              <ToastAlert />
            </Col>
            <footer className='footer'>
              <div>
                <AddPollButton />
              </div>
            </footer>
          </BrowserRouter>
        </div>
      </Provider>
    )
  }
}

export default App
