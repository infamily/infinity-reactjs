import React from 'react';
import TooltipOverlay from 'components/TooltipOverlay';
import './ProgramToggle.css';

const ProgramToggle = () => {
  const toTop = () => window.scrollTo(0, 0);
  const text = "Importing programs will be released coming soon...";
  
  return (
    <div className="program_toggle" onClick={toTop}>
      <TooltipOverlay text={text} placement="bottom">
        <small>Programs</small>
      </TooltipOverlay>
    </div>
  );
}

export default ProgramToggle;