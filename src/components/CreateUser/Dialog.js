import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap';

class Dialog extends React.Component {
  state = {
    show: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show !== prevState.show) {
      return {
        show: nextProps.show,
      };
    }
    return null;
  }

  render() {
    return (
      <div className='alertDialogContainer'>
        <Alert show={this.state.show} variant='warning' dismissible>
          <p>{this.props.message}</p>
        </Alert>
      </div>
    );
  }
}

Dialog.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Dialog;
