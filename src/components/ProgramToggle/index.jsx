import React from 'react';
import { Button } from 'react-bootstrap';
import TooltipOverlay from 'components/TooltipOverlay';
import './ProgramToggle.css';

const ProgramToggle = () => (
  <div className="program_toggle">
    <TooltipOverlay text="Import programms unable now" placement="bottom">
      <span>All programms</span>
    </TooltipOverlay>
  </div>
);

export default ProgramToggle;