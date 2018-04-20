import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

export const PopupModal = ({ isOpen, name, message, closeModal }) => (
  <div>
    <Modal show={isOpen} className="topic_view__modal">
      <Modal.Header>
        <Modal.Title>{message.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message.text}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => closeModal(name)}>Close</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

PopupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
};
