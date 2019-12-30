import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router';
import {connect} from 'react-redux';
import {createAlert} from '../../Redux/Store/Actions/questionsAction';

import {Polls} from './';

class PollsContainer extends Component {
  state = {
    users: {},
  };

  render() {
    // console.log('PollsContainer:', this.props)

    const {
      userLoggedIn: {id},
    } = this.props;

    return (
      <div>
        {id === null ? (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: this.props.location},
            }}
          />
        ) : (
          <Polls />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    users: state.users.users,
    questions: state.questions.questions,
    userLoggedIn: state.users.userLoggedIn,
    category: state.menu.category,
    usersPolls: state.questions.usersPolls,
  };
};

export default connect(mapStateToProps, {createAlert})(
  withRouter(PollsContainer),
);
