import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import * as ActionCreators from 'actions/goHome';
import RaisedButton           from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
const mapStateToProps = (state) => ({
  goHome : state.goHome,
  routerState : state.router
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(ActionCreators, dispatch)
});
export class LoginView extends React.Component {
  static propTypes = {
    actions : React.PropTypes.object
  }
  authorize() {}
  render () {
    return (
      <div className='container'>
        <h1>LOGIN</h1>
        <br/>
        Full Name: <TextField hintText='Full Name' />
        <br/>
        Password: <TextField hintText='Password' />
      <br/>
      <RaisedButton label='Submit' />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
