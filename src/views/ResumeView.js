import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import * as ActionCreators from 'actions/goHome';
import RaisedButton           from 'material-ui/lib/raised-button';

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
  authorize() {}
  render () {
    return (
      <div className='container'>
        <h1>is this thing on?</h1>
        <br/>
        <br/>
        <Link to='/'>but this link will take you back to the counter</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeView);
