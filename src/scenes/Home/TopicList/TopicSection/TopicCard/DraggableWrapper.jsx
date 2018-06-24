import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const ItemTypes = {
  CARD: 'CARD'
};

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {};
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends Component {
  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move'
        }}
      >
        >
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = {
  text: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
