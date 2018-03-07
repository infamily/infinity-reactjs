import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export default ({ isOpen, close, children }) => {
  return (
    <Modal show={isOpen}>
      <Modal.Body>
        <div>{children}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

// Modal.propTypes = {

// }
