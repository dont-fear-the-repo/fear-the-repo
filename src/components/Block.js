import React, { PropTypes }       from 'react';
import Card                       from 'material-ui/lib/card/card';
import CardTitle                  from 'material-ui/lib/card/card-title';
import { DragSource, DropTarget } from 'react-dnd';

// implements the drag source contract
const blockSource = {
  beginDrag (props) {
    return {
      id: props.id,
      originalIndex: props.findBlock(props.id).index
    };
  },

  endDrag (props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveBlock(droppedId, originalIndex);
    }
  }
};

const blockTarget = {
  canDrop () {
    return false;
  },

  hover (props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findBlock(overId);
      props.moveBlock(draggedId, overIndex);
    }
  }
};

@DropTarget('block', blockTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('block', blockSource, (connect, monitor) => ({
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
    indBlock: PropTypes.func.isRequired,
    // coming from ResumeView.js (parent component) thru props
    companyName: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired
  };

  render () {
    // not sure why these need to be assigned, but not companyName and jobTitle
    const { isDragging, connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(
      <div style={{ opacity: isDragging ? 0 : 1, cursor: 'move' }}>
        <Card style={{ backgroundColor: '#CFD8DC' }}>
          <CardTitle title={this.props.companyName} subtitle={this.props.jobTitle} />
        </Card>
      </div>
    ));
  }
}
