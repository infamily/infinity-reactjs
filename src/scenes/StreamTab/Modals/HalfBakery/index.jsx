import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

export default class InstanceModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    data: PropTypes.object
  };

  static defaultProps = {
    data: null
  };

  render() {
    const { data, show, onHide } = this.props;

    if (!data) return null;

    const {
      body,
      title,
      category,
      votes: { positive, negative },
      author,
      annotations
    } = data.data;

    const Author = ({ item }) => (
      <a href={item.userlink} target="_blank">
        <i> {item.username} </i>
      </a>
    );

    const Body = () => (
      <div className="halfbakery_modal">
        <div className="halfbakery_modal__topic">
          <p>Category: {category}</p>
          <p>{body}</p>
          <Author item={author} />
          <p>
            + {positive || 0}, - {negative || 0}
          </p>
        </div>

        <br />
        <div className="halfbakery_modal__comments">
          {annotations.length && <h4>Comments</h4>}
          {annotations.map(item => (
            <p key={item.text.slice(0, 50)}>
              <Author item={item} />
              {item.text}
            </p>
          ))}
        </div>
      </div>
    );

    return (
      <Modal
        show={show}
        onHide={onHide}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Body />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
