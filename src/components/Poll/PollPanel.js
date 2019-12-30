import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  setSelectedQuestion,
  setShowPollDetails,
  saveQuestionAnswer,
} from '../../Redux/Store/Actions/questionsAction';

import {PollDetails} from './index';

import '../Styl/Polls.scss';

class PollPanel extends Component {
  state = {
    pathname: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.location.pathname !== prevState.pathname &&
      nextProps.location.pathname === '/'
    ) {
      nextProps.setShowPollDetails(false);
      return {
        pathname: nextProps.location.pathname,
      };
    }
    return null;
  }

  handleClick = (questionPath, e) => {
    e.preventDefault();
    e.persist();

    if (this.props.showPollDetails) {
      return null;
    }

    const {
      location: {pathname},
    } = this.props;

    const userAnswer = {
      authedUser: this.props.userLoggedIn.id,
      qid: this.props.pollQuestion.id,
      answer: this.props.pollQuestion.option,
    };

    if (pathname !== '/') {
      this.props.saveQuestionAnswer(userAnswer);
    }

    const filterQ = this.props.questions
      .filter((f) => f.id === this.props.pollQuestion.id)
      .pop();

    this.props.setSelectedQuestion(filterQ, e.target.id);

    setTimeout(() => {
      if (this.props.history.location.pathname === '/') {
        this.props.history.push(questionPath);
      } else {
        this.props.setShowPollDetails(true);
      }
    }, 500);
  };

  render() {
    const {
      pollQuestion,
      pollQuestion: {redirectOption},
      showPollDetails,
      selectedPollOption,
      usersPollQuestions,
    } = this.props;

    // console.log('PollPanel:', this.props);

    const questionPath = `/question/${pollQuestion.id}`;

    let defaultStyles;
    const useRedirectOption =
      typeof redirectOption !== 'undefined' ? redirectOption.option : {}; // sessionStorage.getItem('myRedirect')

    // selection
    // if category = answered
    // find users answers, filter for currQuestion

    // myPolls votes
    // const targetPoll = pollQuestion; // pollQuestion[ pollQuestion.option ]

    if (!showPollDetails && !useRedirectOption) {
      console.log('if: 02');
      defaultStyles = 'omitSelection';
    }
    if (selectedPollOption === pollQuestion.option && !showPollDetails) {
      defaultStyles = 'omitSelection';
    }

    if (
      selectedPollOption === pollQuestion.option &&
      showPollDetails &&
      (selectedPollOption === 'optionOne' || selectedPollOption === 'optionTwo')
    ) {
      defaultStyles = `${selectedPollOption} selected`;
    } else if (
      selectedPollOption !== 'optionOne' &&
      selectedPollOption !== 'optionTwo' &&
      showPollDetails
    ) {
      defaultStyles =
        pollQuestion.option === useRedirectOption
          ? `${useRedirectOption} selected`
          : 'omitSelection';
    } else {
      defaultStyles = 'omitSelection';
    }

    return (
      <Link
        id={pollQuestion.option}
        to='/'
        onClick={(e) => this.handleClick(questionPath, e)}
        className='linkWrapper'
      >
        <div
          className={`pollPanelWrapper ${defaultStyles}`}
          id={pollQuestion.option}
        >
          {showPollDetails ? (
            <PollDetails
              pollQuestion={pollQuestion}
              selectedPollOption={selectedPollOption}
              usersPollQuestions={usersPollQuestions}
              useRedirectOption={useRedirectOption}
              {...this.props}
            />
          ) : (
            <div>
              <h3>{pollQuestion.text}</h3>
            </div>
          )}
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
    showPollDetails: state.questions.showPollDetails,
    selectedPollOption: state.questions.selectedPollOption,
    userLoggedIn: state.users.userLoggedIn,
    users: state.users.users,
    usersPollQuestions: state.questions.usersPollQuestions,
    category: state.menu.category,
  };
};

export default connect(mapStateToProps, {
  setSelectedQuestion,
  setShowPollDetails,
  saveQuestionAnswer,
})(withRouter(PollPanel));
