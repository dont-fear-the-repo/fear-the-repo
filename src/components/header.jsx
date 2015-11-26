import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser, signupUser } from 'actions/titleBarActions';

import $ from 'jQuery';

import { FlatButton, Popover, TextField } from 'material-ui/lib';


const ActionCreators = {
  loginUser: loginUser,
  signupUser: signupUser
};

const mapStateToProps = (state) => ({
  userLoginInfo: state.username
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});
export class Header extends React.Component {

  state = {
    activePopover: '',
    anchorEl: {},
    loginOrSignup: ''
  }

// AUTH METHODS
  handleLogin() {
    const userLoginInfo = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };

    // jQuery defeat...not "the Redux Way"?
    $.ajax({  // TODO: eliminate jQuery!
      url: '/login',
      type: 'POST',
      data: JSON.stringify(userLoginInfo),
      contentType: 'application/json',
      success: function(data) {
        }.bind(this),
      error: function(xhr,status,err) {
        }.bind(this)
    });


    // this.props.actions.loginUser(userLoginInfo);  // TODO: make this work? Currently this component has no props, and so no actions are being bound and available
    // TODO: change button to show userinfo, maybe redirect? Possible async concerns
  }

  handleSignup() {
    const userSignupInfo = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue()
    };

    // jQuery defeat...not "the Redux Way"?

    this.props.actions.signupUser(userSignupInfo);  // TODO: make this work? Currently this component has no props, and so no actions are being bound and available
    // TODO: change button to show userinfo, maybe redirect? Possible async concerns
  }

// POPOVER METHODS
  showLoginPopover(key, e) {
    this.setState({
      activePopover: key,
      anchorEl: e.currentTarget,
      loginOrSignup: 'login'
    });
  }

  showSignupPopover(key, e) {
    this.setState({
      activePopover: key,
      anchorEl: e.currentTarget,
      loginOrSignup: 'signup'
    });
  }

  closePopover(key) {
    if (this.state.activePopover !== key)
      return
    this.setState({
      activePopover:'none',
    });
  }

  render() {
    return (
      <div>
        <div className='header'>
          <Link to='/' style={{marginLeft: '30px'}}>Fear the Repo</Link>
          <Link to='/userform'>
            <FlatButton label='User Info' />
          </Link>
          <Link to='/resume'>
            <FlatButton label='Edit Resume' />
          </Link>
          <FlatButton label='export' />
          <Link to='/secretpage'>
            <FlatButton label = 'Secret Page' />
          </Link>  
          <FlatButton style={{float: 'right', marginRight: '30px'}}
                      label='Login'
                      onClick={this.showLoginPopover.bind(this, 'pop')} />
          <FlatButton style={{float: 'right', marginRight: '10px'}}
                      label='Signup'
                      onClick={this.showSignupPopover.bind(this, 'pop')} />
          </div>
        <Popover className='signup-popover'
                 open={this.state.activePopover === 'pop'}
                 anchorEl={this.state.anchorEl}
                 anchorOrigin={{horizontal: 'left', vertical: 'center'}}
                 targetOrigin={{horizontal: 'left', vertical: 'top'}}
                 canAutoPosition={true}
                 onRequestClose={this.closePopover.bind(this, 'pop')} >
          <div style={{padding: 20}}>
            <TextField hintText='Username' ref='username' />
            <TextField hintText='Password' type="password"  ref='password' />
            <FlatButton label='Submit'
                        onClick={this.state.loginOrSignup === 'login' ?
                          e => this.handleLogin(e) :
                          e => this.handleSignup(e)} />
          </div>
        </Popover>

      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

/***************************************************
*******     Useful code for the future      ********
// TO CREATE A POP-UP DIALOG (for Auth maybe?)
let customActions = [
  <FlatButton
    label="Cancel"
    secondary={true}
    onTouchTap={this._handleCustomDialogCancel} />,
  <FlatButton
    label="Submit"
    primary={true}
    onTouchTap={this._handleCustomDialogSubmit} />
];
<Dialog
  title="Dialog With Custom Actions"
  actions={customActions}
  open={this.state.showDialogCustomActions}
  onRequestClose={this._handleRequestClose}>
  The actions in this window were passed in as an array of react objects.
</Dialog>
// FOR RESPONSIVE DESIGN FOR MOBILE
  // replace the header with a Toolbar from Material-ui
// POTENTIALLY ALSO USEFUL:
  // Dropdown Menu
  // Popover (maybe instead of the dialog for auth?)
  // Refresh Indicator
  // Tabs?
  */