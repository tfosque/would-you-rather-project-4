import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../../../Styl/CircleIcon.scss';

class CircleGeneric extends Component {
  render () {
    const { size } = this.props;

    let IconElement = null;

    const user_size = size === 'lg' ? '5x' : '3x';
    const user_class = size === 'lg' ? 'circleIconLarge' : 'circleIconMedium';

    IconElement = (
      <div className='circleGenericWrapper'>
        <FontAwesome name='circle' size={ user_size } className={ user_class } />
        <h5>OR</h5>
      </div >
    );
    return <div>{ IconElement }</div>;
  }
}

export default CircleGeneric;
