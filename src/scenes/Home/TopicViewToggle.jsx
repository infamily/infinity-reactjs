import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import TooltipOverlay from 'components/TooltipOverlay';

const TopicSourceToggle = ({
  topicSource,
  onChangeTopicView,
  handleTopicView,
  view
}) => (
  <div className="view_toggle">
    <ToggleButtonGroup
      type="radio"
      bsSize="xsmall"
      className="view_toggle__grid_toggle"
      name="options"
      value={view}
      onChange={handleTopicView}
    >
      <ToggleButton value="line">
        <TooltipOverlay text="Display as lines" placement="bottom">
          <span>Tree</span>
        </TooltipOverlay>
      </ToggleButton>
      <ToggleButton value="grid">
        <TooltipOverlay text="Display as Grid" placement="bottom">
          <span>Grid</span>
        </TooltipOverlay>
      </ToggleButton>
    </ToggleButtonGroup>
    <ToggleButtonGroup
      type="radio"
      bsSize="xsmall"
      name="options"
      value={topicSource}
      onChange={onChangeTopicView}
    >
      <ToggleButton value={1}>
        <TooltipOverlay text="Display only top-level topics" placement="bottom">
          <span>Top-Level</span>
        </TooltipOverlay>
      </ToggleButton>
      <ToggleButton value={0}>
        <TooltipOverlay text="Display all topics" placement="bottom">
          <span>All</span>
        </TooltipOverlay>
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
);

TopicSourceToggle.propTypes = {
  topicSource: PropTypes.number.isRequired,
  view: PropTypes.string.isRequired,
  onChangeTopicView: PropTypes.func.isRequired,
  handleTopicView: PropTypes.func.isRequired
};

export default TopicSourceToggle;
