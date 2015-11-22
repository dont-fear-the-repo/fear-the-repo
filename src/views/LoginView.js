import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import * as ActionCreators from 'actions/goHome';
import RaisedButton           from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import $                      from 'jQuery';
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
  handleSubmit(e) {
    var comment = {
      username:this.refs.username.getValue(),
      password:this.refs.password.getValue()
    };
    console.log(comment);
    $.ajax({
      url: '/login',
      type: 'POST',
      data: JSON.stringify(comment),
      contentType: 'application/json',
      success: function(data){
      }.bind(this),
      error: function(xhr,status,err){
        console.log("error")
      }.bind(this)
    });
    return;
  }
  render () {
    return (
      <div className='container'>
        <h1>LOGIN</h1>
        <br/>
        Username: <TextField hintText='Username' ref='username'/>
        <br/>
        Password: <TextField hintText='Password' ref='password'/>
      <br/>
      <RaisedButton label='Submit' onClick={e =>this.handleSubmit(e)}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
