import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import './Tooltip.css';

const TooltipOverlay = ({ children, text, placement, ...rest }) => {
  const tooltip = (
    <Tooltip id="tooltip">
      <strong className="tooltip__text">{text}</strong>
    </Tooltip>
  );

  return (
    <OverlayTrigger placement={placement} overlay={tooltip} {...rest}>
      <div className="tooltip_overlay">{children}</div>
    </OverlayTrigger>
  );
};

TooltipOverlay.propTypes = {
  text: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default TooltipOverlay;
