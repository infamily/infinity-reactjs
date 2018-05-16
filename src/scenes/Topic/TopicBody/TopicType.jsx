import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipOverlay from 'components/TooltipOverlay';

const getContainerStyle = color => ({
  border: `1px solid ${color}`,
  backgroundColor: color
});

class TopicInfo extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  };

  render() {
    const { type, color } = this.props;

    return (
      <div className="topic__type" style={getContainerStyle(color)}>
        <TooltipOverlay text="Topic type" placement="bottom">
          <strong className="">{type}</strong>
        </TooltipOverlay>
      </div>
    );
  }
}

export default TopicInfo;