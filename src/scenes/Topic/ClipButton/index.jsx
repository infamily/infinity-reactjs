import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clipIcon from 'images/Topic/clip.svg';

export default class ClipButton extends PureComponent {
  static propTypes = { action: PropTypes.func };
  static defaultProps = { action: null };

  render() {
    return (
      <img
        onClick={this.props.action}
        src={clipIcon}
        alt="clip icon"
        className="topic__permalink"
      />
    );
  }
}
