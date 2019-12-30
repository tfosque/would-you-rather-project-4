import React, { Component } from 'react';
import { Image } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome';

import '../../../Styl/CircleIcon.scss';

class CircleGeneric extends Component {
  render () {
    const { url } = this.props;

    const IconElement = (
      <div className='circleAvatar'>
        <Image src={ url } alt="" width={ 80 } />
        <FontAwesome name='circle' className='circleIconAvatar' />
      </div>
    );
    return <div>{ IconElement }</div>;
  }
}

export default CircleGeneric;
