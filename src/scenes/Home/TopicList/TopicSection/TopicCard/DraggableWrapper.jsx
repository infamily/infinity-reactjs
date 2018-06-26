import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames';
import flow from 'lodash/flow';

const ItemTypes = {
  CARD: 'card'
};

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      console.log("didn't drop");
      return;
    }

    // When dropped on a compatible target, do something
    const sourceId = props.topicId;
    const dropResult = monitor.getDropResult();
    const { targetId } = dropResult; // parent

    console.log('dropped', targetId, sourceId);
  }
};

const cardTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    console.log('drop');

    // You can do something with it
    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true, targetId: component.props.topicId };
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

function collectTarget(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Card extends Component {
  render() {
    const {
      canDrop,
      isOver,
      isDragging,
      isOverCurrent,
      connectDragSource,
      connectDropTarget
    } = this.props;
    return connectDragSource(
      connectDropTarget(
        <div
          className={classNames('card--draggable', {
            'card--dragging': isDragging,
            'card--active': isOverCurrent
          })}
        >
          {this.props.children}
        </div>
      )
    );
  }
}

Card.propTypes = {
  topicId: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default flow(
  DragSource(ItemTypes.CARD, cardSource, collect),
  DropTarget(ItemTypes.CARD, cardTarget, collectTarget)
)(Card);
