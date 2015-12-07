import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Paper, TextField } from 'material-ui/lib';
import Editor from 'react-medium-editor';


/******************************/
/*   Begin DnD requirements   */
/******************************/

const Types = {
  BLOCK: 'block'
  // HEADING: 'heading'
};

const headingSource = {
  beginDrag(props) {
    console.log('heading beginDrag')
    return {
      blockId: props.blockId,
      originalIndex: props.findBlock(props.blockId).index
    };
  },

  endDrag(props, monitor) {
    const { blockId: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
console.log('Heading endDrag')
    if (!didDrop) {
      props.moveBlock(droppedId, originalIndex);
    }
  }
};

const headingTarget = {
  drop(props) {
    return {
      bulletChildren: props.bulletChildren,
      blockId: props.blockId
    };
  },

  hover(props, monitor) {
    const { blockId: draggedId } = monitor.getItem();
    const { blockId: overId } = props;

    if (/*monitor.getItemType() === 'heading' || */monitor.getItemType() === 'block') {
        console.log('heading - draggedId: ', draggedId, 'overId: ', overId)
      if (draggedId !== overId) {

        const { blockIndex: overIndex } = props.findBlock(overId);
        props.moveBlock(draggedId, overIndex);
      }
    }
  }
};

@DropTarget([Types.BLOCK], headingTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

@DragSource(Types.BLOCK, headingSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

/****************************/
/*   End DnD requirements   */
/****************************/


export default class Heading extends React.Component {

  static propTypes = {

  }

  hideBlock(event, target) {
    this.props.actions.hideBlock(target);
  }

  render() {
    const { isDragging,
            connectDragSource,
            connectDropTarget,
            currentTheme,
            resumeThemes,
            styles } = this.props;

    const blockDrag = {
      opacity: isDragging ? 0 : 1,
      cursor: 'move',
      margin: '0'
    };

    return connectDragSource(connectDropTarget(
      <div style={blockDrag}>

        <Paper>

          <Editor style={resumeThemes[currentTheme].companyName}
                  text={this.props.companyName}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'companyName', 'blocks', this.props.blockId)} />

          <Editor style={resumeThemes[currentTheme].location}
                  text={this.props.location}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'location', 'blocks', this.props.blockId)} />

        </Paper>

      </div>
      ));
  }
}
