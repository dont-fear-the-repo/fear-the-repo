import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import * as ActionCreators    from 'actions/goHome';
import RaisedButton           from 'material-ui/lib/raised-button';
import Card                   from 'material-ui/lib/card/card';
import CardHeader             from 'material-ui/lib/card/card-header';
import Block                  from 'components/Block';


const mapStateToProps = (state) => ({
  goHome : state.goHome,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(ActionCreators, dispatch)
});
export class ResumeView extends React.Component {
  static propTypes = {
    actions : React.PropTypes.object
  }

  // what do we want to render? this is just the VIEW
    // big container for overall resume
      // blocks to drag and drop
        // bullets

  render () {
    return (
      <div className='container text-center'>
        <h1>Resume Builder</h1> <br/><br/>

        <Card>
          // make this bad boy a non-draggable drop target
          <CardHeader
            title='This will be a resume'
            subtitle='all the jobs' />
        </Card>

        <Block/>

        <br/>
        <br/>
        <Link to='/'>this link will take you back to the counter</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
