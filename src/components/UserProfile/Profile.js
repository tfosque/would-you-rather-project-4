import React, { Component } from 'react';
import { Avatar } from '../_Shared/index';
import { getUserAvatarUrl } from '../_utils/getUserAvatarUrl';

import { PanelProfile } from './index';

import '../Styl/UserProfile.scss';

class Proflie extends Component {
  render () {
    const avatarUrl = getUserAvatarUrl(this.props.userLoggedIn.id);

    return (
      <div className='userProfileWrapper'>
        <div>
          <Avatar src={ avatarUrl } index={ 0 } profile />
          <h2>
            <b>{ this.props.userLoggedIn.name }</b>
          </h2>
          <div>
            <PanelProfile { ...this.props } index={ 0 } />
          </div>
        </div>
      </div>
    );
  }
}

export default Proflie;
