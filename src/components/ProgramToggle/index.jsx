import React from 'react';
import TooltipOverlay from 'components/TooltipOverlay';
import './ProgramToggle.css';

const ProgramToggle = () => (
  <div className="program_toggle">
    <TooltipOverlay text="importing programs will be released coming soon..." placement="bottom">
      <span>Programs</span>
    </TooltipOverlay>
  </div>
);

export default ProgramToggle;