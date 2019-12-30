import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {getUserAvatarUrl, setScores} from '../_utils/index';
import {
  fetchUsers,
  setAllScores,
  setUsersAvatarUrl,
  setUserLoggedIn,
} from '../../Redux/Store/Actions/usersAction';
import {
  fetchQuestions,
  setShowPollDetails,
  createAlert,
} from '../../Redux/Store/Actions/questionsAction';
import {setCategory} from '../../Redux/Store/Actions/menuAction';

import {Badge, Image, Nav} from 'react-bootstrap';

import NavLink from './Navlink';
import {CreateUser} from '../CreateUser';

import '../Styl/Menu.scss';

class Menu extends Component {
  state = {
    userLoggedIn: {},
    match: {},
  };

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchQuestions();
    setTimeout(() => {
      this.addScore();
    }, 300);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.userLoggedIn !== this.props.userLoggedIn &&
      this.props.userLoggedIn.id !== null &&
      typeof this.props.userLoggedIn !== 'undefined'
    ) {
      // check user id for image icon
      const chkUserID = this.props.userLoggedIn.id;
      const userAvatarUrl = getUserAvatarUrl(chkUserID);
      this.props.setUsersAvatarUrl(userAvatarUrl);
    }

    if (prevProps.users !== this.props.users) {
      setTimeout(() => {
        this.addScore();
      }, 300);
    }

    if (this.props.location.pathname === '/login') {
      this.props.createAlert({message: 'Please login', show: true});
    }
  }

  // clear user
  handleLogout = (e) => {
    e.preventDefault();
    this.props.setCategory('logout');
    this.props.setUserLoggedIn([{id: null, name: null}]);
    this.props.history.replace('/login');
  };

  addScore = () => {
    const usersList = this.props.users;

    if (usersList.length > 0) {
      const userScores = setScores(usersList);
      this.props.setAllScores(userScores);
    }
  };

  handleMenuSelect = (event) => {
    const {
      userLoggedIn: {id},
    } = this.props;

    this.props.setShowPollDetails(false);

    // allows logout button to remain active menu is diabled
    if (!this.props.match.isExact && event === 'logout') {
      this.props.createAlert({
        message: 'Please login to continue',
        show: true,
      });
      this.props.setCategory('logout');
      this.props.setUserLoggedIn([{id: null, name: null}]);
      this.props.history.push('/login');
    }
    // if no user is logged in then disable menu
    if (id !== null) {
      if (event === 'unanswered') {
        this.props.setCategory('unanswered');
        setTimeout(() => {
          this.props.history.push('/');
        }, 500);
      } else if (event === 'answered') {
        this.props.setCategory('answered');
        setTimeout(() => {
          this.props.history.push('/');
        }, 500);
      } else if (event === 'leaderboard') {
        this.props.history.push('/leaderboard');
      } else if (event === 'logout') {
        this.props.setCategory('logout');
        this.props.setUserLoggedIn([{id: null, name: null}]);
        this.props.history.push('/login');
      }
    }
  };

  render() {
    const playerScore =
      !isEmpty(this.props.users) &&
      this.props.userLoggedIn.id !== null &&
      !isEmpty(this.props.allScores)
        ? this.props.allScores
            .filter((f) => f.id === this.props.userLoggedIn.id)
            .pop().score
        : 0;

    return (
      <div className='mainMenuContainer'>
        <Nav.Link eventKey='user' to='/profile'>
          <Badge variant='secondary'>{playerScore}</Badge>
          <Image
            className='user'
            src={getUserAvatarUrl(this.props.userLoggedIn.id)}
            alt='avatar'
            width={84}
            onClick={() => this.props.history.push('/profile')}
          />
          &nbsp;
          <span onClick={() => this.props.history.push('/profile')}>
            {this.props.userLoggedIn.name}
          </span>
          <CreateUser />
        </Nav.Link>

        <Nav onSelect={this.handleMenuSelect} className='menuInnerContainer'>
          <NavLink
            eventKey='leaderboard'
            label='Leaderboard'
            path='/leaderboard'
          />
          <NavLink eventKey='unanswered' label='Unanswered' path='/' />
          <NavLink eventKey='answered' label='Answered' path='/' />

          <Nav className='logoutNav'>
            <NavLink eventKey='login' to='/' login {...this.props} />
            <NavLink
              eventKey='logout'
              to='/'
              label='Logout'
              onClick={this.handleLogout}
              icon='sign-out'
              {...this.props}
            />
          </Nav>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.users.userLoggedIn,
    users: state.users.users,
    questions: state.questions.questions,
    allScores: state.users.allScores,
    userAvatarUrl: state.users.userAvatarUrl,
    category: state.menu.category,
    usersPollQuestions: state.questions.usersPollQuestions,
  };
};

export default connect(mapStateToProps, {
  setUserLoggedIn,
  fetchUsers,
  fetchQuestions,
  setAllScores,
  setCategory,
  setUsersAvatarUrl,
  setShowPollDetails,
  createAlert,
})(withRouter(Menu));
