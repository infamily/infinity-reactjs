import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, InputGroup, MenuItem } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import configs from 'configs';
import './flag_toggle.css';
import messages from './messages';

const Flag = ({ setFlag, flag, dropup }) => {
  const { flags } = configs;

  return (
    <DropdownButton
      componentClass={InputGroup.Button}
      id="input-dropdown-addon"
      title={flags[flag] || <FormattedMessage {...messages.all} />}
      dropup={dropup}
    >
      {flags.map((type, i) => (
        <MenuItem key={type} eventKey={i} onSelect={setFlag}>
          {type}
        </MenuItem>
      ))}
    </DropdownButton>
  );
};

Flag.defaultProps = {
  dropup: false
};

Flag.propTypes = {
  setFlag: PropTypes.func.isRequired,
  flag: PropTypes.string.isRequired,
  dropup: PropTypes.bool
};

export default Flag;
