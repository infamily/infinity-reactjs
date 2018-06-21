import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipOverlay from 'components/TooltipOverlay';
import { FormattedMessage } from 'react-intl';
import messages from 'scenes/Topic/messages';

const getContainerStyle = color => ({
  border: `1px solid ${color}`,
  backgroundColor: color
});

class TopicInfo extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    color: PropTypes.string.isRequired
  };

  render() {
    const { type, color, onClick } = this.props;

    return (
      <div
        onClick={onClick}
        className="topic__type"
        style={getContainerStyle(color)}
      >
        <TooltipOverlay
          text={<FormattedMessage {...messages.topicType} />}
          placement="bottom"
        >
          <strong className="">{type}</strong>
        </TooltipOverlay>
      </div>
    );
  }
}

export default TopicInfo;
