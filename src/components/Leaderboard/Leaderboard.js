import React, { Component } from 'react';
import { isEmpty, size, sortBy } from 'lodash';
import { connect } from 'react-redux';
import { createAlert } from '../../Redux/Store/Actions/questionsAction';
import { getUserAvatarUrl } from '../_utils/getUserAvatarUrl';
import LeaderboardPanelGroup from './LeaderboardPanelGroup';

import '../Styl/Leaderboard.scss';

class Leaderboard extends Component {
  componentDidMount () {
    document.title = 'Leaderboard';
    this.props.createAlert({ message: '', show: false });
  }

  render () {
    const { users } = this.props;

    const hasContent = !isEmpty(users);

    const filterUsers = hasContent ? Object.values(this.props.users) : null;

    let userList = [];

    let item = {};
    let user = {};

    if (!isEmpty(filterUsers)) {
      user = filterUsers.map((m) => {
        const score = size(m.questions) + size(m.answers);

        item = {
          avatar: getUserAvatarUrl(m.id),
          name: m.name,
          questionsAsked: size(m.questions),
          questionsAnswered: size(m.answers),
          score: score,
        };
        userList.push(item);
        return user;
      });
    }

    const sortedUserList = sortBy(userList, sortBy(userList, 'score'), 'name');

    return (
      <div className='leaderboardContainer'>
        <div className='leaderboard'>
          { !isEmpty(sortedUserList)
            ? sortedUserList.map((user, index) => (
              <LeaderboardPanelGroup
                key={ `${ user.id }${ index }` }
                user={ user }
                index={ index + 1 }
              />
            ))
            : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
    userLoggedIn: state.users.userLoggedIn,
    users: state.users.users,
    question: state.questions.question,
    allScores: state.users.allScores,
    unanswered: state.questions.unanswered,
    category: state.menu.category,
    userAvatarUrl: state.users.userAvatarUrl,
  };
};

export default connect(mapStateToProps, { createAlert })(Leaderboard);
