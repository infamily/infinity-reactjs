import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';

const FormSelect = ({ name, label, action, value, children, ...rest }) => (
  <FormGroup controlId="formControlsSelect">
    <InputGroup>
      <InputGroup.Addon>{label}</InputGroup.Addon>
      <FormControl
        name={name}
        componentClass="select"
        value={value}
        onChange={action}
        {...rest}
      >
        {children}
      </FormControl>
    </InputGroup>
  </FormGroup>
);

FormSelect.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

export default FormSelect;
