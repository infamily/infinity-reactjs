import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal, Button } from 'react-bootstrap';
import messages from './messages';

const ModalComponent = ({ isOpen, close, children }) => (
  <Modal show={isOpen}>
    <Modal.Body>
      <div>{children}</div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={close}>
        <FormattedMessage {...messages.close} />
      </Button>
    </Modal.Footer>
  </Modal>
);

ModalComponent.propTypes = {
  children: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default ModalComponent;
