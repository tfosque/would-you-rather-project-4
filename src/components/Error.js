import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUserLoggedIn} from '../Redux/Store/Actions/usersAction';
import {createAlert} from '../Redux/Store/Actions/questionsAction';
import {Col, Row} from 'react-bootstrap';

import '../components/Styl/Error.scss';

class Error extends PureComponent {
  componentDidUpdate() {
    const launched = sessionStorage.getItem('launched');

    if (launched === 'first') {
      sessionStorage.setItem('launched', 'active');
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <Row className='errorContainer'>
        <div className='top'>
          <Col lg={12}>
            <h2 className='h2'>
              <strong> 404</strong>
            </h2>
          </Col>
        </div>
        <div className='bottom'>
          <Col lg={12}>
            <h5>Page Not Found</h5>
          </Col>
        </div>
      </Row>
    );
  }
}

export default connect(null, {setUserLoggedIn, createAlert})(withRouter(Error));
