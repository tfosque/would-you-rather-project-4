import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setActiveLink} from '../../Redux/Store/Actions/menuAction';
import {createAlert} from '../../Redux/Store/Actions/questionsAction';
import {setRedirect} from '../../Redux/Store/Actions/usersAction';

import {PollPanelGroup} from './index';

import '../Styl/Polls.scss';

class Poll extends Component {
  state = {option: null};

  componentDidMount() {
    setTimeout(() => {
      const {location, match, userLoggedIn, showPollDetails} = this.props;

      // if user is not logged in send back to login with poll details
      if (userLoggedIn.id === null) {
        return this.props.history.replace({
          pathname: '/login',
          state: {
            from: '/Poll',
            requestUrl: location.pathname,
            details: match,
            isValid: this.isValidUrl(),
          },
        });
      }

      if (this.isValidUrl()) {
        // if valid see if user has answered poll
        const option = this.hasUserAnsweredPoll();

        // if user has not answered poll
        if (typeof option === 'undefined' && showPollDetails) {
          // if user has not answered createAlert({message: ''}, show: true) // get users[answers] then style
          this.props.createAlert({
            message: 'To answer this poll click on `Unanswered` from the menu.',
            show: true,
          });

          // update state
          this.setState({
            option: option,
          });

          // navigate to poll
          this.props.history.replace(location.pathname);
        } else {
          this.setState({
            option: option,
          });
          this.props.history.replace(location.pathname);
        }
      }
    }, 1050);
  }

  isValidUrl = () => {
    const {match, questions} = this.props;

    const qid = match.params.question_id;

    // filter questions by qid to find match
    const isValid = !isEmpty(
      questions.filter((question) => question.id === qid),
    );

    return isValid;
  };

  hasUserAnsweredPoll = () => {
    const {
      users,
      userLoggedIn,
      match: {
        params: {question_id},
      },
    } = this.props;

    const user = users.filter((usr) => userLoggedIn.id === usr.id);

    // if not empty get answers
    if (!isEmpty(user)) {
      const answer = user.pop()['answers'][question_id];
      return answer;
    }
  };

  render() {
    // FLOW: component flow
    // Polls - PollPanelGroup - PollPanel - PollDetails - (Normal)
    // Poll - PollPanelGroup - PollPanel - PollDetails - (Redirect)

    const {question, questions} = this.props;

    if (isEmpty(questions)) {
      return (
        <div
          style={{
            color: '#fff',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: 'auto',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className='pollsWrapper'>
        <PollPanelGroup
          poll={{...question, redirectOption: {option: this.state.option}}}
        />
      </div>
    );
  }
}

Poll.propTypes = {
  question: PropTypes.object.isRequired,
};

Poll.defaultProps = {
  question: {},
};

const mapStateToProps = (state) => {
  return {
    question: state.questions.question,
    questions: state.questions.questions,
    userLoggedIn: state.users.userLoggedIn,
    users: state.users.users,
    usersPolls: state.questions.usersPolls,
    showPollDetails: state.questions.showPollDetails,
    activeLink: state.menu.activeLink,
  };
};

export default connect(mapStateToProps, {
  createAlert,
  setRedirect,
  setActiveLink,
})(withRouter(Poll));
