import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {UserProfile} from './UserProfile/index';
import {Leaderboard} from './Leaderboard';
import {AddPoll} from './AddPoll/index';
import {PollsContainer, Poll} from './Poll';
import Index from './Login/Index';
import Error from './Error';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={PollsContainer} />
        <Route exact path='/login' component={Index} />
        <Route exact path='/question/:question_id' component={Poll} />
        <Route exact path='/leaderboard' component={Leaderboard} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/add' component={AddPoll} />

        <Route component={Error} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.users.userLoggedIn,
    users: state.users.users,
    questions: state.questions.questions,
    showPollDetails: state.questions.showPollDetails,
  };
};

export default connect(mapStateToProps, {})(withRouter(Routes));
