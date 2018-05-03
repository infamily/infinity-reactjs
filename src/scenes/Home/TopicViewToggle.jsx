import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import TooltipOverlay from 'components/TooltipOverlay';

const TopicViewToggle = ({
  topicView,
  onChangeTopicView,
  handleTopicView,
  view
}) => (
  <div className="view_toggle">
    <TooltipOverlay text="Click to change Title/Grid view" placement="bottom">
      <Button
        className="view_toggle__grid_btn"
        onClick={handleTopicView}
        bsSize="xsmall"
      >
        {view}
      </Button>
    </TooltipOverlay>
    <ToggleButtonGroup
      type="radio"
      bsSize="xsmall"
      name="options"
      value={topicView}
      onChange={onChangeTopicView}
    >
      <ToggleButton value={1}>
        <TooltipOverlay text="Display only top-level topics" placement="bottom">
          <span>Tree</span>
        </TooltipOverlay>
      </ToggleButton>
      <ToggleButton value={0}>
        <TooltipOverlay text="Display all topics" placement="bottom">
          <span>List</span>
        </TooltipOverlay>
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
);

TopicViewToggle.propTypes = {
  topicView: PropTypes.number.isRequired,
  view: PropTypes.string.isRequired,
  onChangeTopicView: PropTypes.func.isRequired,
  handleTopicView: PropTypes.func.isRequired
};

export default TopicViewToggle;
