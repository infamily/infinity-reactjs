import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import settingsIcon from 'images/settings.svg';
import TooltipOverlay from 'components/TooltipOverlay';

export default class SettingsButton extends PureComponent {
  static propTypes = { action: PropTypes.func.isRequired };

  render() {
    return (
      <TooltipOverlay text="Filter Options" placement="top">
        <img
          onClick={this.props.action}
          src={settingsIcon}
          alt="settings icon"
          className="main__icon_btn"
        />
      </TooltipOverlay>
    );
  }
}
