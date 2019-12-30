import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  saveQuestionAnswer,
  setShowPollDetails
} from '../../Redux/Store/Actions/questionsAction'

import { getUserAvatarUrl } from '../_utils'
import { PollPanel } from './index'
import { CircleGenericAvatar } from '../_Shared'
import { CircleGeneric } from '../_Shared'

import '../Styl/Polls.scss'


class PollPanelGroup extends PureComponent {
  render () {
    // console.log('PollPanelGroup:', this.props);

    const { poll, poll: { redirectOption } } = this.props

    const list = [
      {
        ...poll,
        ...poll.optionOne,
        option: 'optionOne',
        optionOne: poll.optionOne,
        optionTwo: poll.optionTwo,
        redirectOption,
      },
      {
        ...poll,
        ...poll.optionTwo,
        option: 'optionTwo',
        optionOne: poll.optionOne,
        optionTwo: poll.optionTwo,
        redirectOption,
      }
    ]

    const avatarUrl = getUserAvatarUrl(poll.author)

    return (
      <div className='pollPanelGroupWrapper'>
        {
          this.props.match.path !== '/' ? (
            <div>
              <CircleGenericAvatar url={ avatarUrl } />
            </div>
          ) : null
        }
        { list.map(question => (
          <PollPanel
            key={ `${ question.auth }${ Math.random(10) * 2 }` }
            pollQuestion={ { ...question } }
          />
        )) }
        <CircleGeneric />
        <br />
      </div>
    )
  }
}

PollPanelGroup.propTypes = {
  user: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
}

PollPanelGroup.defaultProps = {
  user: {},
  category: 'unanswered'
}

const mapStateToProps = state => {
  return {
    user: state.users.user,
    userLoggedIn: state.users.userLoggedIn,
    usersPollQuestions: state.questions.usersPollQuestions,
    users: state.users.users,
    questions: state.questions.questions
  }
}

export default connect(mapStateToProps, {
  saveQuestionAnswer,
  setShowPollDetails
})(withRouter(PollPanelGroup))
