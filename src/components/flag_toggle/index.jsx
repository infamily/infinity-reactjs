import React from 'react';
import { 
  DropdownButton,
  InputGroup,
  MenuItem
} from 'react-bootstrap';
import configs from '../../../configs';
import './flag_toggle.css';

const Flag = ({ setFlag, flag, dropup }) => {
  const flags = configs.flags;

  return <DropdownButton
    componentClass={InputGroup.Button}
    id="input-dropdown-addon"
    title={flags[flag] || 'All'}
    dropup={dropup}
  >
    {
      flags.map((type, i) => {
        return <MenuItem key={type} eventKey={i} onSelect={setFlag}>{type}</MenuItem>
      })
    }
  </DropdownButton>
};

export default Flag;