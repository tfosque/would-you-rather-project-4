import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { createUser } from '../../Redux/Store/Actions/usersAction';
import { createAlert } from '../../Redux/Store/Actions/questionsAction';
import { Form, Button, Alert } from 'react-bootstrap';

class NewUserForm extends Component {
  state = {
    fname: '',
    lname: '',
    disable: true,
    show: false,
    submitted: false,
  };

  handleFname = (e) => {
    this.setState({
      fname: e.target.value,
    });
  };

  handleLname = (e) => {
    this.setState({
      lname: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({ submitted: true })
    e.preventDefault();
    if (this.state.fname !== '' && this.state.lname !== '') {
      this.props.createUser(this.formatUser());
    } else {
      this.setState({
        show: true,
      });
    }
  };

  handleKeyUp = () => {
    this.setState({
      disable: isEmpty(this.state.fname) || isEmpty(this.state.lname),
    });

    // next version will check for duplicate players and createMessage
  };

  formatUser = () => {
    const { fname, lname } = this.state;

    let user;
    let id = (this.state.fname + this.state.lname).toLowerCase();

    user = {
      id,
      name: `${ fname } ${ lname }`,
      questions: [],
      answers: [],
    };

    setTimeout(() => {
      this.props.onClose()
    }, 1500);

    return user;
  };

  render () {

    const Success = () => {
      return <div>{ this.state.submitted ? <small><Alert variant='success' style={ { height: 46 } }><p style={ { color: 'green' } }>'Player was successfully created'</p></Alert></small> : null }</div>
    }

    return (
      <div>
        <Form onKeyUp={ this.handleKeyUp }>
          <Form.Group controlId='formFirstName'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              htmlFor='fname'
              type='text'
              placeholder='First name'
              onChange={ this.handleFname }
              maxLength='8'
              required
            />
            <Form.Text className='text-muted'>
              Your first name will be used to create a user_id.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formLastName'>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              htmlFor='lname'
              type='text'
              placeholder='Last name'
              onChange={ this.handleLname }
              maxLength='8'
              required
            />
            <Form.Text className='text-muted'>
              Your last name will be used to create a user_id.
            </Form.Text>
          </Form.Group>
          <Success />

          <Button
            onClick={ this.handleSubmit }
            type='button'
            variant={ this.state.disable ? 'secondary' : 'success' }
            disabled={ this.state.disable }
            style={ { float: 'right' } }
          >
            Create Player
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    userLoggedIn: state.users.userLoggedIn
  };
};

export default connect(mapStateToProps, { createUser, createAlert })(NewUserForm);
