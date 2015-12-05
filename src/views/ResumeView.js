import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

// Components
import BlockDumbComp from 'components/BlockDumbComp';
import Bullet from 'components/Bullet';
import ResumeHeader from 'components/ResumeHeader';
import ResumeFooter from 'components/ResumeFooter';
import ResumeSavePrint from 'components/ResumeSavePrint';
import { hideBlock,
         hideBullet,
         moveBlock,
         moveBullet,
         sendResumeToServerAsync,
         updateLocalState,
         updateLocalStateBlocks,
         updateLocalStateBullets,
         updateLocalStateFooter,
         updateLocalStateHeader,
         updateLocalStateSavePrint,
         updateResumeState } from 'actions/resumeActions';

// Styling
import { styles } from 'styles/ResumeViewStyles';
import { resumeThemes } from 'styles/resumeThemes';
import { Paper } from 'material-ui/lib';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // this is some voodoo to make SelectField render correctly,
                        // check the issues on their repo for more information


const ActionCreators = {
  hideBlock: hideBlock,
  hideBullet: hideBullet,
  moveBlock: moveBlock,
  moveBullet: moveBullet,
  sendResumeToServerAsync: sendResumeToServerAsync,
  updateLocalState: updateLocalState,
  updateLocalStateBlocks: updateLocalStateBlocks,
  updateLocalStateBullets: updateLocalStateBullets,
  updateLocalStateFooter: updateLocalStateFooter,
  updateLocalStateHeader: updateLocalStateHeader,
  updateLocalStateSavePrint: updateLocalStateSavePrint,
  updateResumeState: updateResumeState
};

const mapStateToProps = (state) => ({
  routerState: state.router,
  resumeState: state.resumeReducer,
  currentTheme: state.resumeReducer.resumeTheme,
  loggedIn: state.titleBarReducer.loggedIn
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

/**********************************/
/*    React DnD functions below   */
/**********************************/

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet'
};

@DropTarget([Types.BLOCK, Types.BULLET], {}, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

/*************************************/
/*   end React DnD functions above   */
/*************************************/


class ResumeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    connectDropTarget: React.PropTypes.func.isRequired,
    loggedIn: React.PropTypes.bool
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

  handleUpdateLocalState(event, textFieldName, whereFrom, id) {
    const userInput = event.target.textContent;

    // bulletInput is unique because it uses Material UI
    // If we choose to go with Editor, this can be removed and the second argument to updateLocalStateBullets below should be replaced with userInput
      // and also in resumeReducer
    let bulletInput, bulletIndex;
    if (whereFrom === 'bullets') {
      bulletInput = event.target.value;
      bulletIndex = this.findBullet(id).bulletIndex;
    }

    /*
    To update data on a block, we must access that blockChildren via its index.

    We can grab the block's id in BlockDumbComp and pass it to handleUpdateLocalState, which is where you're reading this from.

    We then call findBlock with the id to get the block's index.

    updateLocalStateHeaderBlocks will send blockIndex (optional 4th argument) along with the rest of payload to resumeReducer.
    */
    let blockIndex;
    if (whereFrom === 'blocks') {
      blockIndex = this.findBlock(id).blockIndex;
    }

    if (whereFrom === 'header') {
      console.log('updating from header...');
      this.actions.updateLocalStateHeader({textFieldName, userInput, whereFrom});
    } else if (whereFrom === 'footer') {
      console.log('updating from footer...');
      this.actions.updateLocalStateFooter({textFieldName, userInput, whereFrom});
    } else if (whereFrom === 'savePrint') {
      console.log('updating from savePrint...');
      this.actions.updateLocalStateSavePrint({textFieldName, userInput, whereFrom});
    } else if (whereFrom === 'blocks') {
      console.log('updating from blocks...');
      this.actions.updateLocalStateBlocks({textFieldName, userInput, whereFrom, blockIndex});
    } else if (whereFrom === 'bullets') {
      console.log('updating from bullets...');
      this.actions.updateLocalStateBullets({textFieldName, bulletInput, whereFrom});
    } else {
      console.log('updating from main...');
      this.props.actions.updateLocalState({textFieldName, userInput});
    }
  }

  moveBlock(draggedId, atIndex) {
    const { block, blockIndex } = this.findBlock(draggedId);

    this.props.actions.moveBlock({
      blockIndex: blockIndex,
      atIndex: atIndex,
      block: block,
      blockChildren: this.props.resumeState.blockChildren
    });
  }

  findBlock(draggedId) {
    // For bullet drag:
      // First time called is on beginDrag, so that bullet has knowledge of its parent block's index (position on the resume)

    const blocks = this.props.resumeState.blockChildren;
    const block = blocks.filter(b => b.blockId === draggedId)[0];

    return {
      block,
      blockIndex: blocks.indexOf(block)
    };
  }

  moveBullet(draggedId, atIndex, parentBlockId) {
    const { blockIndex } = this.findBlock(parentBlockId);
    const { bullet, bulletIndex } = this.findBullet(draggedId, blockIndex);

    this.props.actions.moveBullet({
      bulletIndex: bulletIndex,
      atIndex: atIndex,
      bullet: bullet,
      parentBlockIndex: blockIndex,
      blockChildren: this.props.resumeState.blockChildren
    });
  }

  findBullet(draggedId, parentBlockIndex) {
    const block = this.props.resumeState.blockChildren[parentBlockIndex];
    const bullets = [];

    block.bulletChildren.map(bullet =>
      bullets.push(bullet)
    );

    const bullet = bullets.filter(bu => bu.bulletId === draggedId)[0];

    return {
      bullet,
      bulletIndex: bullets.indexOf(bullet)
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { blockChildren } = this.props.resumeState;

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
                        resumeThemes={resumeThemes}
                        handleUpdateLocalState={this.handleUpdateLocalState} />

            {blockChildren.filter(block => block.archived === false)
                          .map(block => {
                            return (
                              <BlockDumbComp  {...this.props}
                                              styles={styles}
                                              key={block.blockId}
                                              blockId={block.blockId}
                                              companyName={block.companyName}
                                              jobTitle={block.jobTitle}
                                              years={block.years}
                                              bulletChildren={block.bulletChildren}
                                              location={block.location}
                                              moveBlock={this.moveBlock}
                                              resumeThemes={resumeThemes}
                                              findBlock={this.findBlock}
                                              handleUpdateLocalState={this.handleUpdateLocalState} >

                    {block.bulletChildren.filter(bullet => bullet.archived === false)
                                         .map(bullet => {
                                            return (
                                                <Bullet {...this.props}
                                                  key={bullet.bulletId}
                                                  bulletId={bullet.bulletId}
                                                  parentBlockId={bullet.parentBlockId}
                                                  text={bullet.text}
                                                  moveBullet={this.moveBullet}
                                                  findBullet={this.findBullet}
                                                  findBlock={this.findBlock}
                                                  handleUpdateLocalState={this.handleUpdateLocalState} />
                                            );
                    })}

                </BlockDumbComp>
              );
            })}

          <ResumeFooter {...this.props}
                        styles={styles}
                        resumeThemes={resumeThemes}
                        handleUpdateLocalState={this.handleUpdateLocalState} />

          <div className='marginBottom'
               style={styles.marginBottom} />
        </Paper>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
