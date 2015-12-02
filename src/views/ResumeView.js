import React                              from 'react';
import { bindActionCreators }             from 'redux';
import { connect }                        from 'react-redux';
import BlockDumbComp                      from 'components/BlockDumbComp';
import Bullet                             from 'components/Bullet';
import ResumeHeader                       from 'components/ResumeHeader';
import { DropTarget }                     from 'react-dnd';
import update                             from 'react/lib/update';
import { dropBullet, updateResumeState, sendResumeToServerAsync, updateLocalState } from 'actions/resumeActions';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';

const ActionCreators = {
  updateResumeState: updateResumeState,
  sendResumeToServerAsync: sendResumeToServerAsync,
  updateLocalState: updateLocalState,
  dropBullet: dropBullet
};

const mapStateToProps = (state) => ({
  routerState: state.router,
  resumeState: state.resumeReducer,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet'
};

const blockTarget = {
  drop(props, monitor, component) {
    const bulletProps = {
      id: monitor.getItem().id,
      body: monitor.getItem().body
    };

    if (monitor.getItemType() === 'bullet') {
      props.actions.dropBullet({
        // blocks: component.state.blocks,
        targetBlock: monitor.getDropResult(),
        droppedBullet: bulletProps
      });
    } else if (monitor.getItemType() === 'block') {
      props.actions.saveResume({
        blocks: component.state.blocks
      });
    }
  }
};

@DropTarget([Types.BLOCK, Types.BULLET], blockTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
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
    // this is to test sujay's api/resume/create, so in the future just sent the whole this.props.resumeState
    if (this.props.loggedIn) {
      const obj = {};
      obj.title = this.props.resumeState.resumeTitle;
      this.props.actions.sendResumeToServerAsync(obj);
    } else {
      alert('To save a resume, please signup above');
    }
  }

  handleUpdateLocalState(event, textFieldName) {
    const userInput = event.target.value;
    this.props.actions.updateLocalState({textFieldName, userInput});
  }

  moveBlock(id, atIndex) {
    const { block, index } = this.findBlock(id);
    this.setState(update(this.state, {
      blocks: {
        $splice: [
          [index, 1],
          [atIndex, 0, block]
        ]
      }
    }));
  }

  findBlock(id) {
    const { blocks } = this.state;
    const block = blocks.filter(b => b.id === id)[0];

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
    const { bullets } = this.state;
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
        backgroundColor: 'lightgray',
        height: '1000px'
      },
      resumeTitle: {
        textAlign: 'center'
      },
      textCenter: {
        margin: '20px',
        backgroundColor: 'white'
      },
      hintStyle: {
        paddingLeft: '8px'
      },
      marginTop: {
        height: '20px'
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
      }
    };

    return connectDropTarget(
      <div className='container'
           style={styles.container} id='resumeContainer'>
        <div className='resumeTitle'
             style={styles.resumeTitle}>
          <TextField className='textCenter'
                     style={styles.textCenter}
                     hintStyle={styles.hintStyle}
                     hintText={this.props.resumeState.resumeTitle}
                     ref='resumeTitle' onBlur={e => this.handleUpdateLocalState(e, 'resumeTitle')} />

          <RaisedButton label='Save Resume'
                        onClick={e => this.handleSubmit(e)} />

          <RaisedButton label='Print Resume' onClick={e => this.handlePrint(e)} />
        </div>

        <Paper style={styles.resumePaper}>
          <div className='marginTop'
               style={styles.marginTop} />

          <Paper className='resumeContainer'
                 style={styles.resumeContainer}>

             <ResumeHeader />
            {this.props.resumeState.blockChildren.map(block => {
              return (

                      <BlockDumbComp key={block.blockId}
                        blockId={block.blockId}
                        companyName={block.companyName}
                        jobTitle={block.jobTitle}
                        year={block.year}
                        bulletChildren={block.bulletChildren}
                        location={block.location}
                        moveBlock={this.moveBlock}
                        findBlock={this.findBlock}
                        > {block.blockId} </BlockDumbComp>
                      );
            }
            )}

          </Paper>

          <div className='marginBottom'
               style={styles.marginBottom} />
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);



/*
TODO: React doesn't like our unique keys, even when we replace BlockDumbComp with painfully simple version below:
<ul>
  <li key={block.blockId}> {block.blockId} </li>
</ul>




  // {block.bulletChildren.map(bullet => {
  //   return (
  //     <Bullet key={bullet.bulletId}
  //             bulletId={bullet.bulletId}
  //             text={bullet.text}
  //             moveBullet={this.moveBullet}
  //             findBullet={this.findBullet} />
  //   );
  // })}



*/
