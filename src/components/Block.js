import React, { PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import { DragSource, DropTarget } from 'react-dnd';
import { dropBullet } from 'actions/resumeActions';

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet'
};

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

  drop(props, monitor) {
    // Simply return an object to make certain props available to the bullet being dropped on it via monitor.getDropResult. See ResumeView's blockTarget for the dispatching of that action.
    return {
      body: props.body,
      id: props.id
    }
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (monitor.getItemType() === 'block') {
      // This is responsible for reordering the blocks when a block is dragged around the list of blocks
      if (draggedId !== overId) {
        const { index: overIndex } = props.findBlock(overId);
        props.moveBlock(draggedId, overIndex);
      }
    } else if (monitor.getItemType() === 'bullet') {
      // TODO: signal to user that it's ok to drop
        // highlight/outline block?
    }
  }
};

@DropTarget([Types.BLOCK, Types.BULLET], blockTarget, connect => ({
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
    year: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
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
        <Paper zDepth={1}>
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
          <div style={styles.pipe}>
            |
          </div>
          <div style={styles.location}>
            {this.props.body}
          </div>
        </Paper>
      </div>
    ));
  }
}
