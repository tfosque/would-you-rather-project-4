import React, { Component } from 'react';
import PropTypes, { bool } from 'prop-types';
import FontAwesome from 'react-fontawesome';

import '../../../Styl/CircleIcon.scss';

class CircleIcon extends Component {
  render() {
    const { size, showText } = this.props;

    let IconSize;
    let classWrapper = '';
    let classIcon = '';

    if (size === 'medium') {
      IconSize = '3x';
      classWrapper = 'circleIconWrapperMedium';
      classIcon = 'circleIconMedium';
    } else if (size === 'lg') {
      IconSize = '5x';
      classWrapper = 'circleIconWrapperLarge';
      classIcon = 'circleIconLarge';
    }

    return (
      <div className={classWrapper}>
        <FontAwesome name='circle' size={IconSize} className={classIcon} />
        {showText ? <h4>OR</h4> : null}
      </div>
    );
  }
}

CircleIcon.propTypes = {
  size: PropTypes.string,
  showText: bool,
};

export default CircleIcon;
