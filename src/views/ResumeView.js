import React                              from 'react';
import { bindActionCreators }             from 'redux';
import { connect }                        from 'react-redux';
import BlockDumbComp                      from 'components/BlockDumbComp';
import Bullet                             from 'components/Bullet';
import ResumeHeader                       from 'components/ResumeHeader';
import { DropTarget }                     from 'react-dnd';
import update                             from 'react/lib/update';
import { moveBlock, dropBullet, updateResumeState, sendResumeToServerAsync, updateLocalState, updateLocalStateHeader, updateLocalStateFooter, updateLocalStateSavePrint, updateLocalStateBlocks } from 'actions/resumeActions';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';

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
    connectDropTarget: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor (props) {
    super(props);
    this.moveBlock = this.moveBlock.bind(this);
    this.findBlock = this.findBlock.bind(this);
    this.moveBullet = this.moveBullet.bind(this);
    this.findBullet = this.findBullet.bind(this);
  }

  handleSubmit() {
    // if (this.props.loggedIn) {
      console.log('saving...')
      this.props.actions.sendResumeToServerAsync(this.props.resumeState);
    // } else {
      // alert('To save a resume, please signup above');
    // }
  }

  handleUpdateLocalState(event, textFieldName, whereFrom) {
    const userInput = event.target.value;

    if (whereFrom === 'header'){
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

  handlePrint() {
    const prtContent = document.getElementById('resumeContainer');
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML + '<style>div {  border-radius: 0px !important; box-shadow: none !important; }</style>');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }

  render() {
    const { connectDropTarget } = this.props;
    const { blockChildren } = this.props.resumeState.blockChildren;

    const styles = {
      container: {
        backgroundColor: 'white',
        height: '1000px'
      },
        plain: {
        marginLeft: '10px'
      },
      resumeTitle: {
        margin: '10px',
        backgroundColor: 'white',
        textAlign: 'center'
      },
      marginTop: {
        height: '1px'
      },
      resumeContainer: {
        marginLeft: '20px',
        marginRight: '20px'
      },
      marginBottom: {
        height: '20px'
      },
      resumePaper: {
        height: '800px',
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      underlineStyle: {
        borderColor: 'white',
        borderWidth: '0px'
      },
      underlineFocusStyle : {
        borderColor: 'orange',
        borderWidth: '1px'
      },
      hintStyle: {
        color: 'lightgray'
      },
      name: {
        fontWeight: '700',
        fontSize: '32px',
        textAlign: 'left',
        marginLeft: '10px'
      },
      email: {
        color: 'blue',
        fontSize: '16px',
        marginLeft: '10px'
      },
      phone: {
        fontSize: '16px',
        marginLeft: '10px'
      },
      city: {
        marginLeft: '10px'
      },
      url: {
        textAlign: 'left',
        marginLeft: '10px'
      },
      blockDrag: {
        cursor: 'move',
        margin: '0px'
      },
      jobTitle: {
        display: 'inline',
        margin: '10px',
        fontWeight: '700',
        fontSize: '18px'
      },
      pipe: {
        display: 'inline',
        margin: '5px'
      },
      companyName: {
        display: 'inline',
        margin: '10px',
        fontWeight: '500',
        fontSize: '16px'
      },
      location: {
        display: 'inline',
        margin: '10px'
      },
      year: {
        display: 'inline',
        float: 'right',
        marginRight: '10px'
      },
      bullet: {
        fontSize: '14px'
      }
    };

    return connectDropTarget(
      <div className='container'
           style={styles.container}
           id='resumeContainer'>

        <div className='marginTop'
             style={styles.marginTop} />
        <Paper>
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
                                findBlock={this.findBlock} > {block.blockId} </BlockDumbComp>
                );
            })}

          <ResumeFooter {...this.props}
                        styles={styles}
                        handleUpdateLocalState={this.handleUpdateLocalState} />

          <div className='marginBottom'
               style={styles.marginBottom} />
        </Paper>

        <ResumeSavePrint {...this.props}
                         styles={styles}
                         handleUpdateLocalState={this.handleUpdateLocalState} />

      </div>
    );
  }
} // end react component ResumeView



