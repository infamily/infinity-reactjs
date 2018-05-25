import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage, FormattedDate } from 'react-intl';
import messages from 'scenes/StreamTab/messages';

export default class InstanceModal extends PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    data: PropTypes.object
  };

  static defaultProps = {
    data: false
  };

  render() {
    const { data, show, onHide } = this.props;

    const Data = () =>
      Object.keys(data.data).map(item => (
        <pre key={item}>
          <code className="json">
            {JSON.stringify(data.data[item], null, 2)}
          </code>
        </pre>
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
          <Modal.Title id="contained-modal-title-lg">
            <FormattedMessage {...messages.createdAt} />{' '}
            <FormattedDate
              value={data.created_date}
              month="long"
              year="numeric"
              day="numeric"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Data />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>
            <FormattedMessage id="infinity.common.buttons.close" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
