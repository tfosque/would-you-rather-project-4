import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
} from '../../Redux/Store/Actions/menuAction'
import { createAlert } from '../../Redux/Store/Actions/questionsAction'
import { setRedirect } from '../../Redux/Store/Actions/usersAction'

import { PollPanelGroup } from './index'

import '../Styl/Polls.scss'

class Poll extends Component {
  state = { option: null }

  componentDidMount () {
    const { location, match, userLoggedIn, showPollDetails } = this.props;

    // console.log('didMount:', this.props);

    // if user is not logged in send back to login with poll details
    if (userLoggedIn.id === null) {
      return this.props.history.replace({
        pathname: '/login',
        state: {
          from: '/Poll',
          requestUrl: location.pathname,
          details: match
        }
      })
    }

    if (this.isValidUrl()) {
      // if valid see if user has answered poll
      const option = this.hasUserAnsweredPoll()
      console.log({ option });

      // if user has not answered poll
      if (typeof option === 'undefined' && showPollDetails) {
        console.log('I have not answered this poll');
        // if user has not answered createAlert({message: ''}, show: true) // get users[answers] then style
        this.props.createAlert({ message: 'To answer this poll click on `Unanswered` from the menu.', show: true })

        // update state
        this.setState({
          option: option,
        })

        // navigate to poll
        this.props.history.replace(location.pathname)
      } else {
        // -- or setCategory to unanswered, setActiveLink to unanswered and navigate to question/question_id
        // go to poll 
        console.log('I have answered this poll');

        this.setState({
          option: option,
        })
        this.props.history.replace(location.pathname)
      }
    }
  }

  isValidUrl = () => {
    const { match, questions,
    } = this.props;

    const qid = match.params.question_id

    // filter questions by qid to find match
    const isValid = !isEmpty(questions.filter(question => question.id === qid))
    console.log({ isValid });

    return isValid;
  }

  hasUserAnsweredPoll = () => {
    const { users, userLoggedIn, match: { params: { question_id } } } = this.props;

    const user = users.filter(usr => userLoggedIn.id === usr.id)
    console.log({ user });

    // if not empty get answers
    if (!isEmpty(user)) {
      const answer = user.pop()[ 'answers' ][ question_id ]
      console.log({ answer });

      return answer;
    }
  }

  render () {
    // console.log('Poll:users', this.props);;

    // FLOW: component flow
    // Polls - PollPanelGroup - PollPanel - PollDetails - (Normal)
    // Poll - PollPanelGroup - PollPanel - PollDetails - (Redirect)

    const { question } = this.props

    return (
      <div className='pollsWrapper'>
        <PollPanelGroup poll={ { ...question, redirectOption: { option: this.state.option } } } />
      </div>
    )
  }
}

Poll.propTypes = {
  question: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired
}

Poll.defaultProps = {
  question: {},
  questions: []
}

const mapStateToProps = state => {
  return {
    question: state.questions.question,
    questions: state.questions.questions,
    userLoggedIn: state.users.userLoggedIn,
    users: state.users.users,
    usersPolls: state.questions.usersPolls,
    showPollDetails: state.questions.showPollDetails
  }
}

export default connect(mapStateToProps, {
  createAlert,
  setRedirect
})(withRouter(Poll))
