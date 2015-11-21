import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import { DragSource } from 'react-dnd';

// implements the drag source contract

const blockSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};

@DragSource('block', blockSource, (connect, monitor) => ({
  connectDragSource : connect.dragSource(),
  isDragging : monitor.isDragging()
}))

export default class Block {
  static propTypes = {
    text : React.PropTypes.string.isRequired,
    // injected by react dnd
    connectDragSource : React.PropTypes.func.isRequired,
    isDragging : React.PropTypes.bool.isRequired,
  };

  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div style={{ opacity : isDragging ? 0 : 1 }}>
        <Card>
          <CardHeader
            title='this will be a draggable block'
            subtitle={text} />
        </Card>
      </div>
    );
  }
}