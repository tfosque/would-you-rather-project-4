import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createAlert } from '../../Redux/Store/Actions/questionsAction'
import FontAwesome from 'react-fontawesome'
class AddPollButton extends Component {
  render () {
    const { location: { pathname } } = this.props
    return (
      <div>
        {
          pathname !== '/error' && pathname !== '/login' ? (
            <Link to={ {
              pathname: '/add',
              state: {
                lastLocation: this.props.location.pathname,
              },
            } }
            >
              <FontAwesome name='plus-circle' size='5x' />
            </Link>
          ) : null
        }
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.users.userLoggedIn,
  }
}

export default connect(mapStateToProps, { createAlert })(withRouter(AddPollButton));