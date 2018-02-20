import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  Modal
} from 'react-bootstrap';

export default class InstanceModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: false,
  }

  render() {
    const { data, show, onHide } = this.props;

    const Data = () => Object.keys(data.data).map((item, i) => (
      <pre key={i}><code className="json">
        {JSON.stringify(data.data[item], null, 2)}
      </code></pre>
    ));
    
    if (!data) return null;
    
    return (
      <Modal
        show={show}
        onHide={onHide}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Created at: {moment(data.created_date).format('MMMM Do YYYY, h:mm:ss a')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Data />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
