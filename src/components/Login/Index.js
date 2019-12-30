import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';

class Index extends PureComponent {
  componentDidMount() {
    const {
      location: {state},
    } = this.props;

    // if bad url
    if (state) {
      if (state && state.from && state.from.pathname === '/') {
        return this.props.history.push('/login');
      }
      if (state && !state.isValid) {
        this.props.history.push('/error');
      }
    }
  }

  render() {
    return <div />;
  }
}

export default withRouter(Index);
