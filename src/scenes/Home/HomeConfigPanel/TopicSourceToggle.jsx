import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import TooltipOverlay from 'components/TooltipOverlay';
import messages from './messages';

const TopicSourceToggle = ({
  topicSource,
  onChangeTopicView,
  handleTopicView,
  view
}) => (
  <div className="view_toggle">
    <p className="view_toggle__label">
      <FormattedMessage {...messages.filter} />
    </p>
    <div>
      <div className="view_toggle__section">
        <span className="view_toggle__label">
          <small>
            <FormattedMessage {...messages.view} />
          </small>
        </span>
        <ToggleButtonGroup
          type="radio"
          bsSize="small"
          className="view_toggle__grid_toggle"
          name="options"
          value={view}
          onChange={handleTopicView}
        >
          <ToggleButton value="line">
            <TooltipOverlay
              text={<FormattedMessage {...messages.treePlaceholder} />}
              placement="bottom"
            >
              <span>
                <FormattedMessage {...messages.tree} />
              </span>
            </TooltipOverlay>
          </ToggleButton>
          <ToggleButton value="grid">
            <TooltipOverlay
              text={<FormattedMessage {...messages.gridPlaceholder} />}
              placement="bottom"
            >
              <span>
                <FormattedMessage {...messages.grid} />
              </span>
            </TooltipOverlay>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="view_toggle__section">
        <span className="view_toggle__label">
          <small>
            <FormattedMessage {...messages.source} />
          </small>
        </span>
        <ToggleButtonGroup
          type="radio"
          bsSize="small"
          name="options"
          value={topicSource}
          onChange={onChangeTopicView}
        >
          <ToggleButton value={1}>
            <TooltipOverlay
              text={<FormattedMessage {...messages.topPlaceholder} />}
              placement="bottom"
            >
              <span>
                <FormattedMessage {...messages.topLevel} />
              </span>
            </TooltipOverlay>
          </ToggleButton>
          <ToggleButton value={0}>
            <TooltipOverlay
              text={<FormattedMessage {...messages.allPlaceholder} />}
              placement="bottom"
            >
              <span>
                <FormattedMessage {...messages.all} />
              </span>
            </TooltipOverlay>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  </div>
);

TopicSourceToggle.propTypes = {
  topicSource: PropTypes.number.isRequired,
  view: PropTypes.string.isRequired,
  onChangeTopicView: PropTypes.func.isRequired,
  handleTopicView: PropTypes.func.isRequired
};

export default TopicSourceToggle;
