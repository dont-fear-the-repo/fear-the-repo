import React, { PropTypes }       from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const Types = {
  BULLET: 'bullet',
  BLOCK: 'block'
};

// This is our specification object, which will be passed into DropSource below. It describes how the drag source reacts to the drag and drop events
const bulletSource = {
  // When dragging starts, beginDrag is called
  // What's returned is the only information available to the drop targets
    // should be the minimum amount of info, which is why why return just the ID and not the entire object


  beginDrag(props, monitor, component) {
    // Store the ID of the parent block of the dragged bullet
    const parentBlockId = component.props.parentBlockId;
    // Get the index of the parent block
    const { blockIndex: parentBlockIndex } = props.findBlock(parentBlockId);

    return {
      bulletId: props.bulletId,
      parentBlockId: parentBlockId,
      parentBlockIndex: parentBlockIndex,
      originalIndex: props.findBullet(props.bulletId, parentBlockIndex).index,
      text: props.text
    };
  },

  // When dragging stops, endDrag is called
  endDrag(props, monitor) {
    // Monitors allow you to get info about the drag state
    // getItem() returns a plain obj representing the currently dragged item, specified in the return statement of its beginDrag() method
    const { bulletId: droppedId, originalIndex } = monitor.getItem();
    // Check whether or not the drop was handled by a compatible drop target
    const didDrop = monitor.didDrop();

    // If not, return the bullet to the original position
    if (!didDrop) {
      props.moveBullet(droppedId, originalIndex);
    }
  },

  isDragging(props, monitor) {
    // Our bullet gets unmounted while dragged, so this keeps its appearance dragged
    return props.bulletId === monitor.getItem().bulletId;
  }
};

const bulletTarget = {
  hover(props, monitor) {
    const { bulletId: draggedId } = monitor.getItem();
    const { bulletId: overId, parentBlockId: parentBlockId } = props;
    const { blockIndex: parentBlockIndex } = props.findBlock(parentBlockId);

    if (monitor.getItemType() !== 'block') {
      if (monitor.getItem().parentBlockId === props.parentBlockId) {
        if (draggedId !== overId) {
          const { bulletIndex: overIndex } = props.findBullet(overId, parentBlockIndex);
          props.moveBullet(draggedId, overIndex, parentBlockId);
        }
      }
    }
  }
};

@DropTarget([Types.BULLET, Types.BLOCK], bulletTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
// DragSource takes 3 parameters:
  // type [string]: only the drop targets registered for the same type will react to items produced by this drag source
  // spec [obj]: implements drag source specs (beginDrag, endDrag, etc)
  // collect: aka the collecting function. Returns an obj of the props to inject into our component
@DragSource(Types.BULLET, bulletSource, (connect, monitor) => ({
  // The 'collecting function' will be called by React DnD with a 'connector' that lets you connect nodes to the DnD backend, and a 'monitor' to query info about the drag state
  connectDragSource: connect.dragSource(),  // This gives our component the connectDragSource prop so we can mark the relevant node inside its render() as draggable
  isDragging: monitor.isDragging()
}))

export default class Bullet extends React.Component {
  static propTypes = {
    // injected by react dnd
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    bulletId: PropTypes.any.isRequired,
    moveBullet: PropTypes.func.isRequired,
    findBullet: PropTypes.func.isRequired,
    // coming from ResumeView.js (parent component) thru props
    text: PropTypes.string.isRequired
  };

  render() {
    // not sure why these need to be assigned, but not companyName and jobTitle
    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    const styles = {
      bulletDrag: {
        opacity: isDragging ? 0 : 1,
        cursor: 'move'
      }
    };

    return connectDragSource(connectDropTarget(
      <div style={styles.bulletDrag}>
        <p>{this.props.text}</p>
      </div>
    ));
  }
}
