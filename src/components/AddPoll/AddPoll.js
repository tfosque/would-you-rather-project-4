import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import {
  saveQuestion,
  createAlert,
} from '../../Redux/Store/Actions/questionsAction'

import { withRouter } from 'react-router-dom'
import { Form, Button, ButtonGroup, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

import '../Styl/AddPoll.scss'

class AddPoll extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }

  componentDidMount () {
    document.title = 'Add new poll'
  }

  addPoll = () => {
    const {
      userLoggedIn: { id },
      users,
    } = this.props

    this.props.createAlert({
      message: 'your poll was successfully added',
      show: true
    })

    const newQuestion = {
      author: id,
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo
    }
    this.props.saveQuestion(newQuestion, id, users)
  }

  submit = e => {
    e.preventDefault()

    // dont submit if empty
    if (!isEmpty(this.state.optionOne) && !isEmpty(this.state.optionTwo)) {
      this.addPoll()

      const lastLocation = this.props.location.state.lastLocation;

      setTimeout(() => {
        this.props.createAlert({ message: '', show: false })
        this.props.history.push(lastLocation)
      }, 1000)
    } else {
      this.props.createAlert({
        message:
          'Please provide a value for Option One and Option Two and then click Add Question .',
        show: true
      })
    }
  }

  handleOptionOne = e => {
    this.setState({
      optionOne: e.target.value
    })
  }

  handleOptionTwo = e => {
    this.setState({
      optionTwo: e.target.value
    })
  }

  cancel = () => {
    this.props.history.push('/')
  }

  render () {
    // console.log('AddPoll:', this.props);

    return (
      <div className='addPollWrapper'>
        <Container>
          <h5>
            <span>Add New Poll</span>
          </h5>
          <Form onSubmit={ this.submit }>
            <Form.Group controlId='formOptionOne'>
              <Form.Control
                name='optionOne'
                type='text'
                placeholder='Option One'
                onChange={ this.handleOptionOne }
              />
              <Form.Text className='text-muted'>
                Please enter option one.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formOptionTwo'>
              <Form.Control
                name='optionTwo'
                type='text'
                placeholder='Option Two'
                onChange={ this.handleOptionTwo }
              />
              <Form.Text className='text-muted'>
                Please enter option two.
              </Form.Text>
            </Form.Group>

            <div style={ { textAlign: 'right' } }>
              <ButtonGroup>
                <Button variant='primary' type='submit'>
                  Add Question
                </Button>
                <Button onClick={ this.cancel } variant='secondary' type='button'>
                  Cancel
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Container>
        { this.props.bla }
      </div>
    )
  }
}

AddPoll.propTypes = {
  userLoggedIn: PropTypes.object
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.users.userLoggedIn,
    users: state.users.users,
    questions: state.questions.questions,
    allScores: state.users.allScores
  }
}

export default connect(mapStateToProps, {
  saveQuestion,
  createAlert,
})(withRouter(AddPoll))
