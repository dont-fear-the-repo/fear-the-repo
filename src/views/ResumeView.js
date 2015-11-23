import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import Paper                  from 'material-ui/lib/paper';
import { RaisedButton }       from 'material-ui/lib';
import Block                  from 'components/Block';
import { DropTarget }         from 'react-dnd';
import update                 from 'react/lib/update';
import { saveResume }         from 'actions/resumeActions';

const blockTarget = {
  drop () {
  }
};

const Types = {
  BLOCK: 'block'
};

const ActionCreators = {
  saveResume: saveResume
};

const mapStateToProps = (state) => ({
  routerState: state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

@DropTarget(Types.BLOCK, blockTarget, connect => ({
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

    this.state = {
      blocks: [{
        id: 1,
        companyName: 'My Company',
        jobTitle: 'My Job Title',
        year: '2015',
        location: 'San Francisco, CA'
      },
      {
        id: 2,
        companyName: 'Company 2',
        jobTitle: 'Job 2',
        year: '2014',
        location: 'Chicago, IL'
      },
      {
        id: 3,
        companyName: 'Company 3',
        jobTitle: 'Job 3',
        year: '2012',
        location: 'New York, NY'
      }]
    };
  }

  handleSubmit () {
    this.props.actions.saveResume(this.state.blocks);
  }

  moveBlock (id, atIndex) {
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

  findBlock (id) {
    const { blocks } = this.state;
    const block = blocks.filter(b => b.id === id)[0];

    return {
      block,
      index: blocks.indexOf(block)
    };
  }

  render () {
    const { connectDropTarget } = this.props;
    const { blocks } = this.state;

    return connectDropTarget(
      <div className='container'>
        <h1 className='text-center'>Resume Builder</h1> <br/><br/>

        <Paper className='resumeContainer'>
          {blocks.map(block => {
            return (
              <Block key={block.id}
                     id={block.id}
                     companyName={block.companyName}
                     jobTitle={block.jobTitle}
                     year={block.year}
                     location={block.location}
                     moveBlock={this.moveBlock}
                     findBlock={this.findBlock} />
            );
          })}
        </Paper>
        <RaisedButton label='Save Resume' onClick={e => this.handleSubmit(e)} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
