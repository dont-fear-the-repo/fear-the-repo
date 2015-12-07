import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Paper } from 'material-ui/lib';
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
    actions: PropTypes.object,
    blockId: PropTypes.any.isRequired,
    bulletChildren: PropTypes.array.isRequired,
    children: PropTypes.node,
    companyName: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    currentTheme: PropTypes.string,
    findBlock: PropTypes.func.isRequired,
    handleUpdateLocalState: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    jobTitle: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    moveBlock: PropTypes.func.isRequired,
    resumeThemes: PropTypes.object,
    styles: PropTypes.object,
    years: PropTypes.string.isRequired
  }

  addBullet(event, target) {
    this.props.actions.addBullet(target);
  }

  hideBlock(event, target) {
    this.props.actions.hideBlock(target);
  }

  render() {
    const { children,
            isDragging,
            connectDragSource,
            connectDropTarget,
            currentTheme,
            resumeThemes,
            styles } = this.props;

    const bulletCollection = (
      <ul>
        {this.props.children.map(bullet =>
          <li key={bullet.key} style={styles.bullet}>{bullet}</li>
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
            options={{toolbar: false}}
            onBlur={e => this.props.handleUpdateLocalState(e, 'jobTitle', 'blocks', this.props.blockId)} />

          <div style={resumeThemes[currentTheme].pipe}>
            |
          </div>

          <Editor style={resumeThemes[currentTheme].companyName}
            text={this.props.companyName}
            options={{toolbar: false}}
            onBlur={e => this.props.handleUpdateLocalState(e, 'companyName', 'blocks', this.props.blockId)} />

          <div style={resumeThemes[currentTheme].pipe}>
            |
          </div>

          <Editor style={resumeThemes[currentTheme].location}
            text={this.props.location}
            options={{toolbar: false}}
            onBlur={e => this.props.handleUpdateLocalState(e, 'location', 'blocks', this.props.blockId)} />

          <Editor style={resumeThemes[currentTheme].jobYear}
            text={this.props.years}
            options={{toolbar: false}}
            onBlur={e => this.props.handleUpdateLocalState(e, 'jobYear', 'blocks', this.props.blockId)} />

          <img src='styles/assets/ic_remove_circle_outline_black_24px.svg'
               onClick={e => this.hideBlock(e, this.props.blockId)} />

          <div className='bulletContainer' style={styles.bulletContainer}>
            {bulletCollection}
          </div>

          <img src='styles/assets/ic_add_circle_outline_black_24px.svg'
               onClick={e => this.addBullet(e, this.props.blockId)} />

        </Paper>

      </div>
    ));
  }
}
