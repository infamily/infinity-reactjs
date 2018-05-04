import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import settingsIcon from 'images/settings.svg';

export default class ClipButton extends PureComponent {
  static propTypes = { action: PropTypes.func.isRequired };

  render() {
    return (
      <img
        onClick={this.props.action}
        src={settingsIcon}
        alt="settings icon"
        className="main__icon_btn"
      />
    );
  }
}
