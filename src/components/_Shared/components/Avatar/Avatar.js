import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { CircleGeneric } from '../../index';

import './Avatar.scss';

class Avatar extends Component {
  state = {
    adjustedWidth: 0,
  };

  componentDidMount() {
    this.adjustedWidth();
  }

  adjustedWidth = () => {
    this.setState({
      adjustedWidth: this.props.history.location.pathname.includes('profile')
        ? 160
        : this.props.width,
    });
  };

  render() {
    const { src } = this.props;

    let avatarStyle;

    if (this.props.hasOwnProperty('leaderboard')) {
      avatarStyle = 'leaderBoardAvatar';
    } else if (this.props.hasOwnProperty('poll')) {
      avatarStyle = 'pollAvatarContainer';
    } else if (this.props.hasOwnProperty('profile')) {
      avatarStyle = 'panelProfileContainer';
    }

    return (
      <div className={avatarStyle}>
        <Image
          style={{
            width: this.state.adjustedWidth,
            textAlign: 'center',
          }}
          src={src}
          className='avatarImage'
        />
        <CircleGeneric size='lg' />
      </div>
    );
  }
}

Avatar.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number,
};

Avatar.defaultProps = {
  url: require('../../../../images/noUser.png'),
  width: 80,
};

export default withRouter(Avatar);
