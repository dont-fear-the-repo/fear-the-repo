import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Paper, TextField } from 'material-ui/lib';
import Editor from 'react-medium-editor';


/******************************/
/*   Begin DnD requirements   */
/******************************/

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet'
};

const blockSource = {
  beginDrag(props) {
    return {
      blockId: props.blockId,
      originalIndex: props.findBlock(props.blockId).index
    };
  },

  endDrag(props, monitor) {
    const { blockId: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveBlock(droppedId, originalIndex);
    }
  }
};

const blockTarget = {
  drop(props) {
    // Simply return an object to make certain props available to the bullet
    // being dropped on it via monitor.getDropResult. See ResumeView's
    // blockTarget for the dispatching of that action.
    return {
      bulletChildren: props.bulletChildren,
      blockId: props.blockId
    };
  },

  hover(props, monitor) {
    const { blockId: draggedId } = monitor.getItem();
    const { blockId: overId } = props;

    if (monitor.getItemType() === 'block') {
      // This is responsible for reordering the blocks when a block is dragged
      // around the list of blocks
      if (draggedId !== overId) {
        const { blockIndex: overIndex } = props.findBlock(overId);
        props.moveBlock(draggedId, overIndex);
      }
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

/****************************/
/*   End DnD requirements   */
/****************************/


export default class BlockDumbComp extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    blockId: PropTypes.any.isRequired,
    moveBlock: PropTypes.func.isRequired,
    findBlock: PropTypes.func.isRequired,
    companyName: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    years: PropTypes.string.isRequired,
    bulletChildren: PropTypes.array.isRequired,
    children: PropTypes.node
  }

  render() {
    const { children,
            isDragging,
            connectDragSource,
            connectDropTarget,
            currentTheme,
            resumeThemes,
            styles } = this.props;

    const bullet = (
      <ul>
        {this.props.children.map(item =>
          <li key={item.key} style={styles.bullet}>{item}</li>
        )}
      </ul>
    );

    const blockDrag = {
      opacity: isDragging ? 0 : 1,
      cursor: 'move',
      margin: '0px'
    };

    return connectDragSource(connectDropTarget(
      <div style={blockDrag}>

        <Paper>
          <Editor style={resumeThemes[currentTheme].jobTitle}
          text={this.props.jobTitle}
          options={{toolbar: false}}/>

          <div style={resumeThemes[currentTheme].pipe}>
            |
          </div>

          <Editor style={resumeThemes[currentTheme].companyName}
          text={this.props.companyName}
          options={{toolbar: false}}/>

          <div style={resumeThemes[currentTheme].pipe}>
            |
          </div>

          <Editor style={resumeThemes[currentTheme].location}
          text={this.props.location}
          options={{toolbar: false}}/>

          <Editor style={resumeThemes[currentTheme].jobYear}
          text={this.props.years}
          options={{toolbar: false}}/>

          <div className='bulletContainer' style={styles.bulletContainer}>
            {bullet}
          </div>

        </Paper>

      </div>
    ));
  }
}
