import React from 'react';
import { FormattedMessage } from 'react-intl';
import TooltipOverlay from 'components/TooltipOverlay';
import { Link } from 'react-router-dom';
import configs from 'configs';
import messages from './messages';
import './ProgramToggle.css';

const ProgramToggle = () => {
  const toTop = () => window.scrollTo(0, 0);

  return (
    <Link to={configs.linkBase()}>
      <div className="program_toggle" onClick={toTop}>
        <TooltipOverlay
          text={<FormattedMessage {...messages.importingToolip} />}
          placement="bottom"
        >
          <span className="program_toggle__label">
            <FormattedMessage {...messages.programs} />
          </span>
          <span className="program_toggle__sign">&#x03BB;</span>
        </TooltipOverlay>
      </div>
    </Link>
  );
};

export default ProgramToggle;
