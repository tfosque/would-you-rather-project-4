import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createAlert } from '../../../../Redux/Store/Actions/questionsAction';

import { Toast } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import './ToastAlert.scss';

class ToastAlert extends Component {
  handleAlert = (message, dismiss) => {
    this.props.createAlert({ message: message, show: dismiss });
  };

  render () {
    let date = new Date(Date.now());
    date = date.toLocaleDateString();

    return (
      <div className='toastAlertWrapper'>
        <Toast
          className='toast'
          show={ this.props.showAlert.show }
          onClose={ () => this.handleAlert('', false) }
        >
          <Toast.Header>
            <FontAwesome
              name='info-circle'
              size='2x'
              variant='warning'
              style={ { color: '#bd9e2d' } }
            />
            &nbsp;
            <strong className='mr-auto'>Alert</strong>
            <small>{ date }</small>
          </Toast.Header>
          <Toast.Body>{ this.props.showAlert.message }</Toast.Body>
        </Toast>
      </div>
    );
  }
}

ToastAlert.propTypes = {
  showAlert: PropTypes.object,
};

ToastAlert.defaultProps = {
  showAlert: { message: 'toast message', show: false },
};

const mapStateToProps = (state) => {
  return {
    showAlert: state.questions.showAlert,
  };
};

export default connect(mapStateToProps, { createAlert })(
  withRouter(ToastAlert),
);
