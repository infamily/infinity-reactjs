import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

const FormSelect = ({ name, label, action, value, children, ...rest }) => (
  <FormGroup controlId="formControlsSelect">
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      name={name}
      componentClass="select"
      value={value}
      onChange={action}
      {...rest}>
      {children}
    </FormControl>
  </FormGroup>
);


FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default FormSelect;