/////////////////////////////////////////////////////////////////////////////////////
//    Resume Footer, super dumb comp is here instead of being a separate file      //
/////////////////////////////////////////////////////////////////////////////////////
class ResumeFooter extends React.Component {
  render() {
    return (
      <div>
        <div style={this.props.styles.plain}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='school1-name'
                     hintText={this.props.resumeState.resumeFooter.school1.name}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-name', 'footer')} />
          <div style={this.props.styles.pipe}> | </div>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='school1-degree'
                     hintText={this.props.resumeState.resumeFooter.school1.degree}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-degree', 'footer')} />
          <div style={this.props.styles.pipe}> | </div>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='school1-schoolEndYear'
                     hintText={this.props.resumeState.resumeFooter.school1.schoolEndYear}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-schoolEndYear', 'footer')} />
          <div style={this.props.styles.pipe}> | </div>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='school1-location'
                     hintText={this.props.resumeState.resumeFooter.school1.location}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school1-location', 'footer')} />


          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='school2-name'
                     hintText={this.props.resumeState.resumeFooter.school2.name}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-name', 'footer')} />
          <div style={this.props.styles.pipe}> | </div>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='school2-degree'
                     hintText={this.props.resumeState.resumeFooter.school2.degree}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-degree', 'footer')} />
          <div style={this.props.styles.pipe}> | </div>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='school2-schoolEndYear'
                     hintText={this.props.resumeState.resumeFooter.school2.schoolEndYear}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-schoolEndYear', 'footer')} />
          <div style={this.props.styles.pipe}> | </div>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='school2-location'
                     hintText={this.props.resumeState.resumeFooter.school2.location}
                     onBlur={e => this.props.handleUpdateLocalState(e, 'school2-location', 'footer')} />
        </div>
        <div style={this.props.styles.plain}>

        </div>
        <div style={this.props.styles.plain}>
          <TextField underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     ref='personalStatement'
                     hintText='Personal Statement'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'personalStatement', 'footer')} />
        </div>
      </div>
    );
  }
}



/////////////////////////////////////////////////////////////////////////////////////
//   Resume Save/Print, super dumb comp is here instead of being a separate file  //
/////////////////////////////////////////////////////////////////////////////////////
class ResumeSavePrint extends React.Component {
  render() {
    return (
      <div>
        <TextField className='resumeTitle'
                     style={this.props.styles.resumeTitle}
                     underlineStyle={this.props.styles.underlineStyle}
                     underlineFocusStyle={this.props.styles.underlineFocusStyle}
                     hintStyle={this.props.styles.hintStyle}
                     hintText={this.props.resumeState.resumeTitle}
                     floatingLabelText='Resume Version Name'
                     onBlur={e => this.props.handleUpdateLocalState(e, 'resumeTitle', 'savePrint')} />

          <RaisedButton label='Save Resume'
                        onClick={e => this.handleSubmit(e)} />
          <span> </span>
          <RaisedButton label='Print Resume'
                        onClick={e => this.handlePrint(e)} />
      </div>
    );
  }
}



/*

  resumeFooter: {
    school1: {
      name: 'MakerSquare',
      degree: 'Software Engineer',
      schoolEndYear: '2012',
      location: 'Chicago'
    },
    school2: {
      name: 'Trololo',
      degree: 'BS',
      schoolEndYear: '2008',
      location: 'Boston'
    },
    personalStatement: 'I like cats, but only sometimes, eating ramen, basketball, and taking long walks because BART is broken again.'
  }



            <TextField className='personalStatement'
                       underlineStyle={styles.underlineStyle}
                       underlineFocusStyle={styles.underlineFocusStyle}
                       hintStyle={styles.hintStyle}
                       hintText={this.props.resumeState.personalStatement}
                       ref='personalStatement' onBlur={e => this.handleUpdateLocalState(e, 'personalStatement')} />
*/


export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);

