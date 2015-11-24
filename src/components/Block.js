import React, { PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import { DragSource, DropTarget } from 'react-dnd';

const Types = {
  BLOCK: 'block'
};

// implements the drag source contract
const blockSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findBlock(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveBlock(droppedId, originalIndex);
    }
  }
};

const blockTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findBlock(overId);
      props.moveBlock(draggedId, overIndex);
    }
  }
};

@DropTarget(Types.BLOCK, blockTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(Types.BLOCK, blockSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

export default class Block extends React.Component {
  static propTypes = {
    // injected by react dnd
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveBlock: PropTypes.func.isRequired,
    findBlock: PropTypes.func.isRequired,
    // coming from ResumeView.js (parent component) thru props
    companyName: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  };

  render() {
    // not sure why these need to be assigned, but not companyName and jobTitle
    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    const styles = {
      blockDrag: {
        opacity: isDragging ? 0 : 1,
        cursor: 'move',
        margin: '0px'
      },
      jobTitle: {
        display: 'inline',
        margin: '10px',
        fontWeight: '700'
      },
      pipe: {
        display: 'inline',
        margin: '5px'
      },
      companyName: {
        display: 'inline',
        margin: '10px',
        fontWeight: '500'
      },
      location: {
        display: 'inline',
        margin: '10px'
      },
      year: {
        display: 'inline',
        float: 'right',
        marginRight: '10px'
      }
    };

    return connectDragSource(connectDropTarget(
      <div style={styles.blockDrag}>
        <Paper zDepth={1} >
          <div style={styles.jobTitle}>
            {this.props.jobTitle}
          </div>
          <div style={styles.pipe}>
            |
          </div>
          <div style={styles.companyName}>
            {this.props.companyName}
          </div>
          <div style={styles.pipe}>
            |
          </div>
          <div style={styles.location}>
            {this.props.location}
          </div>
          <div style={styles.year}>
            {this.props.year}
          </div>
        </Paper>
      </div>
    ));
  }
}
