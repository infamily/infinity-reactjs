import React from 'react';
import ReactTooltip from 'react-tooltip';
import './SelectOptions.css';

const SelectOption = option => {
  const { value, label, definition } = option;
  return (
    <div data-tip={definition} data-for={value}>
      <option value={value}>{label}</option>
      <ReactTooltip id={value} />
    </div>
  );
};

export default SelectOption;
