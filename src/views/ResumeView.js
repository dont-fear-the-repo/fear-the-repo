import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Block from 'components/Block';
import { DropTarget } from 'react-dnd';
import update from 'react/lib/update';
import { saveResume } from 'actions/resumeActions';

import { RaisedButton, TextField, Paper } from 'material-ui/lib';

const blockTarget = {
  drop() {
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

@DropTarget(Types.BLOCK, blockTarget, (connect) => ({
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
        jobTitle: 'Senior Señor',
        year: '2015',
        location: 'San Francisco, CA'
      },
      {
        id: 2,
        companyName: 'Company 2',
        jobTitle: 'Mister Manager',
        year: '2014',
        location: 'Chicago, IL'
      },
      {
        id: 3,
        companyName: 'Company 3',
        jobTitle: 'Lowly Peon',
        year: '2012',
        location: 'New York, NY'
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

  handlPrint() {
    let prtContent = document.getElementById("resumeContainer");
    console.log(prtContent);
    let WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  }


  render() {
    const { connectDropTarget } = this.props;
    const { blocks } = this.state;

    return connectDropTarget(
      <div className='container'
           style={{backgroundColor: 'lightgray', height: '1000px'}}>
        <div className='resume-title'
             style={{textAlign: 'center'}}>
          <TextField className='text-center'
                     style={{margin: '20px', backgroundColor: 'white'}}
                     hintStyle={{paddingLeft: '8px'}}
                     hintText='Your Resume Title'
                     ref='resumeTitle' />

          <RaisedButton label='Save Resume'
                        onClick={e => this.handleSubmit(e)} />
          <RaisedButton label='Print resume' onClick={e => this.handlPrint(e)} />              
        </div>

        <Paper style={{height: '800px', width: '95%', marginLeft: 'auto', marginRight: 'auto'}}>
          <div className='margin-top'
               style={{height: '20px'}} />

          <Paper className='resumeContainer' id='resumeContainer'
                 style={{marginLeft: '20px', marginRight: '20px'}} >
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
          <div className='margin-bottom'
               style={{height: '20px'}} />
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
