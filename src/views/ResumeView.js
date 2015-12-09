import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

// Components
import BlockDumbComp from 'components/BlockDumbComp';
import Bullet from 'components/Bullet';
import Heading from 'components/Heading';
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
import { disableSubmit,
         displayErrorMessage,
         enableSubmit,
         hideErrorMessage,
         updateErrorMessage } from 'actions/validationActions';

// Styling
import { styles } from 'styles/ResumeViewStyles';
import { resumeThemes } from 'styles/resumeThemes';
import { Paper, LeftNav, IconButton, IconMenu, MoreVertIcon, MenuItem, FlatButton } from 'material-ui/lib';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // this is some voodoo to make SelectField render correctly,
                        // check the issues on their repo for more information


const ActionCreators = {
  addBlock,
  addBullet,
  clientIsDirtyUpdate,
  disableSubmit,
  displayErrorMessage,
  enableSubmit,
  getResumeFromServerDBAsync,
  hideBlock,
  hideBullet,
  hideErrorMessage,
  moveBlock,
  moveBullet,
  sendResumeToServerAsync,
  serverIsSavingUpdate,
  updateErrorMessage,
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
  canSubmitResume: state.validationReducer.canSubmitResume,
  currentErrorMessage: state.validationReducer.currentErrorMessage,
  currentTheme: state.resumeReducer.resumeTheme, // TODO: maybe should be currentTheme
  loggedIn: state.titleBarReducer.loggedIn,
  resumeState: state.resumeReducer,
  routerState: state.router,
  userID: state.titleBarReducer.userID || null // FIXME: this should be 'userId'
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

/**********************************/
/*    React DnD functions below   */
/**********************************/

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet',
  HEADING: 'heading'
};

@DropTarget([Types.BLOCK, Types.BULLET, Types.HEADING], {}, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

/*************************************/
/*   end React DnD functions above   */
/*************************************/


class ResumeView extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired,
    currentErrorMessage: PropTypes.string,
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

  state = {
    validations: {
      name: false,
      email: false,
      city: false,
      state: false,
      phone: false
    }
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

  addBlock(event, type) {
    this.props.actions.addBlock(type);
  }
/*

{
          <IconMenu iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>

        }

{
          <IconMenu iconButtonElement={
            <IconButton>HolaMundo</IconButton>
          }>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>

        }



*/

  render() {

    const { connectDropTarget } = this.props;
    const { blockChildren } = this.props.resumeState;

    return connectDropTarget(
    <div>

      <div className='container'
           style={styles.container}
           id='resumeContainer'>
           <ResumeSavePrint {...this.props}
                            styles={styles}
                            validations={this.state.validations}
                            handleUpdateLocalState={this.handleUpdateLocalState}
                            handleSubmit={this.handleSubmit}
                            handlePrint={this.handlePrint}
                            handleChangeTheme={this.handleChangeTheme}
                            handleUpdateLocalState={this.handleUpdateLocalState}
                            handleSaveState={this.handleSaveState}
                            getResumeFromServerDBAsync={this.getResumeFromServerDBAsyc}
                            serverIsSavingUpdate={this.serverIsSavingUpdate}
                            clientIsDirtyUpdate={this.clientIsDirtyUpdate} />
        <div className='marginTop'
             style={styles.marginTop} />


        <Paper style={styles.resumePaper}>

          <ResumeHeader {...this.props}
                        styles={styles}
                        validations={this.state.validations}
                        resumeThemes={resumeThemes}
                        handleUpdateLocalState={this.handleUpdateLocalState} />

          {blockChildren.filter(block => block.archived === false)
                        .map(block => {
                          if (block.blockType === 'bullets') {
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
                                            displayAddBullets={block.displayAddBullets}
                                            handleUpdateLocalState={this.handleUpdateLocalState} >

                            {block.bulletChildren.filter(bullet => bullet.archived === false)
                                                 .map(bullet => {
                                                    return (
                                                      <Bullet {...this.props}
                                                              key={bullet.bulletId}
                                                              styles={styles}
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
                        } else if (block.blockType === 'no bullets') {
                          return (
                            <Heading {...this.props}
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
                                     displayAddBullets={block.displayAddBullets}
                                     handleUpdateLocalState={this.handleUpdateLocalState} />
                          );
                        }
          })}

          <img src='styles/assets/ic_playlist_add_black_24px.svg'
               onClick={e => this.addBlock(e, 'bullets')} />
          <img src='styles/assets/ic_add_circle_outline_black_24px.svg'
               onClick={e => this.addBlock(e, 'no bullets')} />

          <ResumeFooter {...this.props}
                        styles={styles}
                        resumeThemes={resumeThemes}
                        handleUpdateLocalState={this.handleUpdateLocalState} />

          <div className='marginBottom'
               style={styles.marginBottom} />

        </Paper>

      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
