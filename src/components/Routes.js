import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserProfile } from './UserProfile/index'
import { Leaderboard } from './Leaderboard'
import { AddPoll } from './AddPoll/index'
import { PollsContainer, Poll } from './Poll'
import Home from './Home'
import Error from './Error'

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={ PollsContainer } />
        <Route exact path='/login' component={ Home } />
        <Route exact path='/question/:question_id' component={ Poll } />
        <Route exact path='/leaderboard' component={ Leaderboard } />
        <Route exact path='/profile' component={ UserProfile } />
        <Route exact path='/add' component={ AddPoll } />

        <Route component={ Error } />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.users.userLoggedIn,
    users: state.users.users
  }
}

export default connect(mapStateToProps, {})(Routes)
