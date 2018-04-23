import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipOverlay from 'components/TooltipOverlay';
import '../balance.css';

const getBorder = color => ({ border: `1px solid ${color}` });
const getContainerStyle = color => ({
  border: `1px solid ${color}`,
  backgroundColor: color
});

class TopicInfo extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  };

  render() {
    const { type, hours, color } = this.props;

    return (
      <div
        className="balance__hours balance__topic"
        style={getContainerStyle(color)}
      >
        <TooltipOverlay text="Topic type" placement="bottom">
          <strong className="balance__counter">{type}</strong>
        </TooltipOverlay>
        <TooltipOverlay text="Community contribution" placement="bottom">
          <span className="balance__quota" style={getBorder(color)}>
            {hours}h
          </span>
        </TooltipOverlay>
      </div>
    );
  }
}

export default TopicInfo;
