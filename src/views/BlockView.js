// import React, { PropTypes }       from 'react';
// import Card                       from 'material-ui/lib/card/card';
// import CardTitle                  from 'material-ui/lib/card/card-title';
// import { DragSource, DropTarget } from 'react-dnd';
// import Blocks                      from 'components/blocks';

// const blocks = [
//   {
//     id: 1,
//     companyName: 'My Company',
//     jobTitle: 'My Job Title',
//     year: '2015',
//     location: 'San Francisco, CA'
//   },
//   {
//     id: 2,
//     companyName: 'Company 2',
//     jobTitle: 'Job 2',
//     year: '2014',
//     location: 'Chicago, IL'
//   },
//   {
//     id: 3,
//     companyName: 'Company 3',
//     jobTitle: 'Job 3',
//     year: '2012',
//     location: 'New York, NY'
//   }
// ];


// // implements the drag source contract
// const blockSource = {
//   beginDrag (props) {
//     return {
//       id: props.id,
//       originalIndex: props.findBlock(props.id).index
//     };
//   },

//   endDrag (props, monitor) {
//     const { id: droppedId, originalIndex } = monitor.getItem();
//     const didDrop = monitor.didDrop();

//     if (!didDrop) {
//       props.moveBlock(droppedId, originalIndex);
//     }
//   }
// };

// const blockTarget = {
//   canDrop () {
//     return false;
//   },

//   hover (props, monitor) {
//     const { id: draggedId } = monitor.getItem();
//     const { id: overId } = props;

//     if (draggedId !== overId) {
//       const { index: overIndex } = props.findBlock(overId);
//       props.moveBlock(draggedId, overIndex);
//     }
//   }
// };

// @DropTarget('block', blockTarget, connect => ({
//   connectDropTarget: connect.dropTarget()
// }))
// @DragSource('block', blockSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging()
// }))

// export default class Block extends React.Component {
//   static propTypes = {
//     // injected by react dnd
//     connectDragSource: PropTypes.func.isRequired,
//     connectDropTarget: PropTypes.func.isRequired,
//     isDragging: PropTypes.bool.isRequired,
//     id: PropTypes.any.isRequired,
//     moveBlock: PropTypes.func.isRequired,
//     findBlock: PropTypes.func.isRequired,
//     // coming from ResumeView.js (parent component) thru props
//     companyName: PropTypes.string.isRequired,
//     jobTitle: PropTypes.string.isRequired
//   };

//   render () {
//     // not sure why these need to be assigned, but not companyName and jobTitle
//     const { Block, isDragging, connectDragSource, connectDropTarget } = this.props;

//     return (
//       <div>
//         <Blocks items={blocks}/>
//       </div>
//     ));
//   }
// }
