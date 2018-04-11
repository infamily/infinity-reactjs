import React from 'react';
import PropTypes from 'prop-types';
import {
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import TooltipOverlay from 'components/TooltipOverlay';

const TopicViewToggle = ({ topicView, onChangeTopicView }) => {
  return (
    <div className="view_toggle">
      <ToggleButtonGroup
        type="radio"
        bsSize="xsmall"
        name="options"
        value={topicView}
        onChange={onChangeTopicView}>
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
  )
}

TopicViewToggle.propTypes = {
  topicView: PropTypes.number.isRequired,
  onChangeTopicView: PropTypes.func.isRequired,
}

export default TopicViewToggle;