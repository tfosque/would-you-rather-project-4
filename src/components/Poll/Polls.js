import React, { Component } from 'react'
import { size, sortBy, isEmpty } from 'lodash'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  createAlert,
  formatUsersPolls
} from '../../Redux/Store/Actions/questionsAction'
import { setActiveLink } from '../../Redux/Store/Actions/menuAction'
import { formatUsersQuestions } from '../_utils/formatUsersQuestions'

import { PollPanelGroup } from './index'

import '../Styl/Polls.scss'

class Polls extends Component {
  state = {
    questions: [],
    users: [],
    usersPollQuestions: {},
    timer: null
  }

  timer = null

  componentDidMount () {
    const {
      userLoggedIn: { id },
      questions,
      users
    } = this.props

    const formatted = formatUsersQuestions(id, questions, users)

    this.timer = setTimeout(() => {
      this.props.formatUsersPolls(formatted)

      this.setState({
        usersPollQuestions: formatted
      })
    }, 500)
    this.props.createAlert({ mesage: '', show: false })
  }

  componentDidUpdate (prevProps) {
    const {
      usersPolls,
    } = prevProps

    const empty = isEmpty(usersPolls[ 'unanswered' ])

    if (empty) {
      prevProps.createAlert({ message: 'Enter a new poll question by clicking the add poll button below.', show: true })
    } else {
      this.props.createAlert({ message: '', show: false })
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    // console.log('Polls:', this.props)

    let { usersPollQuestions } = this.state

    const { category } = this.props

    // apply spinner if no data
    if (size(usersPollQuestions) < 1) {
      return (
        <div
          style={ {
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
            fontSize: '1.2em'
          } }
        >
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )
    }

    usersPollQuestions = sortBy(
      usersPollQuestions[ category ],
      'timestamp'
    ).reverse()

    return (
      <div className='pollsWrapper'>
        { category ? (
          <div>
            { usersPollQuestions.map(poll => (
              <PollPanelGroup
                key={ poll.timestamp }
                { ...this.props }
                poll={ poll }
              />
            )) }
          </div>
        ) : null }
      </div>
    )
  }
}

Polls.propTypes = {
  user: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
}

Polls.defaultProps = {
  user: {},
  category: 'unanswered'
}

const mapStateToProps = state => {
  return {
    user: state.users.user,
    users: state.users.users,
    questions: state.questions.questions,
    userLoggedIn: state.users.userLoggedIn,
    category: state.menu.category,
    usersPolls: state.questions.usersPolls
  }
}

export default connect(mapStateToProps, {
  createAlert,
  formatUsersPolls,
  setActiveLink
})(withRouter(Polls))
