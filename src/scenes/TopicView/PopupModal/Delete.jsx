import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const DeletePopup = ({ isOpen, name, deleteTopic, closeModal }) => (
  <div>
    <Modal show={isOpen} className="topic_view__modal">
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage {...messages.deleteConfirmation} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormattedMessage {...messages.deleteConfirmation} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={deleteTopic}>
          <FormattedMessage {...messages.delete} />
        </Button>
        <Button onClick={() => closeModal(name)}>
          <FormattedMessage {...messages.close} />
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);

DeletePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  deleteTopic: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default DeletePopup;
