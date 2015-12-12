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
  HEADING: 'heading'
};

const headingSource = {
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

    console.log('draggedId -- ', draggedId, 'overId -- ', overId )

    if (monitor.getItemType() === 'heading' || monitor.getItemType() === 'block') {
      if (draggedId !== overId) {
        const { blockIndex: overIndex } = props.findBlock(overId);
        props.moveBlock(draggedId, overIndex);
      }
    }
  }
};

@DropTarget([Types.BLOCK, Types.HEADING], headingTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

@DragSource(Types.HEADING, headingSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

/****************************/
/*   End DnD requirements   */
/****************************/

@Radium
export default class Heading extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    blockId: PropTypes.any,
    children: PropTypes.node,
    companyName: PropTypes.string,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    currentTheme: PropTypes.string,
    handleUpdateLocalState: PropTypes.func,
    isDragging: PropTypes.bool,
    location: PropTypes.string,
    resumeThemes: PropTypes.object,
    styles: PropTypes.object
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

    const blockDrag = {
      opacity: isDragging ? 0 : 1,
      cursor: 'move',
      margin: '0',
      ':hover': {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
      }
    };

    return connectDragSource(connectDropTarget(
      <div style={blockDrag} key='heading'>

        {Radium.getState(this.state, 'heading', ':hover')}
          <Editor style={resumeThemes[currentTheme].headingTitle}
                  text={this.props.companyName}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'companyName', 'blocks', this.props.blockId)} />
          <Editor style={resumeThemes[currentTheme].headingText}
                  text={this.props.location}
                  options={{toolbar: false}}
                  onBlur={e => this.props.handleUpdateLocalState(e, 'location', 'blocks', this.props.blockId)} />

      </div>
    ));
  }
};
