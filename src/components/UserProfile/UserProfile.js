import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAlert } from '../../Redux/Store/Actions/questionsAction';

import { Profile } from './index';

import '../Styl/UserProfile.scss';

class UserProfile extends Component {
  componentDidMount () {
    document.title = this.props.userLoggedIn.name;
    createAlert({
      message: '',
      show: false,
    });
  }

  render () {
    const scoreCard = () => {
      let score;

      score = this.props.allScores.filter(
        (f) => f.id === this.props.userLoggedIn.id,
      );
      return score;
    };

    return (
      <div className='userProfileWrapper'>
        <Profile { ...this.props } scoreCard={ scoreCard().pop() } />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    userLoggedIn: state.users.userLoggedIn,
    allScores: state.users.allScores,
  };
};

export default connect(mapStateToProps, { createAlert })(UserProfile);
