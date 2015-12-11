import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { Paper } from 'material-ui/lib';
import Editor from 'react-medium-editor';
import Radium from 'radium';

/******************************/
/*   Begin DnD requirements   */
/******************************/

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet',
  HEADING: 'heading'
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

    if (monitor.getItemType() === 'block' || monitor.getItemType() === 'heading') {
      // This is responsible for reordering the blocks when a block is dragged
      // around the list of blocks
      if (draggedId !== overId) {
        const { blockIndex: overIndex } = props.findBlock(overId);
        props.moveBlock(draggedId, overIndex);
      }
    }
  }
};

@DropTarget([Types.BLOCK, Types.BULLET, Types.HEADING], blockTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

@DragSource(Types.BLOCK, blockSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

/****************************/
/*   End DnD requirements   */
/****************************/

@Radium
export default class BlockDumbComp extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    blockId: PropTypes.any.isRequired,
    bulletChildren: PropTypes.array.isRequired,
    children: PropTypes.node,
    companyName: PropTypes.string,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    currentTheme: PropTypes.string,
    findBlock: PropTypes.func.isRequired,
    handleUpdateLocalState: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    jobTitle: PropTypes.string,
    location: PropTypes.string,
    moveBlock: PropTypes.func.isRequired,
    resumeThemes: PropTypes.object,
    styles: PropTypes.object,
    years: PropTypes.string
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
          <li key={bullet.key} style={resumeThemes[currentTheme].bulletText}>{bullet}</li>
        )}
      </ul>
    );

    const blockDrag = {
      opacity: isDragging ? 0 : 1,
      cursor: 'move',
      margin: '0px',
      ':hover': {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
      }
    };

    return connectDragSource(connectDropTarget(
      <div style={blockDrag} key='block'>

        {Radium.getState(this.state, 'block', ':hover')}

          <div style={resumeThemes[currentTheme].blockDiv}>
            <Editor style={resumeThemes[currentTheme].jobTitle}
                    text={this.props.jobTitle || 'Title/Role/Degree'}
                    options={{toolbar: false}}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'jobTitle', 'blocks', this.props.blockId)} />

            <div style={resumeThemes[currentTheme].pipe}>
              |
            </div>

            <Editor style={resumeThemes[currentTheme].companyName}
                    text={this.props.companyName || 'Company/Project/School Name'}
                    options={{toolbar: false}}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'companyName', 'blocks', this.props.blockId)} />

            <div style={resumeThemes[currentTheme].pipe}>
              |
            </div>

            <Editor style={resumeThemes[currentTheme].jobLocation}
                    text={this.props.location || 'Location / Project URL'}
                    options={{toolbar: false}}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'location', 'blocks', this.props.blockId)} />

            <Editor style={resumeThemes[currentTheme].jobYear}
                    text={this.props.years || 'Timespan, if applicable'}
                    options={{toolbar: false}}
                    onBlur={e => this.props.handleUpdateLocalState(e, 'jobYear', 'blocks', this.props.blockId)} />

            {Radium.getState(this.state, 'block', ':hover') ? (
              <img src={require('styles/assets/ic_remove_circle_outline_black_24px.svg')}
                     onClick={e => this.hideBlock(e, this.props.blockId)} />
                ) : null}

              <div className='bulletContainer' style={styles.bulletContainer}>
                {bulletCollection}
              </div>

            {Radium.getState(this.state, 'block', ':hover') ? (
              <img src={require('styles/assets/ic_add_circle_outline_black_24px.svg')}
                  onClick={e => this.addBullet(e, this.props.blockId)} />
                ) : null}
          </div>
      </div>
    ));
  }
};
