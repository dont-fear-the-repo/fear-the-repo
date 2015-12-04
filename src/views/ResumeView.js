import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import update from 'react/lib/update';

import BlockDumbComp from 'components/BlockDumbComp';
import Bullet from 'components/Bullet';
import ResumeHeader from 'components/ResumeHeader';
import ResumeFooter from 'components/ResumeFooter';
import ResumeSavePrint from 'components/ResumeSavePrint';
import { moveBlock,
         dropBullet,
         updateResumeState,
         sendResumeToServerAsync,
         updateLocalState,
         updateLocalStateHeader,
         updateLocalStateFooter,
         updateLocalStateSavePrint,
         updateLocalStateBlocks } from 'actions/resumeActions';

import { styles } from 'styles/ResumeViewStyles';
import { resumeThemes } from 'styles/resumeThemes';
import { RaisedButton, TextField, Paper, SelectField } from 'material-ui/lib';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // this is some voodoo to make SelectField render correctly,
                        // check the issues on their repo for more information


const ActionCreators = {
  updateResumeState: updateResumeState,
  sendResumeToServerAsync: sendResumeToServerAsync,
  updateLocalState: updateLocalState,
  updateLocalStateHeader: updateLocalStateHeader,
  updateLocalStateFooter: updateLocalStateFooter,
  updateLocalStateBlocks: updateLocalStateBlocks,
  updateLocalStateSavePrint: updateLocalStateSavePrint,
  moveBlock: moveBlock,
  dropBullet: dropBullet
};

const mapStateToProps = (state) => ({
  routerState: state.router,
  resumeState: state.resumeReducer,
  resumeTheme: state.resumeReducer.resumeTheme,
  loggedIn: state.titleBarReducer.loggedIn
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

////////////////////////////////////
//    React DnD functions below   //
////////////////////////////////////

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet'
};

const blockTarget = {
  drop(props, monitor, component) {
    const bulletProps = {
      bulletId: monitor.getItem().bulletId,
      text: monitor.getItem().text
    };

    const blockProps = {
      blockId: monitor.getItem().blockId
    };

    if (monitor.getItemType() === 'bullet') {
      props.actions.dropBullet({
        // blocks: component.state.blocks,
        targetBlock: monitor.getDropResult(),
        droppedBullet: bulletProps
      });
    }
  }
};

@DropTarget([Types.BLOCK, Types.BULLET], blockTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

///////////////////////////////////////
//   end React DnD functions above   //
///////////////////////////////////////


class ResumeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    connectDropTarget: React.PropTypes.func.isRequired,
    loggedIn: React.PropTypes.bool
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.moveBlock = this.moveBlock.bind(this);
    this.findBlock = this.findBlock.bind(this);
    this.moveBullet = this.moveBullet.bind(this);
    this.findBullet = this.findBullet.bind(this);
  }

  // handleSubmit(props) {
  //   if (props.loggedIn) {
  //     console.log('saving...')
  //     props.actions.sendResumeToServerAsync(props.resumeState);
  //   } else {
  //     alert('To save a resume, please signup above');
  //   }
  // }
  //// remember to pass in props from the component

  handleUpdateLocalState(event, textFieldName, whereFrom) {
    const userInput = event.target.value;

    if (whereFrom === 'header') {
      console.log('updating from header...')
      this.actions.updateLocalStateHeader({textFieldName, userInput, whereFrom});
    } else if (whereFrom === 'footer') {
      console.log('updating from footer...')
      this.actions.updateLocalStateFooter({textFieldName, userInput, whereFrom});
    } else if (whereFrom === 'savePrint') {
      console.log('updating from savePrint...')
      this.actions.updateLocalStateSavePrint({textFieldName, userInput, whereFrom});
    } else {
      console.log('updating from main...')
      this.props.actions.updateLocalState({textFieldName, userInput});
    }
  }

  moveBlock(id, atIndex) {
    const { block, index } = this.findBlock(id);

    this.props.actions.moveBlock({
      index: index,
      atIndex: atIndex,
      block: block,
      blockChildren: this.props.resumeState.blockChildren
    });
  }

  findBlock(id) {
    const blocks = this.props.resumeState.blockChildren;
    const block = blocks.filter(b => b.blockId === id)[0];

    return {
      block,
      index: blocks.indexOf(block)
    };
  }

  moveBullet(id, atIndex) {
    const { bullet, index } = this.findBullet(id);
    this.setState(update(this.state, {
      bullets: {
        $splice: [
          [index, 1],
          [atIndex, 0, bullet]
        ]
      }
    }));
  }

  findBullet(id) {
    const bullets = this.props.resumeState.blockChildren.bulletChildren;
    const bullet = bullets.filter(bu => bu.id === id)[0];

    return {
      bullet,
      index: bullets.indexOf(bullet)
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { blockChildren } = this.props.resumeState.blockChildren;

    return connectDropTarget(
      <div className='container'
           style={styles.container}
           id='resumeContainer'>

        <div className='marginTop'
             style={styles.marginTop} />

        <ResumeSavePrint {...this.props}
                         styles={styles}
                         handleUpdateLocalState={this.handleUpdateLocalState} />

        <Paper style={styles.resumePaper}>
          <ResumeHeader {...this.props}
                        styles={styles}
                        handleUpdateLocalState={this.handleUpdateLocalState} />

            {this.props.resumeState.blockChildren.map(block => {
              return (
                <BlockDumbComp  {...this.props}
                                styles={styles}
                                key={block.blockId}
                                blockId={block.blockId}
                                companyName={block.companyName}
                                jobTitle={block.jobTitle}
                                year={block.year}
                                bulletChildren={block.bulletChildren}
                                location={block.location}
                                moveBlock={this.moveBlock}
                                findBlock={this.findBlock}> {block.blockId} </BlockDumbComp>
              );
            })}

          <ResumeFooter {...this.props}
                        styles={styles}
                        handleUpdateLocalState={this.handleUpdateLocalState} />

          <div className='marginBottom'
               style={styles.marginBottom} />
        </Paper>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
