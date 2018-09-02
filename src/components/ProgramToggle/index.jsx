import React from 'react';
import { FormattedMessage } from 'react-intl';
import TooltipOverlay from 'components/TooltipOverlay';
import { Link } from 'react-router-dom';
import configs from 'configs';
import messages from './messages';
import queryString from 'query-string';
import './ProgramToggle.css';
import pathToRegexp from 'path-to-regexp';

const ProgramToggle = props => {
  const goToLink = (flagId, link) => {
    const _props = props;
    const parsedQueryString = queryString.parse(props.history.location.search);
    const pathname = props.history.location.pathname;

    if (flagId !== undefined) {
      parsedQueryString.flag = flagId;
    }

    const search = queryString.stringify(parsedQueryString);

    window.scrollTo(0, 0);

    if (link) {
      props.history.push(link);
    } else {
      props.history.push({ pathname, search });
    }
  };

  return (
    <div className="program_toggle">
      <div className="all_toggle__label" onClick={() => goToLink(0)}>
        <FormattedMessage {...messages.all} />
      </div>

      <TooltipOverlay
        text={<FormattedMessage {...messages.goalTooltip} />}
        placement="bottom"
      >
        <div className="goal_toggle__label" onClick={() => goToLink(1)}>
          <FormattedMessage {...messages.goal} />
        </div>
      </TooltipOverlay>

      <TooltipOverlay
        text={<FormattedMessage {...messages.ideaTooltip} />}
        placement="bottom"
      >
        <div className="idea_toggle__label" onClick={() => goToLink(2)}>
          <FormattedMessage {...messages.idea} />
        </div>
      </TooltipOverlay>

      <TooltipOverlay
        text={<FormattedMessage {...messages.planTooltip} />}
        placement="bottom"
      >
        <div className="plan_toggle__label" onClick={() => goToLink(3)}>
          <FormattedMessage {...messages.plan} />
        </div>
      </TooltipOverlay>

      <TooltipOverlay
        text={<FormattedMessage {...messages.stepTooltip} />}
        placement="bottom"
      >
        <div className="step_toggle__label" onClick={() => goToLink(4)}>
          <FormattedMessage {...messages.step} />
        </div>
      </TooltipOverlay>

      <TooltipOverlay
        text={<FormattedMessage {...messages.taskTooltip} />}
        placement="bottom"
      >
        <div className="task_toggle__label" onClick={() => goToLink(5)}>
          <FormattedMessage {...messages.task} />
        </div>
      </TooltipOverlay>

      <div className="develop_toggle__label">
        <a
          id="develop_toggle__link"
          href="/#/wefindx.com:en/@/split/topic/235?flag=4&view=grid&topicSource=0"
        >
          <FormattedMessage {...messages.develop} />
        </a>
      </div>
    </div>
  );
};

export default ProgramToggle;
