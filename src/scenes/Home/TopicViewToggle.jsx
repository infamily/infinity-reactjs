import React from 'react';
import PropTypes from 'prop-types';
import {
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import TooltipOverlay from 'components/TooltipOverlay';
import branchIcon from 'images/Home/branchIcon.png';
import listIcon from 'images/Home/listIcon.png';

const TopicViewToggle = ({ topicView, onChangeTopicView }) => {
  return (
    <div>
      <ToggleButtonGroup
        type="radio"
        bsSize="xsmall"
        name="options"
        value={topicView}
        onChange={onChangeTopicView}>
        <ToggleButton value={1}> 
          <TooltipOverlay text="Display only top-level topics" placement="bottom">
            <span>Tree</span>  
            <img className="view_toggle__img" src={branchIcon} alt="branch view"/>
          </TooltipOverlay>
        </ToggleButton>
        <ToggleButton value={0}>
          <TooltipOverlay text="Display all topics" placement="bottom">
            <span>Sequence</span>  
            <img className="view_toggle__img" src={listIcon} alt="list view"/>
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