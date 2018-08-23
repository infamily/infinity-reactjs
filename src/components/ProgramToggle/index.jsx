import React from 'react';
import { FormattedMessage } from 'react-intl';
import TooltipOverlay from 'components/TooltipOverlay';
import { Link } from 'react-router-dom';
import configs from 'configs';
import messages from './messages';
import './ProgramToggle.css';
import pathToRegexp from 'path-to-regexp';

const ProgramToggle = () => {
  const toTop = () => window.scrollTo(0, 0);
  const toAll = () => window.scrollTo(0, 0);
  const toGoals = () => '';
  const toIdeas = () => '';
  const toPlans = () => '';
  const toSteps = () => '';
  const toTasks = () => '';
  const toBugs = () =>
    window.location.replace('https://inf.li/#/wefindx.com:en/@/topic/274/');
  const toData = () => '';

  return (
    <Link to={configs.linkBase()}>
      <div className="program_toggle">
        <div className="all_toggle__label" onClick={toTop}>
          <FormattedMessage {...messages.all} />
        </div>

        <TooltipOverlay
          text={<FormattedMessage {...messages.goalTooltip} />}
          placement="bottom"
        >
          <div className="goal_toggle__label" onClick={toGoals}>
            <FormattedMessage {...messages.goal} />
          </div>
        </TooltipOverlay>

        <TooltipOverlay
          text={<FormattedMessage {...messages.ideaTooltip} />}
          placement="bottom"
        >
          <div className="idea_toggle__label" onClick={toIdeas}>
            <FormattedMessage {...messages.idea} />
          </div>
        </TooltipOverlay>

        <TooltipOverlay
          text={<FormattedMessage {...messages.planTooltip} />}
          placement="bottom"
        >
          <div className="plan_toggle__label" onClick={toPlans}>
            <FormattedMessage {...messages.plan} />
          </div>
        </TooltipOverlay>

        <div className="step_toggle__label" onClick={toSteps}>
          <FormattedMessage {...messages.step} />
        </div>
        <div className="task_toggle__label" onClick={toTasks}>
          <FormattedMessage {...messages.task} />
        </div>
        <div className="bug_report_toggle__label" onClick={toBugs}>
          <FormattedMessage {...messages.bug} />
        </div>
        <div className="data_toggle__label" onClick={toData}>
          <FormattedMessage {...messages.data} />
        </div>
      </div>
    </Link>
  );
};

export default ProgramToggle;
