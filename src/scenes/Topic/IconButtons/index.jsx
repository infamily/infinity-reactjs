import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clipIcon from 'images/Topic/clip.svg';
import nextIcon from 'images/Topic/next.svg';

export function ClipButton({ action }) {
  return (
    <img
      onClick={action}
      src={clipIcon}
      alt="clip icon"
      className="main__icon_btn"
    />
  );
}
ClipButton.propTypes = { action: PropTypes.func };
ClipButton.defaultProps = { action: null };

export function NextButton({ action }) {
  return (
    <img
      onClick={action}
      src={nextIcon}
      alt="clip icon"
      className="main__icon_btn"
    />
  );
}
NextButton.propTypes = { action: PropTypes.func };
NextButton.defaultProps = { action: null };
