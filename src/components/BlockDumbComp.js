import React, { PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import { Paper } from 'material-ui/lib';


///////////////////////////////////////////
//        Begin DnD requirements         //
///////////////////////////////////////////

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
    // Simply return an object to make certain props available to the bullet being dropped on it via monitor.getDropResult. See ResumeView's blockTarget for the dispatching of that action.
    return {
      bulletChildren: props.bulletChildren,
      blockId: props.blockId
    };
  },

  hover(props, monitor) {
    const { blockId: draggedId } = monitor.getItem();
    const { blockId: overId } = props;

    if (monitor.getItemType() === 'block') {
      // This is responsible for reordering the blocks when a block is dragged around the list of blocks
      if (draggedId !== overId) {
        const { index: overIndex } = props.findBlock(overId);
        props.moveBlock(draggedId, overIndex);
      } // ONLY HERE does body re-render, when a block is sorted
    } else if (monitor.getItemType() === 'bullet') {

      // Still TODO: signal to user that it's ok to drop
        // low priority
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

///////////////////////////////////////////
//        End DnD requirements           //
///////////////////////////////////////////


export default class BlockDumbComp extends React.Component {

  render() {
    const { children,
            isDragging,
            connectDragSource,
            connectDropTarget } = this.props;


    let bullet = (
        <ul>
          {this.props.bulletChildren.map(bullet =>
            // <li style={this.props.styles.bullet} key=>{item}</li>
            <li key={bullet.bulletId}>{bullet.text}</li>  // this is block id
              // how do I get bullet id?
              // throws console error, but still behaves as it should
          )}
        </ul>
      );

    return connectDragSource(connectDropTarget(
      <div style={this.props.styles.blockDrag}>

          <div style={this.props.styles.jobTitle}>
            {this.props.jobTitle}
          </div>

          <div style={this.props.styles.pipe}>
            |
          </div>

          <div style={this.props.styles.companyName}>
            {this.props.companyName}
          </div>

          <div style={this.props.styles.pipe}>
            |
          </div>

          <div style={this.props.styles.location}>
            {this.props.location}
          </div>

          <div style={this.props.styles.year}>
            {this.props.year}
          </div>

          <div>
            {bullet}
          </div>

      </div>
    ));
  }

}

    // let bullet;
    //   bullet = (
    //     <ul>
    //       {this.props.children.map(item =>
    //         // <li style={styles.bullet} key=>{item}</li>
    //         <li key={item.bulletId}>{item.text}</li>  // this is block id
    //           // how do I get bullet id?
    //           // throws console error, but still behaves as it should
    //       )}
    //     </ul>
    //   );


// export class Block extends React.Component {
//   static propTypes = {
//     connectDragSource: PropTypes.func.isRequired,
//     connectDropTarget: PropTypes.func.isRequired,
//     isDragging: PropTypes.bool.isRequired,
//     blockId: PropTypes.any.isRequired,
//     moveBlock: PropTypes.func.isRequired,
//     findBlock: PropTypes.func.isRequired,
//     // coming from ResumeView.js (parent component) thru props
//     companyName: PropTypes.string.isRequired,
//     jobTitle: PropTypes.string.isRequired,
//     location: PropTypes.string.isRequired,
//     year: PropTypes.string.isRequired,
//     bulletChildren: PropTypes.array.isRequired,
//     hasBullets: PropTypes.bool,
//     children: PropTypes.node
//   };


/*

Still TODO
 - render bullets in blocks immediately upon drop
    - right now only happens on block drop
 - enable dnd for bullets within blocks
 - edit blocks/bullets directly
    - on double click?

 - save resume: new obj in state with props of header, body ([] of blocks of [] of bullets)

*/
