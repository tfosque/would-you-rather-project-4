import React, { Component } from 'react'

import { NewUserForm } from './index'
import { Modal, Button } from 'react-bootstrap'

class CreateUser extends Component {
  state = {
    show: false
  }

  handleOpen = () => {
    this.setState({
      show: true
    })
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  render () {
    return (
      <span style={ { textAlign: 'center', marginTop: 0, marginLeft: -10 } }>
        { ' ' }
        <Button
          variant='link'
          onClick={ this.handleOpen }
          style={ { color: 'gold' } }
        >
          <small>Create player</small>
        </Button>
        <Modal show={ this.state.show } onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>Create Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewUserForm { ...this.props } onClose={ this.handleClose } />
          </Modal.Body>
        </Modal>
      </span>
    )
  }
}

export default CreateUser
