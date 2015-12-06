import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

// Components
import BlockDumbComp from 'components/BlockDumbComp';
import Bullet from 'components/Bullet';
import ResumeHeader from 'components/ResumeHeader';
import ResumeFooter from 'components/ResumeFooter';
import ResumeSavePrint from 'components/ResumeSavePrint';
import { addBlock,
         addBullet,
         clientIsDirtyUpdate,
         getResumeFromServerDBAsync,
         hideBlock,
         hideBullet,
         moveBlock,
         moveBullet,
         sendResumeToServerAsync,
         serverIsSavingUpdate,
         updateLocalState,
         updateLocalStateBlocks,
         updateLocalStateBullets,
         updateLocalStateFooter,
         updateLocalStateHeader,
         updateLocalStateSavePrint,
         updateResumeState,
         updateResumeWithServerResponse } from 'actions/resumeActions';

// Styling
import { styles } from 'styles/ResumeViewStyles';
import { resumeThemes } from 'styles/resumeThemes';
import { Paper } from 'material-ui/lib';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // this is some voodoo to make SelectField render correctly,
                        // check the issues on their repo for more information


const ActionCreators = {
  addBlock,
  addBullet,
  clientIsDirtyUpdate,
  getResumeFromServerDBAsync,
  hideBlock,
  hideBullet,
  moveBlock,
  moveBullet,
  sendResumeToServerAsync,
  serverIsSavingUpdate,
  updateLocalState,
  updateLocalStateBlocks,
  updateLocalStateBullets,
  updateLocalStateFooter,
  updateLocalStateHeader,
  updateLocalStateSavePrint,
  updateResumeState,
  updateResumeWithServerResponse
};

const mapStateToProps = (state) => ({
  currentTheme: state.resumeReducer.resumeTheme, // TODO: maybe should be currentTheme
  loggedIn: state.titleBarReducer.loggedIn,
  resumeState: state.resumeReducer,
  routerState: state.router,
  userID: state.titleBarReducer.userID || null // FIXME: this should be 'userId'
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

<<<<<<< HEAD
////////////////////////////////////
//    React DnD functions below   //
////////////////////////////////////

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
    actions: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool,
    resumeState: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.moveBlock = this.moveBlock.bind(this);
    this.findBlock = this.findBlock.bind(this);
    this.moveBullet = this.moveBullet.bind(this);
    this.findBullet = this.findBullet.bind(this);
  }

  handleUpdateLocalState(event, textFieldName, whereFrom, id, parentBlockId) {
    this.actions.clientIsDirtyUpdate(true);
    const userInput = event.target.textContent;
    // remember to pass in props from the component
    //////////////////////////////////////
    // if a user updatesLocalState, flip clientIsDirty to true.
    ////////////////////////////////////

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

    let bulletIndex, parentBlockIndex;
    if (whereFrom === 'bullets') {
      parentBlockIndex = this.findBlock(parentBlockId).blockIndex;
      bulletIndex = this.findBullet(id, parentBlockIndex).bulletIndex;
    }

    if (whereFrom === 'header') {
      console.log('updating from header...');
      this.actions.updateLocalStateHeader({textFieldName, userInput, whereFrom});
      // this.actions.serverIsSavingUpdate({text: 'win'});


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
      this.actions.updateLocalStateBullets({textFieldName, userInput, whereFrom, bulletIndex, parentBlockIndex});
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

  addBlock() {
    this.props.actions.addBlock();
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
                         handleUpdateLocalState={this.handleUpdateLocalState}
                         handleSubmit={this.handleSubmit}
                         handlePrint={this.handlePrint}
                         handleChangeTheme={this.handleChangeTheme}
                         handleUpdateLocalState={this.handleUpdateLocalState}
                         handleSaveState={this.handleSaveState}
                         getResumeFromServerDBAsync={this.getResumeFromServerDBAsyc}
                         serverIsSavingUpdate={this.serverIsSavingUpdate}
                         clientIsDirtyUpdate={this.clientIsDirtyUpdate} />

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

          <img src='styles/assets/ic_add_circle_outline_black_24px.svg'
               onClick={e => this.addBlock(e)} />

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
