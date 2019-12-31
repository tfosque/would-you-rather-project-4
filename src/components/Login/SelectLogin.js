import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {setUserLoggedIn} from '../../Redux/Store/Actions/usersAction';
import {setActiveLink, setCategory} from '../../Redux/Store/Actions/menuAction';
import {
  setSelectedQuestion,
  setShowPollDetails,
} from '../../Redux/Store/Actions/questionsAction';

import '../Styl/Login.scss';

class SelectLogin extends Component {
  componentDidUpdate(prevProps) {
    this.handleDropdownReset();
  }

  handleDropdownReset = () => {
    setTimeout(() => {
      if (this.props.category === 'logout') {
        const option = document.querySelector('#appSelect');
        option.selectedIndex = 0;
      }
    }, 500);
  };

  handleOnChange = (e) => {
    const {
      location: {state},
    } = this.props;

    const newUser = this.props.users.filter((f) => f.id === e.target.value);

    this.props.setUserLoggedIn(newUser);
    this.props.setActiveLink('unanswered');
    this.props.setCategory('unanswered');

    const isValidPoll = () => {
      const user = this.props.users.filter((f) => f.id === setUserLoggedIn.id);
      return user;
    };
    // if location.state and isValidPoll
    if (state && state.from && state.details && isValidPoll()) {
      const selQuestion = this.props.questions
        .filter((f) => f.id === state.details.params.question_id)
        .pop();

      this.props.setShowPollDetails(true);
      this.props.setSelectedQuestion(selQuestion);
      this.props.createAlert({message: '', show: false});

      this.props.history.push(state.requestUrl);
    } else {
      // no location.state
      this.props.history.push('/');
    }
  };

  render() {
    // console.log('SelectedLogin:props', this.props);

    const {users} = this.props;

    if (isEmpty(users)) {
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
      <form onChange={this.handleOnChange}>
        <select
          className='custom-select mb-2 mr-sm-2 mb-sm-0 form-control'
          id='appSelect'
        >
          <option defaultValue>Select a player to start </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.questions.question,
  };
};

export default connect(mapStateToProps, {
  setUserLoggedIn,
  setActiveLink,
  setCategory,
  setSelectedQuestion,
  setShowPollDetails,
})(withRouter(SelectLogin));
