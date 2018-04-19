import React from 'react';
import TooltipOverlay from 'components/TooltipOverlay';
import { Link } from 'react-router-dom';
import configs from 'configs';
import './ProgramToggle.css';

const ProgramToggle = () => {
  const toTop = () => window.scrollTo(0, 0);
  const text = "Importing programs will be released coming soon...";
  
  return (
    <Link to={configs.linkBase()}>
      <div className="program_toggle" onClick={toTop}>
        <TooltipOverlay text={text} placement="bottom">
          <span>PROGRAMS</span>
          <span className="program_toggle__sign">&#x03BB;</span>
        </TooltipOverlay>
      </div>
    </Link>
  );
}

export default ProgramToggle;