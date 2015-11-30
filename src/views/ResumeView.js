import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Block from 'components/Block';
import Bullet from 'components/Bullet';
import { DropTarget } from 'react-dnd';
import update from 'react/lib/update';
import { saveResume, dropBullet } from 'actions/resumeActions';
import { RaisedButton, TextField, Paper } from 'material-ui/lib';

const blockTarget = {
  drop(props, monitor, component) {

    const bulletProps = {
      id: monitor.getItem().id,
      body: monitor.getItem().body
    };

    if (monitor.getItemType() === 'bullet') {
      props.actions.dropBullet({
        blocks: component.state.blocks,
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

const Types = {
  BLOCK: 'block',
  BULLET: 'bullet'
};

const ActionCreators = {
  saveResume: saveResume,
  dropBullet: dropBullet
};

const mapStateToProps = (state) => ({
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

@DropTarget([Types.BLOCK, Types.BULLET], blockTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export class ResumeView extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    connectDropTarget: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.moveBlock = this.moveBlock.bind(this);
    this.findBlock = this.findBlock.bind(this);
    this.moveBullet = this.moveBullet.bind(this);
    this.findBullet = this.findBullet.bind(this);

    this.state = {
      blocks: [{
        id: 1,
        companyName: 'My Company',
        jobTitle: 'Senior Señor',
        year: '2015',
        location: 'San Francisco, CA',
        body: [],
        hasBullets: false
      },
      {
        id: 2,
        companyName: 'Company 2',
        jobTitle: 'Mister Manager',
        year: '2014',
        location: 'Chicago, IL',
        body: [],
        hasBullets: false
      },
      {
        id: 3,
        companyName: 'Company 3',
        jobTitle: 'Lowly Peon',
        year: '2012',
        location: 'New York, NY',
        body: [],
        hasBullets: false
      }],
      bullets: [{
        id: 1,
        body: '1111111'
      },
      {
        id: 2,
        body: '2222222'
      },
      {
        id: 3,
        body: '3333333'
      }]
    };
  }

  handleSubmit() {
    this.props.actions.saveResume({
      blocks: this.state.blocks,
      resumeTitle: this.refs.resumeTitle.getValue()
    });
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

  render() {
    const { connectDropTarget } = this.props;
    const { blocks, bullets } = this.state;

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
           style={styles.container}>
        <div className='resumeTitle'
             style={styles.resumeTitle}>
          <TextField className='textCenter'
                     style={styles.textCenter}
                     hintStyle={styles.hintStyle}
                     hintText='Your Resume Title'
                     ref='resumeTitle' />

          <RaisedButton label='Save Resume'
                        onClick={e => this.handleSubmit(e)} />
        </div>

        <Paper style={styles.resumePaper}>
          <div className='marginTop'
               style={styles.marginTop} />

          <Paper className='resumeContainer'
                 style={styles.resumeContainer} >

            {blocks.map(block => {
              return (
                <Block key={block.id}
                       id={block.id}
                       companyName={block.companyName}
                       jobTitle={block.jobTitle}
                       year={block.year}
                       body={block.body}
                       location={block.location}
                       moveBlock={this.moveBlock}
                       findBlock={this.findBlock}
                       hasBullets={this.hasBullets} />
              );
            })}

            {bullets.map(bullet => {
              return (
                <Bullet key={bullet.id}
                        id={bullet.id}
                        body={bullet.body}
                        moveBullet={this.moveBullet}
                        findBullet={this.findBullet} />
              );
            })}

          </Paper>

          <div className='marginBottom'
               style={styles.marginBottom} />
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
