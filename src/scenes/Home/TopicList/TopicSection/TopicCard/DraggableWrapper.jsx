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
    const item = { sourceId: props.topicId };
    return item;
  },

  async endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const sourceId = props.topicId;
    const dropResult = monitor.getDropResult();
    const { targetId, partialTopicUpdate } = dropResult; // target (parent)

    await partialTopicUpdate(targetId);
  }
};

const cardTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    const { sourceId } = item;
    const targetId = props.topicId;

    const isOverItself = targetId === sourceId;
    return !isOverItself;
  },
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    const { partialTopicUpdate, topicId } = component.props;
    return { targetId: topicId, partialTopicUpdate };
  }
};

/**
 * Specifies the source props to inject into the dragging component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

/**
 * Specifies the target props to inject into the container component.
 */
function collectTarget(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Card extends Component {
  render() {
    const {
      isDragging,
      isOver,
      canDrop,
      connectDragSource,
      connectDropTarget
    } = this.props;

    return connectDragSource(
      connectDropTarget(
        <div
          className={classNames('card--draggable', {
            'card--dragging': isDragging,
            'card--active': isOver && canDrop
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
  partialTopicUpdate: PropTypes.func.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};

export default flow(
  DragSource(ItemTypes.CARD, cardSource, collect),
  DropTarget(ItemTypes.CARD, cardTarget, collectTarget)
)(Card);
